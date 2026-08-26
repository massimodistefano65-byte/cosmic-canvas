import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface MeditationModeProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

type FsElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

/**
 * Modalità Meditazione (Zen Mode).
 * Overlay immersivo, completamente modulare: nessuna dipendenza dal layout
 * della pagina. Se il Fullscreen nativo non è disponibile (iOS/Safari)
 * ricade su un "fullscreen simulato" (fixed inset-0) con identico impatto visivo.
 */
const MeditationMode = ({ isOpen, onClose, imageUrl, alt }: MeditationModeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, travelled: 0, armed: false });

  const exitFullscreen = useCallback(() => {
    const d = document as FsDocument;
    try {
      if (d.fullscreenElement && d.exitFullscreen) {
        void Promise.resolve(d.exitFullscreen()).catch(() => {});
      } else if (d.webkitFullscreenElement && d.webkitExitFullscreen) {
        void Promise.resolve(d.webkitExitFullscreen()).catch(() => {});
      }
    } catch {
      /* ignore */
    }
  }, []);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    exitFullscreen();
    window.setTimeout(() => onClose(), 600);
  }, [exitFullscreen, onClose]);

  // Apertura: fullscreen (se possibile) + fade-in + blocco scroll
  useEffect(() => {
    if (!isOpen) return;
    closingRef.current = false;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const el = containerRef.current as FsElement | null;
    if (el) {
      try {
        if (el.requestFullscreen) {
          void Promise.resolve(el.requestFullscreen()).catch(() => {});
        } else if (el.webkitRequestFullscreen) {
          void Promise.resolve(el.webkitRequestFullscreen()).catch(() => {});
        }
      } catch {
        /* fullscreen simulato: l'overlay è già fixed inset-0 */
      }
    }

    const raf = requestAnimationFrame(() => setVisible(true));
    // periodo di grazia: evita chiusure immediate dovute al click di apertura
    const arm = window.setTimeout(() => {
      mouseRef.current.armed = true;
    }, 1200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(arm);
      mouseRef.current = { x: 0, y: 0, travelled: 0, armed: false };
      document.body.style.overflow = prevOverflow;
      exitFullscreen();
    };
  }, [isOpen, exitFullscreen]);

  // Uscite: ESC, movimento mouse significativo, chiusura esterna del fullscreen
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    const onMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      if (!m.armed) return;
      if (m.x === 0 && m.y === 0) {
        m.x = e.clientX;
        m.y = e.clientY;
        return;
      }
      m.travelled += Math.abs(e.clientX - m.x) + Math.abs(e.clientY - m.y);
      m.x = e.clientX;
      m.y = e.clientY;
      if (m.travelled > 40) requestClose();
    };
    const onFsChange = () => {
      const d = document as FsDocument;
      const active = d.fullscreenElement || d.webkitFullscreenElement;
      if (!active && !closingRef.current) requestClose();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, [isOpen, requestClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={requestClose}
      onTouchEnd={requestClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ease-out cursor-none"
      style={{ opacity: visible ? 1 : 0, touchAction: "none" }}
    >
      <img
        src={imageUrl}
        alt={alt}
        draggable={false}
        className="max-w-full max-h-full object-contain zen-breath"
        style={{ willChange: "transform" }}
      />
    </div>,
    document.body
  );
};

export default MeditationMode;
