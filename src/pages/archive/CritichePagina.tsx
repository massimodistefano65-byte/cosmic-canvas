import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ArchiveCard from "@/components/archive/ArchiveCard";
import ArchiveMediaDialog from "@/components/archive/ArchiveMediaDialog";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { criticisms, getCriticismBySlug } from "@/lib/archiveData";

/**
 * Gestisce sia la griglia /archive/critiche sia il dettaglio /archive/critiche/:slug
 * (rendering del popup editoriale sopra alla griglia).
 */
const CritichePagina = () => {
  useSectionAudio("archive");
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const current = slug ? getCriticismBySlug(slug) : null;

  // Se lo slug è invalido, riporta alla griglia
  useEffect(() => {
    if (slug && !current) navigate("/archive/critiche", { replace: true });
  }, [slug, current, navigate]);

  const seoTitle = current
    ? `${current.title} — critica d'arte | Massimo Di Stefano artista`
    : "Critiche d'arte — Archivio Massimo Di Stefano artista visivo";
  const seoDesc = current?.excerpt || "Testi critici e recensioni dedicati all'opera di Massimo Di Stefano, artista visivo italiano.";
  const seoPath = current ? `/archive/critiche/${current.slug}` : "/archive/critiche";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={seoTitle} description={seoDesc} canonicalPath={seoPath} />
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-[#d4af7a]"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <ArrowLeft size={16} /> Archive
          </Link>

          <div className="my-12 text-center">
            <h1
              className="text-4xl font-light tracking-wider text-foreground md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Critiche
            </h1>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
            {criticisms.map((c) => (
              <ArchiveCard
                key={c.id}
                to={`/archive/critiche/${c.slug}`}
                title={c.title}
                cover={c.coverImage}
                icon={<FileText size={56} strokeWidth={1} />}
              />
            ))}
          </div>
        </div>
      </div>

      <ArchiveMediaDialog
        isOpen={!!current}
        onClose={() => navigate("/archive/critiche")}
        title={current?.title || ""}
        subtitle={current?.author}
        body={current?.body}
        materials={current?.materials}
      />
    </div>
  );
};

export default CritichePagina;
