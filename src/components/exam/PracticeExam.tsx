import { useMemo, useState, type ReactNode } from "react";
import { PRACTICE_EXAM_QUESTIONS } from "../../data";
import type { ExamQuestion, ExamTypeFilter } from "../../types";
import { CATEGORY_COLORS, BRAND } from "../../theme/colors";
import { filterExamQuestions, isExamAnswerCorrect } from "../../utils/examGrading";
import { ExamQuestionCard } from "./ExamQuestionCard";

const TYPE_FILTERS: { id: ExamTypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "scenario", label: "🗒 Scenario" },
  { id: "mc", label: "MC" },
  { id: "ma", label: "✦ Multi-Answer" },
  { id: "tf", label: "T/F" },
];

export function PracticeExam() {
  const [answers, setAnswers] = useState<Record<number, number | Set<number>>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [catFilter, setCatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<ExamTypeFilter>("all");

  const categories = useMemo(
    () => ["all", ...new Set(PRACTICE_EXAM_QUESTIONS.map((q) => q.cat))],
    []
  );

  const visible = useMemo(
    () => filterExamQuestions(PRACTICE_EXAM_QUESTIONS, catFilter, typeFilter),
    [catFilter, typeFilter]
  );

  const totalDone = Object.keys(submitted).length;
  const totalCorrect = Object.keys(submitted).filter((id) => {
    const question = PRACTICE_EXAM_QUESTIONS.find((x) => x.id === +id);
    return question && isExamAnswerCorrect(question, answers[+id]);
  }).length;
  const pct = totalDone ? Math.round((totalCorrect / totalDone) * 100) : 0;

  const handleSelect = (question: ExamQuestion, idx: number) => {
    if (submitted[question.id]) return;
    if (question.type === "ma") {
      setAnswers((prev) => {
        const current = prev[question.id] instanceof Set ? (prev[question.id] as Set<number>) : new Set<number>();
        const next = new Set(current);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        return { ...prev, [question.id]: next };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [question.id]: idx }));
    }
  };

  const resetAll = () => {
    setAnswers({});
    setSubmitted({});
  };

  return (
    <div>
      {totalDone > 0 && (
        <div
          style={{
            background: BRAND.white,
            border: `1.5px solid ${BRAND.border}`,
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: BRAND.muted, marginBottom: 4 }}>
              Score: {totalCorrect}/{totalDone} answered correctly
            </div>
            <div style={{ height: 6, borderRadius: 99, background: BRAND.border, overflow: "hidden" }}>
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: pct >= 80 ? BRAND.pass : BRAND.fail,
                  borderRadius: 99,
                  transition: "width .4s",
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: pct >= 80 ? BRAND.pass : BRAND.fail }}>
              {pct}%
            </div>
            <div style={{ fontSize: 9, color: "#9CA3AF" }}>Pass: 80%</div>
          </div>
          <button
            type="button"
            onClick={resetAll}
            style={{
              fontSize: 10.5,
              color: BRAND.muted,
              background: "#F3F4F6",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 5,
              padding: "4px 10px",
              cursor: "pointer",
            }}
          >
            Reset All
          </button>
        </div>
      )}

      <div
        style={{
          background: BRAND.white,
          border: `1.5px solid ${BRAND.border}`,
          borderRadius: 8,
          padding: "10px 12px",
          marginBottom: 10,
        }}
      >
        <FilterSection label="Filter by type">
          {TYPE_FILTERS.map((f) => (
            <FilterChip
              key={f.id}
              active={typeFilter === f.id}
              activeColor={BRAND.primary}
              onClick={() => setTypeFilter(f.id)}
            >
              {f.label}
            </FilterChip>
          ))}
        </FilterSection>
        <FilterSection label="Filter by topic">
          {categories.map((c) => {
            const color = CATEGORY_COLORS[c] ?? BRAND.primary;
            return (
              <FilterChip
                key={c}
                active={catFilter === c}
                activeColor={color}
                onClick={() => setCatFilter(c)}
                subtle
              >
                {c === "all" ? "All Topics" : c}
              </FilterChip>
            );
          })}
        </FilterSection>
      </div>

      <p style={{ fontSize: 11, color: BRAND.muted, marginBottom: 8, fontWeight: 500 }}>
        {visible.length} of {PRACTICE_EXAM_QUESTIONS.length} questions shown · {totalDone} answered
      </p>

      {visible.map((q) => (
        <ExamQuestionCard
          key={q.id}
          question={q}
          answer={answers[q.id]}
          submitted={!!submitted[q.id]}
          onSelect={(idx) => handleSelect(q, idx)}
          onSubmit={() => {
            if (answers[q.id] !== undefined) {
              setSubmitted((prev) => ({ ...prev, [q.id]: true }));
            }
          }}
        />
      ))}
    </div>
  );
}

function FilterSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#9CA3AF",
          textTransform: "uppercase",
          letterSpacing: ".06em",
          marginBottom: 5,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 8 }}>{children}</div>
    </>
  );
}

function FilterChip({
  active,
  activeColor,
  onClick,
  subtle,
  children,
}: {
  active: boolean;
  activeColor: string;
  onClick: () => void;
  subtle?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: subtle ? "3px 8px" : "3px 9px",
        borderRadius: 5,
        border: `1.5px solid ${active ? activeColor : "#E5E7EB"}`,
        background: active ? (subtle ? activeColor + "15" : activeColor) : "#fff",
        color: active ? (subtle ? activeColor : "#fff") : "#374151",
        fontSize: subtle ? 10.5 : 11,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
