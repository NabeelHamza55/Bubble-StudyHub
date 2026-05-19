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
  if (question.type === "tf") return { label: "True / False", bg: "#F0F9FF", color: "#0369A1" };
  if (isMultiAnswerQuestion(question)) return { label: "Multi-Answer ✦", bg: "#FAF5FF", color: "#7C3AED" };
  if (question.scenario) return { label: "Scenario", bg: "#FFF7ED", color: "#B45309" };
  return { label: "Multiple Choice", bg: "#ECFDF5", color: "#047857" };
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
