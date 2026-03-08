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

const bioPhotos = [
  { src: "/images/bio/massimo-di-stefano-portrait-1.jpg", alt: "Massimo Di Stefano" },
  { src: "/images/bio/massimo-di-stefano-at-work-1.webp", alt: "Massimo Di Stefano al lavoro" },
];

const downloads = [
  { file: "/downloads/catalogo-massimo-di-stefano-hd.pdf", labelKey: "bio.downloadCatalogHD", size: "11 MB" },
  { file: "/downloads/catalogo-massimo-di-stefano-light.pdf", labelKey: "bio.downloadCatalogLight", size: "2 MB" },
];

const Bio = () => {
  const { t } = useI18n();

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
        {/* === HERO: foto ritratto grande + titolo sovrapposto === */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Colonna sinistra — foto ritratto principale con overlay */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative"
            >
              <div className="relative">
                {/* Foto principale — ritratto */}
                <div className="aspect-[3/4] w-full max-w-sm rounded-sm overflow-hidden">
                  <img
                    src={bioPhotos[0].src}
                    alt={bioPhotos[0].alt}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>

                {/* Foto secondaria sovrapposta — al lavoro */}
                {bioPhotos.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute -bottom-8 -right-4 md:-right-12 w-40 h-40 md:w-52 md:h-52 rounded-sm overflow-hidden border-4 border-background shadow-2xl"
                  >
                    <img
                      src={bioPhotos[1].src}
                      alt={bioPhotos[1].alt}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </motion.div>
                )}

                {/* Elemento decorativo — linea accent */}
                <div className="absolute -left-4 top-8 w-px h-24 bg-gradient-to-b from-accent/60 to-transparent" />
              </div>
            </motion.div>

            {/* Colonna destra — testo biografia */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:col-span-7 pt-2 md:pt-8"
            >
              <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-2 text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Massimo Di Stefano
              </h1>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-10">
                {t("bio.title")}
              </p>

              <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>{t("bio.p1")}</p>
                <p>{t("bio.p2")}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* === SEZIONE CENTRALE — testo restante + pratica artistica === */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-24 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Spacer per allineamento asimmetrico */}
            <div className="hidden md:block md:col-span-2" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-8"
            >
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
                {t("bio.p3")}
              </p>

              {/* Linea decorativa sottile */}
              <div className="w-16 h-px bg-accent/40 mb-10" />

              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {t("bio.practice")}
              </h2>

              <ul className="space-y-4">
                {["bio.practice1", "bio.practice2", "bio.practice3", "bio.practice4"].map((key, i) => (
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

            <div className="hidden md:block md:col-span-2" />
          </div>
        </div>

        {/* === DOWNLOADS === */}
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
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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
