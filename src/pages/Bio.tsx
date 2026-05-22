import React from 'react';
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";

export default function PaginaBio() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background text-foreground antialiased font-sans">
      <SEOHead 
        title="Bio | Massimo Di Stefano" 
        description="Il Ricercatore dell'Invisibile - Biografia ufficiale." 
        canonicalPath="/bio" 
      />
      
      {/* NAVBAR: Libera come in Archive per centrarsi automaticamente */}
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* HEADER: CLONATO DA ARCHIVE */}
          <div className="mb-20 text-center">
            <h1 className="mb-4 text-4xl font-light tracking-wider text-white md:text-6xl uppercase">
              Massimo Di Stefano
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground tracking-wide">
              {t("bio.header.tagline")}
            </p>
          </div>

          {/* CONTENUTO A ZIGZAG */}
          <div className="mx-auto max-w-5xl space-y-24 md:space-y-40">
            
            {/* SEZIONE 1 */}
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

            {/* SEZIONE 2 (ZIG-ZAG) */}
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

            {/* SEZIONE 4: T-SHIRT */}
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
                <img src="/images/bio/massimo-di-stefano-at-work-1.webp" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" alt="T-shirt" />
              </div>
            </section>

            {/* SEZIONE 5: VISIONE COSMICA */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5 md:order-1 aspect-[4/5] bg-zinc-900/40 rounded-lg border border-white/5 flex items-center justify-center">
                 <span className="text-xs uppercase tracking-[0.6em] text-zinc-600">Cosmic Research</span>
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

          {/* FOOTER */}
          <footer className="mt-32 pt-16 border-t border-white/10 text-center">
            <p className="text-muted-foreground max-w-3xl mx-auto leading-loose text-lg font-light italic">
              {t("bio.footer")}
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
