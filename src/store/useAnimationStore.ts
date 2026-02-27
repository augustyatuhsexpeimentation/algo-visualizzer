import { create } from "zustand";
import { PlaybackStatus } from "@/types";
import { DEFAULT_SPEED } from "@/lib/constants";

interface AnimationStore {
  status: PlaybackStatus;
  currentStepIndex: number;
  totalSteps: number;
  speed: number;

  setStatus: (status: PlaybackStatus) => void;
  setCurrentStepIndex: (index: number) => void;
  setTotalSteps: (total: number) => void;
  setSpeed: (speed: number) => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  play: () => void;
  pause: () => void;
}

export const useAnimationStore = create<AnimationStore>((set, get) => ({
  status: "idle",
  currentStepIndex: 0,
  totalSteps: 0,
  speed: DEFAULT_SPEED,

  setStatus: (status) => set({ status }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
  setTotalSteps: (total) => set({ totalSteps: total }),
  setSpeed: (speed) => set({ speed }),

  stepForward: () => {
    const { currentStepIndex, totalSteps } = get();
    if (currentStepIndex < totalSteps - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ status: "finished" });
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1, status: "paused" });
    }
  },

  reset: () =>
    set({
      status: "idle",
      currentStepIndex: 0,
      totalSteps: 0,
    }),

  play: () => set({ status: "playing" }),
  pause: () => set({ status: "paused" }),
}));