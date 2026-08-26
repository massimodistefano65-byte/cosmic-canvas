import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Lightbox from "@/components/Lightbox";
import InfoRequestDialog from "@/components/InfoRequestDialog";
import MeaningDialog from "@/components/MeaningDialog";
import CertificateDialog from "@/components/CertificateDialog";
import ShareMenu from "@/components/ShareMenu";
import SEOHead from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Stamp, ExternalLink, Info, Bookmark, Download } from "lucide-react";
import { getArtwork } from "@/lib/artworkData";
import { getSlugGradient } from "@/lib/slugGradient";
import { useI18n } from "@/lib/i18n";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { useArtworkLike } from "@/hooks/useArtworkLike";
import { useWishlist } from "@/hooks/useWishlist";
import { generateArtworkPdf } from "@/lib/generateArtworkPdf";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const disciplineLabels: Record<string, string> = {
  painting: "Painting",
  photography: "Photography",
  "digital-art": "Digital Art",
  "t-shirt": "T-Shirt",
};

const disciplineSeoLabel: Record<string, string> = {
  painting: "pittura contemporanea",
  photography: "fotografia artistica",
  "digital-art": "arte digitale",
  "t-shirt": "t-shirt d'artista",
};

/**
 * Carica il primo file markdown disponibile tra i candidati passati.
 * Filtra i falsi positivi dovuti al fallback SPA (index.html servito con 200).
 */
async function fetchFirstMarkdown(urls: string[]): Promise<string | null> {
  for (const url of urls) {
    if (!url) continue;
    try {
      const r = await fetch(url, { cache: "no-cache" });
      if (!r.ok) continue;
      const ctype = (r.headers.get("content-type") || "").toLowerCase();
      if (ctype.includes("text/html")) continue;
      const text = await r.text();
      const head = text.trimStart().slice(0, 200).toLowerCase();
      if (
        head.startsWith("<!doctype") ||
        head.startsWith("<html") ||
        head.includes("<head") ||
        head.includes("<script")
      ) {
        continue;
      }
      if (!text.trim()) continue;
      return text;
    } catch {
      // prova il candidato successivo
    }
  }
  return null;
}

