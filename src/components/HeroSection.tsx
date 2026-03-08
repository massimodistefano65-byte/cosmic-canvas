import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useI18n();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/images/hero-background.jpg";
  }, []);

  // Faster animations on revisit (sessionStorage flag)
  const isRevisit = sessionStorage.getItem("heroSeen") === "1";
  useEffect(() => { sessionStorage.setItem("heroSeen", "1"); }, []);
  const d = isRevisit ? 0.15 : 0.8; // base duration
  const baseDelay = isRevisit ? 0.1 : 0.8;

  const scrollToSection = () => {
    const element = document.getElementById("painting");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background Image with Ken Burns */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0, scale: [1, 1.07] }}
        transition={{ opacity: { duration: isRevisit ? 0.3 : 0.6 }, scale: { duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } }}
      >
        <img
          src="/images/hero-background.jpg"
          alt="Hero background artwork"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.78) 85%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Content - Bottom Left */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-0" style={{ paddingBottom: "6rem", maxWidth: "100vw" }}>
        <div className="flex flex-col items-start text-left" style={{ paddingLeft: "clamp(1rem, 5vw, 4.5rem)" }}>
          <motion.h1
            className="leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#ffffff",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d, delay: baseDelay, ease: "easeOut" }}
          >
            <span className="block md:inline" style={{ fontWeight: 300, fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>Massimo </span>
            <span className="block md:inline" style={{ fontWeight: 600, fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>Di Stefano</span>
          </motion.h1>

          {/* Gold Line */}
          <motion.div
            style={{
              height: "1px",
              backgroundColor: "#d4af7a",
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
            }}
            initial={{ width: 0 }}
            animate={{ width: 110 }}
            transition={{ duration: d, delay: baseDelay + 0.4 * (isRevisit ? 0.3 : 1), ease: "easeOut" }}
          />

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 300,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.65rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d, delay: baseDelay + 0.6 * (isRevisit ? 0.3 : 1), ease: "easeOut" }}
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 p-2 hover:text-accent transition-colors text-muted-foreground"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </motion.button>
    </div>
  );
};

export default HeroSection;
