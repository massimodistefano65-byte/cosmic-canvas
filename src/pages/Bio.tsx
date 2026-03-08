import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Massimo Di Stefano",
  jobTitle: "Artista Visivo",
  description: "Artista contemporaneo che lavora tra pittura, fotografia, arte digitale e design indossabile.",
  url: "https://massimodistefano.com/bio",
};

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
            </div>
          </motion.div>
        </div>
      </article>
    </main>
  );
};

export default Bio;
