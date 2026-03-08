import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const Criticism = () => {
  const { t } = useI18n();

  const critiques = [
    {
      title: "The Cosmic Painter: Vision Beyond Reality",
      author: "Art Critic Review",
      excerpt:
        "Di Stefano's work transcends traditional boundaries, merging cosmic themes with contemporary visual language...",
    },
    {
      title: "Photography as Meditation",
      author: "Photography Monthly",
      excerpt:
        "His photographic works present a unique perspective on light, shadow, and the quotidian transformed...",
    },
    {
      title: "Digital Expression in Contemporary Art",
      author: "Modern Art Quarterly",
      excerpt:
        "The artist demonstrates mastery in blending digital tools with classical artistic principles...",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t("criticism.title")}
        description="Testi critici e riflessioni sull'opera di Massimo Di Stefano da riviste e critici d'arte contemporanea."
        canonicalPath="/criticism"
      />
      <Navbar />

      <section className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              {t("criticism.title")}
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              {t("criticism.subtitle")}
            </p>

            <div className="space-y-8" role="list">
              {critiques.map((critique, index) => (
                <motion.article
                  key={index}
                  role="listitem"
                  className="p-8 bg-secondary/20 border border-border/50 rounded-lg hover:border-accent/50 transition-all cursor-pointer group"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <h2 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {critique.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {critique.author}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {critique.excerpt}
                  </p>
                  <button className="text-accent text-sm font-medium hover:underline">
                    {t("criticism.readMore")}
                  </button>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Criticism;
