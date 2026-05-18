import { useMemo, useState } from "react";
import { PRACTICE_EXAM_QUESTIONS } from "../../data";
import type { ExamQuestion, ExamTypeFilter } from "../../types";
import { CATEGORY_COLORS, BRAND } from "../../theme/colors";
import { card, layout, text, btnSecondary } from "../../theme/styles";
import { SPACE, TYPE } from "../../theme/tokens";
import { filterExamQuestions, isExamAnswerCorrect } from "../../utils/examGrading";
import { FilterBar, FilterChip, FilterGroup } from "../ui/FilterBar";
import { ExamQuestionCard } from "./ExamQuestionCard";

const TYPE_FILTERS: { id: ExamTypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "scenario", label: "🗒 Scenario" },
  { id: "mc", label: "Multiple choice" },
  { id: "ma", label: "✦ Multi-answer" },
  { id: "tf", label: "True / false" },
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

  return (
    <div style={layout.stack(SPACE.lg)}>
      {totalDone > 0 && (
        <div
          style={{
            ...card,
            display: "flex",
            alignItems: "center",
            gap: SPACE.lg,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ ...text.muted, marginBottom: SPACE.sm }}>
              Score: {totalCorrect}/{totalDone} correct
            </p>
            <div style={{ height: 10, borderRadius: 99, background: BRAND.border, overflow: "hidden" }}>
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
            <div style={{ fontSize: TYPE.xl, fontWeight: 700, color: pct >= 80 ? BRAND.pass : BRAND.fail }}>
              {pct}%
            </div>
            <p style={{ ...text.muted, fontSize: TYPE.xs, marginTop: 2 }}>Pass: 80%</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted({});
            }}
            style={btnSecondary()}
          >
            Reset all
          </button>
        </div>
      )}

      <FilterBar>
        <FilterGroup label="Question type">
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
        </FilterGroup>
        <FilterGroup label="Topic">
          {categories.map((c) => (
            <FilterChip
              key={c}
              active={catFilter === c}
              activeColor={CATEGORY_COLORS[c] ?? BRAND.primary}
              subtle
              onClick={() => setCatFilter(c)}
            >
              {c === "all" ? "All topics" : c}
            </FilterChip>
          ))}
        </FilterGroup>
      </FilterBar>

      <p style={{ ...text.muted, fontWeight: 500 }}>
        Showing {visible.length} of {PRACTICE_EXAM_QUESTIONS.length} · {totalDone} answered
      </p>

      <div style={layout.stack(SPACE.md)}>
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
    </div>
  );
}
