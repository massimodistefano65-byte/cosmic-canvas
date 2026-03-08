import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Download } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Massimo Di Stefano",
  jobTitle: "Artista Visivo",
  description: "Artista contemporaneo che lavora tra pittura, fotografia, arte digitale e design indossabile.",
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
  | { type: "photo-lg"; src: string; alt: string; caption?: string }
  | { type: "heading"; key: string }
  | { type: "list"; keys: string[] }
  | { type: "video"; youtubeId: string; caption?: string };

const bioSections: BioBlock[] = [
  // --- Prima parte biografia ---
  { type: "text", key: "bio.p1" },
  { type: "text", key: "bio.p2" },

  // --- Foto al lavoro (piccola, sfalsata a destra) ---
  { type: "photo-sm", src: "/images/bio/massimo-di-stefano-at-work-1.webp", alt: "Massimo Di Stefano al lavoro" },

  // --- Seconda parte biografia ---
  { type: "text", key: "bio.p3" },

  // --- Pratica artistica ---
  { type: "heading", key: "bio.practice" },
  { type: "list", keys: ["bio.practice1", "bio.practice2", "bio.practice3", "bio.practice4"] },

  // --- Video ---
  { type: "video", youtubeId: "x9ZMeR7e4MU" },

  // ═══ AGGIUNGI ALTRE SEZIONI QUI SOTTO ═══
  // { type: "video", youtubeId: "ID_VIDEO", caption: "Didascalia opzionale" },
  // { type: "photo-lg", src: "/images/bio/studio-panoramica.jpg", alt: "Lo studio", caption: "Lo studio a Roma" },
];

const downloads = [
  { file: "/downloads/catalogo-massimo-di-stefano-hd.pdf", labelKey: "bio.downloadCatalogHD", size: "11 MB" },
  { file: "/downloads/catalogo-massimo-di-stefano-light.pdf", labelKey: "bio.downloadCatalogLight", size: "2 MB" },
];

/* ── Sotto-componenti per ogni tipo di blocco ── */

const TextBlock = ({ tKey, t }: { tKey: string; t: (k: string) => string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="max-w-3xl mx-auto md:ml-[16.666%]"
  >
    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
      {t(tKey)}
    </p>
  </motion.div>
);

let _photoSmCounter = 0;
const PhotoSmBlock = ({ src, alt }: { src: string; alt: string }) => {
  const index = _photoSmCounter++;
  const isRight = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex ${isRight ? "justify-center md:justify-end md:mr-[8%]" : "justify-center md:justify-start md:ml-[8%]"}`}
    >
      <div className="w-52 h-52 md:w-64 md:h-64 rounded-sm overflow-hidden border border-border/20 shadow-xl">
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </div>
    </motion.div>
  );
};

const PhotoLgBlock = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="max-w-5xl mx-auto"
  >
    <div className="aspect-[21/9] w-full rounded-sm overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
    {caption && (
      <p className="text-sm text-muted-foreground/60 mt-3 text-center italic">{caption}</p>
    )}
  </motion.div>
);

const HeadingBlock = ({ tKey, t }: { tKey: string; t: (k: string) => string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="max-w-3xl mx-auto md:ml-[16.666%]"
  >
    <div className="w-16 h-px bg-accent/40 mb-8" />
    <h2
      className="text-2xl md:text-3xl font-light text-foreground"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {t(tKey)}
    </h2>
  </motion.div>
);

const ListBlock = ({ keys, t }: { keys: string[]; t: (k: string) => string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="max-w-3xl mx-auto md:ml-[16.666%]"
  >
    <ul className="space-y-4">
      {keys.map((key, i) => (
        <motion.li
          key={key}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex gap-4 items-start"
        >
          <span className="text-accent/70 mt-1 text-xs">●</span>
          <span className="text-muted-foreground">{t(key)}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const VideoBlock = ({ youtubeId, caption }: { youtubeId: string; caption?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="max-w-4xl mx-auto"
  >
    <div className="aspect-video w-full rounded-sm overflow-hidden border border-border/20 shadow-xl">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    </div>
    {caption && (
      <p className="text-sm text-muted-foreground/60 mt-3 text-center italic">{caption}</p>
    )}
  </motion.div>
);

/* ── Pagina principale ── */

const Bio = () => {
  const { t } = useI18n();
  // Reset counter on each render
  _photoSmCounter = 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t("bio.title")}
        description="Biografia di Massimo Di Stefano: artista visivo contemporaneo che esplora pittura, fotografia, arte digitale e design indossabile."
        canonicalPath="/bio"
        jsonLd={jsonLd}
      />
      <Navbar />

      <article className="pt-24 pb-20">
        {/* ═══ HERO — foto ritratto + titolo ═══ */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative"
            >
              <div className="relative">
                <div className="aspect-[3/4] w-full max-w-sm rounded-sm overflow-hidden">
                  <img
                    src="/images/bio/massimo-di-stefano-portrait-1.jpg"
                    alt="Massimo Di Stefano"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute -left-4 top-8 w-px h-24 bg-gradient-to-b from-accent/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-7 pt-2 md:pt-8"
            >
              <h1
                className="text-4xl md:text-6xl font-light tracking-tight mb-2 text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Massimo Di Stefano
              </h1>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-10">
                {t("bio.title")}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ═══ BLOCCHI MODULARI ═══ */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-16 space-y-14">
          {bioSections.map((block, i) => {
            switch (block.type) {
              case "text":
                return <TextBlock key={i} tKey={block.key} t={t} />;
              case "photo-sm":
                return <PhotoSmBlock key={i} src={block.src} alt={block.alt} />;
              case "photo-lg":
                return <PhotoLgBlock key={i} src={block.src} alt={block.alt} caption={block.caption} />;
              case "heading":
                return <HeadingBlock key={i} tKey={block.key} t={t} />;
              case "list":
                return <ListBlock key={i} keys={block.keys} t={t} />;
              case "video":
                return <VideoBlock key={i} youtubeId={block.youtubeId} caption={block.caption} />;
              default:
                return null;
            }
          })}
        </div>

        {/* ═══ DOWNLOADS ═══ */}
        {downloads.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 md:px-12 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:ml-[16.666%]"
            >
              <div className="w-16 h-px bg-accent/40 mb-8" />
              <h2
                className="text-2xl md:text-3xl font-light text-foreground mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("bio.downloads")}
              </h2>
              <div className="flex flex-wrap gap-4">
                {downloads.map((dl, i) => (
                  <a
                    key={i}
                    href={dl.file}
                    download
                    className="group inline-flex items-center gap-3 px-6 py-4 rounded-sm border border-border/30 bg-card/50 text-foreground hover:border-accent/50 hover:bg-card transition-all duration-300 text-sm tracking-wide"
                  >
                    <Download size={16} className="text-accent group-hover:scale-110 transition-transform" />
                    <span>{t(dl.labelKey)}</span>
                    <span className="text-muted-foreground text-xs ml-1">({dl.size})</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </article>
    </main>
  );
};

export default Bio;
