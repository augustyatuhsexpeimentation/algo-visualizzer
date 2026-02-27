"use client";

import { PageHeader } from "@/components/layout";
import { GraphVisualizer } from "@/components/graph";

export default function GraphPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Graph Algorithms"
        description="Explore graph traversal and shortest path algorithms on interactive graphs. Drag nodes to reposition them."
      />
      <GraphVisualizer />
    </div>
  );
}