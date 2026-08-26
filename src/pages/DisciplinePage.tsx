import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import GalleryGrid, { ArtworkItem } from "@/components/GalleryGrid";
import FilterPanel, { FiltersState, emptyFilters, countActive, priceInRange } from "@/components/FilterPanel";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { getArtworksByDiscipline } from "@/lib/artworkData";
import { useI18n } from "@/lib/i18n";
import { useSectionAudio } from "@/hooks/useSectionAudio";

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
    seoTitle: "Pittura contemporanea — Massimo Di Stefano artista visivo",
    seoDescription: "Opere di pittura contemporanea di Massimo Di Stefano, artista visivo italiano. Galleria di dipinti originali, tecniche miste e ricerca pittorica.",
    introKey: "painting.intro",
    gradientFrom: "rgba(168,85,247,0.3)",
    gradientTo: "rgba(59,130,246,0.3)",
  },
  photography: {
    key: "photography",
    h1: "Photography",
    seoTitle: "Fotografia artistica — Massimo Di Stefano",
    seoDescription: "Fotografia artistica di Massimo Di Stefano: sguardi, paesaggi e ritratti d'autore dell'artista visivo italiano.",
    introKey: "photography.intro",
    gradientFrom: "rgba(59,130,246,0.3)",
    gradientTo: "rgba(20,184,166,0.3)",
  },
  "digital-art": {
    key: "digital-art",
    h1: "Digital Art",
    seoTitle: "Arte digitale — Massimo Di Stefano artista contemporaneo",
    seoDescription: "Opere di arte digitale di Massimo Di Stefano, artista contemporaneo italiano. Composizioni, elaborazioni e sperimentazioni visive.",
    introKey: "digital-art.intro",
    gradientFrom: "rgba(236,72,153,0.3)",
    gradientTo: "rgba(168,85,247,0.3)",
  },
  "t-shirt": {
    key: "t-shirt",
    h1: "T-Shirt",
    seoTitle: "T-shirt d'artista — Wearable Art | Massimo Di Stefano",
    seoDescription: "T-shirt d'artista di Massimo Di Stefano: wearable art con opere originali stampate in edizione.",
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
  useSectionAudio(disciplineKey);

  // Blocca il salvataggio durante il ripristino (FIX scroll restoration)
  const isRestoring = useRef(true);

  useEffect(() => {
    if (!config) return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const key = `scroll:${config.key}`;
    const saved = sessionStorage.getItem(key);
    let cancelled = false;

    if (saved) {
      const y = parseInt(saved, 10);
      const start = Date.now();
      const tryScroll = () => {
        if (cancelled) return;
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        // Aspetta che la pagina sia abbastanza alta (immagini caricate) o timeout 2s
        if (maxY >= y || Date.now() - start > 2000) {
          window.scrollTo(0, y);
          setTimeout(() => {
            isRestoring.current = false;
          }, 100);
        } else {
          requestAnimationFrame(tryScroll);
        }
      };
      requestAnimationFrame(tryScroll);
    } else {
      isRestoring.current = false;
    }

    const onScroll = () => {
      // Salva solo se NON siamo in fase di ripristino
      if (!isRestoring.current) {
        sessionStorage.setItem(key, String(window.scrollY));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
    };
  }, [config, disciplineKey]);

  if (!config) return null;

  const artworks = getArtworksByDiscipline(config.key);

  const [filters, setFilters] = useState<FiltersState>(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);

  const isTshirt = config.key === "t-shirt";

  const filteredArtworks = artworks.filter((a) => {
    if (!matchesQuery(a.title, filters.query)) return false;
    if (filters.year && a.year !== filters.year) return false;
    if (filters.shape) {
      if (filters.shape === "Altro") {
        if (a.shape === "Quadrato" || a.shape === "Rettangolare") return false;
        if (!a.shape) return false;
      } else if (a.shape !== filters.shape) return false;
    }
    if (filters.support && a.support !== filters.support) return false;
    if (filters.genre && a.genre !== filters.genre) return false;
    if (filters.price && !priceInRange(a.price, filters.price)) return false;
    if (filters.colors.length > 0) {
      if (!a.colors || !filters.colors.every((c) => a.colors!.includes(c))) return false;
    }
    return true;
  });

  const supportOptions = Array.from(new Set(artworks.map((a) => a.support).filter(Boolean) as string[])).sort();
  const genreOptions = Array.from(new Set(artworks.map((a) => a.genre).filter(Boolean) as string[])).sort();

  const items: ArtworkItem[] = filteredArtworks.map((a) => ({
    id: a.id,
    title: a.title,
    thumbnailUrl: a.preview,
  }));

  const activeCount = countActive(filters);

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
      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(emptyFilters)}
        supportOptions={supportOptions}
        genreOptions={genreOptions}
      />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link
            to="/"
            onClick={() => {
              const element = document.getElementById(config.key);
              if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
            aria-label={`Torna alla homepage, sezione ${config.h1}`}
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>{t("discipline.back")}</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "4rem", color: "white", lineHeight: 1 }}
              >
                {config.h1}
              </h1>
              <button
                onClick={() => !isTshirt && setFilterOpen(true)}
                disabled={isTshirt}
                aria-label={isTshirt ? t("filter.soon") : t("filter.open")}
                title={isTshirt ? t("filter.soon") : undefined}
                className={`shrink-0 mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md border transition-colors text-[11px] tracking-[0.25em] uppercase ${
                  isTshirt
                    ? "border-border/30 text-muted-foreground/50 cursor-not-allowed opacity-60"
                    : "border-border/40 text-foreground/80 hover:border-[#d4af7a] hover:text-[#d4af7a]"
                }`}
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <SlidersHorizontal size={13} aria-hidden="true" />
                <span>
                  {t("filter.open")}
                  {activeCount > 0 && (
                    <span className="ml-1.5 text-[#d4af7a]">({activeCount})</span>
                  )}
                </span>
              </button>
            </div>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(config.introKey)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Gallery full-width con padding minimo */}
        <div className="px-3 md:px-6">
          {items.length === 0 ? (
            <div className="max-w-7xl mx-auto py-24 text-center">
              <p
                className="text-2xl text-muted-foreground/70 font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("filter.noResults")}
              </p>
              <button
                onClick={() => setFilters(emptyFilters)}
                className="mt-4 text-[11px] tracking-[0.2em] uppercase text-[#d4af7a] hover:underline"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {t("filter.reset")}
              </button>
            </div>
          ) : (
            <GalleryGrid
              items={items}
              discipline={config.key}
              gradientFrom={config.gradientFrom}
              gradientTo={config.gradientTo}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default DisciplinePage;
