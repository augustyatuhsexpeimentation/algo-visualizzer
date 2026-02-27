export type GraphStepType =
  | "visit"
  | "enqueue"
  | "dequeue"
  | "push"
  | "pop"
  | "relax"
  | "update"
  | "path"
  | "done";

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
}

export interface GraphStep {
  type: GraphStepType;
  currentNode: string | null;
  visitedNodes: string[];
  activeEdge: string | null;
  highlightedEdges: string[];
  queue: string[];
  distances: Record<string, number>;
  previousNodes: Record<string, string | null>;
  activeLines: number[];
  description: string;
}

export type GraphAlgorithmFn = (
  graph: Graph,
  startNode: string,
  endNode?: string
) => GraphStep[];

export interface GraphAlgorithmMeta {
  id: string;
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  weighted: boolean;
  directed: boolean;
}