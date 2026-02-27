import { SpeedPreset } from "@/types";

export const SPEED_PRESETS: SpeedPreset[] = [
  { label: "0.25x", value: 2000 },
  { label: "0.5x", value: 1000 },
  { label: "1x", value: 500 },
  { label: "2x", value: 250 },
  { label: "4x", value: 100 },
  { label: "8x", value: 50 },
];

export const DEFAULT_SPEED = 500;
export const DEFAULT_ARRAY_SIZE = 20;
export const MIN_ARRAY_SIZE = 5;
export const MAX_ARRAY_SIZE = 100;
export const MIN_VALUE = 5;
export const MAX_VALUE = 100;

export const GRAPH_CANVAS_WIDTH = 800;
export const GRAPH_CANVAS_HEIGHT = 500;
export const NODE_RADIUS = 24;
export const DEFAULT_EDGE_WEIGHT = 1;