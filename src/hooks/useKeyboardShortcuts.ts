import { useEffect } from "react";
import { usePlayback } from "./usePlayback";

export function useKeyboardShortcuts() {
  const { togglePlayPause, stepForward, stepBackward, reset, canStepForward, canStepBackward } =
    usePlayback();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (canStepForward) stepForward();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (canStepBackward) stepBackward();
          break;
        case "r":
        case "R":
          e.preventDefault();
          reset();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause, stepForward, stepBackward, reset, canStepForward, canStepBackward]);
}