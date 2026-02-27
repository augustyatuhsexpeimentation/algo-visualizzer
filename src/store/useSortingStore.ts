import { create } from "zustand";
import { SortStep } from "@/types";
import { sortAlgorithmMap } from "@/algorithms/sorting";
import { generateRandomArray } from "@/lib/array-utils";
import { DEFAULT_ARRAY_SIZE, MIN_VALUE, MAX_VALUE } from "@/lib/constants";

interface SortingStore {
  array: number[];
  steps: SortStep[];
  algorithmId: string;
  arraySize: number;
  sortedIndices: Set<number>;

  setAlgorithm: (id: string) => void;
  setArraySize: (size: number) => void;
  generateArray: () => void;
  setArray: (array: number[]) => void;
  computeSteps: () => void;
  getSortedIndicesAtStep: (stepIndex: number) => Set<number>;
}

export const useSortingStore = create<SortingStore>((set, get) => ({
  array: generateRandomArray(DEFAULT_ARRAY_SIZE, MIN_VALUE, MAX_VALUE),
  steps: [],
  algorithmId: "bubble",
  arraySize: DEFAULT_ARRAY_SIZE,
  sortedIndices: new Set(),

  setAlgorithm: (id) => set({ algorithmId: id, steps: [], sortedIndices: new Set() }),

  setArraySize: (size) => {
    set({
      arraySize: size,
      array: generateRandomArray(size, MIN_VALUE, MAX_VALUE),
      steps: [],
      sortedIndices: new Set(),
    });
  },

  generateArray: () => {
    const { arraySize } = get();
    set({
      array: generateRandomArray(arraySize, MIN_VALUE, MAX_VALUE),
      steps: [],
      sortedIndices: new Set(),
    });
  },

  setArray: (array) => set({ array, steps: [], sortedIndices: new Set() }),

  computeSteps: () => {
    const { array, algorithmId } = get();
    const fn = sortAlgorithmMap[algorithmId];
    if (fn) {
      const steps = fn([...array]);
      set({ steps });
    }
  },

  getSortedIndicesAtStep: (stepIndex: number) => {
    const { steps } = get();
    const sorted = new Set<number>();
    for (let i = 0; i <= stepIndex && i < steps.length; i++) {
      if (steps[i].type === "sorted") {
        steps[i].indices.forEach((idx) => sorted.add(idx));
      }
    }
    return sorted;
  },
}));