import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const paintings: ArtworkItem[] = [
  { id: "1", title: "Cosmo Interiore", thumbnailUrl: "" },
  { id: "2", title: "Nebulosa Urbana", thumbnailUrl: "" },
  { id: "3", title: "Frammenti di Luce", thumbnailUrl: "" },
  { id: "4", title: "Orizzonte Liquido", thumbnailUrl: "" },
  { id: "5", title: "Materia Oscura", thumbnailUrl: "" },
  { id: "6", title: "Risonanza Cromatica", thumbnailUrl: "" },
];

const Painting = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            onClick={() => {
              const element = document.getElementById("painting");
              if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span>Torna alle discipline</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Painting</h1>
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Le opere pittoriche di Massimo Di Stefano esplorano il confine tra il cosmo interno e l'universo esterno.
              </p>
            </div>

            <GalleryGrid
              items={paintings}
              discipline="painting"
              gradientFrom="rgba(168,85,247,0.3)"
              gradientTo="rgba(59,130,246,0.3)"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Painting;
