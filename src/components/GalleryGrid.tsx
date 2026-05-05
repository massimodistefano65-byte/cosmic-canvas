import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getSlugGradient } from "@/lib/slugGradient";

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

const patternA = [
  { col: 2, row: 2 }, { col: 1, row: 1 }, { col: 1, row: 2 },
  { col: 1, row: 1 }, { col: 1, row: 1 }, { col: 2, row: 1 },
];
const patternB = [
  { col: 1, row: 1 }, { col: 1, row: 2 }, { col: 2, row: 2 },
  { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 1, row: 1 },
];
const patternC = [
  { col: 1, row: 1 }, { col: 2, row: 2 }, { col: 1, row: 1 },
  { col: 1, row: 2 }, { col: 1, row: 1 }, { col: 2, row: 1 },
];
const patternD = [
  { col: 2, row: 1 }, { col: 1, row: 1 }, { col: 1, row: 1 },
  { col: 1, row: 1 }, { col: 1, row: 2 }, { col: 2, row: 2 },
];
const allPatterns = [patternA, patternB, patternC, patternD];

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

const GalleryGrid = ({ items, discipline }: GalleryGridProps) => {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    sessionStorage.setItem(`scroll:${discipline}`, String(window.scrollY));
    navigate(`/${discipline}/${id}`);
  };

  return (
    <div
      className="grid grid-cols-3 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px] gap-5 md:gap-7"
      role="list"
      aria-label={`Galleria ${discipline}`}
    >
      {items.map((item, idx) => {
        const size = getSizeForIndex(idx);
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
            transition={{ duration: 0.5, delay: (idx % 12) * 0.04 }}
            viewport={{ once: true }}
            onClick={() => handleSelect(item.id)}
          >
            <div className="absolute -inset-[3px] rounded-lg opacity-50 group-hover:opacity-80 transition-opacity duration-700 blur-[6px] pointer-events-none bg-white/50" />
            <div className="relative rounded-lg overflow-hidden w-full h-full border border-white/5">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={`${item.title} di Massimo Di Stefano`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "block";
                  }}
                />
              ) : null}
              <div
                className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  background: getSlugGradient(item.id),
                  display: item.thumbnailUrl ? "none" : "block",
                }}
                role="img"
                aria-label={item.title}
              />
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
