import { useEffect, useRef } from "react";
import { System } from "@laser-tracer/core";
import TracerVM from "../tracerVM.js";

let elapsedTime = 0;

/**
 * Props
 * ─────
 * srcCode       – user program string
 * activeProgram – identifier that changes when user switches programs
 * compileErrCb  – function(errString|null) → void   (banner setter)
 * className     – optional css class for outer div
 */
export default function LaserCanvas({
  srcCode,
  activeProgram,
  compileErrCb,
  className,
}) {
  /* ---------- persistent refs ------------------------------------ */
  const mountRef = useRef(null);
  const systemRef = useRef(null);
  const vmRef = useRef(null);
  const rafIdRef = useRef(null);

  const lastTimeRef = useRef(performance.now());
  const hadCompileErrRef = useRef(false);

  const handleCompileErr = (errStr) => {
    hadCompileErrRef.current = Boolean(errStr);
    if (!errStr) lastTimeRef.current = performance.now(); // reset Δt
    compileErrCb?.(errStr);
  };

  /* ---------- mount / unmount ----------------------------------- */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* --- bootstrap System -------------------------------------- */
    const sys = new System();
    const { pen, scene } = sys.init(mount, { renderMode: "light" });
    systemRef.current = sys;

    /* --- QuickJS VM ------------------------------------------- */
    const vm = new TracerVM(handleCompileErr);
    vmRef.current = vm;
    vm.init().then(() => vm.loadSource(srcCode));

    /* --- RAF loop --------------------------------------------- */
    const animate = (now) => {
      if (!hadCompileErrRef.current) {
        const dt = (now - lastTimeRef.current) * 0.001;
        lastTimeRef.current = now;
        elapsedTime += dt;

        const curSys = systemRef.current;
        curSys.tick(dt);

        const { pen, scene } = curSys; // keep VM in sync
        vm.tick(elapsedTime, pen, scene);
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };
    rafIdRef.current = requestAnimationFrame(animate);

    /* --- cleanup ---------------------------------------------- */
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      sys.dispose();
      vm.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-once

  /* ---------- recompile when user edits -------------------------- */
  useEffect(() => {
    vmRef.current?.loadSource(srcCode);
    // Pop pen back to origin for a clean slate
    systemRef.current?.pen?.moveTo(0, 0, 0);
  }, [srcCode]);

  /* ---------- program switch: reset state ------------------------ */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dispose and recreate System to ensure pristine state
    systemRef.current?.dispose();
    const sys = new System();
    const { pen, scene } = sys.init(mount, { renderMode: "light" });
    systemRef.current = sys;

    // Reset timer so animations start from t=0
    elapsedTime = 0;
    lastTimeRef.current = performance.now();

    // Recompile script in the new VM context
    vmRef.current?.loadSource(srcCode);
  }, [activeProgram]);

  /* ---------- render -------------------------------------------- */
  return (
    <div
      ref={mountRef}
      className={className ?? ""}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
