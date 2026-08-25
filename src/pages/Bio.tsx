import React from 'react';
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

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
              <div className="md:col-span-7 space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white border-b border-border/30 pb-3">
                  {t("bio.sec1.title")}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed font-light">
                  <p>{t("bio.sec1.p1")}</p>
                  <p>{t("bio.sec1.p2")}</p>
                </div>
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
              <div className="md:col-span-7 md:order-2 space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white border-b border-border/30 pb-3">
                  {t("bio.sec2.title")}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed font-light">
                  <p>{t("bio.sec2.p1")}</p>
                  <p>{t("bio.sec2.p2")}</p>
                  <p>{t("bio.sec2.p3")}</p>
                </div>
              </div>
            </section>

            {/* SEZIONE 3: GEOGRAFIE (3 COLONNE) */}
            <section className="space-y-12 pt-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  {t("bio.cards.title")}
                </h2>
                <p className="text-xl text-muted-foreground font-light italic">
                  {t("bio.cards.subtitle")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="border-l-2 border-primary/40 pl-6 py-2">
                    <h3 className="text-xl font-semibold text-white mb-3">{t(`bio.card${num}.title`)}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">{t(`bio.card${num}.desc`)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SEZIONE 4: T-SHIRT (FOTO 3) */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7 space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white border-b border-border/30 pb-3">
                  {t("bio.tshirt.title")}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed font-light">
                  <p>{t("bio.tshirt.p1")}</p>
                  <p>{t("bio.tshirt.p2")}</p>
                </div>
              </div>
              <div className="md:col-span-5 aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/bio/massimo-di-stefano-tshirt-1.webp" className="w-full h-full object-cover" alt="T-shirt d'artista - Massimo Di Stefano" />
              </div>
            </section>

            {/* SEZIONE 5: VISIONE COSMICA (FOTO 4) */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5 md:order-1 aspect-[4/5] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/bio/massimo-di-stefano-cosmic-1.webp" className="w-full h-full object-cover" alt="Ricerca Cosmica - Massimo Di Stefano" />
              </div>
              <div className="md:col-span-7 md:order-2 space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white border-b border-border/30 pb-3">
                  {t("bio.cosmo.title")}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed font-light">
                  <p>{t("bio.cosmo.p1")}</p>
                  <p>{t("bio.cosmo.p2")}</p>
                </div>
              </div>
            </section>

            {/* SEZIONE 6: FILOSOFIA */}
            <section className="max-w-3xl mx-auto space-y-10 text-center pt-16 border-t border-white/5">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {t("bio.filosofia.title")}
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                <p>{t("bio.filosofia.p1")}</p>
                <p>{t("bio.filosofia.p2")}</p>
                <p className="text-white font-medium italic text-xl md:text-2xl pt-6">
                  {t("bio.filosofia.p3")}
                </p>
              </div>
            </section>

          </div>

          {/* AI SUMMARY */}
          <section
            className="mt-24 mx-auto max-w-3xl rounded-md border border-white/10 px-6 py-5"
            aria-label={t("bio.ai.title")}
          >
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              {t("bio.ai.title")}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground font-light">
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