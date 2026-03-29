import { BEATS } from "../data/beats";
import type { BeatPattern } from "../data/beats";

interface BeatSelectorProps {
  currentBeat: string | null;
  onSelect: (beat: BeatPattern) => void;
  onStop: () => void;
}

export function BeatSelector({
  currentBeat,
  onSelect,
  onStop,
}: BeatSelectorProps) {
  return (
    <div className="px-4 max-w-sm mx-auto w-full">
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
        Beat Loops
      </p>
      <div className="flex gap-2">
        {BEATS.map((beat) => {
          const isActive = currentBeat === beat.id;
          return (
            <button
              key={beat.id}
              onClick={() => (isActive ? onStop() : onSelect(beat))}
              className={`
                flex-1 py-2.5 px-3 rounded-xl text-sm font-medium
                transition-all duration-150 touch-manipulation
                ${
                  isActive
                    ? "bg-white text-black scale-95"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }
              `}
            >
              <span className="block text-base">{beat.emoji}</span>
              <span className="block text-xs mt-0.5">{beat.name}</span>
              <span className="block text-[10px] opacity-50">
                {beat.bpm} BPM
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
