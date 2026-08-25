import React from 'react';
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Massimo Di Stefano",
  alternateName: "Massimo Di Stefano artista",
  jobTitle: "Artista Visivo e Pittore Cosmico Visionario",
  description:
    "Massimo Di Stefano è un artista visivo italiano. La sua ricerca si sviluppa attraverso pittura materica, fotografia e arte digitale, attorno alla tensione tra materia e spirito e a una visione cosmica e visionaria.",
  url: "https://www.massimodistefano.com/bio",
  mainEntityOfPage: "https://www.massimodistefano.com/bio",
  image: "https://www.massimodistefano.com/images/bio/massimo-di-stefano-portrait-1.jpg",
  nationality: { "@type": "Country", name: "Italia" },
  birthPlace: { "@type": "Place", name: "Italia" },
  workLocation: { "@type": "Place", name: "Sant'Egidio, Perugia, Italia" },
  knowsAbout: [
    "Pittura materica",
    "Arte contemporanea",
    "Fotografia artistica",
    "Arte digitale",
    "Arte cosmica e visionaria",
    "Garden design",
  ],
  award: "Exposure Award — Museo del Louvre, Parigi (2015)",
  sameAs: [
    "https://www.facebook.com/massimodistefanoarte",
    "https://www.instagram.com/massimodistefano65/",
    "https://x.com/disty65",
    "https://linktr.ee/radmax",
  ],
};

/* Avorio identico ai popup del sito ("Filtra le opere", "Opzioni d'acquisto", "Significato dell'opera") */
const IVORY_CARD =
  "bg-[#FDFCF0] border border-[#D4BE96]/40 rounded-xl shadow-2xl p-8 md:p-10";
const INK = "#2b2820";
const BODY = "#4a473e";

/** Titoli con i due punti: la parte dopo ":" va sempre a capo. */
const SplitTitle = ({ text }: { text: string }) => {
  const i = text.indexOf(":");
  if (i === -1) return <>{text}</>;
  return (
    <>
      <span className="block">{text.slice(0, i + 1)}</span>
      <span className="block">{text.slice(i + 1).trim()}</span>
    </>
  );
};

const CardTitle = ({ text }: { text: string }) => (
  <h2
    className="text-2xl md:text-3xl border-b border-[#1A1A1A]/15 pb-3 leading-tight"
    style={{ fontFamily: "'Cormorant Garamond', serif", color: INK }}
  >
    <SplitTitle text={text} />
  </h2>
);

const CardText = ({ children }: { children: React.ReactNode }) => (
  <div
    className="space-y-4 text-base md:text-lg leading-relaxed whitespace-pre-line"
    style={{ fontFamily: "'Raleway', sans-serif", color: BODY }}
  >
    {children}
  </div>
);

/* Immagini temporanee (placeholder) delle 3 schede "Geografie dell'anima".
   Per sostituirle: carica i file con questi nomi esatti in public/images/bio/
   (vedi GUIDA-GESTIONE-OPERE.md → sezione Bio). */
const geoImages: Record<number, string> = {
  1: "/images/bio/geografie-painting.webp",
  2: "/images/bio/geografie-photography.webp",
  3: "/images/bio/geografie-digital-art.webp",
};

