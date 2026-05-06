import { motion } from "framer-motion";
import { useAudio } from "./AudioProvider";

interface Props {
  className?: string;
}

const AudioToggle = ({ className = "" }: Props) => {
  const { enabled, toggle } = useAudio();
  const label = enabled ? "MUSIC ON" : "MUSIC OFF";

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Disattiva musica" : "Attiva musica"}
      aria-pressed={enabled}
      className={`relative px-3 py-2 text-white brightness-125 transition-all duration-300 hover:text-white/50 ${className}`}
      style={{
        fontFamily: "'Raleway', sans-serif",
        fontWeight: 400,
        letterSpacing: "0.14em",
        fontSize: "1.1rem",
        textTransform: "uppercase",
      }}
    >
      <motion.span
        className="inline-block"
        whileHover={{ y: [-2, 2, -2, 0] }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        {label}
      </motion.span>
    </button>
  );
};

export default AudioToggle;
