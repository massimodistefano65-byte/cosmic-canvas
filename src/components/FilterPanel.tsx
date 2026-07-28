import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface FiltersState {
  year: string | null;
  shape: string | null;
  support: string | null;
  price: string | null;
  genre: string | null;
  colors: string[];
}

export const emptyFilters: FiltersState = {
  year: null,
  shape: null,
  support: null,
  price: null,
  genre: null,
  colors: [],
};

export function countActive(f: FiltersState) {
  let n = 0;
  if (f.year) n++;
  if (f.shape) n++;
  if (f.support) n++;
  if (f.price) n++;
  if (f.genre) n++;
  n += f.colors.length;
  return n;
}

// Palette per ogni nome colore (18 colori richiesti)
const COLOR_PALETTE: { name: string; hex: string; border?: string }[] = [
  { name: "Nero", hex: "#0a0a0a" },
  { name: "Bianco", hex: "#f5f5f0", border: "#c9c9c0" },
  { name: "Grigio", hex: "#8a8a8a" },
  { name: "Oro", hex: "#d4af7a" },
  { name: "Argento", hex: "#c0c0c0" },
  { name: "Bronzo", hex: "#a97142" },
  { name: "Rosso", hex: "#b23a2f" },
  { name: "Blu", hex: "#1e3a8a" },
  { name: "Verde", hex: "#3f7a4a" },
  { name: "Giallo", hex: "#e6c229" },
  { name: "Arancione", hex: "#e07b3a" },
  { name: "Viola", hex: "#6b4a8a" },
  { name: "Rosa", hex: "#e6a5b5" },
  { name: "Marrone", hex: "#6b3f2a" },
  { name: "Ocra", hex: "#c9994a" },
  { name: "Beige", hex: "#d9c9a8" },
  { name: "Turchese", hex: "#3aa6a6" },
  { name: "Azzurro", hex: "#7ab8d9" },
];

const PRICE_RANGES = ["0-500", "500-1000", "1000-3000", "3000+"];

const SHAPE_OPTIONS = ["Quadrato", "Rettangolare", "Altro"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
  onReset: () => void;
  supportOptions: string[];
  genreOptions: string[];
}

export default function FilterPanel({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  supportOptions,
  genreOptions,
}: Props) {
  const { t } = useI18n();
  /** Traduce un valore di dato (colore, forma, genere, supporto); fallback al valore italiano. */
  const tv = (prefix: string, value: string) => {
    const key = `${prefix}.${value}`;
    const out = t(key);
    return out === key ? value : out;
  };
  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const out: number[] = [];
    for (let y = currentYear; y >= 2000; y--) out.push(y);
    return out;
  }, [currentYear]);

  const toggleColor = (name: string) => {
    const has = filters.colors.includes(name);
    onChange({
      ...filters,
      colors: has ? filters.colors.filter((c) => c !== name) : [...filters.colors, name],
    });
  };

  const setField = <K extends keyof FiltersState>(key: K, val: FiltersState[K]) =>
    onChange({ ...filters, [key]: val });

  const chipBase =
    "px-3 py-1.5 rounded-full border text-[11px] tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap";
  const chipInactive =
    "border-[#1A1A1A]/70 text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5";
  const chipActive =
    "bg-[#1A1A1A] text-[#FDFCF0] border-[#1A1A1A] shadow-sm";

  const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <p
        className="text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A] font-medium mb-3"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        {label}
      </p>
      {children}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[88vh] overflow-y-auto bg-[#FDFCF0] border border-[#D4BE96]/40 p-0 gap-0 shadow-2xl rounded-xl">
        <div className="sticky top-0 bg-[#FDFCF0] z-10 px-8 md:px-12 pt-8 pb-4 flex justify-between items-start border-b border-[#1A1A1A]/20">
          <DialogTitle
            className="text-2xl md:text-3xl text-[#1A1A1A] font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("filter.title")}
          </DialogTitle>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
            aria-label={t("filter.close")}
          >
            <X size={22} />
          </button>
        </div>

        <div
          className="px-8 md:px-12 py-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {/* ANNO */}
          <Section label={t("filter.year")}>
            <select
              value={filters.year ?? ""}
              onChange={(e) => setField("year", e.target.value || null)}
              className="w-full h-10 rounded-md border border-[#1A1A1A]/70 bg-transparent px-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
            >
              <option value="">{t("filter.allYears")}</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </Section>

          {/* FORMA */}
          <Section label={t("filter.shape")}>
            <div className="flex flex-wrap gap-2">
              {SHAPE_OPTIONS.map((s) => {
                const active = filters.shape === s;
                return (
                  <button
                    key={s}
                    onClick={() => setField("shape", active ? null : s)}
                    className={`${chipBase} ${active ? chipActive : chipInactive}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* SUPPORTO */}
          {supportOptions.length > 0 && (
            <Section label={t("filter.support")}>
              <div className="flex flex-wrap gap-2">
                {supportOptions.map((s) => {
                  const active = filters.support === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setField("support", active ? null : s)}
                      className={`${chipBase} ${active ? chipActive : chipInactive}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </Section>
          )}

          {/* FASCIA DI PREZZO */}
          <Section label={t("filter.price")}>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((p) => {
                const active = filters.price === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => setField("price", active ? null : p.key)}
                    className={`${chipBase} ${active ? chipActive : chipInactive}`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* GENERE */}
          {genreOptions.length > 0 && (
            <Section label={t("filter.genre")}>
              <div className="flex flex-wrap gap-2">
                {genreOptions.map((g) => {
                  const active = filters.genre === g;
                  return (
                    <button
                      key={g}
                      onClick={() => setField("genre", active ? null : g)}
                      className={`${chipBase} ${active ? chipActive : chipInactive}`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </Section>
          )}

          {/* COLORI DOMINANTI — full width */}
          <div className="md:col-span-2">
            <Section label={t("filter.colors")}>
              <TooltipProvider delayDuration={100}>
                <div className="flex flex-wrap gap-3">
                  {COLOR_PALETTE.map((c) => {
                    const active = filters.colors.includes(c.name);
                    return (
                      <Tooltip key={c.name}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => toggleColor(c.name)}
                            aria-label={c.name}
                            aria-pressed={active}
                            className={`w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${
                              active
                                ? "ring-2 ring-offset-2 ring-offset-[#FDFCF0] ring-[#d4af7a] shadow-md"
                                : "ring-1 ring-[#1A1A1A]/50"
                            }`}
                            style={{
                              background: c.hex,
                              borderColor: c.border,
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          {c.name}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#FDFCF0] border-t border-[#1A1A1A]/20 px-8 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={onReset}
            className="text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A] hover:underline underline-offset-4 transition-colors"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Rimuovi filtri
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-md border border-[#1A1A1A] text-[#1A1A1A] text-[11px] tracking-[0.25em] uppercase hover:bg-[#1A1A1A] hover:text-[#FDFCF0] transition-colors"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Applica
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helpers ------------------------------------------------------------------

export function priceInRange(priceStr: string | undefined, range: string): boolean {
  if (!priceStr) return false;
  const clean = priceStr.replace(/[^\d]/g, "");
  if (!clean) return false;
  const n = parseInt(clean, 10);
  if (isNaN(n)) return false;
  switch (range) {
    case "0-500":
      return n >= 0 && n <= 500;
    case "500-1000":
      return n > 500 && n <= 1000;
    case "1000-3000":
      return n > 1000 && n <= 3000;
    case "3000+":
      return n > 3000;
    default:
      return true;
  }
}
