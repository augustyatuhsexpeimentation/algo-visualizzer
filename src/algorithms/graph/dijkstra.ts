import { Graph, GraphStep } from "@/types";
import { buildAdjacencyList } from "@/lib/graph-utils";

export function dijkstra(
  graph: Graph,
  startNode: string,
  endNode?: string
): GraphStep[] {
  const steps: GraphStep[] = [];
  const adj = buildAdjacencyList(graph);
  const visited: string[] = [];
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set<string>();

  // Initialize distances
  for (const node of graph.nodes) {
    distances[node.id] = node.id === startNode ? 0 : Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  }

  steps.push({
    type: "visit",
    currentNode: startNode,
    visitedNodes: [],
    activeEdge: null,
    highlightedEdges: [],
    queue: Array.from(unvisited),
    distances: { ...distances },
    previousNodes: { ...previous },
    activeLines: [1, 2, 3, 4, 5, 6, 7],
    description: `Initialize distances. Set dist[${startNode}] = 0, all others = ∞.`,
  });

  while (unvisited.size > 0) {
    // Find node with minimum distance in unvisited
    let current: string | null = null;
    let minDist = Infinity;
    for (const nodeId of Array.from(unvisited)) {
      if (distances[nodeId] < minDist) {
        minDist = distances[nodeId];
        current = nodeId;
      }
    }

    if (current === null || minDist === Infinity) break;

    unvisited.delete(current);
    visited.push(current);

    steps.push({
      type: "dequeue",
      currentNode: current,
      visitedNodes: [...visited],
      activeEdge: null,
      highlightedEdges: [],
      queue: Array.from(unvisited),
      distances: { ...distances },
      previousNodes: { ...previous },
      activeLines: [9, 10],
      description: `Select node ${current} with distance ${distances[current]}.`,
    });

    // If we reached the end node, reconstruct path
    if (endNode && current === endNode) {
      const path: string[] = [];
      const pathEdges: string[] = [];
      let node: string | null = endNode;
      while (node) {
        path.unshift(node);
        const prev: string | null = previous[node];
        if (prev) {
          const edge = graph.edges.find(
            (e) =>
              (e.source === prev && e.target === node) ||
              (e.source === node && e.target === prev)
          );
          if (edge) pathEdges.push(edge.id);
        }
        node = prev;
      }

      steps.push({
        type: "path",
        currentNode: endNode,
        visitedNodes: [...visited],
        activeEdge: null,
        highlightedEdges: pathEdges,
        queue: [],
        distances: { ...distances },
        previousNodes: { ...previous },
        activeLines: [18],
        description: `Shortest path found: ${path.join(" → ")} (distance: ${distances[endNode]})`,
      });

      steps.push({
        type: "done",
        currentNode: null,
        visitedNodes: [...visited],
        activeEdge: null,
        highlightedEdges: pathEdges,
        queue: [],
        distances: { ...distances },
        previousNodes: { ...previous },
        activeLines: [18],
        description: `Dijkstra complete. Shortest distance to ${endNode}: ${distances[endNode]}`,
      });

      return steps;
    }

    // Relax neighbors
    const neighbors = adj[current] || [];
    for (const { node: neighbor, weight, edgeId } of neighbors) {
      if (!visited.includes(neighbor)) {
        const alt = distances[current] + weight;

        steps.push({
          type: "relax",
          currentNode: current,
          visitedNodes: [...visited],
          activeEdge: edgeId,
          highlightedEdges: [edgeId],
          queue: Array.from(unvisited),
          distances: { ...distances },
          previousNodes: { ...previous },
          activeLines: [11, 12, 13],
          description: `Checking edge ${current}→${neighbor}: ${distances[current]} + ${weight} = ${alt} vs current ${distances[neighbor] === Infinity ? "∞" : distances[neighbor]}`,
        });

        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = current;

          steps.push({
            type: "update",
            currentNode: current,
            visitedNodes: [...visited],
            activeEdge: edgeId,
            highlightedEdges: [edgeId],
            queue: Array.from(unvisited),
            distances: { ...distances },
            previousNodes: { ...previous },
            activeLines: [14, 15],
            description: `Update dist[${neighbor}] = ${alt}, prev[${neighbor}] = ${current}`,
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
    distances: { ...distances },
    previousNodes: { ...previous },
    activeLines: [18],
    description: `Dijkstra complete. All shortest distances computed.`,
  });

  return steps;
}