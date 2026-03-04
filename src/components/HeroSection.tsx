import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = () => {
    const element = document.getElementById("painting");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient animated-mesh" />

      {/* Animated blobs for nebula effect */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
        <div /> {/* Spacer for top alignment */}

        <div className="flex flex-col gap-8 justify-end h-full pb-24">
          {/* Name - Bottom Left */}
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-foreground leading-tight whitespace-nowrap">
              Massimo Di Stefano
            </h1>
          </motion.div>

          {/* Subtitle - Bottom Right */}
          <motion.div
            className="max-w-md ml-auto text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Artista visivo e pittore cosmico visionario
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Absolutely positioned at bottom center */}
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
