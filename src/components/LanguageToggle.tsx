import { useI18n } from "@/lib/i18n";

const LanguageToggle = () => {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "it" ? "en" : "it")}
      className="px-2 py-1 text-white hover:text-white/50 transition-all duration-300 border border-border/40 rounded"
      style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400, letterSpacing: "0.14em", fontSize: "0.95rem", textTransform: "uppercase" }}
      aria-label={lang === "it" ? "Switch to English" : "Passa all'italiano"}
    >
      {lang === "it" ? "EN" : "IT"}
    </button>
  );
};

export default LanguageToggle;
