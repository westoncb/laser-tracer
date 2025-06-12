import { useEffect, useRef, useState, useCallback } from "react";
import { System } from "@laser-tracer/core";
import TracerVM from "../tracerVM";

/* centralised teardown */
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

  /* ---------------------------------------------------------- refs/state */
  const mountRef = useRef(null);
  const systemRef = useRef(null);
  const vmRef = useRef(null);
  const readyRef = useRef(false);
  const hadErrRef = useRef(false);
  const [vmReady, setVmReady] = useState(false);

  /* -------------------------------------------------- engine bootstrap */
  const startEngine = useCallback(async () => {
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
  }, [mode, compileErrCb]);

  /* ---------------------------------------------------------- mount */
  useEffect(() => {
    startEngine();
    return () => disposeAll(systemRef, vmRef, readyRef, setVmReady, hadErrRef);
  }, [startEngine]);

  /* ---------------------------------------------- hot-reload code */
  useEffect(() => {
    if (vmReady) {
      hadErrRef.current = false;
      vmRef.current.loadSource(srcCode);
      systemRef.current?.pen?.moveTo(0, 0, 0);
    }
  }, [srcCode, vmReady]);

  /* ----------------------- restart on activeProgram or mode change */
  useEffect(() => {
    if (!mountRef.current) return;
    disposeAll(systemRef, vmRef, readyRef, setVmReady, hadErrRef);
    startEngine();
  }, [activeProgram, mode, startEngine]);

  /* ---------------------------------------------------------- render */
  const toolbarH = "1.5rem";

  return (
    <div
      className={className ?? ""} // Apply the passed className here
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0, // Ensure it can shrink on mobile
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
        {/* radio group */}
        {["light", "solid"].map((opt) => (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="ltc-render-mode"
              value={opt}
              checked={mode === opt}
              onChange={() => setMode(opt)}
              style={{ cursor: "pointer" }}
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>

      {/* ── canvas mount ─────────────────────────────────────────── */}
      <div ref={mountRef} style={{ flex: "1 1 auto", position: "relative" }} />
    </div>
  );
}
