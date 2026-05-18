import type { ResourceKind } from "../types";

export const RESOURCE_COLORS: Record<ResourceKind, string> = {
  d: "#1D4ED8",
  v: "#DC2626",
  b: "#15803D",
};

export const RESOURCE_BACKGROUNDS: Record<ResourceKind, string> = {
  d: "#EFF6FF",
  v: "#FFF1F2",
  b: "#F0FDF4",
};

export const RESOURCE_LABELS: Record<ResourceKind, string> = {
  d: "DOCS",
  v: "VIDEO",
  b: "BLOG",
};

export const CATEGORY_COLORS: Record<string, string> = {
  "Bubble Interface": "#7C3AED",
  "Layout & Styles": "#0369A1",
  "Frontend Functionality": "#0369A1",
  "Backend Functionality": "#047857",
  "Database & Security": "#B45309",
  "Performance & Workload": "#B91C1C",
  "APIs & Integrations": "#7C3AED",
};

export const BRAND = {
  primary: "#7C3AED",
  pass: "#047857",
  fail: "#B91C1C",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  surface: "#F9FAFB",
  white: "#fff",
} as const;
