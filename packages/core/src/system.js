import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Pen from "./pen.js";

/* =============================================================================
 * SceneAPI ­– tiny façade so user programs can call setBGColor(), orbitCamera()
 * ===========================================================================*/
export class SceneAPI {
  constructor(renderer, camera, orbit) {
    this._r = renderer;
    this._c = camera;
    this._o = orbit;
  }

  /** Solid background (pass 0xRRGGBB). */
  setBGColor(hex) {
    this._r.setClearColor(hex);
    return this;
  }

  /**
   * Set camera position & look-at.
   */
  setCamera(pos, look) {
    const { x: px, y: py, z: pz } = pos;
    const { x: lx, y: ly, z: lz } = look;
    this._c.position.set(px, py, pz);
    this._c.lookAt(lx, ly, lz);
    if (this._o) {
      this._o.target.set(lx, ly, lz);
      this._o.update();
    }
    return this;
  }

  /**
   * Convenience polar-orbit wrapper.
   * 0° azimuth = +X, 90° = +Z. Elevation 0° = horizon.
   */
  orbitCamera(center, radius, azDeg, elDeg) {
    const az = THREE.MathUtils.degToRad(azDeg);
    const el = THREE.MathUtils.degToRad(elDeg);
    const rCos = radius * Math.cos(el);

    const px = center.x + rCos * Math.cos(az);
    const py = center.y + radius * Math.sin(el);
    const pz = center.z + rCos * Math.sin(az);

    return this.setCamera(
      { x: px, y: py, z: pz },
      { x: center.x, y: center.y, z: center.z },
    );
  }
}

/* =============================================================================
 * System – public entry-point
 * ===========================================================================*/
export default class System {
  constructor() {
    /* public handles – populated by init() */
    this.pen = null;
    this.scene = null;

    /* private state */
    this._initialized = false;
    this._rafId = null;
    this._ownsCanvas = false;
    this._resizeHndl = null;
    this._renderer = null;
    this._scene = null;
    this._camera = null;
    this._orbit = null;
    this._accum = 0; // seconds of simulation time
    this._lastMs = 0; // last RAF timestamp
  }

  /**
   * Initialise WebGL, Pen & scene.
   *
   * @param {HTMLCanvasElement|HTMLElement} mount – canvas or parent element.
   * @param {{ maxParticles?:number, renderMode?:"solid"|"light" }} opts
   */
  init(mount, opts = {}) {
    if (this._initialized) throw new Error("System.init() called twice");
    this._initialized = true;

    const { maxParticles = 500_000, renderMode = "light" } = opts;

    /* ------------------------------------------------------------------ renderer */
    this._ownsCanvas = !(mount instanceof HTMLCanvasElement);
    let canvas = mount;
    if (this._ownsCanvas) {
      canvas = document.createElement("canvas");
      mount.appendChild(canvas);
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this._renderer = renderer;

    /* ------------------------------------------------------------------ scene & camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 0, 150);
    this._scene = scene;
    this._camera = camera;

    /* ------------------------------------------------------------------ controls */
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.12;
    this._orbit = orbit;

    /* ------------------------------------------------------------------ resize */
    const resize = () => {
      const el = renderer.domElement;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!h) return; // still collapsed
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false); // do not touch <canvas> style
    };
    window.addEventListener("resize", resize);
    resize();
    this._resizeHndl = resize;

    /* ------------------------------------------------------------------ pen & API */
    this.pen = new Pen({ maxParticles, renderMode });
    scene.add(this.pen.getSceneGraphNode());
    this.scene = new SceneAPI(renderer, camera, orbit);

    return { pen: this.pen, scene: this.scene };
  }

  /**
   * Start automatic render-loop. Returns a **stop()** function that cancels RAF
   * but keeps resources alive.
   *
   * @param {(pen, scene, t)=>void} frameCb – runs *after* internal tick,
   *                                          receives accumulated seconds.
   */
  run(frameCb) {
    if (!this._initialized) throw new Error("System.run() before init()");
    if (this._rafId !== null) throw new Error("System already running");

    const loop = (now) => {
      /* clamp dt to avoid simulation blows after inactive tabs */
      const dt = Math.min((now - this._lastMs) * 0.001, 0.05);
      this._lastMs = now;
      this.tick(dt);
      frameCb?.(this.pen, this.scene, this._accum);
      this._rafId = requestAnimationFrame(loop);
    };

    this._lastMs = performance.now();
    this._rafId = requestAnimationFrame(loop);

    /* return stop() */
    return () => {
      if (this._rafId !== null) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
    };
  }

  /** Advance simulation by dt (seconds) and render a frame. */
  tick(dt) {
    if (!this._initialized) throw new Error("System.tick() before init()");

    this._accum += dt; // Pen expects absolute time
    this.pen.update(this._accum);

    this._orbit.update(); // damping
    this._renderer.render(this._scene, this._camera);
  }

  /** Full teardown – cancels RAF, detaches events, releases GPU memory. */
  dispose() {
    /* stop RAF if running */
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    /* window listeners */
    if (this._resizeHndl) {
      window.removeEventListener("resize", this._resizeHndl);
      this._resizeHndl = null;
    }

    /* owned canvas removal */
    if (this._ownsCanvas) {
      const el = this._renderer?.domElement;
      el?.parentElement?.removeChild(el);
    }

    /* Three-side disposals */
    this._orbit?.dispose();
    this.pen?.dispose();

    // dispose geometries & materials in the scene graph
    this._scene?.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose?.();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose?.());
        } else obj.material.dispose?.();
      }
    });

    this._renderer?.renderLists?.dispose?.();
    this._renderer?.dispose?.();
    this._scene?.clear?.();

    this._initialized = false;
  }
}
