"use client";

import { useGraphStore, useAnimationStore } from "@/store";
import { Button, Select } from "@/components/ui";
import { GRAPH_ALGORITHMS } from "@/lib/complexity";

export function GraphControls() {
  const algorithmId = useGraphStore((s) => s.algorithmId);
  const graph = useGraphStore((s) => s.graph);
  const startNode = useGraphStore((s) => s.startNode);
  const endNode = useGraphStore((s) => s.endNode);
  const setAlgorithm = useGraphStore((s) => s.setAlgorithm);
  const setStartNode = useGraphStore((s) => s.setStartNode);
  const setEndNode = useGraphStore((s) => s.setEndNode);
  const computeSteps = useGraphStore((s) => s.computeSteps);
  const resetGraph = useGraphStore((s) => s.resetGraph);
  const status = useAnimationStore((s) => s.status);
  const reset = useAnimationStore((s) => s.reset);

  const isRunning = status === "playing";

  const algorithmOptions = Object.values(GRAPH_ALGORITHMS).map((a) => ({
    label: a.name,
    value: a.id,
  }));

  const nodeOptions = graph.nodes.map((n) => ({
    label: n.label,
    value: n.id,
  }));

  const handleRun = () => {
    reset();
    computeSteps();
    useAnimationStore.getState().play();
  };

  const handleReset = () => {
    reset();
    resetGraph();
  };

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
      <Select
        id="graph-algo"
        label="Algorithm"
        options={algorithmOptions}
        value={algorithmId}
        onChange={(e) => {
          reset();
          setAlgorithm(e.target.value);
        }}
        disabled={isRunning}
      />

      <Select
        id="start-node"
        label="Start Node"
        options={nodeOptions}
        value={startNode}
        onChange={(e) => {
          reset();
          setStartNode(e.target.value);
        }}
        disabled={isRunning}
      />

      {algorithmId === "dijkstra" && (
        <Select
          id="end-node"
          label="End Node"
          options={nodeOptions}
          value={endNode}
          onChange={(e) => {
            reset();
            setEndNode(e.target.value);
          }}
          disabled={isRunning}
        />
      )}

      <Button variant="secondary" onClick={handleReset} disabled={isRunning}>
        Reset Graph
      </Button>

      <Button variant="primary" onClick={handleRun} disabled={isRunning}>
        {isRunning ? "Running..." : "Run"}
      </Button>
    </div>
  );
}