import { useEffect, useRef, useState, useCallback } from "react";
import { System } from "@laser-tracer/core";
import TracerVM from "../tracerVM";
import CanvasGuard from "./CanvasGuard.jsx";
import YouTubeEmbed from "./YouTubeEmbed.jsx";

const DEMO_VIDEO_ID = "f7mokiVnEbk";

function disposeAll(systemRef, vmRef, readyRef, setVmReady, hadErrRef) {
  systemRef.current?.dispose();
  systemRef.current = null;
  vmRef.current?.dispose();
  vmRef.current = null;
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
  const [mode, setMode] = useState(initialMode);
  // 'prompt', 'run', or 'watch_video'
  const [view, setView] = useState("prompt");
  // This tracks the one-time consent, so we don't ask again.
  const [hasConsented, setHasConsented] = useState(false);

  const mountRef = useRef(null);
  const systemRef = useRef(null);
  const vmRef = useRef(null);
  const readyRef = useRef(false);
  const hadErrRef = useRef(false);
  const [vmReady, setVmReady] = useState(false);

  // This function is stable and only recreated if its own dependencies change.
  const startEngine = useCallback(async () => {
    // Guard against running if the mount point isn't ready.
    if (!mountRef.current) return;

    /* 1 · System */
    const sys = new System();
    systemRef.current = sys;
    sys.init(mountRef.current, { renderMode: mode });

    sys.run((pen, scene, t) => {
      // Check if the VM is still valid before ticking.
      if (vmRef.current && readyRef.current && !hadErrRef.current) {
        vmRef.current.tick(t, pen, scene);
      }
    });

    /* 2 · VM */
    const vm = new TracerVM((err) => {
      hadErrRef.current = Boolean(err);
      compileErrCb?.(err);
    });
    vmRef.current = vm;
    await vm.init();
    readyRef.current = true;
    setVmReady(true);
  }, [mode, compileErrCb]);

  // Effect to manage the entire lifecycle of the engine.
  useEffect(() => {
    // Only proceed if the user wants to run the simulation.
    if (view === "run") {
      startEngine();
    }

    // The cleanup function is now the single source of truth for disposal.
    // It runs when the component unmounts OR when dependencies change before the effect re-runs.
    return () => {
      disposeAll(systemRef, vmRef, readyRef, setVmReady, hadErrRef);
    };
  }, [activeProgram, mode, view, startEngine]); // It correctly re-runs when the program/mode changes.

  // Effect for hot-reloading code when it changes.
  useEffect(() => {
    if (vmReady && view === "run") {
      hadErrRef.current = false;
      vmRef.current.loadSource(srcCode);
      systemRef.current?.pen?.moveTo(0, 0, 0);
    }
  }, [srcCode, vmReady, view]);

  // --- Handlers ---
  const handleConfirm = () => {
    setHasConsented(true);
    setView("run");
  };

  const handleWatchVideo = () => {
    setHasConsented(true);
    setView("watch_video");
  };

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
              opacity: view === "run" ? 1 : 0.5,
            }}
          >
            <input
              type="radio"
              name="ltc-render-mode"
              value={opt}
              checked={mode === opt}
              onChange={() => setMode(opt)}
              style={{ cursor: "pointer" }}
              disabled={view !== "run"}
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>

      <div
        style={{ flex: "1 1 auto", position: "relative", background: "#000" }}
      >
        {/* Guard is now only shown if consent has NOT been given */}
        {!hasConsented && (
          <CanvasGuard
            onConfirm={handleConfirm}
            onWatchVideo={handleWatchVideo}
          />
        )}

        {view === "watch_video" && <YouTubeEmbed videoId={DEMO_VIDEO_ID} />}

        {/* The mount point only exists when the view is 'run' */}
        {view === "run" && (
          <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
        )}
      </div>
    </div>
  );
}
