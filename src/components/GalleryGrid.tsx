import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface ArtworkItem {
  id: string;
  title: string;
  thumbnailUrl: string;
}

interface GalleryGridProps {
  items: ArtworkItem[];
  discipline: string;
  gradientFrom: string;
  gradientTo: string;
}

/**
 * Pattern di dimensioni per creare asimmetria tipo "muro antico".
 * Ogni item ha una dimensione nella griglia (colSpan x rowSpan).
 * Il pattern si ripete ciclicamente.
 */
/**
 * 4 pattern diversi per evitare ripetitività.
 * I blocchi grandi (2×2, 2×1) cadono in posizioni diverse
 * così il layout sembra randomizzato ma resta controllato.
 */
const patternA = [
  // 2×2 a SINISTRA
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
];

const patternB = [
  // 2×2 a DESTRA (piccole prima, poi il grande)
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
];

const patternC = [
  // 2×2 al CENTRO (piccola, grande, piccola)
  { col: 1, row: 1 },
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
];

const patternD = [
  // orizzontale largo prima, poi 2×2 a destra
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 2, row: 2 },
];

const allPatterns = [patternA, patternB, patternC, patternD];

/** Dato un indice globale, restituisce la dimensione dal pattern corretto */
const getSizeForIndex = (idx: number) => {
  let cumulative = 0;
  let patternIdx = 0;
  while (true) {
    const pattern = allPatterns[patternIdx % allPatterns.length];
    if (idx < cumulative + pattern.length) {
      return pattern[idx - cumulative];
    }
    cumulative += pattern.length;
    patternIdx++;
  }
};

const GalleryGrid = ({ items, discipline, gradientFrom, gradientTo }: GalleryGridProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="grid grid-cols-3 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px] gap-5 md:gap-7"
      role="list"
      aria-label={`Galleria ${discipline}`}
    >
      {items.map((item, idx) => {
        const size = sizePattern[idx % sizePattern.length];
        return (
          <motion.div
            key={item.id}
            role="listitem"
            className="rounded-lg overflow-visible cursor-pointer group relative"
            style={{
              gridColumn: `span ${size.col}`,
              gridRow: `span ${size.row}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            viewport={{ once: false }}
            onClick={() => navigate(`/${discipline}/${item.id}`)}
          >
            {/* LED glow behind the artwork */}
            <div className="absolute -inset-[3px] rounded-lg opacity-50 group-hover:opacity-80 transition-opacity duration-700 blur-[6px] pointer-events-none bg-white/50"
            />
            <div className="relative rounded-lg overflow-hidden w-full h-full border border-white/5">
            {item.thumbnailUrl ? (
              <img
                src={item.thumbnailUrl}
                alt={`${item.title} di Massimo Di Stefano`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                }}
                role="img"
                aria-label={item.title}
              />
            )}

            {/* Hover overlay with title slide-up */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end">
              <p className="text-white font-medium text-sm p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                {item.title}
              </p>
            </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GalleryGrid;
