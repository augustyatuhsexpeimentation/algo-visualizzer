"use client";

import { Badge } from "@/components/ui";

interface SortComplexityProps {
  type: "sort";
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  stable: boolean;
}

interface GraphComplexityProps {
  type: "graph";
  timeComplexity: string;
  spaceComplexity: string;
  weighted: boolean;
}

type ComplexityPanelProps = SortComplexityProps | GraphComplexityProps;

export function ComplexityPanel(props: ComplexityPanelProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Complexity Analysis
      </h3>

      <div className="space-y-2">
        {props.type === "sort" ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Time (Best)</span>
              <Badge variant="success">{props.timeComplexity.best}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Time (Avg)</span>
              <Badge variant="warning">{props.timeComplexity.average}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Time (Worst)</span>
              <Badge variant="warning">{props.timeComplexity.worst}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Space</span>
              <Badge variant="info">{props.spaceComplexity}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Stable</span>
              <Badge variant={props.stable ? "success" : "default"}>
                {props.stable ? "Yes" : "No"}
              </Badge>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Time</span>
              <Badge variant="warning">{props.timeComplexity}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Space</span>
              <Badge variant="info">{props.spaceComplexity}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Weighted</span>
              <Badge variant={props.weighted ? "success" : "default"}>
                {props.weighted ? "Yes" : "No"}
              </Badge>
            </div>
          </>
        )}
      </div>
    </div>
  );
}