import { useCallback, useRef, useState } from "react";
import type { DrumSound, HapticInput } from "../data/pads";
import { PADS } from "../data/pads";
import type { BeatPattern } from "../data/beats";

interface UseDrumMachineProps {
  playSound: (type: DrumSound) => void;
  triggerHaptic: (pattern: HapticInput) => void;
}

export function useDrumMachine({ playSound, triggerHaptic }: UseDrumMachineProps) {
  const [activePads, setActivePads] = useState<Set<string>>(new Set());
  const [currentBeat, setCurrentBeat] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const intervalRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const flashPad = useCallback((padId: string) => {
    setActivePads((prev) => new Set([...prev, padId]));
    setTimeout(() => {
      setActivePads((prev) => {
        const next = new Set(prev);
        next.delete(padId);
        return next;
      });
    }, 80);
  }, []);

  const triggerPad = useCallback(
    (padId: string) => {
      const pad = PADS.find((p) => p.id === padId);
      if (!pad) return;
      playSound(pad.soundType);
      triggerHaptic(pad.hapticPattern);
      flashPad(padId);
    },
    [playSound, triggerHaptic, flashPad],
  );

  const startBeat = useCallback(
    (beat: BeatPattern) => {
      // Stop any existing beat
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }

      setCurrentBeat(beat.id);
      stepRef.current = 0;

      const stepDuration = (60000 / beat.bpm) / 4; // 16th note duration

      const tick = () => {
        const step = stepRef.current;
        setCurrentStep(step);

        for (const track of beat.tracks) {
          if (track.hits.includes(step)) {
            triggerPad(track.padId);
          }
        }

        stepRef.current = (step + 1) % beat.steps;
      };

      // Fire immediately
      tick();
      intervalRef.current = window.setInterval(tick, stepDuration);
    },
    [triggerPad],
  );

  const stopBeat = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentBeat(null);
    setCurrentStep(-1);
  }, []);

  return {
    activePads,
    currentBeat,
    currentStep,
    triggerPad,
    flashPad,
    startBeat,
    stopBeat,
  };
}
