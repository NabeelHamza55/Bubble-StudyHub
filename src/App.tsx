import { useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeContext";
import { AppSidebar } from "./components/layout/AppSidebar";
import { AppFooter } from "./components/layout/AppFooter";
import { LandingPage } from "./components/landing/LandingPage";
import { AppRouter } from "./components/routing/AppRouter";
import { HashUrlRedirect } from "./components/routing/HashUrlRedirect";
import { LegacyTabRedirect } from "./components/routing/LegacyTabRedirect";
import { ScrollToTop } from "./components/routing/ScrollToTop";
import { DashboardTab } from "./components/tabs/DashboardTab";
import { PracticeTab } from "./components/tabs/PracticeTab";
import { StudyQuizTab } from "./components/tabs/StudyQuizTab";
import { HardQuizTab } from "./components/tabs/HardQuizTab";
import { FlashcardsTab } from "./components/tabs/FlashcardsTab";
import { StudyMaterialTab } from "./components/tabs/StudyMaterialTab";
import { ResourcesTab } from "./components/tabs/ResourcesTab";
import { FLASHCARD_CATEGORIES } from "./data";
import { useAppStore } from "./stores/useAppStore";
import { usePageSeo } from "./hooks/usePageSeo";
import { seoForPath } from "./seo/seoConfig";
import { pathToTab, TAB_TITLES } from "./routes/tabRoutes";
import "./styles/global.css";

function AppShell() {
  const { pathname } = useLocation();
  const tab = pathToTab(pathname);
  const search = useAppStore((s) => s.globalSearch);
  const setSearch = useAppStore((s) => s.setGlobalSearch);

  usePageSeo(seoForPath(pathname));

  const totalFlashcards = useMemo(
    () => FLASHCARD_CATEGORIES.reduce((n, c) => n + c.q.length, 0),
    []
  );

  return (
    <div className="app-shell">
      <AppSidebar
        search={search}
        onSearchChange={setSearch}
        totalFlashcards={totalFlashcards}
      />

      <div className="app-main">
        <header className="app-main-header">
          <h2 className="app-main-title">{TAB_TITLES[tab]}</h2>
        </header>

        <div className="app-main-body">
          <main className="app-main-content">
            <Routes>
              <Route path="/dashboard" element={<DashboardTab totalFlashcards={totalFlashcards} />} />
              <Route path="/practice" element={<PracticeTab />} />
              <Route path="/studyquiz" element={<StudyQuizTab />} />
              <Route path="/hardquiz" element={<HardQuizTab />} />
              <Route
                path="/quiz"
                element={<FlashcardsTab searchQuery={search} />}
              />
              <Route
                path="/topics"
                element={<StudyMaterialTab searchQuery={search} />}
              />
              <Route path="/extra" element={<ResourcesTab />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <AppFooter />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter>
        <HashUrlRedirect />
        <LegacyTabRedirect />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<AppShell />} />
        </Routes>
      </AppRouter>
    </ThemeProvider>
  );
}
