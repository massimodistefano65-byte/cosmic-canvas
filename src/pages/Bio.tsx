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
  Portrait / working photos — add your images to public/images/bio/
  Then list them here. Leave empty array to hide the section.
*/
const bioPhotos = [
  // { src: "/images/bio/massimo-di-stefano-portrait-1.jpg", alt: "Massimo Di Stefano al lavoro" },
  // { src: "/images/bio/massimo-di-stefano-portrait-2.jpg", alt: "Massimo Di Stefano in studio" },
];

/*
  Downloadable files — place PDFs in public/downloads/
*/
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

      <article className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              {t("bio.title")}
            </h1>

            {/* --- Portrait photos --- */}
            {bioPhotos.length > 0 && (
              <div className="mb-10 flex flex-wrap gap-4">
                {bioPhotos.map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="w-36 h-36 md:w-44 md:h-44 rounded-md overflow-hidden border border-border/30 flex-shrink-0"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>{t("bio.p1")}</p>
              <p>{t("bio.p2")}</p>
              <p>{t("bio.p3")}</p>

              <div className="pt-8 border-t border-border/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  {t("bio.practice")}
                </h2>
                <ul className="space-y-3">
                  {["bio.practice1", "bio.practice2", "bio.practice3", "bio.practice4"].map((key) => (
                    <li key={key} className="flex gap-3">
                      <span className="text-accent" aria-hidden="true">→</span>
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* --- Downloads section --- */}
              {downloads.length > 0 && (
                <div className="pt-8 border-t border-border/50">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("bio.downloads")}
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {downloads.map((dl, i) => (
                      <a
                        key={i}
                        href={dl.file}
                        download
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border/50 bg-card text-foreground hover:bg-secondary/60 transition-colors text-sm tracking-wide"
                      >
                        <Download size={16} className="text-accent" />
                        <span>{t(dl.labelKey)}</span>
                        <span className="text-muted-foreground text-xs">({dl.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </article>
    </main>
  );
};

export default Bio;
