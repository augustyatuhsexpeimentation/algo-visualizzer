"use client";

import { useSortingStore, useAnimationStore } from "@/store";
import { Button, Select, Slider } from "@/components/ui";
import { SORT_ALGORITHMS } from "@/lib/complexity";
import { MIN_ARRAY_SIZE, MAX_ARRAY_SIZE } from "@/lib/constants";

export function SortingControls() {
  const algorithmId = useSortingStore((s) => s.algorithmId);
  const arraySize = useSortingStore((s) => s.arraySize);
  const setAlgorithm = useSortingStore((s) => s.setAlgorithm);
  const setArraySize = useSortingStore((s) => s.setArraySize);
  const generateArray = useSortingStore((s) => s.generateArray);
  const computeSteps = useSortingStore((s) => s.computeSteps);
  const status = useAnimationStore((s) => s.status);
  const reset = useAnimationStore((s) => s.reset);

  const isRunning = status === "playing";

  const algorithmOptions = Object.values(SORT_ALGORITHMS).map((a) => ({
    label: a.name,
    value: a.id,
  }));

  const handleRun = () => {
    reset();
    computeSteps();
    useAnimationStore.getState().play();
  };

  const handleGenerate = () => {
    reset();
    generateArray();
  };

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    reset();
    setAlgorithm(e.target.value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    setArraySize(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
      <Select
        id="sort-algo"
        label="Algorithm"
        options={algorithmOptions}
        value={algorithmId}
        onChange={handleAlgorithmChange}
        disabled={isRunning}
      />

      <div className="flex flex-col gap-1">
        <Slider
          id="array-size"
          label={`Array Size: ${arraySize}`}
          min={MIN_ARRAY_SIZE}
          max={MAX_ARRAY_SIZE}
          value={arraySize}
          onChange={handleSizeChange}
          disabled={isRunning}
        />
      </div>

      <Button variant="secondary" onClick={handleGenerate} disabled={isRunning}>
        Generate New
      </Button>

      <Button variant="primary" onClick={handleRun} disabled={isRunning}>
        {isRunning ? "Running..." : "Run"}
      </Button>
    </div>
  );
}