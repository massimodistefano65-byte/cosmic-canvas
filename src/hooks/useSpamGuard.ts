import { useCallback, useRef, useState } from "react";

/** Protezione anti-spam invisibile: campo trappola + invio non accettato prima di 3 secondi. */
export function useSpamGuard(minMs = 3000) {
  const start = useRef(Date.now());
  const [trap, setTrap] = useState("");
  const isBot = useCallback(() => trap.trim() !== "" || Date.now() - start.current < minMs, [trap, minMs]);
  const reset = useCallback(() => { start.current = Date.now(); setTrap(""); }, []);
  const trapProps = {
    type: "text", name: "website", tabIndex: -1, autoComplete: "off", "aria-hidden": true as const,
    value: trap, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTrap(e.target.value),
    style: { position: "absolute" as const, left: "-9999px", width: 1, height: 1, opacity: 0 },
  };
  return { isBot, reset, trapProps };
}
