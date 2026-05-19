import type { ResourceKind } from "../types";

/** Theme-aware tokens — resolve via CSS variables on :root / [data-theme] */
export const BRAND = {
  primary: "var(--app-primary)",
  pass: "var(--app-pass)",
  fail: "var(--app-fail)",
  text: "var(--app-text)",
  muted: "var(--app-text-muted)",
  border: "var(--app-border)",
  surface: "var(--app-surface-muted)",
  white: "var(--app-surface)",
} as const;

export const RESOURCE_COLORS: Record<ResourceKind, string> = {
  d: "#60A5FA",
  v: "#F87171",
  b: "#4ADE80",
};

export const RESOURCE_BACKGROUNDS: Record<ResourceKind, string> = {
  d: "var(--resource-d-bg)",
  v: "var(--resource-v-bg)",
  b: "var(--resource-b-bg)",
};

export const RESOURCE_LABELS: Record<ResourceKind, string> = {
  d: "DOCS",
  v: "VIDEO",
  b: "BLOG",
};

export const CATEGORY_COLORS: Record<string, string> = {
  "Bubble Interface": "#A78BFA",
  "Layout & Styles": "#38BDF8",
  "Frontend Functionality": "#38BDF8",
  "Backend Functionality": "#34D399",
  "Database & Security": "#FBBF24",
  "Performance & Workload": "#F87171",
  "APIs & Integrations": "#C4B5FD",
};
