import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll on route change so content is not hidden under headers. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const mainBody = document.querySelector(".app-main-body");
    if (mainBody) {
      mainBody.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
