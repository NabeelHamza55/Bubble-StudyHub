import type { ExternalResource } from "../types";

/** Official Bubble documentation — prefer these first */
export const OFFICIAL_RESOURCES: ExternalResource[] = [
  { n: "Bubble Manual — Home", u: "https://manual.bubble.io/" },
  { n: "Bubble Manual — Getting Started", u: "https://manual.bubble.io/help-guides/getting-started" },
  { n: "Bubble Manual — Core Reference", u: "https://manual.bubble.io/core-resources/using-the-core-reference" },
  { n: "Bubble Manual — Workload & Optimization", u: "https://manual.bubble.io/help-guides/workload" },
  { n: "Bubble Manual — Privacy Rules", u: "https://manual.bubble.io/help-guides/data/the-database/protecting-data-with-privacy-rules" },
  { n: "Bubble Manual — Backend Workflows", u: "https://manual.bubble.io/help-guides/logic/backend-workflows" },
  { n: "Bubble Manual — The Bubble API", u: "https://manual.bubble.io/help-guides/integrations/api/the-bubble-api" },
  { n: "Bubble — Developer Certification", u: "https://bubble.io/certification" },
];

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  { n: "NoCode Alliance — Free Mock Exam (50 Qs)", u: "https://nocodealliance.org/bubble-certification" },
  { n: "Bubble — Study Guide PDF", u: "https://bubble.io/certification" },
  { n: "Cert Prep AI — Practice by Topic", u: "https://www.yeschat.ai/gpts-2OTogxmVW9-Bubble-Certificate-Prep-Advanced" },
  { n: "Expert Advice from 20+ Certified Devs", u: "https://lorene.hashnode.dev/certification-advices-from-bubble-experts" },
  { n: "Martin Gessner — How I Passed", u: "https://medium.com/@martinarbtergessner/bubble-certification-exam-eba1306df0af" },
  { n: "Forum — Mock Test Discussion", u: "https://forum.bubble.io/t/bubble-certification-exam-mock-test/309735" },
  { n: "Forum — Passing Tips", u: "https://forum.bubble.io/t/passing-the-bubble-certification-exam/335745" },
];

export const WORKLOAD_CONCEPTS = [
  "Client-side (free) vs Server-side (WU cost)",
  "Constraints (server) vs Advanced Filters (client = expensive)",
  "Framework: Complexity, Volume, Repetition",
  "Nested 'Search' in RG cells multiplies WU per row",
  "Option Sets = zero WU vs DB lookups",
  "DB Triggers + Recursive accumulate WU",
  "Single-page vs multi-page WU impact",
  "List action vs Recursive for bulk ops",
  "Frequent 'Do when condition' + DB search = WU bomb",
  "'Result of Step X' avoids re-fetching",
];
