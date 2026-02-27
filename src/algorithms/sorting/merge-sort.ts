import { SortStep } from "@/types";

export function mergeSort(input: number[]): SortStep[] {
  const arr = [...input];
  const steps: SortStep[] = [];

  function mergeSortHelper(left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      type: "compare",
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...arr],
      activeLines: [1, 2, 3],
      description: `Dividing array from index ${left} to ${right} (mid=${mid})`,
    });

    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left: number, mid: number, right: number) {
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    steps.push({
      type: "compare",
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      array: [...arr],
      activeLines: [9, 10, 11],
      description: `Merging [${L.join(",")}] and [${R.join(",")}]`,
    });

    let i = 0,
      j = 0,
      k = left;

    while (i < L.length && j < R.length) {
      steps.push({
        type: "compare",
        indices: [left + i, mid + 1 + j],
        array: [...arr],
        activeLines: [13, 14],
        description: `Comparing ${L[i]} and ${R[j]}`,
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        steps.push({
          type: "overwrite",
          indices: [k],
          array: [...arr],
          activeLines: [15],
          description: `Placing ${L[i]} at position ${k}`,
        });
        i++;
      } else {
        arr[k] = R[j];
        steps.push({
          type: "overwrite",
          indices: [k],
          array: [...arr],
          activeLines: [17],
          description: `Placing ${R[j]} at position ${k}`,
        });
        j++;
      }
      k++;
    }

    while (i < L.length) {
      arr[k] = L[i];
      steps.push({
        type: "merge",
        indices: [k],
        array: [...arr],
        activeLines: [21],
        description: `Copying remaining ${L[i]} to position ${k}`,
      });
      i++;
      k++;
    }

    while (j < R.length) {
      arr[k] = R[j];
      steps.push({
        type: "merge",
        indices: [k],
        array: [...arr],
        activeLines: [22],
        description: `Copying remaining ${R[j]} to position ${k}`,
      });
      j++;
      k++;
    }
  }

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    type: "done",
    indices: [],
    array: [...arr],
    activeLines: [7],
    description: "Array is fully sorted!",
  });

  return steps;
}