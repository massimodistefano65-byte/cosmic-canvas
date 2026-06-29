import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ArchiveCard from "@/components/archive/ArchiveCard";
import ArchiveMediaDialog from "@/components/archive/ArchiveMediaDialog";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { otherProjects, getOtherProjectBySlug } from "@/lib/archiveData";

const ProgettiIndex = () => {
  useSectionAudio("archive");
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const current = slug ? getOtherProjectBySlug(slug) : null;

  useEffect(() => {
    if (slug && !current) navigate("/archive/progetti", { replace: true });
  }, [slug, current, navigate]);

  const hasAny = otherProjects.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={current ? `${current.title} — progetto di Massimo Di Stefano artista` : "Altri progetti artistici — Massimo Di Stefano"}
        description={current?.description || "Progetti d'autore e collaborazioni di Massimo Di Stefano, artista visivo italiano."}
        canonicalPath={current ? `/archive/progetti/${current.slug}` : "/archive/progetti"}
      />
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
              Altri Progetti
            </h1>
          </div>

          {hasAny ? (
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
              {otherProjects.map((p) => {
                const cover = p.media.find((m) => m.type === "image")?.src;
                const empty = p.media.length === 0;
                return (
                  <ArchiveCard
                    key={p.id}
                    to={`/archive/progetti/${p.slug}`}
                    title={p.title}
                    cover={cover}
                    icon={<Palette size={56} strokeWidth={1} />}
                    emptyLabel={empty ? "Contenuto in arrivo" : undefined}
                  />
                );
              })}
            </div>
          ) : (
            <p
              className="mx-auto max-w-xl text-center text-muted-foreground"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Contenuti in arrivo.
            </p>
          )}
        </div>
      </div>

      <ArchiveMediaDialog
        isOpen={!!current}
        onClose={() => navigate("/archive/progetti")}
        title={current?.title || ""}
        subtitle={current?.category}
        body={current?.longDescription || current?.description}
        materials={current?.media}
      />
    </div>
  );
};

export default ProgettiIndex;
