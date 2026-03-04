import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Lightbox from "@/components/Lightbox";
import EnquiryModal from "@/components/EnquiryModal";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Plus } from "lucide-react";
import { getArtwork } from "@/lib/artworkData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ArtworkDetail = () => {
  const { discipline, artworkId } = useParams<{ discipline: string; artworkId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const artwork = getArtwork(discipline || "", artworkId || "");

  if (!artwork) {
    return (
      <div className="h-screen bg-background text-foreground flex items-center justify-center">
        <p>Opera non trovata.</p>
      </div>
    );
  }

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

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground flex flex-col">
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

      <div className="flex-1 flex pt-16 min-h-0 relative">
        {/* Back link */}
        <Link
          to={`/${discipline}`}
          className="absolute top-20 left-6 z-10 inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors text-xs"
        >
          <ArrowLeft size={14} />
          <span>Galleria</span>
        </Link>

        <motion.div
          className="flex w-full h-full items-center min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* LEFT — Action buttons aligned with top of artwork */}
          <div className="flex-shrink-0 flex flex-col gap-3 items-center pl-8 pr-4 pt-[10vh]">
            <button
              onClick={() => setLiked(!liked)}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-colors ${
                liked
                  ? "text-red-500 border-red-500/40"
                  : "text-muted-foreground border-border/50 hover:border-accent/60 hover:text-accent"
              }`}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
            </button>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="w-11 h-11 rounded-full border-2 border-border/50 text-muted-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  Richiedi info / Enquire
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* CENTER — Main artwork */}
          <div className="flex-1 flex items-center justify-center min-w-0 h-full py-4 px-8">
            <button
              onClick={() => setLightboxOpen(true)}
              className="block cursor-zoom-in"
              style={{ maxWidth: "1200px", maxHeight: "80vh" }}
            >
              {currentImageUrl ? (
                <img
                  src={currentImageUrl}
                  alt={artwork.title}
                  className="max-w-full max-h-[80vh] object-contain rounded"
                />
              ) : (
                <div
                  className="w-[60vw] max-w-[1200px] aspect-[4/5] max-h-[80vh] rounded flex items-center justify-center text-muted-foreground/50 text-xs"
                  style={{
                    background: `linear-gradient(135deg, ${gFrom}, ${gTo})`,
                  }}
                >
                  Clicca per full-view
                </div>
              )}
            </button>
          </div>

          {/* RIGHT — Info column with more right padding */}
          <div
            className="flex-shrink-0 flex flex-col gap-4 py-4 pr-10 max-h-[calc(100vh-5rem)] overflow-y-auto"
            style={{ width: "clamp(140px, 18vw, 220px)" }}
          >
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-light tracking-wide text-foreground leading-tight">
                  {artwork.title}
                </h1>
                <p className="text-xs tracking-widest uppercase mt-1 text-muted-foreground">
                  {artwork.year}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="uppercase tracking-wider">Misure</span>
                  <span className="font-light">{artwork.dimensions}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="uppercase tracking-wider">Tecnica</span>
                  <span className="font-light">{artwork.technique}</span>
                </div>
              </div>

              {/* Square thumbnails — smaller, with spacing */}
              {allImages.length > 1 && (
                <div className="flex flex-col gap-2">
                  {allImages.map((img, idx) =>
                    idx === 0 ? null : (
                       <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-24 h-24 rounded overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? "border-accent"
                            : "border-border/30 hover:border-accent/40"
                        }`}
                      >
                        {img.url ? (
                          <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-[7px] text-muted-foreground/60"
                            style={{
                              background: `linear-gradient(135deg, ${gFrom}, ${gTo})`,
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
