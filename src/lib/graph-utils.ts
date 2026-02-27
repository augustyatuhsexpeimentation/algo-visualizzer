import { Graph, GraphNode, GraphEdge } from "@/types";
import { GRAPH_CANVAS_WIDTH, GRAPH_CANVAS_HEIGHT, DEFAULT_EDGE_WEIGHT } from "./constants";

export function buildAdjacencyList(
  graph: Graph
): Record<string, { node: string; weight: number; edgeId: string }[]> {
  const adj: Record<string, { node: string; weight: number; edgeId: string }[]> = {};

  for (const node of graph.nodes) {
    adj[node.id] = [];
  }

  for (const edge of graph.edges) {
    adj[edge.source].push({
      node: edge.target,
      weight: edge.weight,
      edgeId: edge.id,
    });
    if (!graph.directed) {
      adj[edge.target].push({
        node: edge.source,
        weight: edge.weight,
        edgeId: edge.id,
      });
    }
  }

  return adj;
}

export function createDefaultGraph(): Graph {
  const nodes: GraphNode[] = [
    { id: "A", x: 80, y: 100, label: "A" },
    { id: "B", x: 250, y: 50, label: "B" },
    { id: "C", x: 420, y: 100, label: "C" },
    { id: "D", x: 150, y: 250, label: "D" },
    { id: "E", x: 350, y: 250, label: "E" },
    { id: "F", x: 550, y: 200, label: "F" },
    { id: "G", x: 250, y: 400, label: "G" },
    { id: "H", x: 500, y: 400, label: "H" },
    { id: "I", x: 700, y: 300, label: "I" },
    { id: "J", x: 820, y: 150, label: "J" },
  ];

  const edges: GraphEdge[] = [
    { id: "e1", source: "A", target: "B", weight: 4 },
    { id: "e2", source: "A", target: "D", weight: 2 },
    { id: "e3", source: "B", target: "C", weight: 3 },
    { id: "e4", source: "B", target: "E", weight: 6 },
    { id: "e5", source: "C", target: "F", weight: 1 },
    { id: "e6", source: "C", target: "J", weight: 8 },
    { id: "e7", source: "D", target: "E", weight: 5 },
    { id: "e8", source: "D", target: "G", weight: 3 },
    { id: "e9", source: "E", target: "F", weight: 2 },
    { id: "e10", source: "E", target: "H", weight: 4 },
    { id: "e11", source: "F", target: "I", weight: 7 },
    { id: "e12", source: "G", target: "H", weight: 2 },
    { id: "e13", source: "H", target: "I", weight: 3 },
    { id: "e14", source: "I", target: "J", weight: 1 },
    { id: "e15", source: "F", target: "J", weight: 5 },
  ];

  return { nodes, edges, directed: false };
}

export function generateNodeId(existingNodes: GraphNode[]): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const letter of letters) {
    if (!existingNodes.find((n) => n.id === letter)) {
      return letter;
    }
  }
  return `N${existingNodes.length}`;
}

export function generateEdgeId(existingEdges: GraphEdge[]): string {
  return `e${existingEdges.length + 1}`;
}

export function getRandomPosition(): { x: number; y: number } {
  const padding = 60;
  return {
    x: Math.floor(Math.random() * (GRAPH_CANVAS_WIDTH - padding * 2)) + padding,
    y: Math.floor(Math.random() * (GRAPH_CANVAS_HEIGHT - padding * 2)) + padding,
  };
}

export function findEdgeId(
  edges: GraphEdge[],
  source: string,
  target: string
): string | null {
  const edge = edges.find(
    (e) =>
      (e.source === source && e.target === target) ||
      (e.source === target && e.target === source)
  );
  return edge?.id ?? null;
}