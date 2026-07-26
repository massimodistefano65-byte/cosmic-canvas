import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";
import { useI18n } from "@/lib/i18n";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  className?: string;
}

const AudioToggle = ({ className = "" }: Props) => {
  const { enabled, toggle } = useAudio();
  const { t } = useI18n();
  const label = enabled ? t("audio.mute") : t("audio.play");

  const button = (
    <button
      onClick={toggle}
      aria-label={label}
      aria-pressed={enabled}
      className={`relative px-3 py-2 text-white brightness-125 transition-all duration-300 hover:text-white/50 ${className}`}
    >
      <motion.span
        className="inline-flex items-center justify-center"
        whileHover={{ y: [-2, 2, -2, 0] }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        {enabled ? (
          <motion.span
            className="inline-flex"
            animate={{ opacity: [1, 0.55, 1], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Volume2 size={20} strokeWidth={1.5} aria-hidden="true" />
          </motion.span>
        ) : (
          <VolumeX size={20} strokeWidth={1.5} aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="bottom" className="hidden md:block">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default AudioToggle;
