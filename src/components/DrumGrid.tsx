import { PADS } from "../data/pads";
import { DrumPad } from "./DrumPad";

interface DrumGridProps {
  activePads: Set<string>;
  onTap: (padId: string) => void;
}

export function DrumGrid({ activePads, onTap }: DrumGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5 p-4 max-w-sm mx-auto w-full">
      {PADS.map((pad) => (
        <DrumPad
          key={pad.id}
          config={pad}
          isActive={activePads.has(pad.id)}
          onTap={onTap}
        />
      ))}
    </div>
  );
}
