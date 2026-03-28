import { useState, useEffect, useRef } from "react";

interface PulseVisualizerProps {
  activePads: Set<string>;
}

interface PulseRing {
  id: number;
  color: string;
}

export function PulseVisualizer({ activePads }: PulseVisualizerProps) {
  const [rings, setRings] = useState<PulseRing[]>([]);
  const prevPads = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Detect newly activated pads
    const colorMap: Record<string, string> = {
      kick: "#ef4444",
      snare: "#f97316",
      hihat: "#eab308",
      tom: "#22c55e",
      clap: "#06b6d4",
      rim: "#8b5cf6",
      crash: "#ec4899",
      perc: "#14b8a6",
      fx: "#f43f5e",
    };

    for (const padId of activePads) {
      if (!prevPads.current.has(padId)) {
        setRings((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), color: colorMap[padId] || "#fff" },
        ]);
      }
    }
    prevPads.current = new Set(activePads);
  }, [activePads]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {rings.map((ring) => (
        <div
          key={ring.id}
          className="absolute rounded-full border-2"
          style={{
            width: 200,
            height: 200,
            borderColor: ring.color,
            opacity: 0,
            animation: "pulse-ring 0.8s ease-out forwards",
          }}
          onAnimationEnd={() =>
            setRings((prev) => prev.filter((r) => r.id !== ring.id))
          }
        />
      ))}
    </div>
  );
}
