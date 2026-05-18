import type { CSSProperties, ReactNode } from "react";
import { badgeStyle } from "../../theme/styles";

interface BadgeProps {
  children: ReactNode;
  color: string;
  background: string;
  border?: string;
  style?: CSSProperties;
}

export function Badge({ children, color, background, border, style }: BadgeProps) {
  return <span style={{ ...badgeStyle(color, background, { border }), ...style }}>{children}</span>;
}
