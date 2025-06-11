/* ------------------------------------------------------------------
   SplashScreen.jsx
-------------------------------------------------------------------*/
import { useState, useEffect } from "react";
import logoUrl from "../../assets/laser-tracer-patch-sm.png";

export default function SplashScreen({
  ready, // true when Monaco + QuickJS are ready
  minDuration = 1000,
  onHide,
}) {
  const [imgReady, setImgReady] = useState(false);
  const [start] = useState(() => Date.now());
  const [fade, setFade] = useState(false);
  const [gone, setGone] = useState(false);

  /* kick off a manual load so we know exactly when the bitmap is decoded */
  useEffect(() => {
    const img = new Image();
    img.src = logoUrl;
    img.onload = () => setImgReady(true);
  }, []);

  /* begin fade‑out once all conditions met */
  useEffect(() => {
    if (!ready || !imgReady || fade) return;
    const elapsed = Date.now() - start;
    const delay = Math.max(0, minDuration - elapsed);
    const t = setTimeout(() => setFade(true), delay);
    return () => clearTimeout(t);
  }, [ready, imgReady, minDuration, start, fade]);

  /* unmount + notify */
  useEffect(() => {
    if (!fade) return;
    const t = setTimeout(() => {
      setGone(true);
      onHide?.();
    }, 250); // sync with CSS transition
    return () => clearTimeout(t);
  }, [fade, onHide]);

  if (gone) return null;

  return (
    <div className={`splash-overlay${fade ? " fade-out" : ""}`}>
      {imgReady ? (
        <img src={logoUrl} alt="Laser‑Tracer logo" className="splash-logo" />
      ) : (
        /* lightweight fallback – inline SVG spinner */
        <svg
          className="spin"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          stroke="#eee"
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="44 188"
          />
        </svg>
      )}
    </div>
  );
}
