import type { ReactNode } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

function isFileProtocol(): boolean {
  return typeof window !== "undefined" && window.location.protocol === "file:";
}

function routerBasename(): string | undefined {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/" || base === "./") return undefined;
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

/** file:// and standalone HTML builds need hash routing (#/practice). */
export function AppRouter({ children }: { children: ReactNode }) {
  const useHash =
    isFileProtocol() || import.meta.env.MODE === "single";

  if (useHash) {
    return <HashRouter>{children}</HashRouter>;
  }
  return <BrowserRouter basename={routerBasename()}>{children}</BrowserRouter>;
}
