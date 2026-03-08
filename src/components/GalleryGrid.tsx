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
const sizePattern = [
  { col: 2, row: 2 }, // grande quadrato
  { col: 1, row: 1 }, // piccolo
  { col: 1, row: 2 }, // verticale
  { col: 1, row: 1 }, // piccolo
  { col: 1, row: 1 }, // piccolo
  { col: 2, row: 1 }, // orizzontale largo
  { col: 1, row: 1 }, // piccolo
  { col: 1, row: 2 }, // verticale
  { col: 1, row: 1 }, // piccolo
  { col: 2, row: 2 }, // grande quadrato
  { col: 1, row: 1 }, // piccolo
  { col: 1, row: 1 }, // piccolo
];

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
            className="rounded-lg border border-border/50 overflow-hidden cursor-pointer group relative shadow-[0_4px_24px_-4px_rgba(255,255,255,0.08),0_8px_32px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_30px_-4px_rgba(255,255,255,0.12),0_12px_40px_-8px_rgba(0,0,0,0.7)] transition-shadow duration-500"
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
          </motion.div>
        );
      })}
    </div>
  );
};

export default GalleryGrid;
