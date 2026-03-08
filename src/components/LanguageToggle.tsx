import { useI18n } from "@/lib/i18n";

const LanguageToggle = () => {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "it" ? "en" : "it")}
      className="px-2 py-1 text-xs font-medium tracking-wider uppercase text-muted-foreground hover:text-accent transition-colors border border-border/40 rounded"
      aria-label={lang === "it" ? "Switch to English" : "Passa all'italiano"}
    >
      {lang === "it" ? "EN" : "IT"}
    </button>
  );
};

export default LanguageToggle;
