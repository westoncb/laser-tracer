import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Pen from "./pen.js";

// -----------------------------------------------------------------------------
// Helper: small façade so user code can call scene.setBGColor(), orbitCamera(), …
// -----------------------------------------------------------------------------
export class SceneFacade {
  constructor(renderer, camera, orbitControls) {
    this._renderer = renderer;
    this._camera = camera;
    this._orbit = orbitControls;
  }

  setBGColor(hex) {
    this._renderer.setClearColor(hex);
    return this;
  }

  setCamera(px, py, pz, lx, ly, lz) {
    this._camera.position.set(px, py, pz);
    this._camera.lookAt(lx, ly, lz);
    if (this._orbit) {
      this._orbit.target.set(lx, ly, lz);
      this._orbit.update();
    }
    return this;
  }

  /**
   * Convenience polar-orbit wrapper.
   * @param {Object} center {x,y,z}
   * @param {number} radius world units
   * @param {number} azDeg  azimuth degrees (0° = +X, 90° = +Z)
   * @param {number} elDeg  elevation degrees (0° = horizon, 90° = zenith)
   */
  orbitCamera(center, radius, azDeg, elDeg) {
    const az = THREE.MathUtils.degToRad(azDeg);
    const el = THREE.MathUtils.degToRad(elDeg);
    const rCos = radius * Math.cos(el);
    const pos = {
      x: center.x + rCos * Math.cos(az),
      y: center.y + radius * Math.sin(el),
      z: center.z + rCos * Math.sin(az),
    };
    this.setCamera(pos, center);
    return this;
  }
}

// -----------------------------------------------------------------------------
// System: public entry point
// -----------------------------------------------------------------------------
export default class System {
  constructor() {
    // everything lazy-init so users can new System() early
    this._initialized = false;
    this._rafId = null;

    // runtime pointers
    this._renderer = null;
    this._scene = null;
    this._camera = null;
    this._orbit = null;

    this.pen = null; // public handle to drawing DSL
    this.scene = null; // public SceneFacade instance

    // bookkeeping for headless mode
    this._accum = 0; // seconds of simulation time passed
  }

  /**
   * Boot-strap Three.js and create core objects.
   *
   * @param {HTMLCanvasElement|HTMLElement} canvasEl – target element.  If a <canvas>
   *   is supplied we use it; otherwise we inject a new canvas child.
   * @param {Object} opts
   *   maxParticles  – override default 500k (forwarded to Pen)
   *   renderMode    – "solid" | "light" (default "light")
   * @returns {{ pen: Pen, scene: SceneFacade }}
   */
  init(canvasEl, opts = {}) {
    if (this._initialized) throw new Error("System.init() called twice");
    this._initialized = true;

    const { maxParticles = 500_000, renderMode = "light" } = opts;

    // 1. Three renderer --------------------------------------------------------
    let canvasTarget = canvasEl;
    if (!(canvasEl instanceof HTMLCanvasElement)) {
      // if mount is a DIV, create internal canvas
      canvasTarget = document.createElement("canvas");
      canvasEl.appendChild(canvasTarget);
    }
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasTarget,
      antialias: true,
      alpha: true,
    });
    this._renderer = renderer;

    // 2. Scene & camera --------------------------------------------------------
    const scene = new THREE.Scene();
    this._scene = scene;

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 0, 150);
    this._camera = camera;

    // 3. OrbitControls ---------------------------------------------------------
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.12;
    this._orbit = orbit;

    // 4. Responsive resize -----------------------------------------------------
    const resize = () => {
      const w = renderer.domElement.clientWidth;
      const h = renderer.domElement.clientHeight;
      if (h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false /* do not set style */);
    };
    window.addEventListener("resize", resize);
    resize();

    console.log("renderMode", renderMode);

    // 5. Pen & scene graph -----------------------------------------------------
    this.pen = new Pen({ maxParticles, renderMode });
    scene.add(this.pen.getSceneGraphNode());

    // 6. Scene façade ----------------------------------------------------------
    this.scene = new SceneFacade(renderer, camera, orbit);

    return { pen: this.pen, scene: this.scene };
  }

  /**
   * Start an internal RAF loop.  The supplied callback runs *after* System has
   * ticked its internals and *before* the frame is rendered.
   */
  run(frameHandler) {
    if (!this._initialized) throw new Error("System.run() before init()");
    if (this._rafId !== null) throw new Error("System is already running");

    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) * 0.001;
      last = now;
      this.tick(dt);
      if (frameHandler) frameHandler(this.pen, this.scene, this._accum);
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  }

  /** Advance simulation by dt (seconds) and render a frame. */
  tick(dt) {
    if (!this._initialized) throw new Error("System.tick() before init()");

    this._accum += dt;
    // 1. update pen (particle life, etc.)
    this.pen.update(this._accum);

    // 2. let OrbitControls finish damping (if user hasn’t taken manual control)
    this._orbit.update();

    // 3. render scene
    this._renderer.render(this._scene, this._camera);
  }

  /** Stop RAF, dispose GL resources, remove DOM nodes. */
  dispose() {
    if (this._rafId !== null) cancelAnimationFrame(this._rafId);

    // 🔹 remove the canvas from DOM if we created it
    const canvas = this._renderer?.domElement;
    canvas?.parentElement?.removeChild(canvas);

    this._orbit?.dispose();
    this.pen?.dispose();
    this._renderer?.dispose();
    this._scene?.clear();

    this._initialized = false;
  }
}
