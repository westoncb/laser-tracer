// DisplayCanvas.jsx
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
 * className     – optional css class for outer div
 */
export default function DisplayCanvas({ srcCode, compileErrCb, className }) {
  /* ---------- persistent refs ------------------------------------ */
  const mountRef = useRef(null); // <div> that hosts the canvas
  const vmRef = useRef(null); // TracerVM instance
  const tracerMgrRef = useRef(null); // TracerManager instance
  const rafIdRef = useRef(null); // requestAnimationFrame id
  const lastTimeRef = useRef(performance.now());

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
    controls.target.set(0, 0, 0);

    /* --- Tracer manager + scene graph --------------------------- */
    const tracerMgr = new TracerManager(); // defaults: laser on
    tracerMgr.attachToScene(scene);
    tracerMgrRef.current = tracerMgr;

    /* --- QuickJS VM --------------------------------------------- */
    const vm = new TracerVM(compileErrCb, tracerMgr.tracers.laserTracer);
    vmRef.current = vm;

    /* inject callback once VM is ready */
    vm.init().then(() => {
      tracerMgr.runUserProgram = (elapsed) => vm.tick(elapsed);
      vm.loadSource(srcCode);
    });

    /* --- resize helper ------------------------------------------ */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (h === 0) return; // hidden/collapsed
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    /* --- RAF loop ----------------------------------------------- */
    const animate = (now) => {
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      tracerMgr.update(delta); // calls vm.tick inside
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
    // eslint‑disable‑next‑line react‑hooks/exhaustive‑deps
  }, []); // run exactly once

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
