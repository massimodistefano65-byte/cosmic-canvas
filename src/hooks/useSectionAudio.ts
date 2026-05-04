import { useEffect } from "react";
import { useAudio } from "@/components/AudioProvider";

/**
 * Registra la sezione musicale corrente.
 * Il provider caricherà /audio/{section}.mp3 in crossfade.
 * Se l'utente ha l'audio spento, non succede nulla finché non lo accende.
 */
export const useSectionAudio = (section: string) => {
  const { setSection } = useAudio();
  useEffect(() => {
    setSection(section);
  }, [section, setSection]);
};
