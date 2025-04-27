// tracerLib.js  –  colour + utility helpers for Laser-Tracer
// ==========================================================
// Each function below is invoked by TracerVM like
//     lib[colorRGB](tracer, r, g, b)
// so its *first* argument is ALWAYS the active tracer object.
// The tracer object must expose a `.color(hex24)` method that
// takes a 24-bit 0xRRGGBB integer.

// ---------- low-level ------------------------------------------------
const clampByte = (x) => Math.max(0, Math.min(255, Math.round(x * 255)));

/** r,g,b in 0-1 → 0xRRGGBB */
function rgb2hex(r, g, b) {
  return (clampByte(r) << 16) | (clampByte(g) << 8) | clampByte(b);
}

/** h,s,v in 0-1 → 0xRRGGBB */
function hsv2hex(h, s, v) {
  h = ((h % 1) + 1) % 1; // wrap hue
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const [r, g, b] = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q],
  ][i % 6];
  return rgb2hex(r, g, b);
}

/* ---------- viridis lookup + lerp --------------------------------- */
const _viridis = [
  0x440154, 0x471164, 0x482071, 0x472d7b, 0x453882, 0x414287, 0x3b4b8a,
  0x35538c, 0x2f5c8e, 0x2a648f, 0x266c91, 0x227394, 0x1e7b96, 0x1c8397,
  0x1b8a98, 0x1d9299, 0x219a98, 0x28a197, 0x30a897, 0x39af95, 0x42b694,
  0x4cbd92, 0x55c390, 0x5fc98d, 0x68ce8a, 0x72d387, 0x7cd784, 0x86db81,
  0x8fdf7e, 0x99e37b, 0xa2e678, 0xacea74, 0xb5ed70, 0xbeef6d, 0xc7f169,
  0xcff366, 0xd7f562, 0xdff65e, 0xe7f65a, 0xeff756, 0xf7f752, 0xfef74e,
];
function viridisHex(t) {
  t = Math.max(0, Math.min(1, t));
  const idx = t * (_viridis.length - 1);
  const i0 = Math.floor(idx);
  const i1 = Math.min(i0 + 1, _viridis.length - 1);
  const f = idx - i0;

  const lerp24 = (a, b, f) => {
    const rb = a & 0xff,
      gb = (a >> 8) & 0xff,
      bb = a >> 16;
    const re = b & 0xff,
      ge = (b >> 8) & 0xff,
      be = b >> 16;
    const r = rb + (re - rb) * f;
    const g = gb + (ge - gb) * f;
    const v = bb + (be - bb) * f;
    return (Math.round(v) << 16) | (Math.round(g) << 8) | Math.round(r);
  };
  return lerp24(_viridis[i0], _viridis[i1], f);
}

/* ---------- parametric cubehelix ---------------------------------- */
// t ∈ [0,1]  ·  start ∈ [0,3]  (0 = red, 1 = green, 2 = blue)
function cubehelixHex(t, start = 0.5, rot = -1.5, gamma = 1) {
  // --- normalise & gamma --------------------------------------
  t = Math.pow(Math.max(0, Math.min(1, t)), gamma);

  // --- core cubehelix calculation -----------------------------
  const phi = 2 * Math.PI * (start / 3 + rot * t); // ← divide start by 3
  const amp = 0.5 * t * (1 - t); // 0 at both ends, 0.125 mid

  let r = t + amp * (-0.14861 * Math.cos(phi) + 1.78277 * Math.sin(phi));
  let g = t + amp * (-0.29227 * Math.cos(phi) - 0.90649 * Math.sin(phi));
  let b = t + amp * (+1.97294 * Math.cos(phi));

  // --- clamp to [0,1] then → 24-bit hex ------------------------
  r = Math.min(1, Math.max(0, r));
  g = Math.min(1, Math.max(0, g));
  b = Math.min(1, Math.max(0, b));

  // Convert to integer 0xRRGGBB
  return ((r * 255) << 16) | ((g * 255) << 8) | (b * 255) | 0;
}

/* --- basic utility ---------------------------------------------- */
function _frenetYawPitch(tx, ty, tz) {
  const yaw = (Math.atan2(tx, tz) * 180) / Math.PI; // around Y
  const pitch = (-Math.atan2(ty, Math.hypot(tx, tz)) * 180) / Math.PI; // around X
  return [yaw, pitch];
}

