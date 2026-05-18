import { useCallback, useState } from "react";

export function useToggleSet<T>(initial: Iterable<T> = []) {
  const [set, setSet] = useState(() => new Set(initial));

  const toggle = useCallback((id: T) => {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const add = useCallback((id: T) => {
    setSet((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSet(new Set()), []);

  return { set, toggle, add, clear };
}
