import { useCallback } from "react";
import { playDrum } from "../audio/drumSynth";
import type { DrumSound } from "../data/pads";

export function useAudioEngine() {
  const playSound = useCallback((type: DrumSound) => {
    playDrum(type);
  }, []);

  return { playSound };
}
