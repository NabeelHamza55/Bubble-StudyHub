import type { ReactNode } from "react";
import { EXTERNAL_RESOURCES, WORKLOAD_CONCEPTS } from "../../data";
import { BRAND } from "../../theme/colors";
import { card, layout, text } from "../../theme/styles";
import { RADIUS, SPACE, TYPE } from "../../theme/tokens";
import { Badge } from "../ui/Badge";

export function ResourcesTab() {
  const mockTests = EXTERNAL_RESOURCES.slice(0, 3);
  const community = EXTERNAL_RESOURCES.slice(3);

  return (
    <div style={layout.stack(SPACE.xl)}>
      <Section title="Free mock tests & study aids">
        {mockTests.map((link) => (
          <ExternalLink key={link.u} href={link.u} label={link.n} badge="FREE" badgeColor={BRAND.pass} badgeBg="#ECFDF5" />
        ))}
      </Section>

      <Section title="Community & expert advice">
        {community.map((link) => (
          <ExternalLink key={link.u} href={link.u} label={link.n} showArrow />
        ))}
      </Section>

      <section style={{ ...card, background: "#FFF7ED", borderColor: "#FED7AA" }}>
        <h3 style={{ ...text.h3, color: "#B45309", marginBottom: SPACE.md }}>
          🔥 Workload concepts — must know
        </h3>
        <p style={{ ...text.muted, fontSize: TYPE.base, color: "#92400E", marginBottom: SPACE.md }}>
          Study until you can explain each without looking:
        </p>
        <ol style={{ ...layout.stack(SPACE.sm), margin: 0, padding: 0, listStyle: "none" }}>
          {WORKLOAD_CONCEPTS.map((concept, i) => (
            <li
              key={concept}
              style={{
                display: "flex",
                gap: SPACE.md,
                padding: `${SPACE.md}px ${SPACE.lg}px`,
                background: "#FFFBEB",
                borderRadius: RADIUS.sm,
                border: "1px solid #FDE68A",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: TYPE.sm, color: "#D97706", minWidth: 24 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: TYPE.base, color: "#78350F", lineHeight: TYPE.lineHeightRelaxed }}>
                {concept}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 style={{ ...text.label, marginBottom: SPACE.md }}>{title}</h2>
      <div style={layout.stack(SPACE.sm)}>{children}</div>
    </section>
  );
}

function ExternalLink({
  href,
  label,
  badge,
  badgeColor,
  badgeBg,
  showArrow,
}: {
  href: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  showArrow?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: SPACE.md,
        padding: `${SPACE.md}px ${SPACE.lg}px`,
        background: BRAND.white,
        border: `1px solid ${BRAND.border}`,
        borderRadius: RADIUS.md,
        textDecoration: "none",
        transition: "border-color .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = BRAND.primary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = BRAND.border;
      }}
    >
      <span style={{ flex: 1, fontSize: TYPE.base, color: BRAND.text, fontWeight: badge ? 500 : 400 }}>
        {label}
      </span>
      {badge && badgeColor && badgeBg && (
        <Badge color={badgeColor} background={badgeBg}>
          {badge}
        </Badge>
      )}
      {showArrow && <span style={{ fontSize: TYPE.lg, color: "#9CA3AF" }} aria-hidden>↗</span>}
    </a>
  );
}
