"use client";

import { usePlayback } from "@/hooks";

export function StepCounter() {
  const { currentStepIndex, totalSteps, progress } = usePlayback();

  if (totalSteps === 0) {
    return (
      <div className="text-sm text-slate-400 dark:text-slate-500">
        No steps generated yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Step {currentStepIndex + 1} of {totalSteps}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-150 dark:bg-indigo-400"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}