import { SITE } from "../config/site";
import {
  HARD_MA_QUESTIONS,
  PRACTICE_EXAM_QUESTIONS,
  STUDY_QUIZ_QUESTIONS,
} from "../data";

export function landingJsonLd(origin: string) {
  const url = `${origin}/`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      description: SITE.description,
      url,
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: `${origin}/dashboard`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE.name,
      description: SITE.description,
      url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        `${PRACTICE_EXAM_QUESTIONS.length} practice exam questions`,
        `${STUDY_QUIZ_QUESTIONS.length} documentation quiz questions`,
        `${HARD_MA_QUESTIONS.length} hard-mode multi-answer questions`,
        "Flashcards across 7 certification topics",
        "Official study material links",
        "Dark and light theme",
        "Offline-friendly browser storage",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.publisher.name,
      ...(SITE.publisher.url ? { url: SITE.publisher.url } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE.creator.name,
      url: SITE.creator.github,
      sameAs: [SITE.creator.github, SITE.creator.repo],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Bubble Developer Certification?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Bubble Developer Certification is an official exam with 90 questions in 3.5 hours. You need 80% to pass. It covers the Bubble manual, workflows, data, security, and performance/workload.",
          },
        },
        {
          "@type": "Question",
          name: "Is this study hub free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Bubble Study Hub is free to use in your browser with no account required. Progress saves locally on your device.",
          },
        },
        {
          "@type": "Question",
          name: "What is the hardest part of the Bubble certification exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many certified developers say Performance & Workload (Section 06) is the biggest trap — constraints, workload units, and client vs server logic appear often.",
          },
        },
      ],
    },
  ];
}
