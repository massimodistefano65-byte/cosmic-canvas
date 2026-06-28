import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ArchiveCard from "@/components/archive/ArchiveCard";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { Image, Video, Download, FileText, Palette } from "lucide-react";
import { exhibitions, videos, downloads, criticisms, otherProjects } from "@/lib/archiveData";

/**
 * Archive home — griglia modulare a 5 card.
 * Ogni card apre la sotto-sezione dedicata.
 */
const Archive = () => {
  useSectionAudio("archive");

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
    { to: "/archive/mostre", title: "Mostre", icon: <Image size={64} strokeWidth={1} />, empty: false }, // contiene sempre Percorso Espositivo
    { to: "/archive/video", title: "Video", icon: <Video size={64} strokeWidth={1} />, empty: !hasVideo },
    { to: "/archive/download", title: "Download", icon: <Download size={64} strokeWidth={1} />, empty: !hasDownload },
    { to: "/archive/critiche", title: "Critiche", icon: <FileText size={64} strokeWidth={1} />, empty: !hasCritiche },
    { to: "/archive/progetti", title: "Altri Progetti", icon: <Palette size={64} strokeWidth={1} />, empty: !hasProgetti },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Archive — Massimo Di Stefano"
        description="Archivio modulare: mostre, video, materiali scaricabili, critiche e altri progetti di Massimo Di Stefano."
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
              Mostre, video, critiche e materiali documentali del percorso artistico.
            </p>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
            {cards.map((c) => (
              <ArchiveCard
                key={c.to}
                to={c.to}
                title={c.title}
                icon={c.icon}
                emptyLabel={c.empty ? "Contenuto in arrivo" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;
