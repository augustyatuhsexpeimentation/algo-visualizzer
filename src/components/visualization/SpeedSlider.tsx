"use client";

import { usePlayback } from "@/hooks";
import { SPEED_PRESETS } from "@/lib/constants";

export function SpeedSlider() {
  const { speed, setSpeed } = usePlayback();

  const currentPresetIndex = SPEED_PRESETS.findIndex((p) => p.value === speed);
  const currentLabel =
    currentPresetIndex >= 0
      ? SPEED_PRESETS[currentPresetIndex].label
      : `${speed}ms`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Speed
      </span>
      <input
        type="range"
        min={0}
        max={SPEED_PRESETS.length - 1}
        value={
          currentPresetIndex >= 0
            ? currentPresetIndex
            : SPEED_PRESETS.findIndex((p) => p.value <= speed) || 2
        }
        onChange={(e) => {
          const idx = parseInt(e.target.value);
          setSpeed(SPEED_PRESETS[idx].value);
        }}
        className="h-2 w-24 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-slate-700 dark:accent-indigo-400"
      />
      <span className="w-10 text-xs font-mono text-slate-600 dark:text-slate-300">
        {currentLabel}
      </span>
    </div>
  );
}