export type ResourceKind = "d" | "v" | "b";

export interface StudyResource {
  t: string;
  n: string;
  u: string;
  k: ResourceKind;
}

export interface StudyTopic {
  id: string;
  n: string;
  t: string;
  a: string;
  d: string;
  w?: string;
  h?: boolean;
  r: StudyResource[];
}

export interface FlashcardCategory {
  c: string;
  a: string;
  bg: string;
  rb: string;
  q: [string, string][];
}

export type ExamQuestionType = "mc" | "ma" | "tf";

export interface ExamQuestion {
  id: number;
  cat: string;
  type: ExamQuestionType;
  scenario?: boolean;
  q: string;
  opts: string[];
  correct: number | number[];
  explanation: string;
}

export interface ExternalResource {
  n: string;
  u: string;
}

export type TabId = "home" | "practice" | "studyquiz" | "hardquiz" | "quiz" | "topics" | "extra";

export type ResourceFilter = "all" | ResourceKind;

export type ExamTypeFilter = "all" | "scenario" | "mc" | "ma" | "tf";

/** Keys for persisted quiz progress (practice + study quizzes). */
export type QuizId = "practice" | "studyquiz" | "hardquiz";
