import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Massimo Di Stefano",
  jobTitle: "Artista Visivo",
  description: "Artista contemporaneo che lavora tra pittura, fotografia, arte digitale e design indossabile.",
  url: "https://massimodistefano.com/bio",
};

const Bio = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Biografia"
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
              Biography
            </h1>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Massimo Di Stefano is a visionary contemporary artist working
                across multiple disciplines including painting, photography,
                digital art, and wearable design.
              </p>

              <p>
                Born from a deep fascination with cosmic themes and inner vision,
                his work explores the intersection between the tangible and
                ethereal, creating immersive visual experiences that challenge
                perception.
              </p>

              <p>
                His artistic practice is rooted in minimalist aesthetics and
                maximalist emotion—each piece carefully crafted to evoke a sense
                of cosmic wonder and philosophical depth.
              </p>

              <div className="pt-8 border-t border-border/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Practice
                </h2>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">→</span>
                    <span>Oil and acrylic on canvas</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">→</span>
                    <span>Fine art photography</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">→</span>
                    <span>Digital composition and manipulation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">→</span>
                    <span>Limited edition apparel design</span>
                  </li>
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
