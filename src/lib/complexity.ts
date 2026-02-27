import { SortAlgorithmMeta, GraphAlgorithmMeta } from "@/types";

export const SORT_ALGORITHMS: Record<string, SortAlgorithmMeta> = {
  bubble: {
    id: "bubble",
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
  },
  merge: {
    id: "merge",
    name: "Merge Sort",
    description:
      "Divides the array into halves, recursively sorts them, then merges the sorted halves.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    stable: true,
  },
  quick: {
    id: "quick",
    name: "Quick Sort",
    description:
      "Picks a pivot element and partitions the array around it, then recursively sorts the partitions.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    stable: false,
  },
};

export const GRAPH_ALGORITHMS: Record<string, GraphAlgorithmMeta> = {
  bfs: {
    id: "bfs",
    name: "Breadth-First Search",
    description:
      "Explores all neighbor nodes at the present depth before moving to nodes at the next depth level.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    weighted: false,
    directed: false,
  },
  dfs: {
    id: "dfs",
    name: "Depth-First Search",
    description:
      "Explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    weighted: false,
    directed: false,
  },
  dijkstra: {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    description:
      "Finds the shortest path from a source node to all other nodes in a weighted graph.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    weighted: true,
    directed: false,
  },
};