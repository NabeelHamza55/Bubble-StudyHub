import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { QuizId } from "../types";
import { serializeAnswer, type StoredAnswer } from "./progressSerialize";

export interface QuizProgress {
  answers: Record<string, StoredAnswer>;
  submitted: Record<string, boolean>;
}

interface ProgressState {
  quizzes: Partial<Record<QuizId, QuizProgress>>;
  flashcardsRevealed: string[];

  setQuizAnswer: (quizId: QuizId, questionId: number, answer: number | Set<number>) => void;
  submitQuestion: (quizId: QuizId, questionId: number) => void;
  resetQuiz: (quizId: QuizId) => void;

  revealFlashcard: (key: string) => void;
  resetFlashcards: () => void;
}

function emptyQuiz(): QuizProgress {
  return { answers: {}, submitted: {} };
}

function ensureQuiz(quizzes: Partial<Record<QuizId, QuizProgress>>, quizId: QuizId): QuizProgress {
  return quizzes[quizId] ?? emptyQuiz();
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      quizzes: {},
      flashcardsRevealed: [],

      setQuizAnswer: (quizId, questionId, answer) => {
        set((state) => {
          const quiz = ensureQuiz(state.quizzes, quizId);
          return {
            quizzes: {
              ...state.quizzes,
              [quizId]: {
                ...quiz,
                answers: {
                  ...quiz.answers,
                  [String(questionId)]: serializeAnswer(answer),
                },
              },
            },
          };
        });
      },

      submitQuestion: (quizId, questionId) => {
        set((state) => {
          const quiz = ensureQuiz(state.quizzes, quizId);
          return {
            quizzes: {
              ...state.quizzes,
              [quizId]: {
                ...quiz,
                submitted: { ...quiz.submitted, [String(questionId)]: true },
              },
            },
          };
        });
      },

      resetQuiz: (quizId) => {
        set((state) => ({
          quizzes: { ...state.quizzes, [quizId]: emptyQuiz() },
        }));
      },

      revealFlashcard: (key) => {
        set((state) => {
          if (state.flashcardsRevealed.includes(key)) return state;
          return { flashcardsRevealed: [...state.flashcardsRevealed, key] };
        });
      },

      resetFlashcards: () => set({ flashcardsRevealed: [] }),
    }),
    {
      name: "bubble-study-hub-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        quizzes: state.quizzes,
        flashcardsRevealed: state.flashcardsRevealed,
      }),
    }
  )
);

export function useQuizProgress(quizId: QuizId | undefined) {
  const quizData = useProgressStore((s) => (quizId ? s.quizzes[quizId] : undefined));
  return quizData;
}

export function useFlashcardRevealed(key: string): boolean {
  return useProgressStore((s) => s.flashcardsRevealed.includes(key));
}
