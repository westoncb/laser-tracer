import * as THREE from "three";
import ParticleSystem from "./particleSystem.js";
import { gauss, deg2rad } from "../util/util.js";
import { GLYPH_MAP } from "../util/glyphMap.js";

/*───────────────────────────────────────────────────────────*/
/* Scratch singletons – strictly local to this file         */
/*───────────────────────────────────────────────────────────*/
const _v1 = new THREE.Vector3(); // tempo: build destinations
const _v2 = new THREE.Vector3(); // tempo: directions, misc math
const _vIn = new THREE.Vector3(); // tempo: direction function input conversion
const _q = new THREE.Quaternion();
const _AXIS_X = new THREE.Vector3(1, 0, 0);
const _AXIS_Y = new THREE.Vector3(0, 1, 0);
const _AXIS_Z = new THREE.Vector3(0, 0, 1);

const SPAWNS_PER_TICK = 42000;
const MAX_PARTICLES = 500_000;

/*=====================================================================*/
class LaserTracer {
  constructor({ maxParticles = MAX_PARTICLES } = {}) {
    /* ── brush state ──────────────────────────────────────────────── */
    this.options = {
      // NB: color is a THREE.Color instance to avoid hidden allocs
      color: new THREE.Color(0xaa88ff),
      size: 5,
      lifetime: 1,
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
    };

    /* ── spacing ---------------------------------------------------- */
    this.spawnDistance = 1;
    this.invSpawnDistance = 1; // cached reciprocal

    /* ── fuzz brush ------------------------------------------------- */
    this.fuzzBrush = { count: 0, sx: 0, sy: 0, sz: 0 };

    /* ── time cache ------------------------------------------------- */
    this.timeSeconds = 0;

    /* ── transform stack ------------------------------------------- */
    this.frame = {
      pos: new THREE.Vector3(),
      rot: new THREE.Quaternion(),
    };
    this.stack = [];

    /* ── rendering -------------------------------------------------- */
    this.particleSystem = new ParticleSystem({ maxParticles });
    this.obj3d = new THREE.Object3D();
    this.obj3d.add(this.particleSystem);

    /* ── tick-budget throttle ------------------------------------ */
    this._tickBudget = SPAWNS_PER_TICK; // deposits allowed per VM tick
    this._budgetLeft = this._tickBudget;
    this._emittedThisFrame = 0;
    this._strideLen = 1; //  ← updated every tick
    this._strideOffset = 0; //  ← cycles 0 .. strideLen-1

    /* ── per‑spawn object proto  (mutated in place) ---------------- */
    this._spawnOpts = {
      color: this.options.color,
      lifetime: this.options.lifetime,
      size: this.options.size,
      velocity: this.options.velocity,
      position: new THREE.Vector3(),
    };
  }

  /*──────────────── Budget API ───────────────────────────────────*/

  /*  VM calls these once per frame  */
  _beginTick() {
    this._budgetLeft = this._tickBudget;
    this._emittedThisFrame = 0;
    this._acceptedThisFrame = 0;

    // advance offset cyclically
    this._strideOffset = (this._strideOffset + 1) % this._strideLen;
  }

  _endTick() {
    /* ------- compute stride for NEXT tick ------------------------- */
    const M = this._emittedThisFrame;
    const B = this._tickBudget;
    this._strideLen = Math.max(1, Math.ceil(M / B) || 1);
  }

  /*──────────────────── Brush helpers ───────────────────*/
  /** fluent brush setter: tracer.brush({color,size,lifetime}) */
  brush({ color, size, lifetime } = {}) {
    if (color !== undefined) this.options.color.set(color);
    if (size !== undefined) this.options.size = size;
    if (lifetime !== undefined) this.options.lifetime = lifetime;
    return this;
  }

  color(c) {
    this.options.color.set(c);
  }
  size(px) {
    this.options.size = px;
  }
  residue(s) {
    this.options.lifetime = s;
  }

  spacing(d) {
    if (!(d > 0 && Number.isFinite(d))) return;
    this.spawnDistance = d;
    this.invSpawnDistance = 1 / d;
  }
  fuzz(count = 0, sx = 4, sy = sx, sz = sx) {
    this.fuzzBrush = { count, sx, sy, sz };
  }

  /*──────────────────── Transform stack ────────────────*/
  push() {
    this.stack.push({
      pos: this.frame.pos.clone(),
      rot: this.frame.rot.clone(),
      // snapshot of brush params (vectors need a copy)
      opts: {
        color: this.options.color.clone(),
        lifetime: this.options.lifetime,
        size: this.options.size,
        position: this.options.position.clone(),
        velocity: this.options.velocity.clone(),
      },
      fuzz: { ...this.fuzzBrush },
      space: this.spawnDistance,
    });
  }
  pop() {
    const s = this.stack.pop();
    if (!s) return;

    /* restore transform */
    this.frame.pos.copy(s.pos);
    this.frame.rot.copy(s.rot);

    /* restore brush state */
    const o = this.options,
      t = s.opts;
    o.color.copy(t.color);
    o.lifetime = t.lifetime;
    o.size = t.size;
    o.position.copy(t.position);
    o.velocity.copy(t.velocity);

    this.fuzzBrush = { ...s.fuzz };
    this.spawnDistance = s.space;
  }

