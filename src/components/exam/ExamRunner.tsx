import { useMemo, useState } from "react";
import type { ExamQuestion, ExamTypeFilter, QuizId } from "../../types";
import { CATEGORY_COLORS, BRAND } from "../../theme/colors";
import { card, layout, text, btnSecondary } from "../../theme/styles";
import { SPACE, TYPE } from "../../theme/tokens";
import { deserializeAnswers, deserializeSubmitted } from "../../stores/progressSerialize";
import { useProgressStore, useQuizProgress } from "../../stores/useProgressStore";
import { filterExamQuestions, isExamAnswerCorrect, isMultiAnswerQuestion } from "../../utils/examGrading";
import { FilterBar, FilterChip, FilterGroup } from "../ui/FilterBar";
import { ExamQuestionCard } from "./ExamQuestionCard";

const TYPE_FILTERS: { id: ExamTypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "scenario", label: "🗒 Scenario" },
  { id: "mc", label: "Multiple choice" },
  { id: "ma", label: "✦ Multi-answer" },
  { id: "tf", label: "True / false" },
];

export interface ExamRunnerProps {
  questions: ExamQuestion[];
  /** When set, answers and submissions persist via Zustand + localStorage. */
  quizId?: QuizId;
  passThreshold?: number;
  showPassHint?: boolean;
  defaultTypeFilter?: ExamTypeFilter;
}

export function ExamRunner({
  questions,
  quizId,
  passThreshold = 80,
  showPassHint = true,
  defaultTypeFilter = "all",
}: ExamRunnerProps) {
  const quizData = useQuizProgress(quizId);
  const setQuizAnswer = useProgressStore((s) => s.setQuizAnswer);
  const submitQuestion = useProgressStore((s) => s.submitQuestion);
  const resetQuiz = useProgressStore((s) => s.resetQuiz);

  const [localAnswers, setLocalAnswers] = useState<Record<number, number | Set<number>>>({});
  const [localSubmitted, setLocalSubmitted] = useState<Record<number, boolean>>({});
  const [catFilter, setCatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<ExamTypeFilter>(defaultTypeFilter);

  const answers = useMemo(() => {
    if (!quizId) return localAnswers;
    if (!quizData) return {};
    return deserializeAnswers(quizData.answers);
  }, [quizId, quizData, localAnswers]);

  const submitted = useMemo(() => {
    if (!quizId) return localSubmitted;
    if (!quizData) return {};
    return deserializeSubmitted(quizData.submitted);
  }, [quizId, quizData, localSubmitted]);

  const categories = useMemo(() => ["all", ...new Set(questions.map((q) => q.cat))], [questions]);

  const visible = useMemo(
    () => filterExamQuestions(questions, catFilter, typeFilter),
    [questions, catFilter, typeFilter]
  );

  const totalDone = Object.keys(submitted).length;
  const totalCorrect = Object.keys(submitted).filter((id) => {
    const question = questions.find((x) => x.id === +id);
    return question && isExamAnswerCorrect(question, answers[+id]);
  }).length;
  const pct = totalDone ? Math.round((totalCorrect / totalDone) * 100) : 0;

  const handleSelect = (question: ExamQuestion, idx: number) => {
    if (submitted[question.id]) return;

    if (quizId) {
      if (isMultiAnswerQuestion(question)) {
        const current =
          answers[question.id] instanceof Set
            ? (answers[question.id] as Set<number>)
            : new Set<number>();
        const next = new Set(current);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        setQuizAnswer(quizId, question.id, next);
      } else {
        setQuizAnswer(quizId, question.id, idx);
      }
      return;
    }

    if (isMultiAnswerQuestion(question)) {
      setLocalAnswers((prev) => {
        const current = prev[question.id] instanceof Set ? (prev[question.id] as Set<number>) : new Set<number>();
        const next = new Set(current);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        return { ...prev, [question.id]: next };
      });
    } else {
      setLocalAnswers((prev) => ({ ...prev, [question.id]: idx }));
    }
  };

  const handleSubmit = (questionId: number) => {
    if (answers[questionId] === undefined) return;
    if (quizId) submitQuestion(quizId, questionId);
    else setLocalSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    if (quizId) resetQuiz(quizId);
    else {
      setLocalAnswers({});
      setLocalSubmitted({});
    }
  };

  return (
    <div style={layout.stack(SPACE.lg)}>
      {quizId && (
        <p style={{ ...text.muted, fontSize: TYPE.sm, margin: 0 }}>
          Progress saves automatically in this browser.
        </p>
      )}

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
                  background: pct >= passThreshold ? BRAND.pass : BRAND.fail,
                  borderRadius: 99,
                  transition: "width .4s",
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: TYPE.xl, fontWeight: 700, color: pct >= passThreshold ? BRAND.pass : BRAND.fail }}>
              {pct}%
            </div>
            {showPassHint && (
              <p style={{ ...text.muted, fontSize: TYPE.xs, marginTop: 2 }}>Pass: {passThreshold}%</p>
            )}
          </div>
          <button type="button" onClick={handleReset} style={btnSecondary()}>
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
        Showing {visible.length} of {questions.length} · {totalDone} answered
      </p>

      <div style={layout.stack(SPACE.md)}>
        {visible.map((q) => (
          <ExamQuestionCard
            key={q.id}
            question={q}
            answer={answers[q.id]}
            submitted={!!submitted[q.id]}
            onSelect={(idx) => handleSelect(q, idx)}
            onSubmit={() => handleSubmit(q.id)}
          />
        ))}
      </div>
    </div>
  );
}
