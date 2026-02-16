import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Lightbox from "@/components/Lightbox";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder data structure — replace with real data later
const getArtworkData = (discipline: string, artworkId: string) => ({
  id: artworkId,
  title: `Opera ${artworkId}`,
  year: "2024",
  dimensions: "100 × 80 cm",
  technique: "Tecnica mista su tela",
  images: [
    "", // Main image placeholder
    "", // Mockup
    "", // Detail 1
    "", // Detail 2
    "", // Detail 3
  ],
  discipline,
});

const ArtworkDetail = () => {
  const { discipline, artworkId } = useParams<{ discipline: string; artworkId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const artwork = getArtworkData(discipline || "", artworkId || "");

  const gradientMap: Record<string, [string, string]> = {
    painting: ["rgba(168,85,247,0.3)", "rgba(59,130,246,0.3)"],
    photography: ["rgba(59,130,246,0.3)", "rgba(20,184,166,0.3)"],
    "digital-art": ["rgba(236,72,153,0.3)", "rgba(168,85,247,0.3)"],
    "t-shirt": ["rgba(249,115,22,0.3)", "rgba(239,68,68,0.3)"],
  };

  const [gFrom, gTo] = gradientMap[discipline || "painting"] || gradientMap.painting;

  const labels = ["Opera", "Mockup", "Dettaglio 1", "Dettaglio 2", "Dettaglio 3"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={artwork.images[selectedImage] || ""}
        alt={`${artwork.title} - ${labels[selectedImage]}`}
      />

      <div className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Back */}
          <Link
            to={`/${discipline}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Torna alla galleria</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Thumbnails row */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {artwork.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(idx);
                    setLightboxOpen(true);
                  }}
                  className={`flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-accent"
                      : "border-border/50 hover:border-accent/50"
                  }`}
                >
                  {img ? (
                    <img src={img} alt={labels[idx]} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-xs text-muted-foreground"
                      style={{
                        background: `linear-gradient(135deg, ${gFrom}, ${gTo})`,
                      }}
                    >
                      {labels[idx]}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Info section */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left - Main preview */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="aspect-[4/5] w-full rounded-lg overflow-hidden border border-border/50 cursor-zoom-in"
              >
                {artwork.images[selectedImage] ? (
                  <img
                    src={artwork.images[selectedImage]}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-muted-foreground"
                    style={{
                      background: `linear-gradient(135deg, ${gFrom}, ${gTo})`,
                    }}
                  >
                    <span className="text-sm">Clicca per full-view</span>
                  </div>
                )}
              </button>

              {/* Right - Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {artwork.title}
                  </h1>
                  <p className="text-accent text-lg">{artwork.year}</p>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-sm uppercase tracking-wider">Misure</span>
                    <span>{artwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-sm uppercase tracking-wider">Tecnica</span>
                    <span>{artwork.technique}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-sm uppercase tracking-wider">Anno</span>
                    <span>{artwork.year}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setLiked(!liked)}
                    className={`gap-2 ${liked ? "text-red-500 border-red-500/50" : ""}`}
                  >
                    <Heart size={20} fill={liked ? "currentColor" : "none"} />
                    {liked ? "Liked" : "Like"}
                  </Button>

                  <Button size="lg" className="gap-2 flex-1">
                    <ShoppingBag size={20} />
                    Shop
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
