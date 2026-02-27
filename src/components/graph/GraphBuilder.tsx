"use client";

import { useState } from "react";
import { useGraphStore, useAnimationStore } from "@/store";
import { Button, Select } from "@/components/ui";

export function GraphBuilder() {
  const graph = useGraphStore((s) => s.graph);
  const addNode = useGraphStore((s) => s.addNode);
  const removeNode = useGraphStore((s) => s.removeNode);
  const addEdge = useGraphStore((s) => s.addEdge);
  const removeEdge = useGraphStore((s) => s.removeEdge);
  const status = useAnimationStore((s) => s.status);

  const [edgeSource, setEdgeSource] = useState("");
  const [edgeTarget, setEdgeTarget] = useState("");
  const [edgeWeight, setEdgeWeight] = useState("1");

  const isRunning = status === "playing";

  const nodeOptions = graph.nodes.map((n) => ({
    label: n.label,
    value: n.id,
  }));

  const handleAddEdge = () => {
    if (edgeSource && edgeTarget && edgeSource !== edgeTarget) {
      addEdge(edgeSource, edgeTarget, parseInt(edgeWeight) || 1);
      setEdgeSource("");
      setEdgeTarget("");
      setEdgeWeight("1");
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Graph Builder
      </h3>

      <div className="space-y-3">
        {/* Add / Remove Nodes */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addNode()}
            disabled={isRunning || graph.nodes.length >= 26}
          >
            + Add Node
          </Button>

          {graph.nodes.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">Remove:</span>
              {graph.nodes.slice(-3).map((n) => (
                <Button
                  key={n.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNode(n.id)}
                  disabled={isRunning}
                  className="h-7 w-7 p-0 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  {n.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Add Edge */}
        <div className="flex flex-wrap items-end gap-2">
          <Select
            id="edge-source"
            label="From"
            options={[{ label: "—", value: "" }, ...nodeOptions]}
            value={edgeSource}
            onChange={(e) => setEdgeSource(e.target.value)}
            disabled={isRunning}
            className="w-20"
          />
          <Select
            id="edge-target"
            label="To"
            options={[{ label: "—", value: "" }, ...nodeOptions]}
            value={edgeTarget}
            onChange={(e) => setEdgeTarget(e.target.value)}
            disabled={isRunning}
            className="w-20"
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Weight
            </label>
            <input
              type="number"
              min="1"
              max="99"
              value={edgeWeight}
              onChange={(e) => setEdgeWeight(e.target.value)}
              disabled={isRunning}
              className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddEdge}
            disabled={isRunning || !edgeSource || !edgeTarget}
          >
            + Edge
          </Button>
        </div>

        {/* Edge List */}
        {graph.edges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {graph.edges.map((e) => (
              <span
                key={e.id}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-700"
              >
                <span className="text-slate-600 dark:text-slate-300">
                  {e.source}—{e.target} ({e.weight})
                </span>
                <button
                  onClick={() => removeEdge(e.id)}
                  disabled={isRunning}
                  className="ml-0.5 text-red-400 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}