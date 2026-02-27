"use client";

import { PageHeader } from "@/components/layout";
import { SortingVisualizer } from "@/components/sorting";

export default function SortingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Sorting Algorithms"
        description="Visualize how different sorting algorithms rearrange elements step by step."
      />
      <SortingVisualizer />
    </div>
  );
}