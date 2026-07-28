import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ArchiveCard from "@/components/archive/ArchiveCard";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { useI18n } from "@/lib/i18n";
import { exhibitions } from "@/lib/archiveData";

const MostreIndex = () => {
  useSectionAudio("archive");
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Mostre ed esposizioni — Massimo Di Stefano artista"
        description="Mostre ed esposizioni di Massimo Di Stefano, artista visivo italiano. Percorso espositivo personale e collettive."
        canonicalPath="/archive/mostre"
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
              {t("archive.mostre.title")}
            </h1>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:max-w-4xl md:grid-cols-3">
            <ArchiveCard
              to="/archive/mostre/percorso-espositivo"
              title={t("archive.percorso")}
              icon={<Clock size={56} strokeWidth={1} />}
            />
            {exhibitions.map((e) => (
              <ArchiveCard
                key={e.id}
                to={`/archive/mostre/${e.id}`}
                title={e.title}
                cover={e.images[0]}
                emptyLabel={e.images.length === 0 ? t("archive.comingSoon") : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostreIndex;
