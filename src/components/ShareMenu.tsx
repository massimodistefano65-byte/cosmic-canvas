import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";

interface Props {
  url: string;
  title: string;
}

export default function ShareMenu({ url, title }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  const shareOptions = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${fullUrl}`)}`,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Condividi"
        className="w-9 h-9 rounded-full border border-border/40 text-muted-foreground/80 hover:border-foreground/30 hover:text-foreground transition-all duration-300 flex items-center justify-center"
      >
        <Share2 size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 w-44 rounded-lg border border-border/40 bg-background/95 backdrop-blur-xl shadow-xl p-2"
          >
            {shareOptions.map((opt) => (
              <a
                key={opt.name}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-xs tracking-wider uppercase text-foreground/80 hover:text-foreground hover:bg-white/5 rounded transition-colors"
              >
                {opt.name}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="w-full text-left px-3 py-2 text-xs tracking-wider uppercase text-foreground/80 hover:text-foreground hover:bg-white/5 rounded transition-colors flex items-center gap-2"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copiato" : "Copia link"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
