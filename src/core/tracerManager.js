// TracerManager.js
import LaserTracer from "./laserTracer";
import MeshTracer from "./meshTracer";

/**
 * Lightweight registry / update‑driver for all particle‑tracer types.
 * Call `attachToScene(scene)` once, then `update(dtMs)` every frame.
 *
 * `DisplayCanvas` (or any host) is free to set:
 *   tracerMgr.runUserProgram = (elapsedMs) => { ... }
 */
export default class TracerManager {
  constructor() {
    this.enableMesh = false;
    this.enableLaser = true;
    this.timeScale = 1;

    this.init();
  }

  init() {
    /* --- construct tracers --- */
    this.tracers = {
      meshTracer: new MeshTracer(),
      laserTracer: new LaserTracer(),
    };

    /* --- enable/disable table --- */
    this.enableTable = {
      meshTracer: this.enableMesh,
      laserTracer: this.enableLaser,
    };

    /* --- clock --- */
    this.totalTime = 0;
    this.timeScale = this.timeScale;
  }

  /* -------------------------------------------------------------- */
  // Scene wiring
  /* -------------------------------------------------------------- */

  /** Add all *enabled* tracers’ scene‑graph roots to the supplied scene. */
  attachToScene(scene) {
    this._forEachEnabled((t) => scene.add(t.getSceneGraphNode()));
  }

  /* -------------------------------------------------------------- */
  // Frame advance
  /* -------------------------------------------------------------- */

  /**
   * Advance internal clock and step every enabled tracer.
   * @param {number} deltaMs – wall‑clock milliseconds since last call
   */
  update(deltaMs) {
    const scaled = deltaMs * this.timeScale;
    this.totalTime += scaled;

    /* optional external callback (injected by DisplayCanvas ⇢ TracerVM) */
    if (typeof this.runUserProgram === "function") {
      this.runUserProgram(this.totalTime);
    }

    /* propagate time to tracer objects */
    this._forEachEnabled((t) => t.update(this.totalTime));
  }

  /* -------------------------------------------------------------- */
  // Utilities
  /* -------------------------------------------------------------- */

  /** Enable/disable a tracer at runtime. */
  setEnabled(name, flag = true) {
    if (name in this.enableTable) this.enableTable[name] = !!flag;
  }

  /** Clean up GPU / memory resources. */
  dispose() {
    Object.values(this.tracers).forEach((t) => t.dispose?.());
  }

  reset() {
    this.dispose();
    this.init();
  }

  /* private */
  _forEachEnabled(fn) {
    for (const [key, tracer] of Object.entries(this.tracers)) {
      if (this.enableTable[key]) fn(tracer, key);
    }
  }
}
