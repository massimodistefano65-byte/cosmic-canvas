import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Painting = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Back Button */}
          <Link
            to="/"
            onClick={() => {
              const element = document.getElementById("painting");
              if (element) {
                setTimeout(() => {
                  element.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            <span>Torna alle discipline</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Painting
            </h1>

            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Le opere pittoriche di Massimo Di Stefano esplorano il confine
                tra il cosmo interno e l'universo esterno. Attraverso l'uso di
                colori vivaci, composizioni dinamiche e tecniche miste, l'artista
                crea ambienti visivi immersivi che invitano lo spettatore a
                riflettere sulla propria percezione della realtà.
              </p>
            </div>

            {/* Gallery Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-border/50 flex items-center justify-center cursor-pointer hover:border-accent/50 transition-all group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: item * 0.05 }}
                  viewport={{ once: false }}
                >
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">
                      Opera {item}
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-1">
                      In arrivo
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                Le gallerie complete saranno disponibili presto
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Painting;