  /*──────────────────── Absolute drawing ───────────────*/
  move(x, y, z) {
    _vIn.set(x, y, z);
    this.frame.pos.copy(_vIn);
    this.options.position.copy(_vIn);
  }
  trace(xDest, yDest, zDest) {
    _vIn.set(xDest, yDest, zDest);
    const dir = _v2.copy(_vIn).sub(this.frame.pos);
    const dist = dir.length();
    if (!dist) return; // zero‑length = pen‑up no‑op

    dir.normalize();
    const steps = Math.min(
      10_000, // hard ceiling — adjust to taste
      Math.floor(dist * this.invSpawnDistance),
    );

    for (let i = 0; i < steps; i++) {
      this.frame.pos.addScaledVector(dir, this.spawnDistance);
      this._spawnWithFuzz(this.frame.pos);
    }
    /* ensure end‑cap particle even when dist < spacing */
    if (steps <= 0) {
      this._spawnWithFuzz(_vIn);
    }
    this.frame.pos.copy(_vIn);
  }
  deposit(x, y, z) {
    _vIn.set(x, y, z);
    this._spawnWithFuzz(_vIn);
    this.frame.pos.copy(_vIn);
  }

  /*──────────────────── Relative drawing ───────────────*/
  moveRel(x, y, z) {
    const dest = _v1
      .set(x, y, z)
      .applyQuaternion(this.frame.rot)
      .add(this.frame.pos)
      .clone();
    this.move(dest.x, dest.y, dest.z);
  }
  traceRel(x, y, z) {
    const dest = _v1
      .set(x, y, z)
      .applyQuaternion(this.frame.rot)
      .add(this.frame.pos)
      .clone();
    this.trace(dest.x, dest.y, dest.z);
  }
  depositRel(x, y, z) {
    const dest = _v1
      .set(x, y, z)
      .applyQuaternion(this.frame.rot)
      .add(this.frame.pos)
      .clone();
    this.deposit(dest.x, dest.y, dest.z);
  }

  /*──────────────────── Orientation ────────────────────*/
  _rotate(axis, deg) {
    _q.setFromAxisAngle(axis, deg2rad(deg));
    this.frame.rot.multiply(_q);
  }
  yaw(d) {
    this._rotate(_AXIS_Y, d);
  }
  pitch(d) {
    this._rotate(_AXIS_X, d);
  }
  roll(d) {
    this._rotate(_AXIS_Z, d);
  }

  /*──────────────────── Text helpers ───────────────────*/
  drawText(txt, x = 0, y = 0, z = 0, h = 4) {
    this.push();
    this.move(x, y, z);
    this._drawTextInternal(txt, h);
    this.pop();
  }

  drawTextRel(txt, dx = 0, dy = 0, dz = 0, h = 4) {
    this.push();
    this.moveRel(dx, dy, dz);
    this._drawTextInternal(txt, h);
    this.pop();
  }

  _drawTextInternal(txt, h = 4) {
    const sp = h * 1.35;

    txt = String(txt).toUpperCase();

    /* ── optional centring ── */
    const width = txt.length * sp;
    _v1.set(-width * 0.5, 0, 0);
    this.moveRel(_v1.x, _v1.y, _v1.z);

    for (const ch of txt) {
      const glyph = GLYPH_MAP[ch];
      if (!glyph) {
        // unknown ⇒ blank advance
        _v1.set(sp, 0, 0);
        this.moveRel(_v1.x, _v1.y, _v1.z);
        continue;
      }

      this.push(); // glyph‑local frame
      let penX = 0,
        penY = 0; // pen in glyph space

      for (const stroke of glyph) {
        if (!stroke.length) continue;

        /* pen‑up move to first point of stroke */
        const [x0, y0] = stroke[0];
        _v1.set((x0 - penX) * h, (y0 - penY) * h, 0);
        this.moveRel(_v1.x, _v1.y, _v1.z);
        penX = x0;
        penY = y0;

        /* pen‑down draw the rest */
        for (let i = 1; i < stroke.length; i++) {
          const [x, y] = stroke[i];
          _v1.set((x - penX) * h, (y - penY) * h, 0);
          this.traceRel(_v1.x, _v1.y, _v1.z);
          penX = x;
          penY = y;
        }
      }

      /* advance cursor inside glyph frame, then restore parent */
      this.pop(); // leave glyph frame first
      _v1.set(sp, 0, 0); // advance in parent frame
      this.moveRel(_v1.x, _v1.y, _v1.z);
    }
  }

  /*──────────────────── Particle helper ────────────────*/
  _spawnWithFuzz(base) {
    const idx = this._emittedThisFrame++; // index within this tick

    // accept rule: idx mod strideLen === strideOffset
    if (idx % this._strideLen !== this._strideOffset) return;

    if (this._budgetLeft-- <= 0) return; // safety (shouldn’t hit)
    this._acceptedThisFrame++;

    const { count, sx, sy, sz } = this.fuzzBrush;
    const ps = this.particleSystem;
    const opts = this._spawnOpts;
    const pos = opts.position;

    // sync dynamic fields
    opts.lifetime = this.options.lifetime;
    opts.size = this.options.size;
    opts.velocity = this.options.velocity;

    /* base particle */
    pos.copy(base);
    ps.spawnParticle(this.timeSeconds, opts);

    /* fuzzed copies */
    for (let i = 0; i < count; i++) {
      pos.set(
        base.x + gauss() * sx,
        base.y + gauss() * sy,
        base.z + gauss() * sz,
      );
      ps.spawnParticle(this.timeSeconds, opts);
    }
  }

  /*──────────────────── Tick / cleanup ────────────────*/
  update(t) {
    this.timeSeconds = t;
    this.particleSystem.update(t);
  }

  /*────────────── Helpers for outside code ─────────────*/
  getSceneGraphNode() {
    return this.obj3d;
  }
  get position() {
    return this.frame.pos;
  }
  get rotation() {
    return this.frame.rot;
  }

  dispose() {
    this.obj3d.parent?.remove(this.obj3d);
    this.particleSystem.dispose();
  }
}

export default LaserTracer;
