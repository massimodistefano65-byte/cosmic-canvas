import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from "react";

type Section = string | null;

interface AudioContextValue {
  enabled: boolean;
  toggle: () => void;
  setSection: (section: Section) => void;
  currentSection: Section;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

const TARGET_VOLUME = 0.35;
const FADE_MS = 1500;
const FADE_STEPS = 30;

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("audio-enabled") === "true";
  });
  const [currentSection, setCurrentSectionState] = useState<Section>(null);

  const audioARef = useRef<HTMLAudioElement | null>(null);
  const audioBRef = useRef<HTMLAudioElement | null>(null);
  const activeRef = useRef<"A" | "B">("A");
  const playingSrcRef = useRef<string | null>(null);
  const fadeTimers = useRef<number[]>([]);

  // Init audio elements
  useEffect(() => {
    const a = new Audio();
    const b = new Audio();
    a.loop = true;
    b.loop = true;
    a.volume = 0;
    b.volume = 0;
    a.preload = "auto";
    b.preload = "auto";
    audioARef.current = a;
    audioBRef.current = b;
    return () => {
      a.pause();
      b.pause();
      audioARef.current = null;
      audioBRef.current = null;
    };
  }, []);

  const clearFades = () => {
    fadeTimers.current.forEach((t) => clearInterval(t));
    fadeTimers.current = [];
  };

  const fadeTo = useCallback((el: HTMLAudioElement, target: number, onDone?: () => void) => {
    const start = el.volume;
    const delta = target - start;
    if (Math.abs(delta) < 0.01) {
      el.volume = target;
      onDone?.();
      return;
    }
    let step = 0;
    const interval = window.setInterval(() => {
      step++;
      const next = start + (delta * step) / FADE_STEPS;
      el.volume = Math.max(0, Math.min(1, next));
      if (step >= FADE_STEPS) {
        clearInterval(interval);
        el.volume = target;
        onDone?.();
      }
    }, FADE_MS / FADE_STEPS);
    fadeTimers.current.push(interval);
  }, []);

  // Crossfade to a new src
  const crossfadeTo = useCallback(
    (src: string | null) => {
      const a = audioARef.current;
      const b = audioBRef.current;
      if (!a || !b) return;

      const incoming = activeRef.current === "A" ? b : a;
      const outgoing = activeRef.current === "A" ? a : b;

      // Fade out current
      if (!outgoing.paused) {
        fadeTo(outgoing, 0, () => outgoing.pause());
      }

      if (!src) {
        playingSrcRef.current = null;
        return;
      }

      // Setup incoming
      incoming.src = src;
      incoming.volume = 0;
      const playPromise = incoming.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Silent: file missing or autoplay blocked
        });
      }
      fadeTo(incoming, TARGET_VOLUME);
      activeRef.current = activeRef.current === "A" ? "B" : "A";
      playingSrcRef.current = src;
    },
    [fadeTo]
  );

  const setSection = useCallback((section: Section) => {
    setCurrentSectionState(section);
  }, []);

  // React to enabled + section changes
  useEffect(() => {
    clearFades();
    if (!enabled || !currentSection) {
      const a = audioARef.current;
      const b = audioBRef.current;
      if (a && !a.paused) fadeTo(a, 0, () => a.pause());
      if (b && !b.paused) fadeTo(b, 0, () => b.pause());
      playingSrcRef.current = null;
      return;
    }
    const src = `/audio/${currentSection}.mp3`;
    if (src === playingSrcRef.current) return;
    crossfadeTo(src);
  }, [enabled, currentSection, crossfadeTo, fadeTo]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("audio-enabled", String(next));
      return next;
    });
  }, []);

  return (
    <AudioCtx.Provider value={{ enabled, toggle, setSection, currentSection }}>
      {children}
    </AudioCtx.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
