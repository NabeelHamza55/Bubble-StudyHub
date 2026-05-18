import type { ReactNode } from "react";
import { EXTERNAL_RESOURCES, WORKLOAD_CONCEPTS } from "../../data";
import { BRAND } from "../../theme/colors";

export function ResourcesTab() {
  const mockTests = EXTERNAL_RESOURCES.slice(0, 3);
  const community = EXTERNAL_RESOURCES.slice(3);

  return (
    <>
      <Section title="Free mock tests & study aids">
        {mockTests.map((link) => (
          <ExternalLink key={link.u} href={link.u} label={link.n} badge="FREE" badgeColor="#047857" badgeBg="#ECFDF5" />
        ))}
      </Section>

      <Section title="Community & expert advice">
        {community.map((link) => (
          <ExternalLink key={link.u} href={link.u} label={link.n} showArrow />
        ))}
      </Section>

      <div
        style={{
          padding: "12px 14px",
          background: "#FFF7ED",
          border: "1.5px solid #FED7AA",
          borderRadius: 8,
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: 11.5, color: "#B45309", marginBottom: 6 }}>
          🔥 WORKLOAD CONCEPTS — MUST KNOW
        </h3>
        <p style={{ fontSize: 11.5, color: "#92400E", margin: "0 0 8px", lineHeight: 1.5 }}>
          Study until you can explain each without looking:
        </p>
        <ol style={{ display: "grid", gap: 3, margin: 0, padding: 0, listStyle: "none" }}>
          {WORKLOAD_CONCEPTS.map((concept, i) => (
            <li
              key={concept}
              style={{
                display: "flex",
                gap: 8,
                padding: "6px 9px",
                background: "#FFFBEB",
                borderRadius: 5,
                border: "1px solid #FDE68A",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 10, color: "#D97706", minWidth: 18 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 11.5, color: "#78350F", lineHeight: 1.4 }}>{concept}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h2
        style={{
          fontWeight: 700,
          fontSize: 10.5,
          color: BRAND.muted,
          letterSpacing: ".07em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {title}
      </h2>
      <div style={{ display: "grid", gap: 4, marginBottom: 16 }}>{children}</div>
    </>
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
        gap: 8,
        padding: "9px 12px",
        background: BRAND.white,
        border: `1.5px solid ${BRAND.border}`,
        borderRadius: 8,
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
      <span style={{ flex: 1, fontSize: 12, color: "#1F2937", fontWeight: badge ? 500 : 400 }}>{label}</span>
      {badge && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: badgeColor,
            background: badgeBg,
            padding: "2px 7px",
            borderRadius: 4,
          }}
        >
          {badge}
        </span>
      )}
      {showArrow && <span style={{ fontSize: 11, color: "#9CA3AF" }}>↗</span>}
    </a>
  );
}
