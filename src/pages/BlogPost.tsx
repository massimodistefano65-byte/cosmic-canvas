import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getPostBySlug } from "@/lib/blogData";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useI18n();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  const title = lang === "it" ? post.title_it : post.title_en;
  const content = lang === "it" ? post.content_it : post.content_en;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={title}
        description={lang === "it" ? post.excerpt_it : post.excerpt_en}
        canonicalPath={`/blog/${post.slug}`}
      />
      <Navbar />

      <article className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>{t("blog.back")}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={title}
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
                decoding="async"
              />
            )}

            <time className="text-sm text-muted-foreground">{post.date}</time>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-8 text-foreground">{title}</h1>

            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </motion.div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
