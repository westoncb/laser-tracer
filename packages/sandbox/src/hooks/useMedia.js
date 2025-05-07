import { useState, useEffect } from "react";

export default function useMedia(query) {
  const mql = typeof window !== "undefined" && window.matchMedia(query);
  const [matches, set] = useState(mql?.matches ?? false);

  useEffect(() => {
    if (!mql) return;
    const h = (e) => set(e.matches);
    mql.addEventListener("change", h);
    return () => mql.removeEventListener("change", h);
  }, [mql]);

  return matches;
}
