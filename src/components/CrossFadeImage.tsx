import { useEffect, useRef, useState } from "react";

/**
 * Cross-Fade puro con dissolvenza simultanea.
 * - La nuova foto viene pre-caricata e decodificata PRIMA di iniziare.
 * - La nuova sfuma sopra lentamente (0 -> 1) e, NELLO STESSO ISTANTE,
 *   la vecchia sfuma via (1 -> 0) con la stessa durata: niente bordi
 *   della vecchia immagine che restano fermi a piena opacità.
 * - Solo a dissolvenza completata la vecchia viene rilasciata dal DOM.
 * Nessun nodo viene rimosso dal DOM durante la dissolvenza.
 */
interface Props {
  src: string;
  alt: string;
  className?: string;
  duration?: number; // ms
  eager?: boolean;
  onError?: () => void;
}

type Slot = { url: string; visible: boolean; shown: boolean; fading?: boolean };

const CrossFadeImage = ({ src, alt, className, duration = 1200, eager, onError }: Props) => {
  const [slots, setSlots] = useState<[Slot, Slot]>([
    { url: src, visible: true, shown: true },
    { url: "", visible: false, shown: false },
  ]);
  const [front, setFront] = useState(0);
  const frontRef = useRef(0);
  const currentRef = useRef(src);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!src || src === currentRef.current) return;
    currentRef.current = src;
    let cancelled = false;
    const pre = new Image();
    pre.src = src;
    const ready = pre.decode ? pre.decode().catch(() => {}) : Promise.resolve();
    ready.then(() => {
      if (cancelled || currentRef.current !== src) return;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      const next = frontRef.current === 0 ? 1 : 0;
      const old = frontRef.current;
      // nuova lastra in cima, trasparente; la vecchia inizia SUBITO a svanire
      setSlots((s) => {
        const c: [Slot, Slot] = [{ ...s[0] }, { ...s[1] }];
        c[next] = { url: src, visible: false, shown: true };
        c[old] = { ...c[old], visible: true, shown: true, fading: true };
        return c;
      });
      frontRef.current = next;
      setFront(next);
      // due frame: il browser registra opacità 0, poi parte la dissolvenza
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setSlots((s) => {
            const c: [Slot, Slot] = [{ ...s[0] }, { ...s[1] }];
            c[next].visible = true;
            return c;
          })
        )
      );
      // a dissolvenza completata la vecchia viene rilasciata in silenzio
      timers.current.push(
        window.setTimeout(() => {
          setSlots((s) => {
            const c: [Slot, Slot] = [{ ...s[0] }, { ...s[1] }];
            c[old].visible = false;
            return c;
          });
        }, duration + 50),
        window.setTimeout(() => {
          setSlots((s) => {
            const c: [Slot, Slot] = [{ ...s[0] }, { ...s[1] }];
            if (frontRef.current !== old) c[old] = { url: "", visible: false, shown: false };
            return c;
          });
        }, duration + 700)
      );
    });
    return () => {
      cancelled = true;
    };
  }, [src, duration]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <>
      {slots.map((s, i) =>
        s.url && s.shown ? (
          <img
            key={i}
            src={s.url}
            alt={i === front ? alt : ""}
            aria-hidden={i !== front}
            className={className}
            loading={eager ? "eager" : undefined}
            decoding="async"
            onError={i === front ? onError : undefined}
            style={{
              gridArea: "1 / 1",
              zIndex: i === front ? 2 : 1,
              opacity: s.visible && !s.fading ? 1 : 0,
              transition: `opacity ${i === front || s.fading ? duration : 600}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: "opacity",
              pointerEvents: i === front ? undefined : "none",
            }}
          />
        ) : null
      )}
    </>
  );
};

export default CrossFadeImage;
