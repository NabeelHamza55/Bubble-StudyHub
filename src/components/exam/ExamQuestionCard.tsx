import type { ExamQuestion } from "../../types";
import { CATEGORY_COLORS, BRAND } from "../../theme/colors";
import { alertBox, text } from "../../theme/styles";
import { RADIUS, SPACE, TYPE } from "../../theme/tokens";
import { Badge } from "../ui/Badge";
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
  const accent = CATEGORY_COLORS[question.cat] ?? BRAND.primary;
  const canSubmit = canSubmitExamAnswer(question, answer);

  return (
    <article
      style={{
        marginBottom: SPACE.md,
        background: BRAND.white,
        border: `1px solid ${submitted ? (correct ? "#86EFAC" : "#FCA5A5") : BRAND.border}`,
        borderRadius: RADIUS.md,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,.05)",
      }}
    >
      <div style={{ padding: `${SPACE.lg}px ${SPACE.xl}px 0` }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: SPACE.sm,
            marginBottom: SPACE.md,
            flexWrap: "wrap",
          }}
        >
          <Badge color="#374151" background="#F3F4F6">
            Q{question.id}
          </Badge>
          <Badge color={tag.color} background={tag.bg}>
            {tag.label}
          </Badge>
          <Badge color={accent} background={accent + "18"}>
            {question.cat}
          </Badge>
          {submitted && (
            <Badge
              color={correct ? BRAND.pass : BRAND.fail}
              background={correct ? "#DCFCE7" : "#FEE2E2"}
              style={{ marginLeft: "auto" }}
            >
              {correct ? "✓ Correct" : "✗ Incorrect"}
            </Badge>
          )}
        </div>

        {question.scenario && (
          <div style={{ ...alertBox("warn"), marginBottom: SPACE.md }}>📋 Scenario-based question</div>
        )}
        {question.type === "ma" && (
          <div style={{ ...alertBox("info"), marginBottom: SPACE.md }}>
            ✦ Select ALL correct answers — there may be more than one.
          </div>
        )}

        <p style={{ ...text.body, fontWeight: 500, marginBottom: SPACE.lg }}>{question.q}</p>
      </div>

      <div style={{ padding: `0 ${SPACE.xl}px ${SPACE.md}px`, display: "grid", gap: SPACE.sm }}>
        {question.opts.map((opt, oi) => {
          const isSelected =
            question.type === "ma" ? answer instanceof Set && answer.has(oi) : answer === oi;
          const isCorrectOption =
            question.type === "ma"
              ? (question.correct as number[]).includes(oi)
              : question.correct === oi;
          let bg = "#F9FAFB";
          let border = `1px solid ${BRAND.border}`;
          let textColor: string = BRAND.text;
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
            bg = accent + "12";
            border = `1.5px solid ${accent}55`;
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
                gap: SPACE.md,
                padding: `${SPACE.md}px ${SPACE.lg}px`,
                background: bg,
                border,
                borderRadius: RADIUS.sm,
                cursor: submitted ? "default" : "pointer",
                transition: "background .15s, border-color .15s",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: question.type === "ma" ? 5 : "50%",
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
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isSelected && (
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>
                    {question.type === "ma" ? "✓" : "●"}
                  </span>
                )}
              </div>
              <span style={{ fontSize: TYPE.base, color: textColor, lineHeight: TYPE.lineHeightRelaxed, flex: 1 }}>
                {opt}
              </span>
              {submitted && isCorrectOption && (
                <span style={{ fontSize: TYPE.sm, color: BRAND.pass, fontWeight: 700, flexShrink: 0 }}>✓</span>
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
            padding: `${SPACE.md}px`,
            background: canSubmit ? accent : "#E5E7EB",
            border: "none",
            borderTop: `1px solid ${BRAND.border}`,
            cursor: canSubmit ? "pointer" : "default",
            fontSize: TYPE.base,
            fontWeight: 600,
            color: canSubmit ? "#fff" : "#9CA3AF",
          }}
        >
          Submit Answer
        </button>
      ) : (
        <div
          style={{
            padding: `${SPACE.lg}px ${SPACE.xl}px`,
            borderTop: `1px solid ${correct ? "#BBF7D0" : "#FECACA"}`,
            background: correct ? "#F0FDF4" : "#FFF5F5",
          }}
        >
          <p
            style={{
              fontSize: TYPE.sm,
              fontWeight: 700,
              color: correct ? "#14532D" : "#7F1D1D",
              margin: `0 0 ${SPACE.sm}px`,
            }}
          >
            💡 Explanation
          </p>
          <p
            style={{
              fontSize: TYPE.base,
              color: correct ? "#166534" : "#991B1B",
              margin: 0,
              lineHeight: TYPE.lineHeightRelaxed,
            }}
          >
            {question.explanation}
          </p>
        </div>
      )}
    </article>
  );
}
