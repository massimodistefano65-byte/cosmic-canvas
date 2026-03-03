import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface StackedSectionProps {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  route: string;
  index: number;
  total: number;
  coverImage?: string;
}

const StackedSection = ({
  id,
  title,
  subtitle,
  gradient,
  route,
  index,
  coverImage,
}: StackedSectionProps) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id={id}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fallback Gradient */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* Cover Image with zoom on hover */}
      {coverImage && (
        <div
          className="absolute inset-0 transition-transform duration-[1.5s] ease-out"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.button
          onClick={() => navigate(route)}
          className="group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <h2
            className="text-6xl md:text-8xl font-bold text-foreground mb-4 transition-colors group-hover:text-accent"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            {title}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block mt-6"
          >
            <p className="text-sm text-accent">Entra nella galleria →</p>
          </motion.div>
        </motion.button>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mt-6 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="md:hidden mt-8 px-4 py-2 border border-foreground rounded-lg text-foreground text-sm font-medium flex items-center gap-2"
          whileHover={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Entra nella galleria
          <span>→</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StackedSection;
