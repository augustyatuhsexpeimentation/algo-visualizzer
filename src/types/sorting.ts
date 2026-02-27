export type SortStepType =
  | "compare"
  | "swap"
  | "overwrite"
  | "merge"
  | "pivot"
  | "sorted"
  | "done";

export interface SortStep {
  type: SortStepType;
  indices: number[];
  array: number[];
  activeLines: number[];
  description: string;
}

export type SortAlgorithmFn = (array: number[]) => SortStep[];

export interface SortAlgorithmMeta {
  id: string;
  name: string;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  stable: boolean;
}