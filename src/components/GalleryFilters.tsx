import { motion } from "framer-motion";

export interface FilterOption {
  key: string;
  label: string;
}

interface Props {
  colors?: FilterOption[];
  shapes?: FilterOption[];
  genres?: FilterOption[];
  activeFilters: Record<string, string | null>;
  onChange: (category: string, value: string | null) => void;
}

export default function GalleryFilters({ colors, shapes, genres, activeFilters, onChange }: Props) {
  const categories = [
    { key: "color", label: "Colore", options: colors },
    { key: "shape", label: "Forma", options: shapes },
    { key: "genre", label: "Genere", options: genres },
  ].filter((c) => c.options && c.options.length > 0);

  if (categories.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap items-center gap-4 mb-8"
    >
      {categories.map((cat) => (
        <div key={cat.key} className="flex items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60">
            {cat.label}
          </span>
          <div className="flex items-center gap-1.5">
            {cat.options!.map((opt) => {
              const active = activeFilters[cat.key] === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => onChange(cat.key, active ? null : opt.key)}
                  className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase border transition-all duration-300 ${
                    active
                      ? "border-foreground/40 text-foreground bg-white/5"
                      : "border-border/30 text-muted-foreground/60 hover:border-foreground/20 hover:text-foreground/80"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {Object.values(activeFilters).some(Boolean) && (
        <button
          onClick={() => onChange("reset", null)}
          className="text-[10px] tracking-wider uppercase text-accent hover:underline"
        >
          Reset
        </button>
      )}
    </motion.div>
  );
}
