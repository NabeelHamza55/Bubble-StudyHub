import { PRACTICE_EXAM_QUESTIONS } from "../../data";
import { ExamRunner } from "./ExamRunner";

export function PracticeExam() {
  return <ExamRunner questions={PRACTICE_EXAM_QUESTIONS} />;
}
