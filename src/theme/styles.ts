import type { CSSProperties } from "react";
import { BRAND } from "./colors";
import { RADIUS, SPACE, TYPE } from "./tokens";

export const layout = {
  stack: (gap: number = SPACE.md): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    gap,
  }),

  row: (gap: number = SPACE.sm): CSSProperties => ({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap,
  }),
};

export const card: CSSProperties = {
  background: BRAND.white,
  border: `1px solid ${BRAND.border}`,
  borderRadius: RADIUS.md,
  padding: `${SPACE.lg}px ${SPACE.xl}px`,
};

export const text = {
  h1: {
    fontSize: TYPE.h1,
    fontWeight: 700,
    color: BRAND.text,
    margin: 0,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  } satisfies CSSProperties,

  h2: {
    fontSize: TYPE.h2,
    fontWeight: 700,
    color: BRAND.text,
    margin: 0,
    lineHeight: 1.3,
  } satisfies CSSProperties,

  h3: {
    fontSize: TYPE.h3,
    fontWeight: 700,
    color: BRAND.text,
    margin: 0,
    lineHeight: 1.35,
  } satisfies CSSProperties,

  body: {
    fontSize: TYPE.base,
    color: BRAND.text,
    lineHeight: TYPE.lineHeightRelaxed,
    margin: 0,
  } satisfies CSSProperties,

  muted: {
    fontSize: TYPE.sm,
    color: BRAND.muted,
    lineHeight: TYPE.lineHeight,
    margin: 0,
  } satisfies CSSProperties,

  label: {
    fontSize: TYPE.label,
    fontWeight: 700,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: 0,
  } satisfies CSSProperties,
};

export function badgeStyle(
  color: string,
  bg: string,
  opts?: { border?: string }
): CSSProperties {
  return {
    fontSize: TYPE.xs,
    fontWeight: 700,
    color,
    background: bg,
    padding: "4px 10px",
    borderRadius: 99,
    border: opts?.border ?? "none",
    whiteSpace: "nowrap",
  };
}

export function chipStyle(active: boolean, activeColor: string, subtle?: boolean): CSSProperties {
  return {
    padding: subtle ? "8px 14px" : "8px 16px",
    borderRadius: RADIUS.sm,
    border: `1.5px solid ${active ? activeColor : BRAND.border}`,
    background: active ? (subtle ? activeColor + "18" : activeColor) : BRAND.white,
    color: active ? (subtle ? activeColor : BRAND.white) : "#374151",
    fontSize: TYPE.sm,
    fontWeight: 600,
    cursor: "pointer",
    lineHeight: 1.3,
  };
}

export function btnSecondary(): CSSProperties {
  return {
    fontSize: TYPE.sm,
    fontWeight: 600,
    color: BRAND.muted,
    background: "#F3F4F6",
    border: `1px solid ${BRAND.border}`,
    borderRadius: RADIUS.sm,
    padding: "8px 14px",
    cursor: "pointer",
  };
}

export function alertBox(variant: "warn" | "info" | "danger" = "warn"): CSSProperties {
  const map = {
    warn: { bg: "#FFF7ED", border: "#FED7AA", color: "#92400E" },
    info: { bg: "#FAF5FF", border: "#DDD6FE", color: "#5B21B6" },
    danger: { bg: "#FFF1F2", border: "#FECACA", color: "#B91C1C" },
  };
  const v = map[variant];
  return {
    padding: `${SPACE.md}px ${SPACE.lg}px`,
    background: v.bg,
    border: `1px solid ${v.border}`,
    borderRadius: RADIUS.sm,
    fontSize: TYPE.sm,
    color: v.color,
    lineHeight: TYPE.lineHeightRelaxed,
  };
}
