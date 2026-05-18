import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./src/components/ErrorBoundary";
import StudyHub from "./src/App";

export default StudyHub;

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <StudyHub />
      </ErrorBoundary>
    </StrictMode>
  );
}
