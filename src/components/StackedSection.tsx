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
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.button
          onClick={() => navigate(route)}
          className="group cursor-pointer"
          whileTap={{ scale: 0.98 }}
        >
          <h2
            className="text-6xl md:text-8xl text-foreground mb-4 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-70"
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
            }}
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
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
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
