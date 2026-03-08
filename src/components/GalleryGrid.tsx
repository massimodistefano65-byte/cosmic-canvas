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
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3 space-y-3" role="list" aria-label={`Galleria ${discipline}`}>
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          role="listitem"
          className="break-inside-avoid rounded-lg border border-border/50 overflow-hidden cursor-pointer group relative"
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
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="w-full aspect-square transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              }}
              role="img"
              aria-label={item.title}
            />
          )}

          {/* Hover overlay with title slide-up */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end">
            <p
              className="text-white font-medium text-sm p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out"
            >
              {item.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;