export default function PaginaBio() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background text-foreground antialiased font-sans">
      <SEOHead
        title="Massimo Di Stefano — Artista Visivo e Pittore Cosmico Visionario | Biografia"
        description="Biografia ufficiale di Massimo Di Stefano, Artista Visivo e Pittore Cosmico Visionario. Percorso artistico, ricerca, pittura, fotografia e arte digitale."
        canonicalPath="/bio"
        jsonLd={personJsonLd}
      />

      <Navbar />

      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mb-20 text-center">
            <h1 className="mb-4 text-4xl font-light tracking-wider text-white md:text-6xl uppercase">
              <span className="block md:inline">Massimo Di Stefano</span>
              <span className="sr-only"> — Artista Visivo e Pittore Cosmico Visionario</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground tracking-wide">
              {t("bio.header.tagline")}
            </p>
          </div>

          {/* CONTENUTO A ZIGZAG */}
          <div className="mx-auto max-w-5xl space-y-24 md:space-y-40">

            {/* SEZIONE 1 - RITRATTO */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className={`md:col-span-7 space-y-6 ${IVORY_CARD}`}>
                <CardTitle text={t("bio.sec1.title")} />
                <CardText>
                  <p>{t("bio.sec1.p1")}</p>
                  <p>{t("bio.sec1.p2")}</p>
                </CardText>
              </div>
              <div className="md:col-span-5 aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/bio/massimo-di-stefano-portrait-1.jpg" className="w-full h-full object-cover" alt="Massimo Di Stefano" />
              </div>
            </section>

            {/* SEZIONE 2 - AL LAVORO */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5 md:order-1 aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/bio/massimo-di-stefano-at-work-1.webp" className="w-full h-full object-cover" alt="Lavoro materico" />
              </div>
              <div className={`md:col-span-7 md:order-2 space-y-6 ${IVORY_CARD}`}>
                <CardTitle text={t("bio.sec2.title")} />
                <CardText>
                  <p>{t("bio.sec2.p1")}</p>
                  <p>{t("bio.sec2.p2")}</p>
                  <p>{t("bio.sec2.p3")}</p>
                </CardText>
              </div>
            </section>

            {/* SEZIONE 3: GEOGRAFIE — 3 SCHEDE AVORIO SFALSATE E DISTANZIATE */}
            <section className="space-y-16">
              <div className={`${IVORY_CARD} text-center max-w-3xl mx-auto`}>
                <h2
                  className="text-3xl md:text-4xl mb-5 leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: INK }}
                >
                  <SplitTitle text={t("bio.cards.title")} />
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: "'Raleway', sans-serif", color: BODY }}
                >
                  {t("bio.cards.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 items-start">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`${IVORY_CARD} p-6 md:p-7 ${num === 2 ? "md:mt-16" : ""}`}
                  >
                    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden mb-5 bg-[#1A1A1A]/5 border border-[#D4BE96]/40">
                      <img
                        src={geoImages[num]}
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (!img.src.endsWith("/placeholder.svg")) img.src = "/placeholder.svg";
                        }}
                        className="w-full h-full object-cover"
                        alt={t(`bio.card${num}.title`)}
                        loading="lazy"
                      />
                    </div>
                    <h3
                      className="text-xl md:text-2xl mb-3 leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: INK }}
                    >
                      <SplitTitle text={t(`bio.card${num}.title`)} />
                    </h3>
                    <p
                      className="text-base leading-relaxed whitespace-pre-line"
                      style={{ fontFamily: "'Raleway', sans-serif", color: BODY }}
                    >
                      {t(`bio.card${num}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SEZIONE 4: T-SHIRT */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className={`md:col-span-7 space-y-6 ${IVORY_CARD}`}>
                <CardTitle text={t("bio.tshirt.title")} />
                <CardText>
                  <p>{t("bio.tshirt.p1")}</p>
                  <p>{t("bio.tshirt.p2")}</p>
                </CardText>
              </div>
              <div className="md:col-span-5 aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/bio/massimo-di-stefano-tshirt-1.webp" className="w-full h-full object-cover" alt="T-shirt d'artista - Massimo Di Stefano" />
              </div>
            </section>

            {/* SEZIONE 5: VISIONE COSMICA */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5 md:order-1 aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/bio/massimo-di-stefano-cosmic-1.webp" className="w-full h-full object-cover" alt="Ricerca Cosmica - Massimo Di Stefano" />
              </div>
              <div className={`md:col-span-7 md:order-2 space-y-6 ${IVORY_CARD}`}>
                <CardTitle text={t("bio.cosmo.title")} />
                <CardText>
                  <p>{t("bio.cosmo.p1")}</p>
                  <p>{t("bio.cosmo.p2")}</p>
                </CardText>
              </div>
            </section>

            {/* SEZIONE 6: FILOSOFIA */}
            <section className={`max-w-3xl mx-auto text-center space-y-8 ${IVORY_CARD} p-8 md:p-12`}>
              <h2
                className="text-3xl md:text-4xl leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: INK }}
              >
                <SplitTitle text={t("bio.filosofia.title")} />
              </h2>
              <div
                className="space-y-6 text-base md:text-lg leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "'Raleway', sans-serif", color: BODY }}
              >
                <p>{t("bio.filosofia.p1")}</p>
                <p>{t("bio.filosofia.p2")}</p>
                <p className="font-medium italic text-xl md:text-2xl pt-4" style={{ color: INK }}>
                  {t("bio.filosofia.p3")}
                </p>
              </div>
            </section>

          </div>

          {/* AI SUMMARY — testo più grande e più chiaro */}
          <section
            className="mt-24 mx-auto max-w-3xl rounded-md border border-white/10 px-6 py-6"
            aria-label={t("bio.ai.title")}
          >
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-4">
              {t("bio.ai.title")}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-white/90 font-light">
              {t("bio.ai.body")}
            </p>
          </section>

          {/* FOOTER */}
          <footer className="mt-24 pt-16 border-t border-white/10 text-center">
            <p className="text-muted-foreground max-w-3xl mx-auto leading-loose text-lg font-light italic">
              {t("bio.footer")}
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
