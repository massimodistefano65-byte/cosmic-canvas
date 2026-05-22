import React from 'react';
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";

export default function PaginaBio() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background text-foreground antialiased font-sans px-4 py-12 md:py-20 max-w-5xl mx-auto">
      <SEOHead 
        title="Bio | Massimo Di Stefano" 
        description="Il Ricercatore dell'Invisibile - Biografia ufficiale." 
        canonicalPath="/bio" 
      />
      <Navbar />
      
      {/* TESTATA */}
      <header className="text-center mb-16 md:mb-24 pt-10">
        <h1 className="font-serif text-4xl md:text-6xl font-light mb-4 text-white tracking-normal">
          Massimo <span className="font-bold">Di Stefano</span>
        </h1>
        <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {t("bio.header.tagline")}
        </p>
      </header>

      <div className="space-y-20 md:space-y-32">
        
        {/* SEZIONE 1: L'URGENZA DEL RITORNO */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h2 className="font-serif text-xl md:text-2xl text-white border-b border-border pb-2">
              {t("bio.sec1.title")}
            </h2>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.sec1.p1")}
            </p>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.sec1.p2")}
            </p>
          </div>
          <div className="md:col-span-5 aspect-[4/5] bg-card rounded-lg overflow-hidden border border-border relative shadow-2xl">
            <img src="/images/bio/massimo-di-stefano-portrait-1.jpg" className="w-full h-full object-cover" alt="Massimo Di Stefano" />
          </div>
        </section>

        {/* SEZIONE 2: L'ATTRITO (ZIG-ZAG) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 md:order-2 aspect-[4/5] bg-card rounded-lg overflow-hidden border border-border relative shadow-2xl">
            <img src="/images/bio/massimo-di-stefano-at-work-1.webp" className="w-full h-full object-cover" alt="Lavoro materico" />
          </div>
          <div className="md:col-span-7 md:order-1 space-y-6">
            <h2 className="font-serif text-xl md:text-2xl text-white border-b border-border pb-2">
              {t("bio.sec2.title")}
            </h2>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.sec2.p1")}
            </p>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.sec2.p2")}
            </p>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.sec2.p3")}
            </p>
          </div>
        </section>

        {/* SEZIONE 3: GEOGRAFIE DELL'ANIMA (3 COLONNE) */}
        <section className="space-y-10 pt-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-4 tracking-wide">
              {t("bio.cards.title")}
            </h2>
            <p className="font-light italic text-muted-foreground text-sm md:text-base">
              {t("bio.cards.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="border-l-2 border-primary/60 pl-5 py-2 space-y-3">
              <h3 className="font-serif text-lg text-white font-medium">{t("bio.card1.title")}</h3>
              <p className="font-light text-sm leading-relaxed text-justify text-muted-foreground">
                {t("bio.card1.desc")}
              </p>
            </div>
            <div className="border-l-2 border-primary pl-5 py-2 space-y-3">
              <h3 className="font-serif text-lg text-white font-medium">{t("bio.card2.title")}</h3>
              <p className="font-light text-sm leading-relaxed text-justify text-muted-foreground">
                {t("bio.card2.desc")}
              </p>
            </div>
            <div className="border-l-2 border-primary/60 pl-5 py-2 space-y-3">
              <h3 className="font-serif text-lg text-white font-medium">{t("bio.card3.title")}</h3>
              <p className="font-light text-sm leading-relaxed text-justify text-muted-foreground">
                {t("bio.card3.desc")}
              </p>
            </div>
          </div>
        </section>

        {/* SEZIONE 4: T-SHIRT */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h2 className="font-serif text-xl md:text-2xl text-white border-b border-border pb-2">
              {t("bio.tshirt.title")}
            </h2>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.tshirt.p1")}
            </p>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.tshirt.p2")}
            </p>
          </div>
          <div className="md:col-span-5 aspect-[4/5] bg-card rounded-lg overflow-hidden border border-border relative shadow-2xl">
            <img src="/images/bio/massimo-di-stefano-at-work-1.webp" className="w-full h-full object-cover opacity-60" alt="T-shirt d'arte" />
          </div>
        </section>

        {/* SEZIONE 5: VISIONE COSMICA (ZIG-ZAG) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 md:order-2 aspect-[4/5] bg-card rounded-lg overflow-hidden border border-border relative shadow-2xl">
             <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-black flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Cosmic Vision</span>
             </div>
          </div>
          <div className="md:col-span-7 md:order-1 space-y-6">
            <h2 className="font-serif text-xl md:text-2xl text-white border-b border-border pb-2">
              {t("bio.cosmo.title")}
            </h2>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.cosmo.p1")}
            </p>
            <p className="font-light leading-relaxed text-justify text-sm md:text-base">
              {t("bio.cosmo.p2")}
            </p>
          </div>
        </section>

        {/* SEZIONE 6: FILOSOFIA */}
        <section className="max-w-3xl mx-auto space-y-6 text-center pt-8">
          <h2 className="font-serif text-xl md:text-2xl text-white border-b border-border pb-2 inline-block px-6">
            {t("bio.filosofia.title")}
          </h2>
          <p className="font-light leading-relaxed text-justify md:text-center text-sm md:text-base">
            {t("bio.filosofia.p1")}
          </p>
          <p className="font-light leading-relaxed text-justify md:text-center text-sm md:text-base">
            {t("bio.filosofia.p2")}
          </p>
          <p className="font-light leading-relaxed text-justify md:text-center italic text-muted-foreground pt-2 text-sm md:text-base">
            {t("bio.filosofia.p3")}
          </p>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="mt-24 pt-8 border-t border-border text-center">
        <p className="font-light italic text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          {t("bio.footer")}
        </p>
      </footer>
    </main>
  );
}
