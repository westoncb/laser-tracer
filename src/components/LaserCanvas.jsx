import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import TracerManager from "../core/tracerManager.js";
import TracerVM from "../core/tracerVM.js";
import TracerLib from "../core/tracerLib.js";

let elapsedTime = 0;

/**
 * Props
 * ─────
 * srcCode       – user program string
 * activeProgram – identifier that changes when user switches programs
 * compileErrCb  – function(errString|null) → void   (banner setter)
 * className     – css class for outer div
 */
export default function LaserCanvas({
  srcCode,
  activeProgram,
  compileErrCb,
  className,
}) {
  /* ---------- persistent refs ------------------------------------ */
  const mountRef = useRef(null);
  const vmRef = useRef(null);
  const tracerMgrRef = useRef(null);
  const tracerLibRef = useRef(null);
  const rafIdRef = useRef(null);

  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);

  const lastTimeRef = useRef(performance.now());
  const hasErrorRef = useRef(false); // track compile‑broken state

  const handleCompileErr = (errStr) => {
    hasErrorRef.current = Boolean(errStr);
    if (!errStr) lastTimeRef.current = performance.now(); // reset Δt
    compileErrCb?.(errStr);
  };

  /* ---------- first‑mount boot‑strap ------------------------------ */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* --- Three.js scene / camera / renderer ---------------------- */
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 0, 150);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.debug.checkShaderErrors = true;
    mount.appendChild(renderer.domElement);

    /* --- OrbitControls ------------------------------------------ */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controlsRef.current = controls;

    /* --- Tracer manager + scene graph --------------------------- */
    const tracerMgr = new TracerManager();
    tracerMgr.attachToScene(scene);
    tracerMgrRef.current = tracerMgr;

    const tracerLib = new TracerLib(renderer, camera, controls);
    tracerLibRef.current = tracerLib;

    /* --- QuickJS VM --------------------------------------------- */
    const vm = new TracerVM(handleCompileErr);
    vmRef.current = vm;

    vm.init().then(() => {
      vm.loadSource(srcCode);
    });

    /* --- resize helper ------------------------------------------ */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    /* --- RAF loop ----------------------------------------------- */
    const animate = (now) => {
      if (!hasErrorRef.current) {
        const deltaSeconds = (now - lastTimeRef.current) * 0.001;
        lastTimeRef.current = now;
        elapsedTime += deltaSeconds;
        tracerMgr.update(elapsedTime);
        vm.tick(elapsedTime, tracerMgr.getTracer("laser"), tracerLib);
      }
      tracerLibRef.current.tickControls(elapsedTime);
      renderer.render(scene, camera);
      rafIdRef.current = requestAnimationFrame(animate);
    };
    rafIdRef.current = requestAnimationFrame(animate);

    /* --- cleanup ------------------------------------------------- */
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", resize);

      tracerMgr.dispose(scene);
      vm.dispose();
      controls.dispose?.();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount‑once

  /* ---------- recompile when user edits -------------------------- */
  useEffect(() => {
    vmRef.current?.loadSource(srcCode);
    tracerMgrRef.current.getTracer("laser").moveTo(0, 0, 0);
  }, [srcCode]);

  /* ---------- program switch: reset state ------------------------ */
  useEffect(() => {
    tracerMgrRef.current?.reset(sceneRef.current);
    elapsedTime = 0;

    /* --- also reset camera & controls --------------------------- */
    const cam = cameraRef.current;
    if (cam) {
      cam.position.set(0, 0, 150);
      cam.lookAt(0, 0, 0);
      cam.updateProjectionMatrix();
    }

    const ctrls = controlsRef.current;
    ctrls?.reset(); // OrbitControls has its own reset()
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
