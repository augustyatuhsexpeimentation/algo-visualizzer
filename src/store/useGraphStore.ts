import { create } from "zustand";
import { Graph, GraphNode, GraphEdge, GraphStep } from "@/types";
import { graphAlgorithmMap } from "@/algorithms/graph";
import {
  createDefaultGraph,
  generateNodeId,
  generateEdgeId,
  getRandomPosition,
} from "@/lib/graph-utils";

interface GraphStore {
  graph: Graph;
  steps: GraphStep[];
  algorithmId: string;
  startNode: string;
  endNode: string;

  setAlgorithm: (id: string) => void;
  setStartNode: (id: string) => void;
  setEndNode: (id: string) => void;
  setGraph: (graph: Graph) => void;
  resetGraph: () => void;
  addNode: (x?: number, y?: number) => void;
  removeNode: (id: string) => void;
  addEdge: (source: string, target: string, weight?: number) => void;
  removeEdge: (id: string) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  updateEdgeWeight: (id: string, weight: number) => void;
  computeSteps: () => void;
}

export const useGraphStore = create<GraphStore>((set, get) => ({
  graph: createDefaultGraph(),
  steps: [],
  algorithmId: "bfs",
  startNode: "A",
  endNode: "J",

  setAlgorithm: (id) => set({ algorithmId: id, steps: [] }),
  setStartNode: (id) => set({ startNode: id, steps: [] }),
  setEndNode: (id) => set({ endNode: id, steps: [] }),
  setGraph: (graph) => set({ graph, steps: [] }),

  resetGraph: () => {
    const graph = createDefaultGraph();
    set({ graph, steps: [], startNode: "A", endNode: "J" });
  },

  addNode: (x, y) => {
    const { graph } = get();
    const id = generateNodeId(graph.nodes);
    const pos = x !== undefined && y !== undefined ? { x, y } : getRandomPosition();
    const newNode: GraphNode = { id, label: id, ...pos };
    set({
      graph: { ...graph, nodes: [...graph.nodes, newNode] },
      steps: [],
    });
  },

  removeNode: (id) => {
    const { graph, startNode, endNode } = get();
    const nodes = graph.nodes.filter((n) => n.id !== id);
    const edges = graph.edges.filter((e) => e.source !== id && e.target !== id);
    const newStart = startNode === id ? (nodes[0]?.id ?? "") : startNode;
    const newEnd = endNode === id ? (nodes[nodes.length - 1]?.id ?? "") : endNode;
    set({
      graph: { ...graph, nodes, edges },
      steps: [],
      startNode: newStart,
      endNode: newEnd,
    });
  },

  addEdge: (source, target, weight = 1) => {
    const { graph } = get();
    const exists = graph.edges.some(
      (e) =>
        (e.source === source && e.target === target) ||
        (e.source === target && e.target === source)
    );
    if (exists || source === target) return;
    const id = generateEdgeId(graph.edges);
    const newEdge: GraphEdge = { id, source, target, weight };
    set({
      graph: { ...graph, edges: [...graph.edges, newEdge] },
      steps: [],
    });
  },

  removeEdge: (id) => {
    const { graph } = get();
    set({
      graph: { ...graph, edges: graph.edges.filter((e) => e.id !== id) },
      steps: [],
    });
  },

  updateNodePosition: (id, x, y) => {
    const { graph } = get();
    const nodes = graph.nodes.map((n) => (n.id === id ? { ...n, x, y } : n));
    set({ graph: { ...graph, nodes } });
  },

  updateEdgeWeight: (id, weight) => {
    const { graph } = get();
    const edges = graph.edges.map((e) => (e.id === id ? { ...e, weight } : e));
    set({ graph: { ...graph, edges }, steps: [] });
  },

  computeSteps: () => {
    const { graph, algorithmId, startNode, endNode } = get();
    const fn = graphAlgorithmMap[algorithmId];
    if (fn) {
      const steps = fn(graph, startNode, endNode);
      set({ steps });
    }
  },
}));