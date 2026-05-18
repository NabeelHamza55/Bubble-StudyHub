import { useState } from "react";
import { Accordion } from "../ui/Accordion";
import { STUDY_TOPICS } from "../../data";
import type { ResourceFilter, ResourceKind } from "../../types";
import { RESOURCE_COLORS, RESOURCE_BACKGROUNDS, RESOURCE_LABELS, BRAND } from "../../theme/colors";
import { useToggleSet } from "../../hooks/useToggleSet";

const RESOURCE_FILTERS: { id: ResourceFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "d", label: "📖 Docs" },
  { id: "v", label: "🎬 Video" },
  { id: "b", label: "📝 Blog" },
];

interface StudyMaterialTabProps {
  searchQuery: string;
}

export function StudyMaterialTab({ searchQuery }: StudyMaterialTabProps) {
  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>("all");
  const { set: openTopics, toggle: toggleTopic } = useToggleSet<string>(["perf"]);

  const sq = searchQuery.toLowerCase();
  const topics = STUDY_TOPICS.filter((t) => !sq || JSON.stringify(t).toLowerCase().includes(sq));

  return (
    <>
      <WorkloadBanner />
      <div style={{ display: "flex", gap: 3, marginBottom: 8, flexWrap: "wrap" }}>
        {RESOURCE_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setResourceFilter(f.id)}
            style={{
              padding: "4px 10px",
              borderRadius: 5,
              border: `1.5px solid ${resourceFilter === f.id ? BRAND.primary : BRAND.border}`,
              background: resourceFilter === f.id ? BRAND.primary : BRAND.white,
              color: resourceFilter === f.id ? BRAND.white : "#374151",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {topics.map((topic) => {
        const resources = topic.r.filter((r) => resourceFilter === "all" || r.k === resourceFilter);
        return (
          <Accordion
            key={topic.id}
            title={`${topic.n}  ${topic.t}`}
            accent={topic.a}
            open={openTopics.has(topic.id)}
            toggle={() => toggleTopic(topic.id)}
            badge={
              <>
                {topic.h && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#B91C1C",
                      background: "#FFF1F2",
                      border: "1px solid #FECACA",
                      padding: "1px 6px",
                      borderRadius: 99,
                      marginRight: 3,
                    }}
                  >
                    HARDEST
                  </span>
                )}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#6B7280",
                    background: "#F3F4F6",
                    padding: "2px 6px",
                    borderRadius: 99,
                  }}
                >
                  {resources.length}
                </span>
              </>
            }
          >
            <p style={{ fontSize: 11.5, color: BRAND.muted, margin: "0 0 6px", lineHeight: 1.45 }}>
              {topic.d}
            </p>
            {topic.w && (
              <div
                style={{
                  margin: "0 0 6px",
                  padding: "6px 9px",
                  background: "#FFF7ED",
                  border: "1px solid #FED7AA",
                  borderRadius: 5,
                  fontSize: 11,
                  color: "#92400E",
                }}
              >
                ⚠ {topic.w}
              </div>
            )}
            <div style={{ display: "grid", gap: 3 }}>
              {resources.map((resource, i) => (
                <ResourceLink key={i} resource={resource} />
              ))}
            </div>
          </Accordion>
        );
      })}
    </>
  );
}

function WorkloadBanner() {
  return (
    <div
      style={{
        margin: "0 0 10px",
        padding: "10px 12px",
        background: "#FFF7ED",
        border: "1.5px solid #FED7AA",
        borderRadius: 8,
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: 16 }}>🔥</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: 11.5, color: "#B45309", marginBottom: 2 }}>
          WORKLOAD IS THE HARDEST TOPIC
        </div>
        <p style={{ fontSize: 11, color: "#92400E", margin: 0, lineHeight: 1.5 }}>
          Certified devs consistently name it as least prepared.{" "}
          <strong style={{ color: "#B45309" }}>Don&apos;t skip Section 06.</strong>
        </p>
      </div>
    </div>
  );
}

function ResourceLink({ resource }: { resource: { t: string; n: string; u: string; k: ResourceKind } }) {
  return (
    <a
      href={resource.u}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 10px",
        background: "#F9FAFB",
        borderRadius: 6,
        border: "1px solid #E5E7EB",
        textDecoration: "none",
        transition: "background .15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#F3F4F6";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#F9FAFB";
      }}
    >
      <span style={{ fontSize: 12 }}>{resource.t}</span>
      <span style={{ flex: 1, fontSize: 11.5, color: "#1F2937" }}>{resource.n}</span>
      <span
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          color: RESOURCE_COLORS[resource.k],
          background: RESOURCE_BACKGROUNDS[resource.k],
          padding: "2px 6px",
          borderRadius: 4,
        }}
      >
        {RESOURCE_LABELS[resource.k]}
      </span>
    </a>
  );
}
