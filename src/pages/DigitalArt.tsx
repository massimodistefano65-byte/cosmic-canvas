import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getArtworksByDiscipline } from "@/lib/artworkData";

const DigitalArt = () => {
  const artworks = getArtworksByDiscipline("digital-art");
  const items: ArtworkItem[] = artworks.map((a) => ({
    id: a.id, title: a.title, thumbnailUrl: a.preview,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link
            to="/"
            onClick={() => {
              const element = document.getElementById("digital-art");
              if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span>Torna alle discipline</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1
              className="mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "4rem", color: "white" }}
            >
              Digital Art
            </h1>
            <div style={{ width: 80, height: 1, backgroundColor: "#d4af7a" }} className="mb-6" />
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                L'arte digitale di Massimo Di Stefano rappresenta la convergenza tra la visione creativa e le tecnologie contemporanee.
              </p>
            </div>

            <GalleryGrid
              items={items}
              discipline="digital-art"
              gradientFrom="rgba(236,72,153,0.3)"
              gradientTo="rgba(168,85,247,0.3)"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DigitalArt;
