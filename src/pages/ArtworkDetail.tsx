import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Lightbox from "@/components/Lightbox";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import { getArtwork } from "@/lib/artworkData";

const ArtworkDetail = () => {
  const { discipline, artworkId } = useParams<{ discipline: string; artworkId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [liked, setLiked] = useState(false);

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

  // Build all displayable images: main first, then additional
  const allImages = [
    { url: artwork.main, label: "Opera" },
    ...artwork.images,
  ].filter((img) => img.url); // only show images that have URLs

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

      <div className="flex-1 flex items-center pt-16 px-4 md:px-8 min-h-0">
        <Link
          to={`/${discipline}`}
          className="absolute top-20 left-6 z-10 inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors text-xs"
        >
          <ArrowLeft size={14} />
          <span>Galleria</span>
        </Link>

        <motion.div
          className="flex w-full h-full items-center gap-4 min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* LEFT — Main artwork */}
          <div className="flex-1 flex items-center justify-center min-w-0 h-full py-4 pr-8">
            <button
              onClick={() => setLightboxOpen(true)}
              className="block cursor-zoom-in"
              style={{ maxWidth: "1200px", maxHeight: "85vh" }}
            >
              {currentImageUrl ? (
                <img
                  src={currentImageUrl}
                  alt={artwork.title}
                  className="max-w-full max-h-[85vh] object-contain rounded"
                />
              ) : (
                <div
                  className="w-[60vw] max-w-[1200px] aspect-[4/5] max-h-[85vh] rounded flex items-center justify-center text-muted-foreground/50 text-xs"
                  style={{
                    background: `linear-gradient(135deg, ${gFrom}, ${gTo})`,
                  }}
                >
                  Clicca per full-view
                </div>
              )}
            </button>
          </div>

          {/* RIGHT — Narrow info column */}
          <div
            className="flex-shrink-0 flex flex-col justify-center gap-6 py-4 pr-2"
            style={{ width: "clamp(140px, 18vw, 220px)" }}
          >
            <div>
              <h1 className="text-xl font-light tracking-wide text-foreground leading-tight">
                {artwork.title}
              </h1>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "#D1D1D1" }}>
                {artwork.year}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs" style={{ color: "#D1D1D1" }}>
                <span className="uppercase tracking-wider">Misure</span>
                <span className="font-light">{artwork.dimensions}</span>
              </div>
              <div className="flex justify-between text-xs" style={{ color: "#D1D1D1" }}>
                <span className="uppercase tracking-wider">Tecnica</span>
                <span className="font-light">{artwork.technique}</span>
              </div>
            </div>

            {/* Thumbnails — vertical stack (only if there are additional images) */}
            {allImages.length > 1 && (
              <div className="flex flex-col gap-1.5">
                {allImages.map((img, idx) => (
                  idx === 0 ? null : (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-full aspect-video rounded overflow-hidden border transition-all ${
                        selectedImage === idx
                          ? "border-accent"
                          : "border-border/30 hover:border-accent/40"
                      }`}
                    >
                      {img.url ? (
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-[8px] text-muted-foreground/60"
                          style={{
                            background: `linear-gradient(135deg, ${gFrom}, ${gTo})`,
                          }}
                        >
                          {img.label}
                        </div>
                      )}
                    </button>
                  )
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-1.5 rounded border transition-colors ${
                  liked
                    ? "text-red-500 border-red-500/40"
                    : "text-muted-foreground border-border/30 hover:border-accent/40"
                }`}
              >
                <Heart size={14} fill={liked ? "currentColor" : "none"} />
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider py-1.5 rounded border border-border/30 text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors">
                <ShoppingBag size={12} />
                Shop
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
