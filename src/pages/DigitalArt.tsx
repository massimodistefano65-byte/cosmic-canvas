import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const digitalWorks: ArtworkItem[] = [
  { id: "1", title: "Pixel Cosmico", thumbnailUrl: "" },
  { id: "2", title: "Glitch Armonico", thumbnailUrl: "" },
  { id: "3", title: "Dimensione Parallela", thumbnailUrl: "" },
  { id: "4", title: "Codice Visivo", thumbnailUrl: "" },
  { id: "5", title: "Sintesi Digitale", thumbnailUrl: "" },
  { id: "6", title: "Realtà Aumentata", thumbnailUrl: "" },
];

const DigitalArt = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Digital Art</h1>
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                L'arte digitale di Massimo Di Stefano rappresenta la convergenza tra la visione creativa e le tecnologie contemporanee.
              </p>
            </div>

            <GalleryGrid
              items={digitalWorks}
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
