interface TransportProps {
  isRecording: boolean;
  isPlayingLoop: boolean;
  hasRecording: boolean;
  onRecord: () => void;
  onStopRecord: () => void;
  onPlayLoop: () => void;
  onStopLoop: () => void;
}

export function Transport({
  isRecording,
  isPlayingLoop,
  hasRecording,
  onRecord,
  onStopRecord,
  onPlayLoop,
  onStopLoop,
}: TransportProps) {
  return (
    <div className="px-4 pt-4 max-w-sm mx-auto w-full">
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
        Record
      </p>
      <div className="flex gap-3">
        {/* Record button */}
        <button
          onClick={isRecording ? onStopRecord : onRecord}
          className={`
            flex-1 py-3 rounded-xl font-medium text-sm
            transition-all duration-150 touch-manipulation
            flex items-center justify-center gap-2
            ${
              isRecording
                ? "bg-red-500/20 text-red-400 border border-red-500/50"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }
          `}
        >
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              isRecording ? "bg-red-500" : "bg-red-500/50"
            }`}
            style={
              isRecording
                ? { animation: "recording-pulse 1s ease-in-out infinite" }
                : undefined
            }
          />
          {isRecording ? "Stop Rec" : "Record"}
        </button>

        {/* Play loop button */}
        <button
          onClick={isPlayingLoop ? onStopLoop : onPlayLoop}
          disabled={!hasRecording && !isPlayingLoop}
          className={`
            flex-1 py-3 rounded-xl font-medium text-sm
            transition-all duration-150 touch-manipulation
            flex items-center justify-center gap-2
            ${
              isPlayingLoop
                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                : hasRecording
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-800/50 text-gray-600 cursor-not-allowed"
            }
          `}
        >
          {isPlayingLoop ? "⏹" : "▶"}
          {isPlayingLoop ? "Stop Loop" : "Play Loop"}
        </button>
      </div>
    </div>
  );
}
