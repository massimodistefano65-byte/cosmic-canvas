import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

const AudioToggle = () => {
  const { enabled, toggle, currentSection } = useAudio();

  // Hide entirely if no section is registered (e.g. error pages)
  if (!currentSection) return null;

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Disattiva musica" : "Attiva musica"}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full border border-border/40 bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all duration-300 opacity-60 hover:opacity-100"
    >
      {enabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
    </button>
  );
};

export default AudioToggle;
