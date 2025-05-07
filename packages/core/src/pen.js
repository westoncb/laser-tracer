import * as THREE from "three";
import ParticleSystem from "./particleSystem.js";
import { gauss, deg2rad } from "./util.js";
import { GLYPH_MAP } from "./glyphMap.js";
import * as macros from "./macros.js";

const _v1 = new THREE.Vector3(); // temp: destinations
const _v2 = new THREE.Vector3(); // temp: directions, misc math
const _vIn = new THREE.Vector3(); // temp: parameter conversion
const _q = new THREE.Quaternion();
const _AXIS_X = new THREE.Vector3(1, 0, 0);
const _AXIS_Y = new THREE.Vector3(0, 1, 0);
const _AXIS_Z = new THREE.Vector3(0, 0, 1);

/*=====================================================================*/
class Pen {
  constructor({ maxParticles, renderMode }) {
    /* ── scene graph ------------------------------------------------ */
    this.particleSystem = new ParticleSystem({ maxParticles, renderMode });
    this.obj3d = new THREE.Object3D();
    this.obj3d.add(this.particleSystem);

    this.resetState();
  }

  _beginTick() {}
  _endTick() {}

  /*──────────────────────────────────────────────────────────────────*/
  /* State init / reset                                              */
  /*──────────────────────────────────────────────────────────────────*/
  resetState() {
    /* ── user-visible brush settings ───────────────────────────────*/
    this.settings = {
      color: new THREE.Color(0xaa88ff),
      dotSize: 4,
      traceGap: 0.1,
      residue: 0.7,
      fuzz: { count: 0, sx: 0, sy: 0, sz: 0 },
    };

    /* ── cached spacing reciprocal (perf) ──────────────────────────*/
    this._updateSpacingCache();

    /* ── global time cache ─────────────────────────────────────────*/
    this.timeSeconds = 0;

    this.frame = {
      pos: new THREE.Vector3(),
      rot: new THREE.Quaternion(),
    };
    this.stack = [];

    /* ── per-spawn object proto (mutated in place) ────────────────*/
    this._spawnOpts = {
      color: this.settings.color,
      size: this.settings.dotSize,
      lifetime: this.settings.residue,
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
    };
  }

  /* Helpers to keep cache in sync when user edits settings */
  _updateSpacingCache() {
    const g = Math.max(1e-6, this.settings.traceGap);
    this.spawnDistance = g;
    this.invSpawnDistance = 1 / g;
  }

  /*──────────────────── Stack ────────────────────────────────────*/
  push() {
    const s = {
      pos: this.frame.pos.clone(),
      rot: this.frame.rot.clone(),
      settings: {
        color: this.settings.color.clone(),
        dotSize: this.settings.dotSize,
        traceGap: this.settings.traceGap,
        residue: this.settings.residue,
        fuzz: { ...this.settings.fuzz },
      },
    };
    this.stack.push(s);
    return this;
  }

  pop() {
    const s = this.stack.pop();
    if (!s) return;

    this.frame.pos.copy(s.pos);
    this.frame.rot.copy(s.rot);

    this.settings.color.copy(s.settings.color);
    this.settings.dotSize = s.settings.dotSize;
    this.settings.traceGap = s.settings.traceGap;
    this.settings.residue = s.settings.residue;
    this.settings.fuzz = { ...s.settings.fuzz };

    this._updateSpacingCache();
    return this;
  }

  /*──────────────────── Orientation ──────────────────────────────*/
  _rotate(axis, deg) {
    _q.setFromAxisAngle(axis, deg2rad(deg));
    this.frame.rot.multiply(_q);
    return this;
  }
  yaw(d) {
    return this._rotate(_AXIS_Y, d);
  }
  pitch(d) {
    return this._rotate(_AXIS_X, d);
  }
  roll(d) {
    return this._rotate(_AXIS_Z, d);
  }

  /*──────────────────── Core operations ───────────────────*/
  moveTo(x, y, z) {
    _vIn.set(x, y, z);
    this.frame.pos.copy(_vIn);
    return this;
  }

  traceTo(x, y, z) {
    _vIn.set(x, y, z);
    this._lineInternal(_vIn);
    this.frame.pos.copy(_vIn);
    return this;
  }

  moveBy(dx, dy, dz) {
    const dest = _v1
      .set(dx, dy, dz)
      .applyQuaternion(this.frame.rot)
      .add(this.frame.pos);
    this.moveTo(dest.x, dest.y, dest.z);
    return this;
  }

