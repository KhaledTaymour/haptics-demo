import { useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";
import { useAudioEngine } from "./hooks/useAudioEngine";
import { useDrumMachine } from "./hooks/useDrumMachine";
import { useRecorder } from "./hooks/useRecorder";
import { DrumGrid } from "./components/DrumGrid";
import { BeatSelector } from "./components/BeatSelector";
import { Transport } from "./components/Transport";
import { PulseVisualizer } from "./components/PulseVisualizer";
import type { HapticInput } from "./data/pads";

export default function App() {
  const { trigger } = useWebHaptics({ showSwitch: true, debug: true });
  const { playSound } = useAudioEngine();

  const triggerHaptic = useCallback(
    (pattern: HapticInput) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      trigger(pattern as any);
    },
    [trigger],
  );

  const machine = useDrumMachine({ playSound, triggerHaptic });
  const recorder = useRecorder();

  const handlePadTap = useCallback(
    (padId: string) => {
      machine.triggerPad(padId);
      recorder.recordEvent(padId);
    },
    [machine, recorder],
  );

  const handlePlayLoop = useCallback(() => {
    recorder.playLoop((padId) => {
      machine.triggerPad(padId);
    });
  }, [recorder, machine]);

  return (
    <div
      className="min-h-dvh bg-gray-950 text-white flex flex-col relative"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Header */}
      <header className="text-center pt-6 pb-1">
        <h1 className="text-2xl font-black tracking-[0.2em] text-white/90">
          DRUM PAD
        </h1>
        <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">
          Tap to feel the beat
        </p>
      </header>

      {/* Pulse visualizer behind grid */}
      <PulseVisualizer activePads={machine.activePads} />

      {/* Step indicator when a beat is playing */}
      {machine.currentBeat && (
        <div className="flex justify-center gap-1 px-4 py-2 max-w-sm mx-auto w-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-75 ${
                i === machine.currentStep
                  ? "bg-white"
                  : i % 4 === 0
                    ? "bg-gray-600"
                    : "bg-gray-800"
              }`}
            />
          ))}
        </div>
      )}

      {/* Drum Grid */}
      <div className="flex-1 flex items-center">
        <DrumGrid activePads={machine.activePads} onTap={handlePadTap} />
      </div>

      {/* Beat selector */}
      <BeatSelector
        currentBeat={machine.currentBeat}
        onSelect={machine.startBeat}
        onStop={machine.stopBeat}
      />

      {/* Transport / Record */}
      <Transport
        isRecording={recorder.isRecording}
        isPlayingLoop={recorder.isPlaying}
        hasRecording={recorder.hasRecording}
        onRecord={recorder.startRecording}
        onStopRecord={recorder.stopRecording}
        onPlayLoop={handlePlayLoop}
        onStopLoop={recorder.stopPlayback}
      />

      {/* Footer spacing for haptic toggle */}
      <div className="h-14" />
    </div>
  );
}
