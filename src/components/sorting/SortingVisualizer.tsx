"use client";

import { useSortingStore, useAnimationStore } from "@/store";
import { useAnimationEngine, useKeyboardShortcuts } from "@/hooks";
import { SORT_ALGORITHMS } from "@/lib/complexity";
import { SORT_PSEUDOCODE } from "@/lib/pseudocode";
import { SortingControls } from "./SortingControls";
import { BarChart } from "./BarChart";
import {
  AnimationControls,
  SpeedSlider,
  StepCounter,
  ComplexityPanel,
  PseudocodePanel,
} from "@/components/visualization";

export function SortingVisualizer() {
  const array = useSortingStore((s) => s.array);
  const steps = useSortingStore((s) => s.steps);
  const algorithmId = useSortingStore((s) => s.algorithmId);
  const getSortedIndicesAtStep = useSortingStore((s) => s.getSortedIndicesAtStep);
  const currentStepIndex = useAnimationStore((s) => s.currentStepIndex);

  useAnimationEngine(steps.length);
  useKeyboardShortcuts();

  const meta = SORT_ALGORITHMS[algorithmId];
  const pseudocode = SORT_PSEUDOCODE[algorithmId] || [];
  const currentStep = steps.length > 0 ? steps[currentStepIndex] ?? null : null;
  const displayArray = currentStep ? currentStep.array : array;
  const activeLines = currentStep ? currentStep.activeLines : [];
  const description = currentStep?.description ?? "";
  const sortedIndices = currentStep ? getSortedIndicesAtStep(currentStepIndex) : new Set<number>();

  return (
    <div className="space-y-4">
      <SortingControls />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main visualization area */}
        <div className="space-y-4 lg:col-span-2">
          <BarChart
            array={displayArray}
            currentStep={currentStep}
            sortedIndices={sortedIndices}
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
        </div>

        {/* Side panels */}
        <div className="space-y-4">
          {meta && (
            <ComplexityPanel
              type="sort"
              timeComplexity={meta.timeComplexity}
              spaceComplexity={meta.spaceComplexity}
              stable={meta.stable}
            />
          )}

          <PseudocodePanel
            lines={pseudocode}
            activeLines={activeLines}
            description={description}
          />
        </div>
      </div>
    </div>
  );
}