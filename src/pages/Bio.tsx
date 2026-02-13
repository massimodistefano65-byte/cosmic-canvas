import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Bio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
              Biography
            </h1>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Massimo Di Stefano is a visionary contemporary artist working
                across multiple disciplines including painting, photography,
                digital art, and wearable design.
              </p>

              <p>
                Born from a deep fascination with cosmic themes and inner vision,
                his work explores the intersection between the tangible and
                ethereal, creating immersive visual experiences that challenge
                perception.
              </p>

              <p>
                His artistic practice is rooted in minimalist aesthetics and
                maximalist emotion—each piece carefully crafted to evoke a sense
                of cosmic wonder and philosophical depth.
              </p>

              <div className="pt-8 border-t border-border/50">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Practice
                </h2>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent">→</span>
                    <span>Oil and acrylic on canvas</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">→</span>
                    <span>Fine art photography</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">→</span>
                    <span>Digital composition and manipulation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">→</span>
                    <span>Limited edition apparel design</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
