import { Graph, GraphStep } from "@/types";
import { buildAdjacencyList } from "@/lib/graph-utils";

export function dfs(graph: Graph, startNode: string): GraphStep[] {
  const steps: GraphStep[] = [];
  const adj = buildAdjacencyList(graph);
  const visited: string[] = [];
  const stack: string[] = [];

  // Initialize
  stack.push(startNode);
  steps.push({
    type: "push",
    currentNode: null,
    visitedNodes: [...visited],
    activeEdge: null,
    highlightedEdges: [],
    queue: [...stack],
    distances: {},
    previousNodes: {},
    activeLines: [1, 2, 3],
    description: `Starting DFS from node ${startNode}. Push ${startNode} onto stack.`,
  });

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (visited.includes(current)) continue;

    visited.push(current);
    steps.push({
      type: "visit",
      currentNode: current,
      visitedNodes: [...visited],
      activeEdge: null,
      highlightedEdges: [],
      queue: [...stack],
      distances: {},
      previousNodes: {},
      activeLines: [4, 5, 6],
      description: `Pop and visit node ${current}.`,
    });

    const neighbors = adj[current] || [];
    for (const { node: neighbor, edgeId } of neighbors) {
      if (!visited.includes(neighbor)) {
        stack.push(neighbor);
        steps.push({
          type: "push",
          currentNode: current,
          visitedNodes: [...visited],
          activeEdge: edgeId,
          highlightedEdges: [edgeId],
          queue: [...stack],
          distances: {},
          previousNodes: {},
          activeLines: [7, 8, 9, 10],
          description: `Push unvisited neighbor ${neighbor} onto stack.`,
        });
      }
    }
  }

  steps.push({
    type: "done",
    currentNode: null,
    visitedNodes: [...visited],
    activeEdge: null,
    highlightedEdges: [],
    queue: [],
    distances: {},
    previousNodes: {},
    activeLines: [14],
    description: `DFS complete. Visited: ${visited.join(" → ")}`,
  });

  return steps;
}