const ArtworkDetail = () => {
  const { discipline, artworkId } = useParams<{ discipline: string; artworkId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { liked, count: likeCount, toggle: toggleLike } = useArtworkLike(discipline, artworkId);
  const [infoOpen, setInfoOpen] = useState(false);
  const { has: inWishlist, add: addWishlist, remove: removeWishlist } = useWishlist();
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [hasMeaning, setHasMeaning] = useState(false);
  const [meaningContent, setMeaningContent] = useState<string>("");
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [hasPurchase, setHasPurchase] = useState(false);
  const [purchaseContent, setPurchaseContent] = useState<string>("");
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [dedicationMd, setDedicationMd] = useState<string>("");
  const { t, lang } = useI18n();

  const isTshirt = discipline === "t-shirt";
  const purchaseLabel = discipline === "painting"
    ? t("artwork.purchaseOptions")
    : t("artwork.purchaseOptionsExt");

  useSectionAudio(discipline || "home");

  const artwork = getArtwork(discipline || "", artworkId || "");

  const meaningUrl = artwork
    ? lang === "en"
      ? `/artworks/${discipline}/${artwork.id}/meaning-en.md|/artworks/${discipline}/${artwork.id}/meaning.md`
      : `/artworks/${discipline}/${artwork.id}/meaning.md`
    : "";

  const dedicationUrl = artwork
    ? lang === "en"
      ? `/artworks/${discipline}/${artwork.id}/dedication-en.md|/artworks/${discipline}/${artwork.id}/dedication.md`
      : `/artworks/${discipline}/${artwork.id}/dedication.md`
    : "";

  useEffect(() => {
    if (!meaningUrl) {
      setHasMeaning(false);
      setMeaningContent("");
      return;
    }
    let cancelled = false;
    fetchFirstMarkdown(meaningUrl.split("|"))
      .then((text) => {
        if (cancelled) return;
        if (text) {
          setHasMeaning(true);
          setMeaningContent(text);
        } else {
          setHasMeaning(false);
          setMeaningContent("");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasMeaning(false);
          setMeaningContent("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [meaningUrl]);

  useEffect(() => {
    if (!dedicationUrl) {
      setDedicationMd("");
      return;
    }
    let cancelled = false;
    fetchFirstMarkdown(dedicationUrl.split("|"))
      .then((text) => {
        if (!cancelled) setDedicationMd(text || "");
      })
      .catch(() => {
        if (!cancelled) setDedicationMd("");
      });
    return () => {
      cancelled = true;
    };
  }, [dedicationUrl]);


  const purchaseUrl = discipline
    ? lang === "en"
      ? `/artworks/${discipline}/purchase-en.md|/artworks/${discipline}/purchase.md`
      : `/artworks/${discipline}/purchase.md`
    : "";
  useEffect(() => {
    if (!purchaseUrl) {
      setHasPurchase(false);
      setPurchaseContent("");
      return;
    }
    let cancelled = false;
    fetchFirstMarkdown(purchaseUrl.split("|"))
      .then((text) => {
        if (cancelled) return;
        if (text) {
          setHasPurchase(true);
          setPurchaseContent(text);
        } else {
          setHasPurchase(false);
          setPurchaseContent("");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasPurchase(false);
          setPurchaseContent("");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [purchaseUrl]);

  if (!artwork) {
    return (
      <div className="h-screen bg-background text-foreground flex items-center justify-center">
        <p>{t("artwork.notFound")}</p>
      </div>
    );
  }

  const discLabel = disciplineLabels[discipline || ""] || discipline;
  const seoDiscLabel = disciplineSeoLabel[discipline || ""] || discLabel;

  const isSold = (artwork.price ?? "").trim().toLowerCase() === "collezione privata";
  const isEn = lang === "en";
  const displayTechnique = isEn && artwork.techniqueEn?.trim()
    ? artwork.techniqueEn.trim()
    : artwork.technique;
  const displayDimensions = isEn && artwork.dimensionsEn?.trim()
    ? artwork.dimensionsEn.trim()
    : artwork.dimensions;
  const rawPrice = isEn && artwork.priceEn?.trim() ? artwork.priceEn.trim() : (artwork.price ?? "");
  const displayPrice = isSold ? t("cert.privateCollection") : rawPrice;
  const effectiveDedication = dedicationMd.trim() || artwork.dedication || "";
  const isArchived = isSold;

  const sealIcon = (size: number) => (
    <Stamp
      size={size}
      aria-hidden="true"
      className="text-[#d4af7a] inline-block align-middle ml-1 animate-archive-pulse"
      style={{ filter: "drop-shadow(0 0 5px rgba(212,175,122,0.65))" }}
    />
  );

  const gradientMap: Record<string, [string, string]> = {
    painting: ["rgba(168,85,247,0.3)", "rgba(59,130,246,0.3)"],
    photography: ["rgba(59,130,246,0.3)", "rgba(20,184,166,0.3)"],
    "digital-art": ["rgba(236,72,153,0.3)", "rgba(168,85,247,0.3)"],
    "t-shirt": ["rgba(249,115,22,0.3)", "rgba(239,68,68,0.3)"],
  };
  const [gFrom, gTo] = gradientMap[discipline || "painting"] || gradientMap.painting;

  const allImages = [
    { url: artwork.main, label: "Opera" },
    ...artwork.images,
  ].filter((img) => img.url);

  const currentImageUrl = allImages[selectedImage]?.url || "";
  const fullResUrl = selectedImage === 0 && artwork.full ? artwork.full : currentImageUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    artist: {
      "@type": "Person",
      name: "Massimo Di Stefano",
      url: "https://www.massimodistefano.com",
      sameAs: "https://www.massimodistefano.com/bio",
      jobTitle: "Artista Visivo",
    },
    dateCreated: artwork.year,
    artMedium: artwork.technique,
    artform: discLabel,
    width: artwork.dimensions,
    image: artwork.main
      ? `https://www.massimodistefano.com${artwork.main}`
      : undefined,
    url: `https://www.massimodistefano.com/${discipline}/${artworkId}`,
    description: `${artwork.title} (${artwork.year}) — ${artwork.technique}, ${artwork.dimensions}. Opera di Massimo Di Stefano, artista visivo.`,
  };

  const seoTitle = `${artwork.title} (${artwork.year}) — ${seoDiscLabel} di Massimo Di Stefano`;
  const seoDescription = `${artwork.title} (${artwork.year}) — ${artwork.technique}, ${artwork.dimensions}. Opera di Massimo Di Stefano, artista visivo italiano.`;

  return (
    <main className="min-h-screen md:h-screen md:overflow-hidden bg-background text-foreground flex flex-col">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/${discipline}/${artworkId}`}
        ogImage={artwork.main}
        jsonLd={jsonLd}
      />
      <Navbar />
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={fullResUrl}
        alt={`${artwork.title} - ${allImages[selectedImage]?.label || ""}`}
      />
      <InfoRequestDialog
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        artworkTitle={artwork.title}
        discipline={discipline || ""}
      />
      <MeaningDialog
        isOpen={meaningOpen}
        onClose={() => setMeaningOpen(false)}
        artworkTitle={artwork.title}
        content={meaningContent}
      />
      <MeaningDialog
        isOpen={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        artworkTitle={purchaseLabel}
        content={purchaseContent}
      />
      {isArchived && (
        <CertificateDialog
          isOpen={certificateOpen}
          onClose={() => setCertificateOpen(false)}
          archiveId={artwork.archiveId}
          artworkTitle={artwork.title}
          dedication={effectiveDedication}
          year={artwork.year}
          technique={displayTechnique}
          dimensions={displayDimensions}
          imageUrl={artwork.main}
          meaning={meaningContent}
          artworkUrl={`https://www.massimodistefano.com/${discipline}/${artworkId}`}
        />
      )}

      {/* ===== DESKTOP LAYOUT (md+) ===== */}
      <div className="hidden md:flex flex-1 pt-16 min-h-0 relative">
        <Link
          to={`/${discipline}`}
          className="absolute top-1/2 -translate-y-1/2 left-6 z-10 w-9 h-9 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/80 hover:text-foreground hover:border-foreground/30 transition-all duration-300"
          aria-label={`Back to ${discLabel}`}
        >
          <ArrowLeft size={15} aria-hidden="true" />
        </Link>

        <motion.div
          className="flex w-full h-full items-center min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-shrink-0 w-16" />

          {/* CENTER — Main artwork */}
          <div className="flex-1 flex items-center justify-center min-w-0 h-full py-6 px-10">
            <div className="relative inline-block group">
              <div className="absolute -inset-[3px] rounded opacity-30 group-hover:opacity-50 transition-opacity duration-700 blur-[8px] pointer-events-none bg-white/20" />
              <button
                onClick={() => setLightboxOpen(true)}
                className="relative block cursor-zoom-in grid place-items-center bg-black rounded overflow-hidden"
                style={{ maxWidth: "1200px", maxHeight: "82vh" }}
                aria-label={`Apri ${artwork.title} in lightbox`}
              >
                <AnimatePresence initial={false}>
                  {currentImageUrl ? (
                    <motion.img
                      key={currentImageUrl}
                      src={currentImageUrl}
                      alt={`${artwork.title} di Massimo Di Stefano — ${allImages[selectedImage]?.label || "opera"}`}
                      className="max-w-full max-h-[82vh] object-contain"
                      style={{ gridArea: "1 / 1" }}
                      loading={selectedImage === 0 ? "eager" : "lazy"}
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const fb = t.nextElementSibling as HTMLElement | null;
                        if (fb) fb.style.display = "flex";
                      }}
                    />
                  ) : (
                    <motion.div
                      key="fallback"
                      className="w-[60vw] max-w-[1200px] aspect-[4/5] max-h-[82vh] flex items-center justify-center text-muted-foreground/50 text-xs"
                      style={{ background: getSlugGradient(artwork.id), gridArea: "1 / 1" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2 }}
                    >
                      {artwork.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* RIGHT — Info column */}
          <div
            className="flex-shrink-0 flex flex-col gap-8 pt-[12vh] pb-6 pl-4 pr-10 max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-visible"
            style={{ width: "clamp(220px, 24vw, 310px)" }}
          >
            <div>
              <h1
                className="text-2xl tracking-wide text-foreground leading-snug"
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}
              >
                {artwork.title}
              </h1>
              <p className="text-[11px] tracking-[0.3em] uppercase mt-3 text-foreground font-light"
                 style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {artwork.year}
              </p>
            </div>

            <div className="space-y-4">
              {!isTshirt && (
                <div className="border-t border-border/30 pt-3">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/70 mb-1.5"
                     style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {t("artwork.dimensions")}
                  </p>
                  <p className="text-[13px] text-foreground font-light"
                     style={{ fontFamily: "'Raleway', sans-serif" }}
                  >{displayDimensions}</p>
                </div>
              )}
              <div className="border-t border-border/30 pt-3">
                <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/70 mb-1.5"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {t("artwork.technique")}
                </p>
                <p className="text-[13px] text-foreground font-light"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >{displayTechnique}</p>
              </div>
              {isTshirt && artwork.shopPlatform && artwork.shopUrl ? (
                <div className="border-t border-border/30 pt-4">
                  <a
                    href={artwork.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-shop-pulse inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded border border-border/40 hover:border-foreground/40 bg-white/5 hover:bg-white/10 text-foreground text-[11px] tracking-[0.3em] uppercase transition-colors"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <span>{t("artwork.buyOn")} {artwork.shopPlatform}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <div className="border-t border-border/30 pt-3">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/70 mb-1.5"
                     style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {t("artwork.price")}
                  </p>
                  {isArchived ? (
                    <button
                      type="button"
                      onClick={() => setCertificateOpen(true)}
                      aria-label="Apri Certificato di Autenticità Digitale"
                      className="group w-full text-left text-[13px] font-light flex items-center justify-between cursor-pointer transition-colors text-[#d4af7a] hover:text-[#e6c592]"
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      <span>{displayPrice}</span>
                      {sealIcon(22)}
                    </button>
                  ) : (
                    <p className="text-[13px] text-foreground font-light"
                       style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      <span>{displayPrice || "€ —"}</span>
                    </p>
                  )}
                </div>
              )}
              {hasMeaning && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setMeaningOpen(true)}
                    className="text-[9px] tracking-[0.25em] uppercase text-white cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Raleway', sans-serif", filter: "brightness(1.25)" }}
                  >
                    {t("artwork.meaning")}
                  </button>
                </div>
              )}
              {hasPurchase && !isSold && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setPurchaseOpen(true)}
                    className="text-[9px] tracking-[0.25em] uppercase text-white brightness-125 cursor-pointer hover:opacity-70 transition-opacity animate-pulse"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: [-2, 2, -2, 0] }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      {purchaseLabel}
                    </motion.span>
                  </button>
                </div>
              )}
            </div>

            <TooltipProvider delayDuration={200}>
              <div className="flex items-center gap-3 pt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleLike}
                      className={`h-9 px-3 rounded-full border flex items-center gap-1.5 transition-all duration-300 ${
                        liked
                          ? "text-red-500 border-red-500/40"
                          : "text-muted-foreground/80 border-border/40 hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      <Heart size={16} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
                      <span className="text-xs tabular-nums">{likeCount}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">{t("artwork.tt.like")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        if (inWishlist(artwork.id)) removeWishlist(artwork.id);
                        else addWishlist({ id: artwork.id, title: artwork.title, thumbnailUrl: artwork.preview, discipline: discipline || "" });
                      }}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        inWishlist(artwork.id)
                          ? "text-amber-500 border-amber-500/40"
                          : "text-muted-foreground/80 border-border/40 hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      <Bookmark size={16} fill={inWishlist(artwork.id) ? "currentColor" : "none"} aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">{t("artwork.tt.wishlist")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setInfoOpen(true)}
                      className="w-9 h-9 rounded-full border border-border/40 text-white brightness-125 hover:border-foreground/30 transition-all duration-300 flex items-center justify-center animate-pulse"
                    >
                      <Info size={16} aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">{t("artwork.tt.info")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={async () => {
                        try {
                          await generateArtworkPdf({
                            title: artwork.title,
                            year: artwork.year,
                            dimensions: displayDimensions,
                            technique: displayTechnique,
                            price: displayPrice,
                            discipline: discLabel,
                            imageUrl: currentImageUrl || undefined,
                          });
                        } catch { /* ignore */ }
                      }}
                      className="w-9 h-9 rounded-full border border-border/40 text-muted-foreground/80 hover:border-foreground/30 hover:text-foreground transition-all duration-300 flex items-center justify-center"
                    >
                      <Download size={16} aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">{t("artwork.tt.pdf")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex">
                      <ShareMenu url={`/${discipline}/${artworkId}`} title={artwork.title} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">{t("artwork.tt.share")}</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            {allImages.length > 1 && (
              <div className="flex flex-col gap-5 pt-2" role="group" aria-label="Immagini dell'opera">
                {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-36 h-36 rounded overflow-hidden border transition-all duration-500 ${
                        selectedImage === idx
                          ? "border-accent"
                          : "border-border/20 hover:border-accent/40"
                      }`}
                      style={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.35)" }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 12px 3px rgba(255,255,255,0.55)"}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 8px 2px rgba(255,255,255,0.35)"}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ===== MOBILE LAYOUT (<md) ===== */}
      <div className="md:hidden flex-1 pt-16 overflow-y-auto">
        <div className="flex items-center px-4 py-3">
          <Link
            to={`/${discipline}`}
            className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/80 hover:text-foreground hover:border-foreground/30 transition-all duration-300"
          >
            <ArrowLeft size={14} aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="px-4 pb-8"
        >
          {/* 1. FOTO GRANDE */}
          <div className="relative w-full mb-4 group">
            <div className="absolute -inset-[3px] rounded opacity-30 group-hover:opacity-50 transition-opacity duration-700 blur-[6px] pointer-events-none bg-white/20" />
            <button
              onClick={() => setLightboxOpen(true)}
              className="relative w-full cursor-zoom-in grid place-items-center bg-black rounded overflow-hidden"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentImageUrl}
                  src={currentImageUrl}
                  alt={`${artwork.title} di Massimo Di Stefano — ${allImages[selectedImage]?.label || "opera"}`}
                  className="w-full h-auto object-contain"
                  style={{ gridArea: "1 / 1" }}
                  loading={selectedImage === 0 ? "eager" : "lazy"}
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>
            </button>
          </div>

          {/* 2. TITOLO E ANNO */}
          <div className="mb-6">
            <h1
              className="text-2xl tracking-wide text-foreground leading-tight"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}
            >
              {artwork.title}
            </h1>
            <p className="text-[11px] tracking-[0.25em] uppercase mt-2 text-foreground">
              {artwork.year}
            </p>
          </div>

          {/* 3. MINIATURE */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8 -mx-4 px-4" role="group" aria-label="Immagini dell'opera">
              {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded overflow-hidden border transition-all duration-500 ${
                      selectedImage === idx
                        ? "border-accent"
                        : "border-border/20 hover:border-accent/40"
                    }`}
                    style={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.35)" }}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                )
              )}
            </div>
          )}

          {/* 4. DATI TECNICI E AZIONI */}
          <div className="space-y-4 mb-6">
            <div className="space-y-3">
              {!isTshirt && (
                <div className="border-t border-border/30 pt-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 mb-1">
                    {t("artwork.dimensions")}
                  </p>
                  <p className="text-xs text-foreground font-light">{displayDimensions}</p>
                </div>
              )}
              <div className="border-t border-border/30 pt-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 mb-1">
                  {t("artwork.technique")}
                </p>
                <p className="text-xs text-foreground font-light">{displayTechnique}</p>
              </div>
              {isTshirt && artwork.shopPlatform && artwork.shopUrl ? (
                <div className="border-t border-border/30 pt-4">
                  <a
                    href={artwork.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-shop-pulse inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded border border-border/40 hover:border-foreground/40 bg-white/5 hover:bg-white/10 text-foreground text-[10px] tracking-[0.25em] uppercase transition-colors"
                  >
                    <span>{t("artwork.buyOn")} {artwork.shopPlatform}</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <div className="border-t border-border/30 pt-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 mb-1">
                    {t("artwork.price")}
                  </p>
                  {isArchived ? (
                    <button
                      type="button"
                      onClick={() => setCertificateOpen(true)}
                      className="w-full text-left text-xs font-light flex items-center justify-between cursor-pointer transition-colors text-[#d4af7a] hover:text-[#e6c592]"
                    >
                      <span>{displayPrice}</span>
                      {sealIcon(20)}
                    </button>
                  ) : (
                    <p className="text-xs text-foreground font-light">
                      <span>{displayPrice || "€ —"}</span>
                    </p>
                  )}
                </div>
              )}
              {hasMeaning && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setMeaningOpen(true)}
                    className="text-[10px] tracking-[0.2em] uppercase text-white cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ filter: "brightness(1.25)" }}
                  >
                    {t("artwork.meaning")}
                  </button>
                </div>
              )}
              {hasPurchase && !isSold && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setPurchaseOpen(true)}
                    className="text-[10px] tracking-[0.2em] uppercase text-white brightness-125 cursor-pointer hover:opacity-70 transition-opacity animate-pulse"
                  >
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: [-2, 2, -2, 0] }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      {purchaseLabel}
                    </motion.span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleLike}
                className={`h-9 px-3 rounded-full border flex items-center gap-1.5 transition-all duration-300 ${
                  liked
                    ? "text-red-500 border-red-500/40"
                    : "text-muted-foreground/80 border-border/40 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                <Heart size={16} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
                <span className="text-xs tabular-nums">{likeCount}</span>
              </button>
              <button
                onClick={() => {
                  if (inWishlist(artwork.id)) removeWishlist(artwork.id);
                  else addWishlist({ id: artwork.id, title: artwork.title, thumbnailUrl: artwork.preview, discipline: discipline || "" });
                }}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  inWishlist(artwork.id)
                    ? "text-amber-500 border-amber-500/40"
                    : "text-muted-foreground/80 border-border/40 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                <Bookmark size={16} fill={inWishlist(artwork.id) ? "currentColor" : "none"} aria-hidden="true" />
              </button>
              <button
                onClick={() => setInfoOpen(true)}
                className="w-9 h-9 rounded-full border border-border/40 text-white brightness-125 hover:border-foreground/30 transition-all duration-300 flex items-center justify-center animate-pulse"
              >
                <Info size={16} aria-hidden="true" />
              </button>
              <button
                onClick={async () => {
                  try {
                    await generateArtworkPdf({
                      title: artwork.title,
                      year: artwork.year,
                      dimensions: displayDimensions,
                      technique: displayTechnique,
                      price: displayPrice,
                      discipline: discLabel,
                      imageUrl: currentImageUrl || undefined,
                    });
                  } catch { /* ignore */ }
                }}
                className="w-9 h-9 rounded-full border border-border/40 text-muted-foreground/80 hover:border-foreground/30 hover:text-foreground transition-all duration-300 flex items-center justify-center"
              >
                <Download size={16} aria-hidden="true" />
              </button>
              <button
                onClick={() => setZenOpen(true)}
                aria-label={t("artwork.tt.zen")}
                className="w-9 h-9 rounded-full border border-[#d4af7a]/40 text-[#d4af7a] hover:border-[#d4af7a]/70 transition-all duration-300 flex items-center justify-center animate-archive-pulse"
              >
                <EnsoIcon />
              </button>
              <ShareMenu url={`/${discipline}/${artworkId}`} title={artwork.title} />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ArtworkDetail;
