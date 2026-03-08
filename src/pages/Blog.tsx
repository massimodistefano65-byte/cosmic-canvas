import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blogData";

const Blog = () => {
  const { lang, t } = useI18n();
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t("blog.title")}
        description={lang === "it"
          ? "Diario dell'artista Massimo Di Stefano: riflessioni, processi creativi e aggiornamenti."
          : "Artist's diary by Massimo Di Stefano: reflections, creative processes and updates."
        }
        canonicalPath="/blog"
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
              {t("blog.title")}
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              {t("blog.subtitle")}
            </p>

            {posts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-muted-foreground text-lg">{t("blog.empty")}</p>
              </div>
            ) : (
              <div className="space-y-8" role="list">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    role="listitem"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: false }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block p-8 bg-secondary/20 border border-border/50 rounded-lg hover:border-accent/50 transition-all group"
                    >
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt={lang === "it" ? post.title_it : post.title_en}
                          className="w-full h-48 object-cover rounded mb-4"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <time className="text-xs text-muted-foreground">{post.date}</time>
                      <h2 className="text-2xl font-semibold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors">
                        {lang === "it" ? post.title_it : post.title_en}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {lang === "it" ? post.excerpt_it : post.excerpt_en}
                      </p>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-secondary/40 rounded text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-accent text-sm font-medium">{t("blog.readMore")}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
