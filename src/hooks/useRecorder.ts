import { useCallback, useRef, useState } from "react";

export interface RecordedEvent {
  padId: string;
  timestamp: number;
}

export interface RecordedLoop {
  events: RecordedEvent[];
  duration: number;
}

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const eventsRef = useRef<RecordedEvent[]>([]);
  const startTimeRef = useRef(0);
  const loopRef = useRef<RecordedLoop | null>(null);
  const playbackTimers = useRef<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const startRecording = useCallback(() => {
    eventsRef.current = [];
    startTimeRef.current = performance.now();
    setIsRecording(true);
    setHasRecording(false);
  }, []);

  const recordEvent = useCallback(
    (padId: string) => {
      if (!isRecording) return;
      eventsRef.current.push({
        padId,
        timestamp: performance.now() - startTimeRef.current,
      });
    },
    [isRecording],
  );

  const stopRecording = useCallback(() => {
    if (!isRecording) return;
    const duration = performance.now() - startTimeRef.current;
    loopRef.current = {
      events: [...eventsRef.current],
      duration,
    };
    setIsRecording(false);
    setHasRecording(eventsRef.current.length > 0);
  }, [isRecording]);

  const playLoop = useCallback(
    (onTriggerPad: (padId: string) => void) => {
      const loop = loopRef.current;
      if (!loop || loop.events.length === 0) return;

      setIsPlaying(true);

      const scheduleLoop = () => {
        const timers: number[] = [];
        for (const event of loop.events) {
          const timer = window.setTimeout(() => {
            onTriggerPad(event.padId);
          }, event.timestamp);
          timers.push(timer);
        }
        // Schedule next loop iteration
        const loopTimer = window.setTimeout(() => {
          scheduleLoop();
        }, loop.duration);
        timers.push(loopTimer);
        playbackTimers.current = timers;
      };

      scheduleLoop();
    },
    [],
  );

  const stopPlayback = useCallback(() => {
    for (const timer of playbackTimers.current) {
      clearTimeout(timer);
    }
    playbackTimers.current = [];
    setIsPlaying(false);
  }, []);

  return {
    isRecording,
    isPlaying,
    hasRecording,
    startRecording,
    recordEvent,
    stopRecording,
    playLoop,
    stopPlayback,
  };
}
