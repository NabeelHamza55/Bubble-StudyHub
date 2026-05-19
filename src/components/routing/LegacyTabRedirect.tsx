import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearLegacyTabInStorage,
  readLegacyTabFromStorage,
  tabToPath,
} from "../../routes/tabRoutes";

/** Migrates pre-hash-router tab from localStorage when the URL is still `#/` or empty. */
export function LegacyTabRedirect() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    if (pathname !== "/") return;

    const legacy = readLegacyTabFromStorage();
    if (!legacy) return;

    done.current = true;
    clearLegacyTabInStorage();
    navigate(tabToPath(legacy), { replace: true });
  }, [pathname, navigate]);

  return null;
}
