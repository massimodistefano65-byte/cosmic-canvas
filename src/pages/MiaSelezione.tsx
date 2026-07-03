import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { getWishlist } from "@/hooks/useWishlist";
import { useState, useEffect } from "react";

export default function MiaSelezione() {
  const navigate = useNavigate();
  const [items, setItems] = useState(getWishlist());

  useEffect(() => {
    setItems(getWishlist());
  }, []);

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-20 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <Heart size={48} className="text-muted-foreground/20 mb-4" />
        <h1 className="text-2xl font-light tracking-wide mb-2" style={{ fontFamily: "'Raleway', sans-serif" }}>
          La mia selezione
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Non hai ancora aggiunto opere ai preferiti.
        </p>
        <button
          onClick={() => navigate("/archive")}
          className="text-xs tracking-wider uppercase border border-border/40 px-5 py-2 rounded-full hover:border-foreground/30 transition-colors"
        >
          Esplora l'archivio
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 px-6 md:px-12">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate("/archive")}
          className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/80 hover:text-foreground hover:border-foreground/30 transition-all"
          aria-label="Torna indietro"
        >
          <ArrowLeft size={14} />
        </button>
        <h1 className="text-2xl font-light tracking-wide" style={{ fontFamily: "'Raleway', sans-serif" }}>
          La mia selezione
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="cursor-pointer group relative rounded-lg overflow-hidden"
            onClick={() => navigate(`/${item.discipline}/${item.id}`)}
          >
            <div className="absolute -inset-[3px] rounded-lg opacity-50 group-hover:opacity-80 transition-opacity duration-700 blur-[6px] pointer-events-none bg-white/50" />
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-white/5">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end">
                <p className="text-white font-medium text-sm p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {item.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
