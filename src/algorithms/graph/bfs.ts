import { Graph, GraphStep } from "@/types";
import { buildAdjacencyList } from "@/lib/graph-utils";

export function bfs(graph: Graph, startNode: string): GraphStep[] {
  const steps: GraphStep[] = [];
  const adj = buildAdjacencyList(graph);
  const visited: string[] = [];
  const queue: string[] = [];

  // Initialize
  queue.push(startNode);
  steps.push({
    type: "enqueue",
    currentNode: null,
    visitedNodes: [...visited],
    activeEdge: null,
    highlightedEdges: [],
    queue: [...queue],
    distances: {},
    previousNodes: {},
    activeLines: [1, 2, 3],
    description: `Starting BFS from node ${startNode}. Enqueue ${startNode}.`,
  });

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (visited.includes(current)) continue;

    visited.push(current);
    steps.push({
      type: "visit",
      currentNode: current,
      visitedNodes: [...visited],
      activeEdge: null,
      highlightedEdges: [],
      queue: [...queue],
      distances: {},
      previousNodes: {},
      activeLines: [5, 6],
      description: `Dequeue and visit node ${current}.`,
    });

    const neighbors = adj[current] || [];
    for (const { node: neighbor, edgeId } of neighbors) {
      if (!visited.includes(neighbor)) {
        steps.push({
          type: "enqueue",
          currentNode: current,
          visitedNodes: [...visited],
          activeEdge: edgeId,
          highlightedEdges: [edgeId],
          queue: [...queue],
          distances: {},
          previousNodes: {},
          activeLines: [7, 8, 9],
          description: `Checking neighbor ${neighbor} of ${current}.`,
        });

        if (!queue.includes(neighbor)) {
          queue.push(neighbor);
          steps.push({
            type: "enqueue",
            currentNode: current,
            visitedNodes: [...visited],
            activeEdge: edgeId,
            highlightedEdges: [edgeId],
            queue: [...queue],
            distances: {},
            previousNodes: {},
            activeLines: [8, 9],
            description: `Enqueue ${neighbor}.`,
          });
        }
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
    activeLines: [13],
    description: `BFS complete. Visited: ${visited.join(" → ")}`,
  });

  return steps;
}