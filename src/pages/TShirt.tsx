import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const designs: ArtworkItem[] = [
  { id: "1", title: "Nebula Wear", thumbnailUrl: "" },
  { id: "2", title: "Cosmic Print", thumbnailUrl: "" },
  { id: "3", title: "Urban Galaxy", thumbnailUrl: "" },
  { id: "4", title: "Abstract Flow", thumbnailUrl: "" },
  { id: "5", title: "Stellar Edition", thumbnailUrl: "" },
  { id: "6", title: "Dark Matter", thumbnailUrl: "" },
];

const TShirt = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            onClick={() => {
              const element = document.getElementById("t-shirt");
              if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span>Torna alle discipline</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">T-Shirt</h1>
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Le magliette di Massimo Di Stefano trasformano l'arte in forma indossabile.
              </p>
            </div>

            <GalleryGrid
              items={designs}
              discipline="t-shirt"
              gradientFrom="rgba(249,115,22,0.3)"
              gradientTo="rgba(239,68,68,0.3)"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TShirt;
