import { GraphAlgorithmFn } from "@/types";
import { bfs } from "./bfs";
import { dfs } from "./dfs";
import { dijkstra } from "./dijkstra";

export const graphAlgorithmMap: Record<string, GraphAlgorithmFn> = {
  bfs,
  dfs,
  dijkstra,
};

export { bfs, dfs, dijkstra };