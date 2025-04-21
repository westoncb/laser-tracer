// LaserCanvas.jsx  –  Three.js + Tracer glue with compile‑error back‑pressure fix
// -----------------------------------------------------------------------------
// Free to drop in; only local additions are marked  // ★ NEW

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import TracerManager from "../core/tracerManager.js";
import TracerVM from "../core/tracerVM.js";

/**
 * Props
 * ─────
 * srcCode       – user program string
 * compileErrCb  – function(errString|null) → void   (banner setter)
 * className     – css class for outer div
 */
export default function LaserCanvas({ srcCode, compileErrCb, className }) {
  /* ---------- persistent refs ------------------------------------ */
  const mountRef = useRef(null);
  const vmRef = useRef(null);
  const tracerMgrRef = useRef(null);
  const rafIdRef = useRef(null);

  const lastTimeRef = useRef(performance.now());

  // ★ NEW – track whether we’re in a broken‑compile state
  const hasErrorRef = useRef(false);

  // ★ NEW – wrap the banner setter so we can flip hasErrorRef
  const handleCompileErr = (errStr) => {
    hasErrorRef.current = Boolean(errStr);

    // When an error **clears** we reset the time‑base so Δt starts at 0
    if (!errStr) lastTimeRef.current = performance.now();

    compileErrCb?.(errStr);
  };

  /* ---------- first‑mount boot‑strap ------------------------------ */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* --- Three.js scene / camera / renderer ---------------------- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 0, 150);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    /* --- OrbitControls ------------------------------------------ */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;

    /* --- Tracer manager + scene graph --------------------------- */
    const tracerMgr = new TracerManager(renderer);
    tracerMgr.attachToScene(scene);
    tracerMgrRef.current = tracerMgr;

    /* --- QuickJS VM --------------------------------------------- */
    const vm = new TracerVM(handleCompileErr, tracerMgr.tracers.laserTracer);
    vmRef.current = vm;

    vm.init().then(() => {
      tracerMgr.runUserProgram = (elapsed) => vm.tick(elapsed);
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
      // Skip simulation while code does not compile  ★ NEW
      if (!hasErrorRef.current) {
        const delta = now - lastTimeRef.current;
        lastTimeRef.current = now;

        tracerMgr.update(delta); // vm.tick happens inside update()
      }

      controls.update();
      renderer.render(scene, camera);

      rafIdRef.current = requestAnimationFrame(animate);
    };
    rafIdRef.current = requestAnimationFrame(animate);

    /* --- cleanup ------------------------------------------------- */
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", resize);

      tracerMgr.dispose();
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
  }, [srcCode]);

  /* ---------- render -------------------------------------------- */
  return (
    <div
      ref={mountRef}
      className={className ?? ""}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
