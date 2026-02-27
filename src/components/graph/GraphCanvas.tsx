"use client";

import { useCallback, useRef, useState } from "react";
import { Graph, GraphStep } from "@/types";
import { useGraphStore } from "@/store";
import { GraphNodeComponent, NodeState } from "./GraphNode";
import { GraphEdgeComponent, EdgeState } from "./GraphEdge";

const CANVAS_W = 900;
const CANVAS_H = 600;

interface GraphCanvasProps {
  graph: Graph;
  currentStep: GraphStep | null;
  startNode: string;
  endNode: string;
  showWeights: boolean;
}

export function GraphCanvas({
  graph,
  currentStep,
  startNode,
  endNode,
  showWeights,
}: GraphCanvasProps) {
  const updateNodePosition = useGraphStore((s) => s.updateNodePosition);
  const [dragging, setDragging] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodeState = useCallback(
    (nodeId: string): NodeState => {
      if (!currentStep) {
        if (nodeId === startNode) return "start";
        if (nodeId === endNode) return "end";
        return "default";
      }

      if (currentStep.type === "done" || currentStep.type === "path") {
        if (currentStep.visitedNodes.includes(nodeId)) return "path";
      }

      if (currentStep.currentNode === nodeId) return "current";
      if (currentStep.queue.includes(nodeId)) return "queued";
      if (currentStep.visitedNodes.includes(nodeId)) return "visited";
      if (nodeId === startNode) return "start";
      if (nodeId === endNode) return "end";

      return "default";
    },
    [currentStep, startNode, endNode]
  );

  const getEdgeState = useCallback(
    (edgeId: string): EdgeState => {
      if (!currentStep) return "default";

      if (currentStep.type === "done" || currentStep.type === "path") {
        if (currentStep.highlightedEdges.includes(edgeId)) return "path";
      }

      if (currentStep.activeEdge === edgeId) return "active";
      if (currentStep.highlightedEdges.includes(edgeId)) return "highlighted";

      return "default";
    },
    [currentStep]
  );

  const handleMouseDown = useCallback(
    (nodeId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setDragging(nodeId);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || !svgRef.current) return;

      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());

      updateNodePosition(
        dragging,
        Math.max(30, Math.min(CANVAS_W - 30, svgP.x)),
        Math.max(30, Math.min(CANVAS_H - 30, svgP.y))
      );
    },
    [dragging, updateNodePosition]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));

  return (
    <div style={{
      borderRadius: "12px",
      border: "1px solid #334155",
      backgroundColor: "#0f172a",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Grid background */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        style={{ width: "100%", height: "500px", display: "block" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Edge trail animation */}
          <linearGradient id="activeEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" />

        {/* Edges */}
        {graph.edges.map((edge) => {
          const source = nodeMap.get(edge.source);
          const target = nodeMap.get(edge.target);
          if (!source || !target) return null;

          return (
            <GraphEdgeComponent
              key={edge.id}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              weight={edge.weight}
              state={getEdgeState(edge.id)}
              showWeight={showWeights}
            />
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => (
          <GraphNodeComponent
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            label={node.label}
            state={getNodeState(node.id)}
            distance={
              currentStep?.distances[node.id] !== undefined
                ? currentStep.distances[node.id]
                : undefined
            }
            onMouseDown={handleMouseDown(node.id)}
          />
        ))}
      </svg>

      {/* Legend */}
      <div style={{
        display: "flex",
        gap: "16px",
        padding: "10px 16px",
        borderTop: "1px solid #1e293b",
        flexWrap: "wrap",
      }}>
        {[
          { color: "#3b82f6", label: "Start" },
          { color: "#ef4444", label: "End" },
          { color: "#facc15", label: "Current" },
          { color: "#22d3ee", label: "Queued" },
          { color: "#10b981", label: "Visited" },
          { color: "#a855f7", label: "Path" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: item.color,
            }} />
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}