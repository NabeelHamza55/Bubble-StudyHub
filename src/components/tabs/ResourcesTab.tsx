import type { ReactNode } from "react";
import { EXTERNAL_RESOURCES, OFFICIAL_RESOURCES, WORKLOAD_CONCEPTS } from "../../data";
import { BRAND, RESOURCE_BACKGROUNDS, RESOURCE_COLORS } from "../../theme/colors";
import { card, layout, text } from "../../theme/styles";
import { RADIUS, SPACE, TYPE } from "../../theme/tokens";
import { Badge } from "../ui/Badge";

export function ResourcesTab() {
  const mockTests = EXTERNAL_RESOURCES.slice(0, 3);
  const community = EXTERNAL_RESOURCES.slice(3);

  return (
    <div style={layout.stack(SPACE.xl)}>
      <Section title="Official Bubble documentation">
        {OFFICIAL_RESOURCES.map((link) => (
          <ExternalLink
            key={link.u}
            href={link.u}
            label={link.n}
            badge="MANUAL"
            badgeColor={RESOURCE_COLORS.d}
            badgeBg={RESOURCE_BACKGROUNDS.d}
          />
        ))}
      </Section>

      <Section title="Free mock tests & study aids">
        {mockTests.map((link) => (
          <ExternalLink
            key={link.u}
            href={link.u}
            label={link.n}
            badge="FREE"
            badgeColor={BRAND.pass}
            badgeBg="var(--resource-free-bg)"
          />
        ))}
      </Section>

      <Section title="Community & expert advice">
        {community.map((link) => (
          <ExternalLink key={link.u} href={link.u} label={link.n} showArrow />
        ))}
      </Section>

      <section className="resources-workload-card" style={card}>
        <h3 className="resources-workload-title" style={{ ...text.h3, marginBottom: SPACE.md }}>
          🔥 Workload concepts — must know
        </h3>
        <p className="resources-workload-lead" style={{ ...text.muted, fontSize: TYPE.base, marginBottom: SPACE.md }}>
          Study until you can explain each without looking:
        </p>
        <ol style={{ ...layout.stack(SPACE.sm), margin: 0, padding: 0, listStyle: "none" }}>
          {WORKLOAD_CONCEPTS.map((concept, i) => (
            <li key={concept} className="resources-workload-item" style={{ display: "flex", gap: SPACE.md, padding: `${SPACE.md}px ${SPACE.lg}px`, borderRadius: RADIUS.sm }}>
              <span className="resources-workload-num" style={{ fontWeight: 700, fontSize: TYPE.sm, minWidth: 24 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="resources-workload-text" style={{ fontSize: TYPE.base, lineHeight: TYPE.lineHeightRelaxed }}>
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
      className="study-resource-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: SPACE.md,
        padding: `${SPACE.md}px ${SPACE.lg}px`,
        borderRadius: RADIUS.md,
        textDecoration: "none",
        transition: "border-color .2s, background .2s",
      }}
    >
      <span className="study-resource-label" style={{ flex: 1, fontSize: TYPE.base, fontWeight: badge ? 500 : 400 }}>
        {label}
      </span>
      {badge && badgeColor && badgeBg && (
        <Badge color={badgeColor} background={badgeBg}>
          {badge}
        </Badge>
      )}
      {showArrow && <span style={{ fontSize: TYPE.lg, color: "var(--app-text-faint)" }} aria-hidden>↗</span>}
    </a>
  );
}
