import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getArtworksByDiscipline } from "@/lib/artworkData";

interface DisciplineConfig {
  key: string;
  title: string;
  seoDescription: string;
  introText: string;
  gradientFrom: string;
  gradientTo: string;
}

const disciplines: Record<string, DisciplineConfig> = {
  painting: {
    key: "painting",
    title: "Painting",
    seoDescription: "Opere pittoriche di Massimo Di Stefano: esplorazioni del cosmo interiore e dell'universo attraverso olio, acrilico e tecnica mista su tela.",
    introText: "Le opere pittoriche di Massimo Di Stefano esplorano il confine tra il cosmo interno e l'universo esterno.",
    gradientFrom: "rgba(168,85,247,0.3)",
    gradientTo: "rgba(59,130,246,0.3)",
  },
  photography: {
    key: "photography",
    title: "Photography",
    seoDescription: "Fotografia d'arte di Massimo Di Stefano: momenti di bellezza quotidiana e straordinarietà nascoste, stampe fine art.",
    introText: "La fotografia di Massimo Di Stefano cattura momenti di bellezza quotidiana e straordinarietà nascoste.",
    gradientFrom: "rgba(59,130,246,0.3)",
    gradientTo: "rgba(20,184,166,0.3)",
  },
  "digital-art": {
    key: "digital-art",
    title: "Digital Art",
    seoDescription: "Arte digitale di Massimo Di Stefano: composizioni visionarie che fondono creatività e tecnologia contemporanea.",
    introText: "L'arte digitale di Massimo Di Stefano rappresenta la convergenza tra la visione creativa e le tecnologie contemporanee.",
    gradientFrom: "rgba(236,72,153,0.3)",
    gradientTo: "rgba(168,85,247,0.3)",
  },
  "t-shirt": {
    key: "t-shirt",
    title: "T-Shirt",
    seoDescription: "T-Shirt d'artista di Massimo Di Stefano: arte indossabile, edizioni limitate in serigrafia e stampa digitale.",
    introText: "Le magliette di Massimo Di Stefano trasformano l'arte in forma indossabile.",
    gradientFrom: "rgba(249,115,22,0.3)",
    gradientTo: "rgba(239,68,68,0.3)",
  },
};

interface Props {
  disciplineKey: string;
}

const DisciplinePage = ({ disciplineKey }: Props) => {
  const config = disciplines[disciplineKey];
  if (!config) return null;

  const artworks = getArtworksByDiscipline(config.key);
  const items: ArtworkItem[] = artworks.map((a) => ({
    id: a.id,
    title: a.title,
    thumbnailUrl: a.preview,
  }));

  // Schema.org ItemList per la galleria
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${config.title} — Massimo Di Stefano`,
    description: config.seoDescription,
    url: `https://massimodistefano.com/${config.key}`,
    numberOfItems: artworks.length,
    itemListElement: artworks.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VisualArtwork",
        name: a.title,
        url: `https://massimodistefano.com/${config.key}/${a.id}`,
        image: a.preview ? `https://massimodistefano.com${a.preview}` : undefined,
        artist: { "@type": "Person", name: "Massimo Di Stefano" },
        dateCreated: a.year,
        artMedium: a.technique,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={config.title}
        description={config.seoDescription}
        canonicalPath={`/${config.key}`}
        jsonLd={jsonLd}
      />
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link
            to="/"
            onClick={() => {
              const element = document.getElementById(config.key);
              if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
            aria-label={`Torna alla homepage, sezione ${config.title}`}
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Torna alle discipline</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1
              className="mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "4rem", color: "white" }}
            >
              {config.title}
            </h1>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {config.introText}
              </p>
            </div>

            <GalleryGrid
              items={items}
              discipline={config.key}
              gradientFrom={config.gradientFrom}
              gradientTo={config.gradientTo}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default DisciplinePage;
