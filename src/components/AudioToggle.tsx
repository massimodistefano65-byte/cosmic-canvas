import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

interface Props {
  className?: string;
}

const AudioToggle = ({ className = "" }: Props) => {
  const { enabled, toggle, currentSection } = useAudio();

  if (!currentSection) return null;

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Disattiva musica" : "Attiva musica"}
      className={`px-2 py-1 text-white hover:text-white/70 transition-all duration-300 inline-flex items-center justify-center ${className}`}
      style={{ filter: "brightness(1.25)" }}
    >
      {enabled ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
    </button>
  );
};

export default AudioToggle;
