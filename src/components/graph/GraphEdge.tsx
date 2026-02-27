"use client";

import { memo } from "react";
import { EDGE_HEX } from "@/lib/colors";

export type EdgeState = "default" | "active" | "highlighted" | "path";

interface GraphEdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  weight: number;
  state: EdgeState;
  showWeight: boolean;
}

export const GraphEdgeComponent = memo(function GraphEdgeComponent({
  x1,
  y1,
  x2,
  y2,
  weight,
  state,
  showWeight,
}: GraphEdgeProps) {
  const stroke = EDGE_HEX[state];
  const isActive = state === "active" || state === "path";
  const isHighlighted = state === "highlighted";
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Offset weight label perpendicular to the edge
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const offsetX = (-dy / len) * 16;
  const offsetY = (dx / len) * 16;

  return (
    <g>
      {/* Glow behind active/path edges */}
      {(isActive || isHighlighted) && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={stroke}
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.25}
          style={{ filter: "blur(4px)" }}
        />
      )}

      {/* Main edge line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={isActive ? 4 : isHighlighted ? 3 : 2}
        strokeLinecap="round"
        style={{ transition: "stroke 0.3s, stroke-width 0.2s" }}
      />

      {/* Animated dot traveling along active edges */}
      {isActive && (
        <circle r="4" fill="#fff" opacity="0.9">
          <animateMotion
            dur="0.8s"
            repeatCount="indefinite"
            path={`M${x1},${y1} L${x2},${y2}`}
          />
          <animate
            attributeName="opacity"
            values="0.9;0.3;0.9"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Weight label */}
      {showWeight && (
        <g transform={`translate(${midX + offsetX}, ${midY + offsetY})`}>
          <rect
            x="-14"
            y="-11"
            width="28"
            height="22"
            rx="6"
            fill={isActive ? "#6366f1" : "#1e293b"}
            stroke={isActive ? "#818cf8" : "#334155"}
            strokeWidth="1"
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              fill: isActive ? "#fff" : "#94a3b8",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {weight}
          </text>
        </g>
      )}
    </g>
  );
});