import type { ExamQuestion } from "../../types";
import { CATEGORY_COLORS } from "../../theme/colors";
import {
  canSubmitExamAnswer,
  getExamTypeTag,
  isExamAnswerCorrect,
} from "../../utils/examGrading";

interface ExamQuestionCardProps {
  question: ExamQuestion;
  answer: number | Set<number> | undefined;
  submitted: boolean;
  onSelect: (optionIndex: number) => void;
  onSubmit: () => void;
}

export function ExamQuestionCard({
  question,
  answer,
  submitted,
  onSelect,
  onSubmit,
}: ExamQuestionCardProps) {
  const correct = submitted && isExamAnswerCorrect(question, answer);
  const tag = getExamTypeTag(question);
  const accent = CATEGORY_COLORS[question.cat] ?? "#7C3AED";
  const canSubmit = canSubmitExamAnswer(question, answer);

  return (
    <article
      style={{
        marginBottom: 10,
        background: "#fff",
        border: `1.5px solid ${submitted ? (correct ? "#BBF7D0" : "#FECACA") : "#E5E7EB"}`,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,.04)",
      }}
    >
      <div style={{ padding: "11px 13px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: "#6B7280",
              background: "#F3F4F6",
              padding: "2px 6px",
              borderRadius: 99,
            }}
          >
            Q{question.id}
          </span>
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: tag.color,
              background: tag.bg,
              padding: "2px 7px",
              borderRadius: 99,
            }}
          >
            {tag.label}
          </span>
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 600,
              color: accent,
              background: accent + "12",
              padding: "2px 7px",
              borderRadius: 99,
            }}
          >
            {question.cat}
          </span>
          {submitted && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: 9.5,
                fontWeight: 700,
                color: correct ? "#047857" : "#B91C1C",
                background: correct ? "#DCFCE7" : "#FEE2E2",
                padding: "2px 8px",
                borderRadius: 99,
              }}
            >
              {correct ? "✓ Correct" : "✗ Incorrect"}
            </span>
          )}
        </div>
        {question.scenario && (
          <div
            style={{
              fontSize: 10.5,
              color: "#92400E",
              background: "#FFF7ED",
              border: "1px solid #FED7AA",
              borderRadius: 5,
              padding: "5px 8px",
              marginBottom: 7,
              lineHeight: 1.45,
            }}
          >
            📋 Scenario-based question
          </div>
        )}
        {question.type === "ma" && (
          <div
            style={{
              fontSize: 10.5,
              color: "#7C3AED",
              background: "#FAF5FF",
              border: "1px solid #DDD6FE",
              borderRadius: 5,
              padding: "4px 8px",
              marginBottom: 7,
            }}
          >
            ✦ Select ALL correct answers — there may be more than one.
          </div>
        )}
        <p style={{ fontSize: 12.5, color: "#111827", margin: "0 0 10px", lineHeight: 1.65, fontWeight: 500 }}>
          {question.q}
        </p>
      </div>

      <div style={{ padding: "0 13px 11px", display: "grid", gap: 4 }}>
        {question.opts.map((opt, oi) => {
          const isSelected =
            question.type === "ma" ? answer instanceof Set && answer.has(oi) : answer === oi;
          const isCorrectOption =
            question.type === "ma"
              ? (question.correct as number[]).includes(oi)
              : question.correct === oi;
          let bg = "#F9FAFB";
          let border = "1px solid #E5E7EB";
          let textColor = "#1F2937";
          if (submitted) {
            if (isCorrectOption) {
              bg = "#DCFCE7";
              border = "1.5px solid #86EFAC";
              textColor = "#14532D";
            } else if (isSelected) {
              bg = "#FEE2E2";
              border = "1.5px solid #FCA5A5";
              textColor = "#7F1D1D";
            }
          } else if (isSelected) {
            bg = accent + "0f";
            border = `1.5px solid ${accent}55`;
            textColor = "#111827";
          }
          return (
            <div
              key={oi}
              role="button"
              tabIndex={submitted ? -1 : 0}
              onClick={() => !submitted && onSelect(oi)}
              onKeyDown={(e) => {
                if (!submitted && (e.key === "Enter" || e.key === " ")) onSelect(oi);
              }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                padding: "8px 10px",
                background: bg,
                border,
                borderRadius: 7,
                cursor: submitted ? "default" : "pointer",
                transition: "all .15s",
              }}
            >
              <div
                style={{
                  width: 17,
                  height: 17,
                  borderRadius: question.type === "ma" ? 3 : "50%",
                  border: `2px solid ${
                    isSelected
                      ? submitted
                        ? isCorrectOption
                          ? "#22C55E"
                          : "#EF4444"
                        : accent
                      : "#D1D5DB"
                  }`,
                  background: isSelected
                    ? submitted
                      ? isCorrectOption
                        ? "#22C55E"
                        : "#EF4444"
                      : accent
                    : "#fff",
                  flexShrink: 0,
                  marginTop: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .15s",
                }}
              >
                {isSelected && (
                  <span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>
                    {question.type === "ma" ? "✓" : "●"}
                  </span>
                )}
              </div>
              <span style={{ fontSize: 11.5, color: textColor, lineHeight: 1.55, flex: 1 }}>{opt}</span>
              {submitted && isCorrectOption && (
                <span style={{ fontSize: 10, color: "#15803D", fontWeight: 700, flexShrink: 0 }}>✓</span>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          style={{
            width: "100%",
            padding: 8,
            background: canSubmit ? accent : "#E5E7EB",
            border: "none",
            borderTop: "1.5px solid #E5E7EB",
            cursor: canSubmit ? "pointer" : "default",
            fontSize: 11.5,
            fontWeight: 600,
            color: canSubmit ? "#fff" : "#9CA3AF",
            transition: "all .15s",
          }}
        >
          Submit Answer
        </button>
      ) : (
        <div
          style={{
            padding: "10px 13px 12px",
            borderTop: `1.5px solid ${correct ? "#BBF7D0" : "#FECACA"}`,
            background: correct ? "#F0FDF4" : "#FFF5F5",
          }}
        >
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: correct ? "#14532D" : "#7F1D1D",
              marginBottom: 4,
            }}
          >
            💡 Explanation
          </div>
          <p
            style={{
              fontSize: 11.5,
              color: correct ? "#166534" : "#991B1B",
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            {question.explanation}
          </p>
        </div>
      )}
    </article>
  );
}
