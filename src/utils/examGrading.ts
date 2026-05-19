import type { ExamQuestion } from "../types";

/** Multi-answer when type is ma or correct is an array (guards mislabeled questions). */
export function isMultiAnswerQuestion(question: ExamQuestion): boolean {
  return question.type === "ma" || Array.isArray(question.correct);
}

export function isExamAnswerCorrect(
  question: ExamQuestion,
  answer: number | Set<number> | undefined
): boolean {
  if (answer === undefined) return false;
  if (isMultiAnswerQuestion(question)) {
    if (!(answer instanceof Set)) return false;
    const selected = [...answer].sort().join(",");
    const expected = [...(question.correct as number[])].sort().join(",");
    return selected === expected;
  }
  return answer === question.correct;
}

export function canSubmitExamAnswer(
  question: ExamQuestion,
  answer: number | Set<number> | undefined
): boolean {
  if (answer === undefined) return false;
  if (isMultiAnswerQuestion(question) && answer instanceof Set && answer.size === 0) return false;
  return true;
}

export function getExamTypeTag(question: ExamQuestion) {
  if (question.type === "tf") return { label: "True / False", bg: "var(--tag-tf-bg)", color: "var(--tag-tf-text)" };
  if (isMultiAnswerQuestion(question)) return { label: "Multi-Answer ✦", bg: "var(--tag-ma-bg)", color: "var(--tag-ma-text)" };
  if (question.scenario) return { label: "Scenario", bg: "var(--tag-scenario-bg)", color: "var(--tag-scenario-text)" };
  return { label: "Multiple Choice", bg: "var(--tag-mc-bg)", color: "var(--tag-mc-text)" };
}

export function filterExamQuestions(
  questions: ExamQuestion[],
  catFilter: string,
  typeFilter: string
) {
  return questions.filter((q) => {
    const catOk = catFilter === "all" || q.cat === catFilter;
    const typeOk =
      typeFilter === "all" ||
      (typeFilter === "scenario" && q.scenario) ||
      (typeFilter === "ma" && isMultiAnswerQuestion(q)) ||
      (typeFilter === "tf" && q.type === "tf") ||
      (typeFilter === "mc" && q.type === "mc" && !q.scenario);
    return catOk && typeOk;
  });
}
