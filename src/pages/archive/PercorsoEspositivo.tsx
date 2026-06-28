import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ArchiveMediaDialog from "@/components/archive/ArchiveMediaDialog";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { timeline, TimelineEntry } from "@/lib/archiveData";

const PercorsoEspositivo = () => {
  useSectionAudio("archive");
  const [active, setActive] = useState<TimelineEntry | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Percorso Espositivo — Massimo Di Stefano"
        description="Timeline completa delle mostre ed esposizioni di Massimo Di Stefano."
        canonicalPath="/archive/mostre/percorso-espositivo"
      />
      <Navbar />

      <div className="pt-24 pb-24">
        <div className="mx-auto max-w-[920px] px-6 md:px-12">
          <Link
            to="/archive/mostre"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-[#d4af7a]"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <ArrowLeft size={16} /> Mostre
          </Link>

          <header className="my-14 text-center">
            <h1
              className="text-4xl font-light leading-tight tracking-wide text-foreground md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Massimo Di Stefano
            </h1>
            <p
              className="mt-3 text-lg italic text-foreground/60 md:text-xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Percorso Espositivo
            </p>
            <div className="mx-auto mt-6 h-px w-24 bg-[#d4af7a]/40" />
          </header>

          <article
            className="space-y-14"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {timeline.map((year) => (
              <section key={year.year}>
                <h2
                  className="mb-6 text-3xl font-light tracking-wide text-[#d4af7a] md:text-4xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {year.year}
                </h2>
                <ul className="space-y-5">
                  {year.entries.map((e) => {
                    const hasMaterials = !!e.materials && e.materials.length > 0;
                    return (
                      <li
                        key={e.id}
                        className="flex gap-4 text-[16px] leading-[1.85] text-foreground/85 md:text-[17px]"
                      >
                        <span className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <span>{e.text}</span>
                            {hasMaterials && (
                              <button
                                onClick={() => setActive(e)}
                                aria-label="Apri materiali correlati"
                                className="relative mt-[10px] inline-flex h-3 w-3 shrink-0 items-center justify-center"
                              >
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af7a]/60 opacity-80" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d4af7a] shadow-[0_0_8px_rgba(212,175,122,0.8)]" />
                              </button>
                            )}
                          </div>
                          {e.note && (
                            <p className="mt-1 pl-0 text-[15px] italic text-foreground/55">
                              {e.note}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </article>
        </div>
      </div>

      <ArchiveMediaDialog
        isOpen={!!active}
        onClose={() => setActive(null)}
        title={active?.text || ""}
        subtitle={active?.note}
        materials={active?.materials}
      />
    </div>
  );
};

export default PercorsoEspositivo;
