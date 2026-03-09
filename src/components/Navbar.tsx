import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import LanguageToggle from "@/components/LanguageToggle";
import { useI18n } from "@/lib/i18n";

const HIDE_DELAY = 1500; // ms di inattività mouse prima di nascondere

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();
  const isHome = location.pathname === "/";

  // Detect touch device — disable auto-hide on mobile
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouchDevice) {
      setVisible(true);
      return;
    }

    const resetTimer = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), HIDE_DELAY);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    // Avvia il timer iniziale
    hideTimer.current = setTimeout(() => setVisible(false), HIDE_DELAY);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isTouchDevice]);

  const navItems = [
    { label: t("nav.home"), href: "/", scroll: false },
    { label: t("nav.bio"), href: "/bio", scroll: false },
    { label: t("nav.painting"), href: "/", scroll: "painting" },
    { label: t("nav.photography"), href: "/", scroll: "photography" },
    { label: t("nav.digitalArt"), href: "/", scroll: "digital-art" },
    { label: t("nav.tshirt"), href: "/", scroll: "t-shirt" },
    { label: t("nav.archive"), href: "/archive", scroll: false },
    { label: t("nav.contacts"), href: "/", scroll: "contacts" },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setIsOpen(false);

    if (item.label === t("nav.home")) {
      window.location.href = "/";
      return;
    }

    if (!item.scroll) {
      navigate(item.href);
      return;
    }

    if (location.pathname === "/") {
      const element = document.getElementById(item.scroll as string);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/?scrollTo=" + item.scroll);
    }
  };

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => {
    return (
      <button
        onClick={() => handleNavClick(item)}
        className="relative px-3 py-2 text-sm tracking-wider uppercase text-white transition-all duration-300 hover:text-white/50 group"
        style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400, letterSpacing: "0.14em", fontSize: "0.95rem" }}
      >
        <motion.span
          className="inline-block"
          whileHover={{ y: [-2, 2, -2, 0] }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          {item.label}
        </motion.span>
      </button>
    );
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full bg-transparent border-b border-transparent transition-opacity duration-500"
      style={{ opacity: visible || isOpen ? 1 : 0, pointerEvents: visible || isOpen ? "auto" : "none" }}
      role="navigation"
      aria-label="Menu principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center w-full gap-1">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
            <div className="ml-2">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-accent transition-colors"
              aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
            role="menu"
          >
            {navItems.map((item) => (
              <div key={item.label} role="none">
                <button
                  onClick={() => handleNavClick(item)}
                  role="menuitem"
                  className="w-full text-left px-4 py-2 text-foreground/90 hover:text-white hover:bg-secondary/50 rounded transition-colors"
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, letterSpacing: "0.12em", fontSize: "0.75rem", textTransform: "uppercase" }}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