/* --- draws one profile slice ------------------------------------ */
function _drawProfile(tracer, profile, close) {
  // local XY plane – use traceBy deltas
  const p0 = profile[0];
  tracer.moveBy(p0.x, p0.y, p0.z);
  for (let i = 1; i < profile.length; i++) {
    const a = profile[i - 1],
      b = profile[i];
    tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
  if (close && profile.length > 2) {
    const a = profile[profile.length - 1],
      b = profile[0];
    tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                         */
/* ------------------------------------------------------------------ */
export default {
  /** colourHex(tracer, 0xff00ff) */
  colorHex(tracer, hex) {
    tracer.color(hex >>> 0);
  },

  /** colourRGB(tracer, r,g,b)  with r,g,b ∈ [0,1] */
  colorRGB(tracer, r, g, b) {
    tracer.color(rgb2hex(r, g, b));
  },

  /** colourHSV(tracer, h,s,v)  with h,s,v ∈ [0,1] */
  colorHSV(tracer, h, s, v) {
    tracer.color(hsv2hex(h, s, v));
  },

  /** colourViridis(tracer, t) with t ∈ [0,1] */
  colorViridis(tracer, t) {
    tracer.color(viridisHex(t));
  },

  /** colourCubehelix(tracer, t, start?, rot?, gamma?) */
  colorCubehelix(tracer, t, start = 0.5, rot = -1.5, gamma = 1) {
    const hex = cubehelixHex(t, start, rot, gamma);
    tracer.color(hex);
  },

  setBGColor(tracer, hex) {
    this.renderer.setClearColor(hex);
  },

  /* ==================================================================
     POLYLINE HELPERS
     ------------------------------------------------------------------
     • polylineLocal → vertices interpreted in CURRENT pen frame
     • polylineWorld → vertices are absolute world coordinates
     • close=true    → last→first edge is drawn automatically
     • Each helper isolates its work with push/pop so it never drifts
       the tracer’s cursor or brush state.
  ================================================================== */
  polylineLocal(tracer, pts, close = false) {
    if (!pts || pts.length === 0) return;

    tracer.push();

    // move pen to first vertex (local coords → moveBy)
    const p0 = pts[0];
    tracer.moveBy(p0.x, p0.y, p0.z);

    // trace edges with LOCAL deltas
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1],
        b = pts[i];
      tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
    }

    if (close && pts.length > 2) {
      const a = pts[pts.length - 1],
        b = pts[0];
      tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
    }

    tracer.pop();
  },

  polylineWorld(tracer, pts, close = false) {
    if (!pts || pts.length === 0) return;

    tracer.push();

    // move pen to first vertex (absolute → moveTo)
    const p0 = pts[0];
    tracer.moveTo(p0.x, p0.y, p0.z);

    // trace edges with absolute endpoints
    for (let i = 1; i < pts.length; i++) {
      const b = pts[i];
      tracer.traceTo(b.x, b.y, b.z);
    }

    if (close && pts.length > 2) {
      const b = pts[0];
      tracer.traceTo(b.x, b.y, b.z);
    }

    tracer.pop();
  },

  /* ==================================================================
     SWEEP HELPERS
     ------------------------------------------------------------------
     sweepLocal : profile is swept along a path whose vertices are in
                  the *current pen frame* (inherits yaw/pitch/roll).

     sweepWorld : path vertices are absolute world coordinates; sweep
                  ignores any prior pen orientation.

     Both accept `closePath` to splice last→first tangent for loops.
  ================================================================== */

  /* ----------------------------------------------------------------
     LOCAL  – inherits current pen orientation
  -----------------------------------------------------------------*/
  sweepLocal(tracer, path, profile, closePath = false) {
    if (!path || path.length < 2 || !profile || profile.length < 2) return;

    // pre-compute tangents
    const tang = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i],
        b = path[i + 1];
      tang.push({ x: b.x - a.x, y: b.y - a.y, z: b.z - a.z });
    }
    if (closePath) tang.push(tang[0]);

    tracer.push(); // isolate sweep
    for (let i = 0; i < path.length; i++) {
      const P = path[i];
      const t = tang[i < tang.length ? i : i - 1];

      tracer.push(); // per-slice transform
      tracer.moveBy(P.x, P.y, P.z);

      // orient slice: yaw about Y, pitch about X
      const [yaw, pitch] = _frenetYawPitch(t.x, t.y, t.z);
      tracer.yaw(yaw);
      tracer.pitch(pitch);

      _drawProfile(tracer, profile, true); // closed profile
      tracer.pop();
    }
    tracer.pop();
  },

  /* ----------------------------------------------------------------
     WORLD  – path points are absolute; ignores existing pen rot
  -----------------------------------------------------------------*/
  sweepWorld(tracer, path, profile, closePath = false) {
    if (!path || path.length < 2 || !profile || profile.length < 2) return;

    // compute tangents
    const tang = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i],
        b = path[i + 1];
      tang.push({ x: b.x - a.x, y: b.y - a.y, z: b.z - a.z });
    }
    if (closePath) tang.push(tang[0]);

    for (let i = 0; i < path.length; i++) {
      const P = path[i];
      const t = tang[i < tang.length ? i : i - 1];

      tracer.push();
      tracer.moveTo(P.x, P.y, P.z); // absolute anchor

      const [yaw, pitch] = _frenetYawPitch(t.x, t.y, t.z);
      tracer.yaw(yaw);
      tracer.pitch(pitch);

      _drawProfile(tracer, profile, true);
      tracer.pop();
    }
  },
};
