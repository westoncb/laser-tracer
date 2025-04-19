// LaserTracer.js – unified target for tracerOps.replayOps()
// ---------------------------------------------------------
// ‑ maintains turtle position/orientation, brush state, particle spawning
// ‑ expose *only* verbs that appear in HANDLERS (tracerOps.js)
//
// 2025‑04‑18

import * as THREE from "three";
import ParticleSystem from "./particleSystem.js";
import { replayOps } from "./tracerOps.js"; // for optional direct use

/* ---------- fast N(0,1) RNG (Marsaglia polar, cached) ---------------- */
const gauss = (() => {
  let spare = null;
  return () => {
    if (spare !== null) {
      const g = spare;
      spare = null;
      return g;
    }
    let u, v, s;
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (!s || s >= 1);
    const m = Math.sqrt((-2 * Math.log(s)) / s);
    spare = v * m;
    return u * m;
  };
})();

/* ---------- helper --------------------------------------------------- */
const deg2rad = (d) => (d * Math.PI) / 180;

/* ===================================================================== */
class LaserTracer {
  /* ------------------------------------------------------------------ */
  constructor({ animate = false, maxParticles = 250_000 } = {}) {
    this.animate = animate;

    /* brush state ----------------------------------------------------- */
    this.options = {
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      color: 0xaa88ff,
      lifetime: 1,
      size: 5,
    };
    this.spawnDistance = 0.03; // spacing()
    this.fuzzBrush = { count: 0, sx: 0, sy: 0, sz: 0 };

    /* turtle pose ----------------------------------------------------- */
    this.turtlePos = new THREE.Vector3();
    this.turtleRot = new THREE.Quaternion();

    /* push/pop stack -------------------------------------------------- */
    this.stack = [];

    /* rendering ------------------------------------------------------- */
    this.particleSystem = new ParticleSystem({ maxParticles });
    this.obj3d = new THREE.Object3D();
    this.obj3d.add(this.particleSystem);
  }

  /* ---------- brush setters ----------------------------------------- */
  color(c) {
    this.options.color = c;
  }
  size(px) {
    this.options.size = px;
  }
  spacing(d) {
    this.spawnDistance = d;
  }
  residue(s) {
    this.options.lifetime = s;
  }
  fuzz(count = 0, sx = 4, sy = sx, sz = sx) {
    this.fuzzBrush = { count, sx, sy, sz };
  }

  /* ---------- movement helpers -------------------------------------- */
  move(worldPos) {
    this.options.position.copy(worldPos);
    this.turtlePos.copy(worldPos);
  }

  trace(worldDest) {
    // spawn particles along line
    const dir = worldDest.clone().sub(this.turtlePos);
    const dist = dir.length();
    if (!dist) return;
    dir.normalize();
    const steps = dist / this.spawnDistance;
    for (let i = 0; i < steps; i++) {
      this.turtlePos.addScaledVector(dir, this.spawnDistance);
      this._spawnWithFuzz(this.turtlePos);
    }
    this.turtlePos.copy(worldDest);
  }

  moveRel(localVec) {
    const world = localVec
      .clone()
      .applyQuaternion(this.turtleRot)
      .add(this.turtlePos);
    this.move(world);
  }
  traceRel(localVec) {
    const world = localVec
      .clone()
      .applyQuaternion(this.turtleRot)
      .add(this.turtlePos);
    this.trace(world);
  }

  /* ---------- turtle orientation ------------------------------------ */
  turn(deg) {
    this._rotateAroundAxis(new THREE.Vector3(0, 1, 0), deg);
  }
  pitch(deg) {
    this._rotateAroundAxis(new THREE.Vector3(1, 0, 0), deg);
  }
  roll(deg) {
    this._rotateAroundAxis(new THREE.Vector3(0, 0, 1), deg);
  }
  _rotateAroundAxis(axis, deg) {
    const q = new THREE.Quaternion().setFromAxisAngle(axis, deg2rad(deg));
    this.turtleRot.multiply(q);
  }

  /* ---------- stack -------------------------------------------------- */
  push() {
    this.stack.push({
      pos: this.turtlePos.clone(),
      rot: this.turtleRot.clone(),
      opts: { ...this.options },
      fuzz: { ...this.fuzzBrush },
      space: this.spawnDistance,
    });
  }
  pop() {
    const s = this.stack.pop();
    if (!s) return;
    this.turtlePos.copy(s.pos);
    this.turtleRot.copy(s.rot);
    this.options = { ...this.options, ...s.opts };
    this.fuzzBrush = { ...s.fuzz };
    this.spawnDistance = s.space;
    this.options.position.copy(this.turtlePos); // teleport
  }

  /* ---------- internal particle helper ------------------------------ */
  _spawnWithFuzz(basePos) {
    const ps = this.particleSystem;
    const { position } = this.options;
    const { count, sx, sy, sz } = this.fuzzBrush;

    position.copy(basePos);
    ps.spawnParticle(this.options);

    for (let i = 0; i < count; i++) {
      const jitter = new THREE.Vector3(
        gauss() * sx,
        gauss() * sy,
        gauss() * sz,
      );
      position.addVectors(basePos, jitter);
      ps.spawnParticle(this.options);
    }
  }

  /** Drop one (or fuzz‑spray many) particle at an absolute position */
  deposit(worldPos) {
    this._spawnWithFuzz(worldPos);
    // keep turtle in sync so subsequent MOVE_REL/TRACE_REL are intuitive
    this.turtlePos.copy(worldPos);
  }

  /** advance particle sim */
  update(totalTimeMs) {
    this.particleSystem.update((this.animate ? totalTimeMs : 100) / 1000);
  }

  getSceneGraphNode() {
    return this.obj3d;
  }
}

export default LaserTracer;
