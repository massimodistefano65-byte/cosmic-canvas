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
  const [veilVisible, setVeilVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const closingRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, travelled: 0, armed: false, last: 0 });

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
    // uscita simmetrica: prima svanisce l'opera, poi il velo nero
    setImgVisible(false);
    window.setTimeout(() => setVeilVisible(false), 500);
    window.setTimeout(() => {
      exitFullscreen();
      onClose();
    }, 1000);
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

    const raf = requestAnimationFrame(() => setVeilVisible(true));
    // l'opera emerge dal nero con un leggero ritardo
    const imgTimer = window.setTimeout(() => setImgVisible(true), 300);
    // periodo di grazia: evita chiusure immediate dovute al click di apertura
    const arm = window.setTimeout(() => {
      mouseRef.current.armed = true;
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(imgTimer);
      clearTimeout(arm);
      mouseRef.current = { x: 0, y: 0, travelled: 0, armed: false, last: 0 };
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
      const now = Date.now();
      if (m.x === 0 && m.y === 0) {
        m.x = e.clientX;
        m.y = e.clientY;
        m.last = now;
        return;
      }
      // reset dopo una pausa: solo un gesto ampio e continuo chiude
      if (now - m.last > 1200) m.travelled = 0;
      m.last = now;
      m.travelled += Math.abs(e.clientX - m.x) + Math.abs(e.clientY - m.y);
      m.x = e.clientX;
      m.y = e.clientY;
      if (m.travelled > 100) requestClose();
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-[600ms] ease-in-out cursor-none"
      style={{ opacity: veilVisible ? 1 : 0, touchAction: "none" }}
    >
      <div
        className="flex items-center justify-center max-w-full max-h-full zen-breath transition-opacity duration-[800ms] ease-in-out"
        style={{ opacity: imgVisible ? 1 : 0, willChange: "transform, opacity" }}
      >
        <img
          src={imageUrl}
          alt={alt}
          draggable={false}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>,
    document.body
  );
};

export default MeditationMode;
