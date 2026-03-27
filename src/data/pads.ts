export type DrumSound =
  | "kick"
  | "snare"
  | "hihat"
  | "tom"
  | "clap"
  | "rim"
  | "crash"
  | "perc"
  | "fx";

export type HapticInput =
  | string
  | number
  | number[]
  | Array<{ duration: number; intensity?: number; delay?: number }>;

export interface PadConfig {
  id: DrumSound;
  label: string;
  color: string;
  soundType: DrumSound;
  hapticPattern: HapticInput;
}

export const PADS: PadConfig[] = [
  {
    id: "kick",
    label: "KICK",
    color: "#ef4444",
    soundType: "kick",
    hapticPattern: [
      { duration: 80, intensity: 1.0 },
      { delay: 20, duration: 40, intensity: 0.6 },
    ],
  },
  {
    id: "snare",
    label: "SNARE",
    color: "#f97316",
    soundType: "snare",
    hapticPattern: "success",
  },
  {
    id: "hihat",
    label: "HI-HAT",
    color: "#eab308",
    soundType: "hihat",
    hapticPattern: 30,
  },
  {
    id: "tom",
    label: "TOM",
    color: "#22c55e",
    soundType: "tom",
    hapticPattern: [
      { duration: 60, intensity: 0.8 },
      { delay: 40, duration: 60, intensity: 0.5 },
    ],
  },
  {
    id: "clap",
    label: "CLAP",
    color: "#06b6d4",
    soundType: "clap",
    hapticPattern: [20, 15, 20, 15, 30],
  },
  {
    id: "rim",
    label: "RIM",
    color: "#8b5cf6",
    soundType: "rim",
    hapticPattern: "nudge",
  },
  {
    id: "crash",
    label: "CRASH",
    color: "#ec4899",
    soundType: "crash",
    hapticPattern: "buzz",
  },
  {
    id: "perc",
    label: "PERC",
    color: "#14b8a6",
    soundType: "perc",
    hapticPattern: [
      { duration: 40, intensity: 0.5 },
      { delay: 60, duration: 40, intensity: 0.9 },
    ],
  },
  {
    id: "fx",
    label: "FX",
    color: "#f43f5e",
    soundType: "fx",
    hapticPattern: [50, 30, 80, 30, 120],
  },
];
