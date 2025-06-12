import { useEffect, useRef, useState, useCallback } from "react";
import { System } from "@laser-tracer/core";
import TracerVM from "../tracerVM";
import CanvasGuard from "./CanvasGuard.jsx"; // 👈 Import new component
import YouTubeEmbed from "./YouTubeEmbed.jsx"; // 👈 Import new component

const DEMO_VIDEO_ID = "f7mokiVnEbk";

/* centralised teardown (no changes needed here) */
function disposeAll(systemRef, vmRef, readyRef, setVmReady, hadErrRef) {
  systemRef.current?.dispose();
  vmRef.current?.dispose();
  readyRef.current = false;
  setVmReady(false);
  hadErrRef.current = false;
}

export default function LaserCanvas({
  srcCode,
  activeProgram,
  compileErrCb,
  className,
  renderMode: initialMode = "light",
}) {
  /* ---------------------------------------------------------------- UI */
  const [mode, setMode] = useState(initialMode); // "light" | "solid"
  // 👇 State to manage what the user sees: the prompt, the canvas, or the video
  const [userAction, setUserAction] = useState("prompt"); // 'prompt' | 'run' | 'watch_video'

  /* ---------------------------------------------------------- refs/state */
  const mountRef = useRef(null);
  const systemRef = useRef(null);
  const vmRef = useRef(null);
  const readyRef = useRef(false);
  const hadErrRef = useRef(false);
  const [vmReady, setVmReady] = useState(false);

  /* -------------------------------------------------- engine bootstrap */
  const startEngine = useCallback(async () => {
    // 🛑 Prevent engine start if user hasn't confirmed
    if (userAction !== "run" || !mountRef.current) return;

    /* 1 · System ----------------------------------------------------- */
    const sys = new System();
    systemRef.current = sys;
    sys.init(mountRef.current, { renderMode: mode });

    sys.run((pen, scene, t) => {
      if (readyRef.current && !hadErrRef.current) {
        vmRef.current.tick(t, pen, scene);
      }
    });

    /* 2 · VM --------------------------------------------------------- */
    const vm = new TracerVM((err) => {
      hadErrRef.current = Boolean(err);
      compileErrCb?.(err);
    });
    vmRef.current = vm;
    await vm.init();
    readyRef.current = true;
    setVmReady(true);
  }, [mode, compileErrCb, userAction]); // 👈 userAction is a dependency

  /* ---------------------------------------------------------- mount */
  useEffect(() => {
    // Only start the engine if the user has chosen to run
    if (userAction === "run") {
      startEngine();
    }
    // The cleanup function will run regardless, which is what we want
    return () => disposeAll(systemRef, vmRef, readyRef, setVmReady, hadErrRef);
  }, [startEngine, userAction]);

  /* ---------------------------------------------- hot-reload code */
  useEffect(() => {
    if (vmReady && userAction === "run") {
      hadErrRef.current = false;
      vmRef.current.loadSource(srcCode);
      systemRef.current?.pen?.moveTo(0, 0, 0);
    }
  }, [srcCode, vmReady, userAction]);

  /* ----------------------- restart on activeProgram or mode change */
  // Now, instead of restarting the engine directly, we reset to the prompt
  useEffect(() => {
    setUserAction("prompt");
    disposeAll(systemRef, vmRef, readyRef, setVmReady, hadErrRef);
  }, [activeProgram, mode]);

  /* ---------------------------------------------------------- render */
  const toolbarH = "1.5rem";

  return (
    <div
      className={className ?? ""}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      {/* ── mode toolbar ─────────────────────────────────────────── */}
      <div
        style={{
          height: toolbarH,
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 0.75rem",
          gap: "1rem",
          fontSize: "0.8rem",
          background: "rgba(0,0,0,0.05)",
          userSelect: "none",
        }}
      >
        {["light", "solid"].map((opt) => (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              cursor: "pointer",
              opacity: userAction === "run" ? 1 : 0.5, // Dim if not active
            }}
          >
            <input
              type="radio"
              name="ltc-render-mode"
              value={opt}
              checked={mode === opt}
              onChange={() => setMode(opt)}
              style={{ cursor: "pointer" }}
              disabled={userAction !== "run"} // Disable until running
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>

      {/* ── main content area (canvas, guard, or video) ────────── */}
      <div
        style={{ flex: "1 1 auto", position: "relative", background: "#000" }}
      >
        {userAction === "prompt" && (
          <CanvasGuard
            onConfirm={() => setUserAction("run")}
            onWatchVideo={() => setUserAction("watch_video")}
          />
        )}

        {userAction === "watch_video" && (
          <YouTubeEmbed videoId={DEMO_VIDEO_ID} />
        )}

        {/* The mount point for the canvas now only renders when we run */}
        {userAction === "run" && (
          <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
        )}
      </div>
    </div>
  );
}
