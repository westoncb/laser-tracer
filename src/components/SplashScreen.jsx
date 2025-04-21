/* ------------------------------------------------------------------
   SplashScreen.jsx
   – Page‑wide splash shown while the tool‑chain boots
-------------------------------------------------------------------*/
import { useState, useEffect } from "react";
import logo from "../assets/logo1.png"; // adjust path if needed

export default function SplashScreen({
  ready, // boolean – set true when Monaco + QuickJS are ready
  minDuration = 800, // ms the splash must stay visible
  onHide, // callback fired after fade‑out completes
}) {
  const [start] = useState(() => Date.now());
  const [fade, setFade] = useState(false); // start fade when conditions met
  const [gone, setGone] = useState(false); // unmount after fade finishes

  /* Start the fade‑out once both conditions are satisfied */
  useEffect(() => {
    if (!ready || fade) return; // nothing to do yet
    const elapsed = Date.now() - start;
    const delay = Math.max(0, minDuration - elapsed);

    const t = setTimeout(() => setFade(true), delay);
    return () => clearTimeout(t);
  }, [ready, minDuration, start, fade]);

  /* After fade transition, unmount + notify */
  useEffect(() => {
    if (!fade) return;
    const t = setTimeout(() => {
      setGone(true);
      onHide?.(); // fire callback
    }, 250); // keep in sync with CSS transition time
    return () => clearTimeout(t);
  }, [fade, onHide]);

  if (gone) return null;

  return (
    <div className={`splash-overlay${fade ? " fade-out" : ""}`}>
      <img src={logo} alt="Laser‑Tracer logo" className="splash-logo" />
    </div>
  );
}
