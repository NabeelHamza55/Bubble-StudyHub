import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/** Rewrites old `/#/practice` bookmarks to `/practice`. */
export function HashUrlRedirect() {
  const navigate = useNavigate();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    const hash = window.location.hash;
    if (!hash.startsWith("#/")) return;

    done.current = true;
    const path = hash.slice(1) || "/";
    navigate(path + window.location.search, { replace: true });
  }, [navigate]);

  return null;
}
