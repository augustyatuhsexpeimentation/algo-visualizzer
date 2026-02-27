import { SortAlgorithmFn } from "@/types";
import { bubbleSort } from "./bubble-sort";
import { mergeSort } from "./merge-sort";
import { quickSort } from "./quick-sort";

export const sortAlgorithmMap: Record<string, SortAlgorithmFn> = {
  bubble: bubbleSort,
  merge: mergeSort,
  quick: quickSort,
};

export { bubbleSort, mergeSort, quickSort };