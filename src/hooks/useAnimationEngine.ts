import { useEffect, useRef, useCallback } from "react";
import { useAnimationStore } from "@/store";

export function useAnimationEngine(totalSteps: number) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const status = useAnimationStore((s) => s.status);
  const speed = useAnimationStore((s) => s.speed);
  const currentStepIndex = useAnimationStore((s) => s.currentStepIndex);
  const setTotalSteps = useAnimationStore((s) => s.setTotalSteps);
  const stepForward = useAnimationStore((s) => s.stepForward);
  const setStatus = useAnimationStore((s) => s.setStatus);

  // Sync total steps when they change
  useEffect(() => {
    setTotalSteps(totalSteps);
  }, [totalSteps, setTotalSteps]);

  // Clear timer helper
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Run the animation loop
  useEffect(() => {
    if (status === "playing" && totalSteps > 0) {
      clearTimer();
      timerRef.current = setInterval(() => {
        const current = useAnimationStore.getState().currentStepIndex;
        const total = useAnimationStore.getState().totalSteps;
        if (current < total - 1) {
          stepForward();
        } else {
          setStatus("finished");
          clearTimer();
        }
      }, speed);
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [status, speed, totalSteps, clearTimer, stepForward, setStatus]);

  // Auto-finish
  useEffect(() => {
    if (currentStepIndex >= totalSteps - 1 && status === "playing") {
      setStatus("finished");
    }
  }, [currentStepIndex, totalSteps, status, setStatus]);

  return {
    isPlaying: status === "playing",
    isPaused: status === "paused",
    isFinished: status === "finished",
    isIdle: status === "idle",
  };
}