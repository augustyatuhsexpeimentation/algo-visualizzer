export type PlaybackStatus = "idle" | "playing" | "paused" | "finished";

export interface AnimationState {
  status: PlaybackStatus;
  currentStepIndex: number;
  totalSteps: number;
  speed: number; // ms per step
}

export interface SpeedPreset {
  label: string;
  value: number;
}