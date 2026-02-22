import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getArtworksByDiscipline } from "@/lib/artworkData";

const Photography = () => {
  const artworks = getArtworksByDiscipline("photography");
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
              const element = document.getElementById("photography");
              if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span>Torna alle discipline</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Photography</h1>
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                La fotografia di Massimo Di Stefano cattura momenti di bellezza quotidiana e straordinarietà nascoste.
              </p>
            </div>

            <GalleryGrid
              items={items}
              discipline="photography"
              gradientFrom="rgba(59,130,246,0.3)"
              gradientTo="rgba(20,184,166,0.3)"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Photography;
