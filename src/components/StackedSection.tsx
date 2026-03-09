import { useState, useEffect, useRef } from "react";
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
  coverImage,
}: StackedSectionProps) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Lazy load cover image when section is near viewport
  useEffect(() => {
    if (!coverImage || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [coverImage]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fallback Gradient */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* Cover Image with parallax (oversized for parallax effect) + hover zoom */}
      {coverImage && imageVisible && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "-25%",
              left: 0,
              right: 0,
              height: "150%",
              backgroundImage: `url(${coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </div>
      )}

      {/* Gradient overlay – softer, with side vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.75) 100%),
            linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.2) 100%)
          `,
        }}
      />

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
            className="text-6xl md:text-8xl mb-4 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-70"
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              color: "white",
            }}
          >
            {title}
          </h2>
          <div className="hidden md:block mt-6">
            <p
              className="text-sm text-white/70 hover:text-white transition-all duration-300 relative inline-block
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Enter →
            </p>
          </div>
        </motion.button>

        <motion.p
          className="text-lg md:text-xl mt-6 max-w-md"
          style={{ color: "rgba(255,255,255,0.85)" }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          viewport={{ once: false }}
        >
          {subtitle}
        </motion.p>

        <motion.button
          onClick={() => navigate(route)}
          className="md:hidden mt-8 px-4 py-2 border border-white/70 rounded-lg text-white/70 text-sm font-medium flex items-center gap-2"
          whileTap={{ scale: 0.95 }}
        >
          Enter
          <span>→</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StackedSection;
