import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getArtworksByDiscipline } from "@/lib/artworkData";
import { useI18n } from "@/lib/i18n";

interface DisciplineConfig {
  key: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  introKey: string;
  gradientFrom: string;
  gradientTo: string;
}

const disciplines: Record<string, DisciplineConfig> = {
  painting: {
    key: "painting",
    h1: "Painting",
    seoTitle: "Painting & Pittura | Massimo Di Stefano",
    seoDescription: "Galleria di opere originali. Explore my collection of original paintings and artworks.",
    introKey: "painting.intro",
    gradientFrom: "rgba(168,85,247,0.3)",
    gradientTo: "rgba(59,130,246,0.3)",
  },
  photography: {
    key: "photography",
    h1: "Photography",
    seoTitle: "Photography | Fotografia Artistica - Massimo Di Stefano",
    seoDescription: "Uno sguardo attraverso l'obiettivo. A collection of my photographic works and perspectives.",
    introKey: "photography.intro",
    gradientFrom: "rgba(59,130,246,0.3)",
    gradientTo: "rgba(20,184,166,0.3)",
  },
  "digital-art": {
    key: "digital-art",
    h1: "Digital Art",
    seoTitle: "Digital Art | Arte Digitale - Massimo Di Stefano",
    seoDescription: "Esplorazioni visive digitali. Discover my digital art creations and experimental designs.",
    introKey: "digital-art.intro",
    gradientFrom: "rgba(236,72,153,0.3)",
    gradientTo: "rgba(168,85,247,0.3)",
  },
  "t-shirt": {
    key: "t-shirt",
    h1: "T-Shirt",
    seoTitle: "T-shirt Art | Indossa l'Arte - Massimo Di Stefano",
    seoDescription: "La mia arte stampata su t-shirt. Wear my unique designs and artistic t-shirts.",
    introKey: "t-shirt.intro",
    gradientFrom: "rgba(249,115,22,0.3)",
    gradientTo: "rgba(239,68,68,0.3)",
  },
};

interface Props {
  disciplineKey: string;
}

const DisciplinePage = ({ disciplineKey }: Props) => {
  const { t } = useI18n();
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
    name: `${config.seoTitle}`,
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
        title={config.seoTitle}
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
            <span>{t("discipline.back")}</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1
              className="mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "4rem", color: "white" }}
            >
              {config.h1}
            </h1>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(config.introKey)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Gallery full-width con padding minimo */}
        <div className="px-3 md:px-6">
          <GalleryGrid
            items={items}
            discipline={config.key}
            gradientFrom={config.gradientFrom}
            gradientTo={config.gradientTo}
          />
        </div>
      </div>
    </main>
  );
};

export default DisciplinePage;
