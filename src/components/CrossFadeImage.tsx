import { useEffect, useRef, useState } from "react";

/**
 * Cross-Fade puro: due "lastre" fisse che si alternano.
 * - La nuova foto viene pre-caricata e decodificata PRIMA di iniziare.
 * - La vecchia resta ferma al 100% sotto; la nuova sfuma sopra lentamente.
 * - Solo a copertura completata la vecchia si spegne (nessun nero, nessun salto).
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

type Slot = { url: string; visible: boolean; shown: boolean };

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
      // nuova lastra in cima, trasparente
      setSlots((s) => {
        const c: [Slot, Slot] = [{ ...s[0] }, { ...s[1] }];
        c[next] = { url: src, visible: false, shown: true };
        c[old] = { ...c[old], visible: true, shown: true };
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
      // a copertura completata la vecchia si spegne dolcemente (solo bordi eventuali)
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
            if (frontRef.current !== old) c[old].shown = false;
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
        s.url ? (
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
              opacity: s.visible ? 1 : 0,
              display: s.shown ? undefined : "none",
              transition: `opacity ${i === front ? duration : 600}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: "opacity",
            }}
          />
        ) : null
      )}
    </>
  );
};

export default CrossFadeImage;
