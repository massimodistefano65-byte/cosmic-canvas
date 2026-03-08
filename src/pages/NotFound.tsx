import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-4">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-[8rem] md:text-[12rem] leading-none font-light tracking-tight text-muted-foreground/20"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          404
        </h1>
        <p className="text-lg text-muted-foreground font-light tracking-wide">
          Pagina non trovata / Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Torna alla Home</span>
        </Link>
      </motion.div>
    </main>
  );
};

export default NotFound;
