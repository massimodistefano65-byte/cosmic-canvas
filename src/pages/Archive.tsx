import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ArchiveCard from "@/components/archive/ArchiveCard";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { Image, Video, Download, FileText, Palette, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { exhibitions, videos, downloads, criticisms, otherProjects } from "@/lib/archiveData";

/**
 * Archive home — griglia modulare a 5 card.
 * Ogni card apre la sotto-sezione dedicata.
 */
const Archive = () => {
  useSectionAudio("archive");
  const { t } = useI18n();

  const hasMostre = exhibitions.length > 0; // "Percorso Espositivo" è sempre presente come timeline
  const hasVideo = videos.length > 0;
  const hasDownload = downloads.length > 0;
  const hasCritiche = criticisms.length > 0;
  const hasProgetti = otherProjects.some((p) => p.media.length > 0);

  const cards: Array<{
    to: string;
    title: string;
    cover?: string;
    icon: React.ReactNode;
    empty: boolean;
  }> = [
    { to: "/archive/mostre", title: t("archive.card.mostre"), icon: <Image size={64} strokeWidth={1} />, empty: false }, // contiene sempre Percorso Espositivo
    { to: "/archive/video", title: t("archive.card.video"), icon: <Video size={64} strokeWidth={1} />, empty: !hasVideo },
    { to: "/archive/download", title: t("archive.card.download"), icon: <Download size={64} strokeWidth={1} />, empty: !hasDownload },
    { to: "/archive/critiche", title: t("archive.card.critiche"), icon: <FileText size={64} strokeWidth={1} />, empty: !hasCritiche },
    { to: "/archive/progetti", title: t("archive.card.progetti"), icon: <Palette size={64} strokeWidth={1} />, empty: !hasProgetti },
    { to: "/archive/mia-selezione", title: t("archive.card.selezione"), icon: <Heart size={64} strokeWidth={1} />, empty: false },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Archivio — Mostre, critiche e percorso espositivo | Massimo Di Stefano"
        description="Archivio ufficiale di Massimo Di Stefano, artista visivo: mostre, percorso espositivo, video, critiche d'arte e altri progetti."
        canonicalPath="/archive"
      />
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1
              className="mb-4 text-5xl font-light tracking-wider text-foreground md:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ARCHIVE
            </h1>
            <p
              className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {t("archive.subtitle")}
            </p>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
            {cards.map((c) => (
              <ArchiveCard
                key={c.to}
                to={c.to}
                title={c.title}
                icon={c.icon}
                emptyLabel={c.empty ? t("archive.comingSoon") : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;
