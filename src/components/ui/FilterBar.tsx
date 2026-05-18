import type { ReactNode } from "react";
import { card, layout, text } from "../../theme/styles";
import { SPACE } from "../../theme/tokens";
import { chipStyle } from "../../theme/styles";

export function FilterBar({ children }: { children: ReactNode }) {
  return <div style={{ ...card, marginBottom: SPACE.md }}>{children}</div>;
}

export function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: SPACE.md }}>
      <p style={{ ...text.label, marginBottom: SPACE.sm }}>{label}</p>
      <div style={layout.row(SPACE.sm)}>{children}</div>
    </div>
  );
}

export function FilterChip({
  active,
  activeColor,
  subtle,
  onClick,
  children,
}: {
  active: boolean;
  activeColor: string;
  subtle?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} style={chipStyle(active, activeColor, subtle)}>
      {children}
    </button>
  );
}
