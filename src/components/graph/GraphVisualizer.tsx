"use client";

import { useGraphStore, useAnimationStore } from "@/store";
import { useAnimationEngine, useKeyboardShortcuts } from "@/hooks";
import { GRAPH_ALGORITHMS } from "@/lib/complexity";
import { GRAPH_PSEUDOCODE } from "@/lib/pseudocode";
import { GraphControls } from "./GraphControls";
import { GraphCanvas } from "./GraphCanvas";
import { GraphBuilder } from "./GraphBuilder";
import {
  AnimationControls,
  SpeedSlider,
  StepCounter,
  ComplexityPanel,
  PseudocodePanel,
} from "@/components/visualization";

export function GraphVisualizer() {
  const graph = useGraphStore((s) => s.graph);
  const steps = useGraphStore((s) => s.steps);
  const algorithmId = useGraphStore((s) => s.algorithmId);
  const startNode = useGraphStore((s) => s.startNode);
  const endNode = useGraphStore((s) => s.endNode);
  const currentStepIndex = useAnimationStore((s) => s.currentStepIndex);

  useAnimationEngine(steps.length);
  useKeyboardShortcuts();

  const meta = GRAPH_ALGORITHMS[algorithmId];
  const pseudocode = GRAPH_PSEUDOCODE[algorithmId] || [];
  const currentStep = steps.length > 0 ? steps[currentStepIndex] ?? null : null;
  const activeLines = currentStep ? currentStep.activeLines : [];
  const description = currentStep?.description ?? "";
  const showWeights = algorithmId === "dijkstra";

  return (
    <div className="space-y-4">
      <GraphControls />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main visualization area */}
        <div className="space-y-4 lg:col-span-2">
          <GraphCanvas
            graph={graph}
            currentStep={currentStep}
            startNode={startNode}
            endNode={endNode}
            showWeights={showWeights}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/50">
            <AnimationControls />
            <SpeedSlider />
          </div>

          <StepCounter />

          {description && (
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </div>
          )}

          <GraphBuilder />
        </div>

        {/* Side panels */}
        <div className="space-y-4">
          {meta && (
            <ComplexityPanel
              type="graph"
              timeComplexity={meta.timeComplexity}
              spaceComplexity={meta.spaceComplexity}
              weighted={meta.weighted}
            />
          )}

          <PseudocodePanel
            lines={pseudocode}
            activeLines={activeLines}
            description={description}
          />

          {/* Queue / Stack display */}
          {currentStep && currentStep.queue.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                {algorithmId === "dfs" ? "Stack" : algorithmId === "dijkstra" ? "Unvisited" : "Queue"}
              </h3>
              <div className="flex flex-wrap gap-1">
                {currentStep.queue.map((nodeId, idx) => (
                  <span
                    key={`${nodeId}-${idx}`}
                    className="rounded-md bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                  >
                    {nodeId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Distances display for Dijkstra */}
          {currentStep &&
            algorithmId === "dijkstra" &&
            Object.keys(currentStep.distances).length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                  Distances
                </h3>
                <div className="space-y-1">
                  {Object.entries(currentStep.distances).map(([node, dist]) => (
                    <div
                      key={node}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-600 dark:text-slate-300">
                        {node}
                      </span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">
                        {dist === Infinity ? "∞" : dist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}