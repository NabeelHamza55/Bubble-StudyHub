import type { ExamQuestion } from "../../types";
import { CATEGORY_COLORS, BRAND } from "../../theme/colors";
import { alertBox, text } from "../../theme/styles";
import { RADIUS, SPACE, TYPE } from "../../theme/tokens";
import { Badge } from "../ui/Badge";
import {
  canSubmitExamAnswer,
  getExamTypeTag,
  isExamAnswerCorrect,
  isMultiAnswerQuestion,
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
  const multiAnswer = isMultiAnswerQuestion(question);

  return (
    <article
      style={{
        marginBottom: SPACE.md,
        background: BRAND.white,
        border: `1px solid ${
          submitted
            ? correct
              ? "var(--exam-correct-border)"
              : "var(--exam-wrong-border)"
            : BRAND.border
        }`,
        borderRadius: RADIUS.md,
        overflow: "hidden",
        boxShadow: `0 1px 3px var(--app-shadow)`,
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
          <Badge color="var(--badge-neutral-text)" background="var(--badge-neutral-bg)">
            Q{question.id}
          </Badge>
          <Badge color={tag.color} background={tag.bg}>
            {tag.label}
          </Badge>
          <Badge color={accent} background={accent + "22"}>
            {question.cat}
          </Badge>
          {submitted && (
            <Badge
              color={correct ? "var(--badge-pass-text)" : "var(--badge-fail-text)"}
              background={correct ? "var(--badge-pass-bg)" : "var(--badge-fail-bg)"}
              style={{ marginLeft: "auto" }}
            >
              {correct ? "✓ Correct" : "✗ Incorrect"}
            </Badge>
          )}
        </div>

        {question.scenario && (
          <div style={{ ...alertBox("warn"), marginBottom: SPACE.md }}>📋 Scenario-based question</div>
        )}
        {multiAnswer && (
          <div style={{ ...alertBox("info"), marginBottom: SPACE.md }}>
            ✦ Select ALL correct answers — there may be more than one.
          </div>
        )}

        <p style={{ ...text.body, fontWeight: 500, marginBottom: SPACE.lg }}>{question.q}</p>
      </div>

      <div style={{ padding: `0 ${SPACE.xl}px ${SPACE.md}px`, display: "grid", gap: SPACE.sm }}>
        {question.opts.map((opt, oi) => {
          const isSelected =
            multiAnswer ? answer instanceof Set && answer.has(oi) : answer === oi;
          const isCorrectOption = multiAnswer
            ? (question.correct as number[]).includes(oi)
            : question.correct === oi;
          let bg = "var(--exam-option-bg)";
          let border = `1px solid var(--exam-option-border)`;
          let textColor = "var(--exam-option-text)";
          if (submitted) {
            if (isCorrectOption) {
              bg = "var(--exam-correct-bg)";
              border = "1.5px solid var(--exam-correct-border)";
              textColor = "var(--exam-correct-text)";
            } else if (isSelected) {
              bg = "var(--exam-wrong-bg)";
              border = "1.5px solid var(--exam-wrong-border)";
              textColor = "var(--exam-wrong-text)";
            }
          } else if (isSelected) {
            bg = accent + "18";
            border = `1.5px solid ${accent}66`;
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
                  borderRadius: multiAnswer ? 5 : "50%",
                  border: `2px solid ${
                    isSelected
                      ? submitted
                        ? isCorrectOption
                          ? "var(--exam-correct-border)"
                          : "var(--exam-wrong-border)"
                        : accent
                      : "var(--exam-radio-off)"
                  }`,
                  background: isSelected
                    ? submitted
                      ? isCorrectOption
                        ? "var(--exam-correct-border)"
                        : "var(--exam-wrong-border)"
                      : accent
                    : "var(--app-surface)",
                  flexShrink: 0,
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isSelected && (
                  <span style={{ fontSize: 11, color: "var(--exam-check-fill)", fontWeight: 700 }}>
                    {multiAnswer ? "✓" : "●"}
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
            background: canSubmit ? accent : "var(--exam-submit-disabled-bg)",
            border: "none",
            borderTop: `1px solid ${BRAND.border}`,
            cursor: canSubmit ? "pointer" : "default",
            fontSize: TYPE.base,
            fontWeight: 600,
            color: canSubmit ? "#fff" : "var(--exam-submit-disabled-text)",
          }}
        >
          Submit Answer
        </button>
      ) : (
        <div
          style={{
            padding: `${SPACE.lg}px ${SPACE.xl}px`,
            borderTop: `1px solid ${correct ? "var(--exam-explain-correct-border)" : "var(--exam-explain-wrong-border)"}`,
            background: correct ? "var(--exam-explain-correct-bg)" : "var(--exam-explain-wrong-bg)",
          }}
        >
          <p
            style={{
              fontSize: TYPE.sm,
              fontWeight: 700,
              color: correct ? "var(--exam-correct-text)" : "var(--exam-wrong-text)",
              margin: `0 0 ${SPACE.sm}px`,
            }}
          >
            💡 Explanation
          </p>
          <p
            style={{
              fontSize: TYPE.base,
              color: correct ? "var(--exam-explain-correct-text)" : "var(--exam-explain-wrong-text)",
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
