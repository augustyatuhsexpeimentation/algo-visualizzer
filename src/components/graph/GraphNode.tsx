"use client";

import { memo } from "react";
import { NODE_HEX } from "@/lib/colors";

export type NodeState = "default" | "current" | "visited" | "queued" | "path" | "start" | "end";

const NODE_R = 28;

interface GraphNodeProps {
  id: string;
  x: number;
  y: number;
  label: string;
  state: NodeState;
  distance?: number;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export const GraphNodeComponent = memo(function GraphNodeComponent({
  x,
  y,
  label,
  state,
  distance,
  onMouseDown,
}: GraphNodeProps) {
  const fill = NODE_HEX[state];
  const isActive = state === "current" || state === "path";
  const isVisited = state === "visited";

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseDown={onMouseDown}
      style={{ cursor: "grab" }}
    >
      {/* Outer glow ring for active/visited */}
      {(isActive || isVisited) && (
        <>
          <circle
            r={NODE_R + 12}
            fill="none"
            stroke={fill}
            strokeWidth="2"
            opacity="0.2"
          />
          <circle
            r={NODE_R + 6}
            fill="none"
            stroke={fill}
            strokeWidth="1.5"
            opacity="0.4"
          />
        </>
      )}

      {/* Pulse animation for current node */}
      {state === "current" && (
        <circle r={NODE_R + 8} fill="none" stroke={fill} strokeWidth="2" opacity="0.6">
          <animate
            attributeName="r"
            values={`${NODE_R + 6};${NODE_R + 18};${NODE_R + 6}`}
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Shadow */}
      <circle
        r={NODE_R}
        fill="rgba(0,0,0,0.3)"
        transform="translate(2, 2)"
      />

      {/* Main circle */}
      <circle
        r={NODE_R}
        fill={fill}
        stroke={isActive ? "#fff" : "#475569"}
        strokeWidth={isActive ? 3 : 2}
        style={{ transition: "fill 0.3s, stroke 0.3s" }}
      />

      {/* Inner highlight */}
      <circle
        r={NODE_R - 6}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />

      {/* Label */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "15px",
          fontWeight: "bold",
          fill: state === "default" ? "#1e293b" : "#fff",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {label}
      </text>

      {/* Distance badge for Dijkstra */}
      {distance !== undefined && distance !== Infinity && (
        <g transform={`translate(0, ${NODE_R + 18})`}>
          <rect
            x="-16"
            y="-10"
            width="32"
            height="20"
            rx="6"
            fill="#6366f1"
            stroke="#818cf8"
            strokeWidth="1"
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              fill: "#fff",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {distance}
          </text>
        </g>
      )}
    </g>
  );
});