export interface TrackLine {
  padId: string;
  hits: number[];
}

export interface BeatPattern {
  id: string;
  name: string;
  emoji: string;
  bpm: number;
  steps: number;
  tracks: TrackLine[];
}

export const BEATS: BeatPattern[] = [
  {
    id: "hiphop",
    name: "Hip-Hop",
    emoji: "🎤",
    bpm: 90,
    steps: 16,
    tracks: [
      { padId: "kick", hits: [0, 4, 10, 12] },
      { padId: "snare", hits: [4, 12] },
      { padId: "hihat", hits: [0, 2, 4, 6, 8, 10, 12, 14] },
    ],
  },
  {
    id: "techno",
    name: "Techno",
    emoji: "🔊",
    bpm: 128,
    steps: 16,
    tracks: [
      { padId: "kick", hits: [0, 4, 8, 12] },
      { padId: "hihat", hits: [2, 6, 10, 14] },
      { padId: "clap", hits: [4, 12] },
      { padId: "crash", hits: [0] },
    ],
  },
  {
    id: "breakbeat",
    name: "Break",
    emoji: "🥁",
    bpm: 110,
    steps: 16,
    tracks: [
      { padId: "kick", hits: [0, 6, 10] },
      { padId: "snare", hits: [4, 12, 14] },
      { padId: "hihat", hits: [0, 2, 4, 6, 8, 10, 12, 14] },
      { padId: "rim", hits: [3, 11] },
    ],
  },
];
