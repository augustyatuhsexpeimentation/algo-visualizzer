import { useCallback } from "react";
import { useAnimationStore } from "@/store";

export function usePlayback() {
  const status = useAnimationStore((s) => s.status);
  const currentStepIndex = useAnimationStore((s) => s.currentStepIndex);
  const totalSteps = useAnimationStore((s) => s.totalSteps);
  const speed = useAnimationStore((s) => s.speed);
  const play = useAnimationStore((s) => s.play);
  const pause = useAnimationStore((s) => s.pause);
  const reset = useAnimationStore((s) => s.reset);
  const stepForward = useAnimationStore((s) => s.stepForward);
  const stepBackward = useAnimationStore((s) => s.stepBackward);
  const setSpeed = useAnimationStore((s) => s.setSpeed);
  const setCurrentStepIndex = useAnimationStore((s) => s.setCurrentStepIndex);

  const togglePlayPause = useCallback(() => {
    if (status === "playing") {
      pause();
    } else if (status === "finished") {
      setCurrentStepIndex(0);
      play();
    } else {
      play();
    }
  }, [status, play, pause, setCurrentStepIndex]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return {
    status,
    currentStepIndex,
    totalSteps,
    speed,
    isPlaying: status === "playing",
    isPaused: status === "paused",
    isFinished: status === "finished",
    isIdle: status === "idle",
    canStepForward: currentStepIndex < totalSteps - 1,
    canStepBackward: currentStepIndex > 0,
    progress: totalSteps > 0 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0,
    togglePlayPause,
    play,
    pause,
    reset: handleReset,
    stepForward,
    stepBackward,
    setSpeed,
    setCurrentStepIndex,
  };
}