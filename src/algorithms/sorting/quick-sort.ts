import { SortStep } from "@/types";

export function quickSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  function quickSortHelper(low: number, high: number) {
    if (low >= high) {
      if (low === high) {
        steps.push({
          type: "sorted",
          indices: [low],
          array: [...arr],
          activeLines: [1],
          description: `Element ${arr[low]} is in its sorted position`,
        });
      }
      return;
    }

    const pivotIdx = partition(low, high);
    steps.push({
      type: "sorted",
      indices: [pivotIdx],
      array: [...arr],
      activeLines: [2],
      description: `Pivot ${arr[pivotIdx]} is now in its sorted position`,
    });

    quickSortHelper(low, pivotIdx - 1);
    quickSortHelper(pivotIdx + 1, high);
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];

    steps.push({
      type: "pivot",
      indices: [high],
      array: [...arr],
      activeLines: [9],
      description: `Choosing pivot: ${pivot}`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        type: "compare",
        indices: [j, high],
        array: [...arr],
        activeLines: [11, 12],
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            type: "swap",
            indices: [i, j],
            array: [...arr],
            activeLines: [13, 14],
            description: `Swapping ${arr[j]} and ${arr[i]}`,
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: "swap",
      indices: [i + 1, high],
      array: [...arr],
      activeLines: [17],
      description: `Placing pivot ${pivot} at position ${i + 1}`,
    });

    return i + 1;
  }

  quickSortHelper(0, arr.length - 1);

  steps.push({
    type: "done",
    indices: [],
    array: [...arr],
    activeLines: [6],
    description: "Array is fully sorted!",
  });

  return steps;
}