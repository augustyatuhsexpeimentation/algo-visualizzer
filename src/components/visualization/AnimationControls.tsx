"use client";

import { usePlayback } from "@/hooks";
import { Button } from "@/components/ui";

export function AnimationControls() {
  const {
    isPlaying,
    isFinished,
    canStepForward,
    canStepBackward,
    totalSteps,
    togglePlayPause,
    stepForward,
    stepBackward,
    reset,
  } = usePlayback();

  const hasSteps = totalSteps > 0;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="icon"
        onClick={reset}
        disabled={!hasSteps}
        aria-label="Reset"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </Button>

      <Button
        variant="secondary"
        size="icon"
        onClick={stepBackward}
        disabled={!canStepBackward}
        aria-label="Step backward"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="19 20 9 12 19 4 19 20" />
          <line x1="5" y1="19" x2="5" y2="5" />
        </svg>
      </Button>

      <Button
        variant="primary"
        size="icon"
        onClick={togglePlayPause}
        disabled={!hasSteps}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="h-10 w-10"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : isFinished ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </Button>

      <Button
        variant="secondary"
        size="icon"
        onClick={stepForward}
        disabled={!canStepForward}
        aria-label="Step forward"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 4 15 12 5 20 5 4" />
          <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
      </Button>
    </div>
  );
}