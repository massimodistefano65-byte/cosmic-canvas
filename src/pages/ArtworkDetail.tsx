import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Lightbox from "@/components/Lightbox";
import EnquiryModal from "@/components/EnquiryModal";
import MeaningDialog from "@/components/MeaningDialog";
import CertificateDialog from "@/components/CertificateDialog";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Plus, Stamp } from "lucide-react";
import { getArtwork } from "@/lib/artworkData";
import { getSlugGradient } from "@/lib/slugGradient";
import { useI18n } from "@/lib/i18n";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { useArtworkLike } from "@/hooks/useArtworkLike";
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

const ArtworkDetail = () => {
  const { discipline, artworkId } = useParams<{ discipline: string; artworkId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { liked, count: likeCount, toggle: toggleLike } = useArtworkLike(discipline, artworkId);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [meaningOpen, setMeaningOpen] = useState(false);
  const [hasMeaning, setHasMeaning] = useState(false);
  const [meaningContent, setMeaningContent] = useState<string>("");
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [hasPurchase, setHasPurchase] = useState(false);
  const [purchaseContent, setPurchaseContent] = useState<string>("");
  const [certificateOpen, setCertificateOpen] = useState(false);
  const { t } = useI18n();

  const purchaseLabel = discipline === "painting" ? "Opzioni d'acquisto" : "Opzioni d'acquisto e supporti";

  useSectionAudio(discipline || "home");

  const artwork = getArtwork(discipline || "", artworkId || "");

  // HEAD-check meaning.md to decide whether to show the label
  const meaningUrl = artwork
    ? `/artworks/${discipline}/${artwork.id}/meaning.md`
    : "";
  // Use GET (not HEAD) and validate the content is real markdown — many SPA hosts
  // (Aruba) fall back to index.html for missing files, which would falsely succeed.
  useEffect(() => {
    if (!meaningUrl) {
      setHasMeaning(false);
      setMeaningContent("");
      return;
    }
    let cancelled = false;
    fetch(meaningUrl, { cache: "no-cache" })
      .then(async (r) => {
        if (!r.ok) return null;
        const ctype = (r.headers.get("content-type") || "").toLowerCase();
        if (ctype.includes("text/html")) return null;
        const text = await r.text();
        const head = text.trimStart().slice(0, 200).toLowerCase();
        if (
          head.startsWith("<!doctype") ||
          head.startsWith("<html") ||
          head.includes("<head") ||
          head.includes("<script")
        ) {
          return null;
        }
        if (!text.trim()) return null;
        return text;
      })
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

  // HEAD-check purchase.md (per discipline, not per artwork)
  const purchaseUrl = discipline ? `/artworks/${discipline}/purchase.md` : "";
  useEffect(() => {
    if (!purchaseUrl) {
      setHasPurchase(false);
      setPurchaseContent("");
      return;
    }
    let cancelled = false;
    fetch(purchaseUrl, { cache: "no-cache" })
      .then(async (r) => {
        if (!r.ok) return null;
        const ctype = (r.headers.get("content-type") || "").toLowerCase();
        if (ctype.includes("text/html")) return null;
        const text = await r.text();
        const head = text.trimStart().slice(0, 200).toLowerCase();
        if (
          head.startsWith("<!doctype") ||
          head.startsWith("<html") ||
          head.includes("<head") ||
          head.includes("<script")
        ) {
          return null;
        }
        if (!text.trim()) return null;
        return text;
      })
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
        <p>Opera non trovata.</p>
      </div>
    );
  }

  const discLabel = disciplineLabels[discipline || ""] || discipline;

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
      url: "https://massimodistefano.com",
      sameAs: "https://massimodistefano.com/bio",
    },
    dateCreated: artwork.year,
    artMedium: artwork.technique,
    artform: discLabel,
    width: artwork.dimensions,
    image: artwork.main
      ? `https://massimodistefano.com${artwork.main}`
      : undefined,
    url: `https://massimodistefano.com/${discipline}/${artworkId}`,
    description: `${artwork.title} (${artwork.year}) — ${artwork.technique}, ${artwork.dimensions}. Opera di Massimo Di Stefano.`,
  };

  return (
    <main className="min-h-screen md:h-screen md:overflow-hidden bg-background text-foreground flex flex-col">
      <SEOHead
        title={`${artwork.title} — ${discLabel}`}
        description={`${artwork.title} (${artwork.year}) di Massimo Di Stefano. ${artwork.technique}, ${artwork.dimensions}. ${discLabel}.`}
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
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
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

      {/* ===== DESKTOP LAYOUT (md+) ===== */}
      <div className="hidden md:flex flex-1 pt-16 min-h-0 relative">
        {/* Back link — vertically centered on left */}
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
        {/* LEFT — spacer for symmetry */}
          <div className="flex-shrink-0 w-16" />

          {/* CENTER — Main artwork (maximized) */}
          <div className="flex-1 flex items-center justify-center min-w-0 h-full py-6 px-10">
            <div className="relative inline-block group">
              {/* LED glow behind artwork */}
              <div className="absolute -inset-[3px] rounded opacity-50 group-hover:opacity-80 transition-opacity duration-700 blur-[6px] pointer-events-none bg-white/50" />
            <button
              onClick={() => setLightboxOpen(true)}
              className="relative block cursor-zoom-in"
              style={{ maxWidth: "1200px", maxHeight: "82vh" }}
              aria-label={`Apri ${artwork.title} in lightbox`}
            >
              {currentImageUrl ? (
                <>
                  <img
                    src={currentImageUrl}
                    alt={`${artwork.title} di Massimo Di Stefano — ${allImages[selectedImage]?.label || "opera"}`}
                    className="max-w-full max-h-[82vh] object-contain rounded"
                    loading={selectedImage === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={selectedImage === 0 ? "high" : "auto"}
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const fb = t.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-[60vw] max-w-[1200px] aspect-[4/5] max-h-[82vh] rounded items-center justify-center text-muted-foreground/50 text-xs"
                    style={{
                      background: getSlugGradient(artwork.id),
                      display: "none",
                    }}
                  >
                    {artwork.title}
                  </div>
                </>
              ) : (
                <div
                  className="w-[60vw] max-w-[1200px] aspect-[4/5] max-h-[82vh] rounded flex items-center justify-center text-muted-foreground/50 text-xs"
                  style={{
                    background: getSlugGradient(artwork.id),
                  }}
                >
                  {artwork.title}
                </div>
              )}
            </button>
            </div>
          </div>

          {/* RIGHT — Info column (refined) */}
          <div
            className="flex-shrink-0 flex flex-col gap-8 pt-[12vh] pb-6 pl-4 pr-10 max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-visible"
            style={{ width: "clamp(220px, 24vw, 310px)" }}
          >
            {/* Title + year */}
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

            {/* Metadata */}
            <div className="space-y-4">
              <div className="border-t border-border/30 pt-3">
                <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/70 mb-1.5"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {t("artwork.dimensions")}
                </p>
                <p className="text-[13px] text-foreground font-light"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >{artwork.dimensions}</p>
              </div>
              <div className="border-t border-border/30 pt-3">
                <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/70 mb-1.5"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {t("artwork.technique")}
                </p>
                <p className="text-[13px] text-foreground font-light"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >{artwork.technique}</p>
              </div>
              <div className="border-t border-border/30 pt-3">
                <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/70 mb-1.5"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {t("artwork.price")}
                </p>
                <p className="text-[13px] text-foreground font-light"
                   style={{ fontFamily: "'Raleway', sans-serif" }}
                >{artwork.price || "€ —"}</p>
              </div>
              {hasMeaning && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setMeaningOpen(true)}
                    className="text-[9px] tracking-[0.25em] uppercase text-white cursor-pointer hover:opacity-70 transition-opacity animate-pulse"
                    style={{ fontFamily: "'Raleway', sans-serif", filter: "brightness(1.25)" }}
                  >
                    Significato dell'opera
                  </button>
                </div>
              )}
              {hasPurchase && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setPurchaseOpen(true)}
                    className="text-[9px] tracking-[0.25em] uppercase text-foreground/70 cursor-pointer hover:opacity-70 transition-opacity"
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

            {/* Action buttons — below metadata */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleLike}
                aria-label={liked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                className={`h-9 px-3 rounded-full border flex items-center gap-1.5 transition-all duration-300 ${
                  liked
                    ? "text-red-500 border-red-500/40"
                    : "text-muted-foreground/80 border-border/40 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                <Heart size={16} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
                <span className="text-xs tabular-nums">{likeCount}</span>
              </button>

              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      aria-label="Richiedi informazioni sull'opera"
                      className="w-9 h-9 rounded-full border border-border/40 text-muted-foreground/80 hover:border-foreground/30 hover:text-foreground transition-all duration-300 flex items-center justify-center"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-xs">
                    Richiedi info / Enquire
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Thumbnails — larger */}
            {allImages.length > 1 && (
              <div className="flex flex-col gap-5 pt-2" role="group" aria-label="Immagini dell'opera">
                {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      aria-label={`Visualizza ${img.label}`}
                      className={`w-36 h-36 rounded overflow-hidden border transition-all duration-500 ${
                        selectedImage === idx
                          ? "border-accent"
                          : "border-border/20 hover:border-accent/40"
                      }`}
                      style={{
                        boxShadow: "0 0 8px 2px rgba(255,255,255,0.35)",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 12px 3px rgba(255,255,255,0.55)"}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 8px 2px rgba(255,255,255,0.35)"}
                    >
                      {img.url ? (
                        <>
                          <img
                            src={img.url}
                            alt={img.label}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const t = e.currentTarget;
                              t.style.display = "none";
                              const fb = t.nextElementSibling as HTMLElement | null;
                              if (fb) fb.style.display = "flex";
                            }}
                          />
                          <div
                            className="w-full h-full items-center justify-center text-[7px] text-muted-foreground/60"
                            style={{
                              background: getSlugGradient(artwork.id),
                              display: "none",
                            }}
                          >
                            {img.label}
                          </div>
                        </>
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-[7px] text-muted-foreground/60"
                          style={{
                            background: getSlugGradient(artwork.id),
                          }}
                        >
                          {img.label}
                        </div>
                      )}
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
        {/* Back link */}
        <div className="flex items-center px-4 py-3">
          <Link
            to={`/${discipline}`}
            className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/80 hover:text-foreground hover:border-foreground/30 transition-all duration-300"
            aria-label={`Back to ${discLabel}`}
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
          {/* Main image */}
          <div className="relative w-full mb-6 group">
            <div className="absolute -inset-[3px] rounded opacity-50 group-hover:opacity-80 transition-opacity duration-700 blur-[6px] pointer-events-none bg-white/50" />
            <button
              onClick={() => setLightboxOpen(true)}
              className="relative w-full cursor-zoom-in"
              aria-label={`Apri ${artwork.title} in lightbox`}
            >
            {currentImageUrl ? (
              <>
                <img
                  src={currentImageUrl}
                  alt={`${artwork.title} di Massimo Di Stefano — ${allImages[selectedImage]?.label || "opera"}`}
                  className="w-full h-auto object-contain rounded"
                  loading={selectedImage === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={selectedImage === 0 ? "high" : "auto"}
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const fb = t.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = "flex";
                  }}
                />
                <div
                  className="w-full aspect-[4/5] rounded items-center justify-center text-muted-foreground/50 text-xs"
                  style={{
                    background: getSlugGradient(artwork.id),
                    display: "none",
                  }}
                >
                  {artwork.title}
                </div>
              </>
            ) : (
              <div
                className="w-full aspect-[4/5] rounded flex items-center justify-center text-muted-foreground/50 text-xs"
                style={{
                  background: getSlugGradient(artwork.id),
                }}
              >
                {artwork.title}
              </div>
            )}
            </button>
          </div>

          {/* Info */}
          <div className="space-y-4 mb-6">
            <div>
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

            <div className="space-y-3">
              <div className="border-t border-border/30 pt-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 mb-1">
                  {t("artwork.dimensions")}
                </p>
                <p className="text-xs text-foreground font-light">{artwork.dimensions}</p>
              </div>
              <div className="border-t border-border/30 pt-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 mb-1">
                  {t("artwork.technique")}
                </p>
                <p className="text-xs text-foreground font-light">{artwork.technique}</p>
              </div>
              <div className="border-t border-border/30 pt-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 mb-1">
                  {t("artwork.price")}
                </p>
                <p className="text-xs text-foreground font-light">{artwork.price || "€ —"}</p>
              </div>
              {hasMeaning && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setMeaningOpen(true)}
                    className="text-[10px] tracking-[0.2em] uppercase text-white cursor-pointer hover:opacity-70 transition-opacity animate-pulse"
                    style={{ filter: "brightness(1.25)" }}
                  >
                    Significato dell'opera
                  </button>
                </div>
              )}
              {hasPurchase && (
                <div className="border-t border-border/30 pt-3">
                  <button
                    type="button"
                    onClick={() => setPurchaseOpen(true)}
                    className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 cursor-pointer hover:opacity-70 transition-opacity"
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

            {/* Action buttons — below metadata */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleLike}
                aria-label={liked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
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
                onClick={() => setEnquiryOpen(true)}
                aria-label="Richiedi informazioni sull'opera"
                className="w-9 h-9 rounded-full border border-border/40 text-muted-foreground/80 hover:border-foreground/30 hover:text-foreground transition-all duration-300 flex items-center justify-center"
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4" role="group" aria-label="Immagini dell'opera">
              {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`Visualizza ${img.label}`}
                    className={`flex-shrink-0 w-28 h-28 rounded overflow-hidden border transition-all duration-500 ${
                      selectedImage === idx
                        ? "border-accent"
                        : "border-border/20 hover:border-accent/40"
                    }`}
                    style={{
                      boxShadow: "0 0 8px 2px rgba(255,255,255,0.35)",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 12px 3px rgba(255,255,255,0.55)"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 8px 2px rgba(255,255,255,0.35)"}
                  >
                    {img.url ? (
                      <>
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const t = e.currentTarget;
                            t.style.display = "none";
                            const fb = t.nextElementSibling as HTMLElement | null;
                            if (fb) fb.style.display = "flex";
                          }}
                        />
                        <div
                          className="w-full h-full items-center justify-center text-[7px] text-muted-foreground/60"
                          style={{
                            background: getSlugGradient(artwork.id),
                            display: "none",
                          }}
                        >
                          {img.label}
                        </div>
                      </>
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-[7px] text-muted-foreground/60"
                        style={{
                          background: getSlugGradient(artwork.id),
                        }}
                      >
                        {img.label}
                      </div>
                    )}
                  </button>
                )
              )}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default ArtworkDetail;
