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

const GalleryGrid = ({ items, discipline, gradientFrom, gradientTo }: GalleryGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="columns-2 md:columns-4 gap-12 space-y-12" role="list" aria-label={`Galleria ${discipline}`}>
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          role="listitem"
          className="break-inside-avoid rounded-lg border border-border/50 overflow-hidden cursor-pointer group relative"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          viewport={{ once: false }}
          onClick={() => navigate(`/${discipline}/${item.id}`)}
        >
          {item.thumbnailUrl ? (
            <img
              src={item.thumbnailUrl}
              alt={`${item.title} di Massimo Di Stefano`}
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="w-full aspect-square"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              }}
              role="img"
              aria-label={item.title}
            />
          )}

          {/* Hover overlay with title */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end">
            <motion.p
              className="text-white font-medium text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
            >
              {item.title}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;