  traceBy(dx, dy, dz) {
    const dest = _v1
      .set(dx, dy, dz)
      .applyQuaternion(this.frame.rot)
      .add(this.frame.pos);
    this.traceTo(dest.x, dest.y, dest.z);
    return this;
  }

  dot() {
    this._spawnWithFuzz(this.frame.pos);
    return this;
  }

  /*──────────────────── Internal line helper ────────────────────*/
  _lineInternal(destVec) {
    if (destVec.distanceToSquared(this.frame.pos) < 1e-2) return;

    const dir = _v2.copy(destVec).sub(this.frame.pos);
    const dist = dir.length();
    if (!dist) return;

    dir.normalize();

    const steps = Math.min(10_000, Math.floor(dist * this.invSpawnDistance));
    const gap = this.spawnDistance;

    for (let i = 0; i < steps; i++) {
      this.frame.pos.addScaledVector(dir, gap);
      this._spawnWithFuzz(this.frame.pos);
    }

    if (steps === 0) this._spawnWithFuzz(destVec);
  }

  /*──────────────────── Text helpers ────────────────────────────*/
  drawText(txt, x = 0, y = 0, z = 0, h = 4) {
    this.push();
    this.moveTo(x, y, z);
    this._drawTextInternal(txt, h);
    this.pop();
  }
  drawTextRel(txt, dx = 0, dy = 0, dz = 0, h = 4) {
    this.push();
    this.moveBy(dx, dy, dz);
    this._drawTextInternal(txt, h);
    this.pop();
  }

  _drawTextInternal(txt, h = 4) {
    const sp = h * 1.35;
    txt = String(txt).toUpperCase();

    const width = txt.length * sp;
    _v1.set(-width * 0.5, 0, 0);
    this.moveBy(_v1.x, _v1.y, _v1.z);

    for (const ch of txt) {
      const glyph = GLYPH_MAP[ch];
      if (!glyph) {
        _v1.set(sp, 0, 0);
        this.moveBy(_v1.x, _v1.y, _v1.z);
        continue;
      }

      this.push();
      let penX = 0,
        penY = 0;

      for (const stroke of glyph) {
        if (!stroke.length) continue;

        const [x0, y0] = stroke[0];
        _v1.set((x0 - penX) * h, (y0 - penY) * h, 0);
        this.moveBy(_v1.x, _v1.y, _v1.z);
        penX = x0;
        penY = y0;

        for (let i = 1; i < stroke.length; i++) {
          const [x, y] = stroke[i];
          _v1.set((x - penX) * h, (y - penY) * h, 0);
          this.traceBy(_v1.x, _v1.y, _v1.z);
          penX = x;
          penY = y;
        }
      }

      this.pop();
      _v1.set(sp, 0, 0);
      this.moveBy(_v1.x, _v1.y, _v1.z);
    }
  }

  /*──────────────────── Spawning ─────────────────────────*/
  _spawnWithFuzz(base) {
    const { count, sx, sy, sz } = this.settings.fuzz;

    /* hot-field sync */
    const ps = this.particleSystem;
    const opts = this._spawnOpts;
    const pos = opts.position;

    opts.lifetime = this.settings.residue;
    opts.size = this.settings.dotSize;
    opts.color.copy(this.settings.color);

    /* base particle */
    pos.copy(base);
    ps.spawnParticle(this.timeSeconds, opts);

    /* fuzz copies */
    for (let i = 0; i < count; i++) {
      pos.set(
        base.x + gauss() * sx,
        base.y + gauss() * sy,
        base.z + gauss() * sz,
      );
      ps.spawnParticle(this.timeSeconds, opts);
    }
  }

  /*──────────────────── Tick ──────────────────────────*/
  update(t) {
    this.timeSeconds = t;
    this.particleSystem.update(t);
  }

  /*────────────── External helpers ─────────────────────────────*/
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

  /*──── runtime mutators ───────────────────────────*/
  dotSize(px) {
    this.settings.dotSize = px;
    this._spawnOpts.size = px;
    return this;
  }
  traceGap(d) {
    if (d > 0) {
      this.settings.traceGap = d;
      this._updateSpacingCache();
    }
    return this;
  }
  residue(s) {
    this.settings.residue = s;
    this._spawnOpts.lifetime = s;
    return this;
  }
  fuzz(n = 0, sx = 4, sy = sx, sz = sx) {
    this.settings.fuzz = { count: n, sx, sy, sz };
    return this;
  }
  colorHex(hex) {
    this.settings.color.setHex(hex >>> 0);
    return this;
  }
  color(hex) {
    this.settings.color.setHex(hex >>> 0);
    return this;
  }
}

Object.assign(Pen.prototype, macros);

export default Pen;
