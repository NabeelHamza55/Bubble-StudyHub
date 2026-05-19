import { useState } from "react";
import { Accordion } from "../ui/Accordion";
import { Badge } from "../ui/Badge";
import { FilterBar, FilterChip, FilterGroup } from "../ui/FilterBar";
import { STUDY_TOPICS } from "../../data";
import type { ResourceFilter, ResourceKind } from "../../types";
import { RESOURCE_COLORS, RESOURCE_BACKGROUNDS, RESOURCE_LABELS, BRAND } from "../../theme/colors";
import { alertBox, layout, text } from "../../theme/styles";
import { RADIUS, SPACE, TYPE } from "../../theme/tokens";
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
    <div style={layout.stack(SPACE.lg)}>
      <WorkloadBanner />

      <FilterBar>
        <FilterGroup label="Resource type">
          {RESOURCE_FILTERS.map((f) => (
            <FilterChip
              key={f.id}
              active={resourceFilter === f.id}
              activeColor={BRAND.primary}
              onClick={() => setResourceFilter(f.id)}
            >
              {f.label}
            </FilterChip>
          ))}
        </FilterGroup>
      </FilterBar>

      {topics.map((topic) => {
        const resources = topic.r.filter((r) => resourceFilter === "all" || r.k === resourceFilter);
        return (
          <Accordion
            key={topic.id}
            title={`${topic.n} · ${topic.t}`}
            accent={topic.a}
            open={openTopics.has(topic.id)}
            toggle={() => toggleTopic(topic.id)}
            badge={
              <>
                {topic.h && (
                  <Badge color="var(--badge-fail-text)" background="var(--badge-fail-bg)" border="1px solid var(--exam-wrong-border)">
                    HARDEST
                  </Badge>
                )}
                <Badge color="var(--badge-neutral-text)" background="var(--badge-neutral-bg)">
                  {resources.length}
                </Badge>
              </>
            }
          >
            <p style={{ ...text.muted, fontSize: TYPE.base, marginBottom: SPACE.md }}>{topic.d}</p>
            {topic.w && <div style={{ ...alertBox("warn"), marginBottom: SPACE.md }}>⚠ {topic.w}</div>}
            <div style={layout.stack(SPACE.sm)}>
              {resources.map((resource, i) => (
                <ResourceLink key={i} resource={resource} />
              ))}
            </div>
          </Accordion>
        );
      })}
    </div>
  );
}

function WorkloadBanner() {
  return (
    <div
      style={{
        ...alertBox("warn"),
        display: "flex",
        gap: SPACE.md,
        alignItems: "flex-start",
        borderWidth: 1.5,
      }}
    >
      <span style={{ fontSize: TYPE.xl }} aria-hidden>
        🔥
      </span>
      <div>
        <p style={{ ...text.h3, color: "var(--dashboard-alert-title)", marginBottom: SPACE.xs }}>Workload is the hardest topic</p>
        <p style={{ ...text.muted, fontSize: TYPE.base, color: "var(--alert-warn-text)" }}>
          Certified devs consistently name it as least prepared.{" "}
          <strong style={{ color: "var(--dashboard-alert-title)" }}>Don&apos;t skip Section 06.</strong>
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
      className="study-resource-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: SPACE.md,
        padding: `${SPACE.md}px ${SPACE.lg}px`,
        borderRadius: RADIUS.sm,
        textDecoration: "none",
        transition: "background .15s, border-color .15s",
      }}
    >
      <span style={{ fontSize: TYPE.lg }}>{resource.t}</span>
      <span className="study-resource-label" style={{ flex: 1, fontSize: TYPE.base, lineHeight: TYPE.lineHeightRelaxed }}>
        {resource.n}
      </span>
      <Badge
        color={RESOURCE_COLORS[resource.k]}
        background={RESOURCE_BACKGROUNDS[resource.k]}
      >
        {RESOURCE_LABELS[resource.k]}
      </Badge>
    </a>
  );
}
