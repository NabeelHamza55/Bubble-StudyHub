export const LAYOUT = {
  sidebarWidth: 280,
  contentPaddingX: 28,
  contentPaddingY: 24,
} as const;

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export const RADIUS = {
  sm: 8,
  md: 10,
  lg: 12,
} as const;

/** Readable type scale (px) — minimum body text 16px */
export const TYPE = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 17,
  lg: 18,
  xl: 22,
  h1: 28,
  h2: 20,
  h3: 17,
  label: 13,
  lineHeight: 1.55,
  lineHeightRelaxed: 1.65,
} as const;
