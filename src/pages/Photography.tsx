import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const photos: ArtworkItem[] = [
  { id: "1", title: "Silenzio Metropolitano", thumbnailUrl: "" },
  { id: "2", title: "Riflessi d'Acqua", thumbnailUrl: "" },
  { id: "3", title: "Geometrie Naturali", thumbnailUrl: "" },
  { id: "4", title: "Luce Radente", thumbnailUrl: "" },
  { id: "5", title: "Ombre Lunghe", thumbnailUrl: "" },
  { id: "6", title: "Istante Sospeso", thumbnailUrl: "" },
];

const Photography = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
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
              items={photos}
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
