// TracerManager.js
import LaserTracer from "./laserTracer";
import MeshTracer from "./meshTracer";

/**
 * Lightweight registry / update‑driver for all particle‑tracer types.
 * Call `attachToScene(scene)` once, then `update(dtMs)` every frame.
 *
 * `DisplayCanvas` (or any host) is free to set:
 */
export default class TracerManager {
  constructor() {
    this.enableMesh = false;
    this.enableLaser = true;

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
  }

  getTracer(type) {
    return this.tracers[type + "Tracer"];
  }

  getActiveTracers() {
    return Object.entries(this.tracers)
      .filter(([key]) => this.enableTable[key])
      .map(([, tracer]) => tracer);
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
  update(timeSeconds) {
    this._forEachEnabled((t) => t.update(timeSeconds));
  }

  /* -------------------------------------------------------------- */
  // Utilities
  /* -------------------------------------------------------------- */

  /** Enable/disable a tracer at runtime. */
  setEnabled(name, flag = true) {
    if (name in this.enableTable) this.enableTable[name] = !!flag;
  }

  /** Clean up GPU / memory resources. */
  dispose(scene) {
    Object.values(this.tracers).forEach((t) => {
      scene.remove(t.getSceneGraphNode());
      t.dispose?.();
    });
    Object.values(this.tracers).forEach((t) => t.dispose?.());
  }

  reset(scene) {
    this.dispose(scene);
    this.init();
    this.attachToScene(scene);
    this.getActiveTracers().forEach((t) => t.resetState());
  }

  /* private */
  _forEachEnabled(fn) {
    for (const [key, tracer] of Object.entries(this.tracers)) {
      if (this.enableTable[key]) fn(tracer, key);
    }
  }
}
