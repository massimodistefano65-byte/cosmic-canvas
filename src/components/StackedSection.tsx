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
}

const StackedSection = ({
  id,
  title,
  subtitle,
  gradient,
  route,
  index,
  total,
}: StackedSectionProps) => {
  const navigate = useNavigate();
  const isLast = index === total - 1;

  return (
    <motion.div
      id={id}
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden ${
        index > 0 ? "sticky top-0" : ""
      }`}
      style={{
        zIndex: total - index,
      }}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 ${gradient}`}
        style={{
          background: gradient,
        }}
      />

      {/* Overlay for consistency */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Stacked Effect - Scale down previous card */}
      {index > 0 && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        {/* Title - Interactive */}
        <motion.button
          onClick={() => navigate(route)}
          className="group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <h2 className="text-6xl md:text-8xl font-bold text-foreground mb-4 transition-colors group-hover:text-accent">
            {title}
          </h2>

          {/* Micro-text reveal on hover - Desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block mt-6"
          >
            <p className="text-sm text-accent">Entra nella galleria →</p>
          </motion.div>
        </motion.button>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mt-6 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>

        {/* Mobile button indicator */}
        <motion.div
          className="md:hidden mt-8 px-4 py-2 border border-foreground rounded-lg text-foreground text-sm font-medium flex items-center gap-2"
          whileHover={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Entra nella galleria
          <span>→</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StackedSection;
