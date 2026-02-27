export const BAR_COLORS = {
  default: "bg-indigo-500 dark:bg-indigo-400",
  comparing: "bg-yellow-400 dark:bg-yellow-300",
  swapping: "bg-red-500 dark:bg-red-400",
  sorted: "bg-emerald-500 dark:bg-emerald-400",
  pivot: "bg-purple-500 dark:bg-purple-400",
  merging: "bg-cyan-500 dark:bg-cyan-400",
} as const;

export const NODE_COLORS = {
  default: "fill-slate-300 dark:fill-slate-600",
  current: "fill-yellow-400 dark:fill-yellow-300",
  visited: "fill-emerald-500 dark:fill-emerald-400",
  queued: "fill-cyan-400 dark:fill-cyan-300",
  path: "fill-purple-500 dark:fill-purple-400",
  start: "fill-blue-500 dark:fill-blue-400",
  end: "fill-red-500 dark:fill-red-400",
} as const;

export const EDGE_COLORS = {
  default: "stroke-slate-400 dark:stroke-slate-500",
  active: "stroke-yellow-400 dark:stroke-yellow-300",
  highlighted: "stroke-emerald-500 dark:stroke-emerald-400",
  path: "stroke-purple-500 dark:stroke-purple-400",
} as const;

// Hex values for canvas/SVG rendering
export const BAR_HEX = {
  default: "#6366f1",
  comparing: "#facc15",
  swapping: "#ef4444",
  sorted: "#10b981",
  pivot: "#a855f7",
  merging: "#06b6d4",
} as const;

export const NODE_HEX = {
  default: "#94a3b8",
  current: "#facc15",
  visited: "#10b981",
  queued: "#22d3ee",
  path: "#a855f7",
  start: "#3b82f6",
  end: "#ef4444",
} as const;

export const EDGE_HEX = {
  default: "#94a3b8",
  active: "#facc15",
  highlighted: "#10b981",
  path: "#a855f7",
} as const;