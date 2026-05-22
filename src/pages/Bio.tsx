import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useSectionAudio } from "@/hooks/useSectionAudio";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Massimo Di Stefano",
  jobTitle: "Artista Visivo",
  description: "Artista contemporaneo e ricercatore dell'invisibile.",
  url: "https://massimodistefano.com/bio",
};

/*
  ═══════════════════════════════════════════════════════════
  SISTEMA MODULARE — Aggiungi sezioni in ordine.
  
  Tipi disponibili:
    "text"       → blocco di testo (usa chiave i18n)
    "photo-sm"   → foto piccola sfalsata (alterna sx/dx automaticamente)
    "photo-lg"   → foto grande panoramica a tutta larghezza
    "heading"    → sotto-titolo sezione
    "list"       → elenco puntato (chiavi i18n)
  
  Per aggiungere foto: metti il file in public/images/bio/
  poi aggiungi un blocco qui sotto.
  ═══════════════════════════════════════════════════════════
*/
type BioBlock =
  | { type: "text"; key: string }
  | { type: "photo-sm"; src: string; alt: string }
  | { type: "heading"; key: string }
  | { type: "list"; keys: string[] };

const bioSections: BioBlock[] = [
  { type: "text", key: "bio.intro" },
  { type: "text", key: "bio.agronomo" },
  { type: "photo-sm", src: "/images/bio/massimo-di-stefano-at-work-1.webp", alt: "Massimo Di Stefano al lavoro" },
  { type: "heading", key: "bio.heading_attrito" },
  { type: "text", key: "bio.attrito_desc" },
  { type: "heading", key: "bio.heading_linguaggi" },
  { type: "list", keys: ["bio.list_pittura", "bio.list_foto", "bio.list_digital"] },
  { type: "heading", key: "bio.heading_tshirt" },
  { type: "text", key: "bio.tshirt_desc" },
  { type: "heading", key: "bio.heading_cosmo" },
  { type: "text", key: "bio.cosmo_desc" },
  { type: "heading", key: "bio.heading_filosofia" },
  { type: "text", key: "bio.filosofia_desc" },
];

const TextBlock = ({ tKey, t }: { tKey: string; t: (k: string) => string }) => (
  <div className="max-w-3xl mx-auto md:ml-[33%] mb-10">
    <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
      {t(tKey)}
    </p>
  </div>
);

const PhotoSmBlock = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex justify-center md:justify-end md:mr-[10%] my-16">
    <div className="w-72 h-72 md:w-96 md:h-96 rounded-sm overflow-hidden shadow-2xl">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  </div>
);

const HeadingBlock = ({ tKey, t }: { tKey: string; t: (k: string) => string }) => (
  <div className="max-w-3xl mx-auto md:ml-[33%] mt-20 mb-8">
    <h2 className="text-3xl md:text-4xl font-light text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      {t(tKey)}
    </h2>
  </div>
);

const ListBlock = ({ keys, t }: { keys: string[]; t: (k: string) => string }) => (
  <div className="max-w-3xl mx-auto md:ml-[33%] mb-12">
    <ul className="space-y-6">
      {keys.map((key) => (
        <li key={key} className="flex gap-4 items-start text-foreground/80 text-lg">
          <span className="text-accent/60 mt-2 text-[8px]">●</span>
          <span>{t(key)}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Bio = () => {
  const { t } = useI18n();
  useSectionAudio("bio");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead title="Bio | Massimo Di Stefano" description="Biografia dell'artista." canonicalPath="/bio" jsonLd={jsonLd} />
      <Navbar />

      <article className="pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* HERO SECTION COMPATTA: Foto e Nome Allineati */}
          <div className="flex flex-col md:flex-row gap-12 items-start mb-12">
            <div className="w-full md:w-[30%]">
              <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-white/5">
                <img src="/images/bio/massimo-di-stefano-portrait-1.jpg" alt="Massimo Di Stefano" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-[60%] pt-4">
              <h1 className="text-5xl md:text-8xl font-light tracking-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Massimo Di Stefano
              </h1>
              <p className="text-xl uppercase tracking-[0.2em] text-accent/90 italic">
                {t("bio.title")}
              </p>
            </div>
          </div>

          <div className="mt-8">
            {bioSections.map((block, i) => {
              if (block.type === "text") return <TextBlock key={i} tKey={block.key} t={t} />;
              if (block.type === "photo-sm") return <PhotoSmBlock key={i} src={block.src} alt={block.alt} />;
              if (block.type === "heading") return <HeadingBlock key={i} tKey={block.key} t={t} />;
              if (block.type === "list") return <ListBlock key={i} keys={block.keys} t={t} />;
              return null;
            })}
          </div>
        </div>
      </article>
    </main>
  );
};

export default Bio;
