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
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
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
    // uscita simmetrica: opera → uscita fullscreen → velo
    setImgVisible(false);
    window.setTimeout(() => exitFullscreen(), 550);
    window.setTimeout(() => setVeilVisible(false), 650);
    window.setTimeout(() => onClose(), 1300);
  }, [exitFullscreen, onClose]);

  // Apertura: velo nero → fullscreen → opera
  useEffect(() => {
    if (!isOpen) return;
    closingRef.current = false;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers: number[] = [];

    // due frame prima di attivare la transizione: il browser registra lo stato iniziale
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setVeilVisible(true));
      timers.push(raf2);
    });

    // il fullscreen nativo parte quando il velo copre già la pagina
    timers.push(
      window.setTimeout(() => {
        const el = containerRef.current as FsElement | null;
        if (!el) return;
        try {
          if (el.requestFullscreen) {
            void Promise.resolve(el.requestFullscreen()).catch(() => {});
          } else if (el.webkitRequestFullscreen) {
            void Promise.resolve(el.webkitRequestFullscreen()).catch(() => {});
          }
        } catch {
          /* fullscreen simulato: l'overlay è già fixed inset-0 */
        }
      }, 620)
    );

    // l'opera emerge dal nero
    timers.push(window.setTimeout(() => setImgVisible(true), 780));
    // periodo di grazia: evita chiusure immediate dovute al click di apertura
    timers.push(
      window.setTimeout(() => {
        mouseRef.current.armed = true;
      }, 2200)
    );

    return () => {
      cancelAnimationFrame(raf1);
      timers.forEach((id) => {
        clearTimeout(id);
        cancelAnimationFrame(id);
      });
      mouseRef.current = { x: 0, y: 0, travelled: 0, armed: false, last: 0 };
      setVeilVisible(false);
      setImgVisible(false);
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
        className="flex items-center justify-center zen-breath transition-opacity duration-[800ms] ease-in-out"
        style={{ opacity: imgVisible ? 1 : 0, willChange: "transform, opacity" }}
      >
        <img
          src={imageUrl}
          alt={alt}
          draggable={false}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setNatural({ w: img.naturalWidth, h: img.naturalHeight });
            }
          }}
          className="object-contain"
          style={{
            // margine di sicurezza: al picco del respiro (1.03) l'opera resta interamente visibile
            maxWidth: natural ? `min(92vw, ${natural.w}px)` : "92vw",
            maxHeight: natural ? `min(92svh, ${natural.h}px)` : "92svh",
            width: "auto",
            height: "auto",
          }}
        />
      </div>

    </div>,
    document.body
  );
};

export default MeditationMode;
