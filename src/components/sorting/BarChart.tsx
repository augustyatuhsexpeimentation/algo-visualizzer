"use client";

import { memo } from "react";
import { SortStep } from "@/types";
import { BAR_HEX } from "@/lib/colors";

interface BarChartProps {
  array: number[];
  currentStep: SortStep | null;
  sortedIndices: Set<number>;
}

function getBarColor(
  index: number,
  step: SortStep | null,
  sortedIndices: Set<number>
): string {
  if (step?.type === "done") return BAR_HEX.sorted;
  if (sortedIndices.has(index)) return BAR_HEX.sorted;

  if (step) {
    const isActive = step.indices.includes(index);
    if (isActive) {
      switch (step.type) {
        case "compare":
          return BAR_HEX.comparing;
        case "swap":
          return BAR_HEX.swapping;
        case "pivot":
          return BAR_HEX.pivot;
        case "overwrite":
        case "merge":
          return BAR_HEX.merging;
        case "sorted":
          return BAR_HEX.sorted;
        default:
          return BAR_HEX.default;
      }
    }
  }

  return BAR_HEX.default;
}

export const BarChart = memo(function BarChart({
  array,
  currentStep,
  sortedIndices,
}: BarChartProps) {
  const maxVal = Math.max(...array, 1);

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      gap: "2px",
      height: "320px",
      padding: "16px",
      border: "1px solid #334155",
      borderRadius: "8px",
      backgroundColor: "#0f172a",
    }}>
      {array.map((value, idx) => {
        const heightPercent = (value / maxVal) * 100;
        const color = getBarColor(idx, currentStep, sortedIndices);

        return (
          <div
            key={idx}
            style={{
              flex: 1,
              height: `${heightPercent}%`,
              backgroundColor: color,
              borderRadius: "2px 2px 0 0",
              minWidth: "4px",
              transition: "height 0.1s, background-color 0.1s",
            }}
          />
        );
      })}
    </div>
  );
});