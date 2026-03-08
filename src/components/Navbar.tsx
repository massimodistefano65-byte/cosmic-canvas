import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/", scroll: false },
    { label: "Bio", href: "/bio", scroll: false },
    { label: "Painting", href: "/", scroll: "painting" },
    { label: "Photography", href: "/", scroll: "photography" },
    { label: "Digital Art", href: "/", scroll: "digital-art" },
    { label: "T-Shirt", href: "/", scroll: "t-shirt" },
    { label: "Criticism", href: "/criticism", scroll: false },
    { label: "Contacts", href: "/", scroll: "contacts" },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setIsOpen(false);

    // "Home" always goes to / top
    if (item.label === "Home") {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
      return;
    }

    // Bio / Criticism → navigate to their page
    if (!item.scroll) {
      navigate(item.href);
      return;
    }

    // Scroll items: always go through homepage
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
        className="relative px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent group"
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
    <nav className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center w-full gap-1">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary/50 rounded transition-colors"
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
