import { SortStep } from "@/types";

export function bubbleSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        array: [...arr],
        activeLines: [3, 4],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr],
          activeLines: [5],
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }

    // Mark last element of this pass as sorted
    steps.push({
      type: "sorted",
      indices: [n - i - 1],
      array: [...arr],
      activeLines: [8],
      description: `Element ${arr[n - i - 1]} is now in its sorted position`,
    });
  }

  // Mark first element as sorted
  steps.push({
    type: "sorted",
    indices: [0],
    array: [...arr],
    activeLines: [9],
    description: "First element is in sorted position",
  });

  steps.push({
    type: "done",
    indices: [],
    array: [...arr],
    activeLines: [9],
    description: "Array is fully sorted!",
  });

  return steps;
}