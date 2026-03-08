import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getArtworksByDiscipline } from "@/lib/artworkData";

const TShirt = () => {
  const artworks = getArtworksByDiscipline("t-shirt");
  const items: ArtworkItem[] = artworks.map((a) => ({
    id: a.id, title: a.title, thumbnailUrl: a.preview,
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="T-Shirt"
        description="T-Shirt d'artista di Massimo Di Stefano: arte indossabile, edizioni limitate in serigrafia e stampa digitale."
        canonicalPath="/t-shirt"
      />
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link
            to="/"
            onClick={() => {
              const element = document.getElementById("t-shirt");
              if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
            aria-label="Torna alla homepage, sezione T-Shirt"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Torna alle discipline</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1
              className="mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "4rem", color: "white" }}
            >
              T-Shirt
            </h1>
            
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Le magliette di Massimo Di Stefano trasformano l'arte in forma indossabile.
              </p>
            </div>

            <GalleryGrid
              items={items}
              discipline="t-shirt"
              gradientFrom="rgba(249,115,22,0.3)"
              gradientTo="rgba(239,68,68,0.3)"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default TShirt;
