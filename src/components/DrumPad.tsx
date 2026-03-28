import { useState, useCallback } from "react";
import type { PadConfig } from "../data/pads";

interface DrumPadProps {
  config: PadConfig;
  isActive: boolean;
  onTap: (id: string) => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function DrumPad({ config, isActive, onTap }: DrumPadProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        },
      ]);
      onTap(config.id);
    },
    [config.id, onTap],
  );

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
      ]);
      onTap(config.id);
    },
    [config.id, onTap],
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <button
      onTouchStart={handleTouch}
      onMouseDown={handleMouse}
      style={
        {
          "--pad-color": config.color,
          borderColor: isActive ? config.color : undefined,
          boxShadow: isActive
            ? `0 0 20px ${config.color}80, 0 0 40px ${config.color}40`
            : undefined,
        } as React.CSSProperties
      }
      className={`
        relative overflow-hidden rounded-2xl
        aspect-square flex flex-col items-center justify-center
        border-2 transition-all duration-75
        select-none touch-manipulation cursor-pointer
        ${
          isActive
            ? "scale-95 bg-gray-800"
            : "border-gray-700/50 bg-gray-900 active:scale-95"
        }
      `}
    >
      <span
        className="z-10 pointer-events-none font-bold text-sm tracking-wider"
        style={{ color: isActive ? config.color : "#9ca3af" }}
      >
        {config.label}
      </span>
      <span
        className="z-10 pointer-events-none text-[10px] mt-0.5 opacity-50"
        style={{ color: config.color }}
      >
        {isActive ? "●" : "○"}
      </span>

      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
            backgroundColor: config.color,
            opacity: 0.4,
            animation: "ripple 0.4s ease-out forwards",
          }}
          onAnimationEnd={() => removeRipple(r.id)}
        />
      ))}
    </button>
  );
}
