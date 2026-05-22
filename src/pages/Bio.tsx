import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const Bio = () => {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans">
      <SEOHead title="Bio | Massimo Di Stefano" description="Il Ricercatore dell'Invisibile" canonicalPath="/bio" />
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 py-24 md:py-32">
        
        {/* HEADER */}
        <header className="text-center mb-20 md:mb-32">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
            {t("bio.header.name")}
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.4em] text-zinc-500">
            {t("bio.header.tagline")}
          </p>
        </header>

        {/* SEZIONE 1: GRIGLIA FOTO + TESTO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32">
          <div className="rounded-lg overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50">
            <img 
              src="/images/bio/massimo-di-stefano-portrait-1.jpg" 
              alt="Massimo Di Stefano" 
              className="w-full h-[480px] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {t("bio.sec1.title")}
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg">{t("bio.sec1.p1")}</p>
            <p className="text-zinc-400 leading-relaxed text-lg">{t("bio.sec1.p2")}</p>
          </div>
        </section>

        {/* SEZIONE 2: GRIGLIA TESTO + DOPPIA FOTO (REVERSE) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {t("bio.sec2.title")}
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg">{t("bio.sec2.p1")}</p>
            <p className="text-zinc-400 leading-relaxed text-lg">{t("bio.sec2.p2")}</p>
          </div>
          <div className="order-1 md:order-2 flex flex-col gap-6">
            <div className="h-[230px] rounded-lg overflow-hidden border border-zinc-800">
              <img src="/images/bio/massimo-di-stefano-at-work-1.webp" className="w-full h-full object-cover" alt="Lavoro" />
            </div>
            <div className="h-[230px] rounded-lg overflow-hidden border border-zinc-800">
              <img src="/images/bio/massimo-di-stefano-portrait-1.jpg" className="w-full h-full object-cover opacity-50" alt="Dettaglio" />
            </div>
          </div>
        </section>

        {/* SEZIONE 3: CARDS LINGUAGGI */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            {t("bio.cards.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-[#0d0d0d] border border-zinc-900 p-8 rounded-lg shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4">{t(`bio.card${num}.title`)}</h3>
                <p className="text-zinc-500 leading-relaxed">{t(`bio.card${num}.desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEZIONE 4: BOX T-SHIRT */}
        <section className="bg-gradient-to-r from-[#0f0f0f] to-[#171717] border border-zinc-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 mb-32">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-white">{t("bio.tshirt.title")}</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">{t("bio.tshirt.desc")}</p>
          </div>
          <div className="w-full md:w-1/3">
            <img src="/images/bio/massimo-di-stefano-at-work-1.webp" className="rounded-lg border border-zinc-700 w-full h-48 object-cover" alt="Tshirt" />
          </div>
        </section>

        {/* SEZIONE FINALE */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t("bio.final.title")}</h2>
          <p className="text-zinc-400 leading-relaxed text-lg mb-6">{t("bio.final.p1")}</p>
          <p className="text-zinc-400 leading-relaxed text-lg mb-12">{t("bio.final.p2")}</p>
          
          <div className="pt-12 border-t border-zinc-900 italic text-zinc-600 leading-relaxed">
            {t("bio.signature")}
          </div>
        </section>

      </div>
    </main>
  );
};

export default Bio;
