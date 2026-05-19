import { SITE } from "../config/site";

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
}

const baseKeywords = SITE.keywords.join(", ");

export const SEO_PAGES: Record<string, PageSeo> = {
  landing: {
    title: `${SITE.name} — Free Bubble Developer Certification Prep`,
    description: SITE.description,
    path: "/",
    keywords: baseKeywords.split(", "),
  },
  dashboard: {
    title: `Dashboard | ${SITE.shortName}`,
    description:
      "Your Bubble certification study dashboard — track progress, launch practice exams, flashcards, and study material.",
    path: "/dashboard",
  },
  practice: {
    title: `Practice Exam (50 Questions) | ${SITE.shortName}`,
    description:
      "Bubble certification practice exam with 50 scenario, multiple-choice, multi-answer, and true/false questions with detailed explanations.",
    path: "/practice",
    keywords: [...SITE.keywords, "Bubble mock exam", "certification practice test"],
  },
  studyquiz: {
    title: `Doc & Scenario Quiz (100 Questions) | ${SITE.shortName}`,
    description:
      "100 manual-based Bubble certification questions with real-world scenarios to validate concepts before your mock exam.",
    path: "/studyquiz",
  },
  hardquiz: {
    title: `Hard Mode — Multi-Answer Only (35 Questions) | ${SITE.shortName}`,
    description:
      "Expert-level Bubble certification drill: 35 multi-answer-only questions. Select every correct option or fail.",
    path: "/hardquiz",
  },
  quiz: {
    title: `Flashcards — 7 Certification Topics | ${SITE.shortName}`,
    description:
      "Interactive Bubble certification flashcards across all official syllabus topics. Reveal answers and track progress in your browser.",
    path: "/quiz",
  },
  topics: {
    title: `Study Material & Official Resources | ${SITE.shortName}`,
    description:
      "Curated Bubble manual sections, videos, and blogs organized by official certification syllabus topic.",
    path: "/topics",
  },
  extra: {
    title: `Resources & Expert Links | ${SITE.shortName}`,
    description:
      "External mock tests, expert certification advice, and workload concepts to memorize for the Bubble developer exam.",
    path: "/extra",
  },
};

export function seoForPath(pathname: string): PageSeo {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/") return SEO_PAGES.landing;
  const entry = Object.values(SEO_PAGES).find((p) => p.path === normalized);
  return entry ?? { ...SEO_PAGES.dashboard, path: normalized };
}
