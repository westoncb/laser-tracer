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

/* ------------------------------------------------------------------ */
/* Public API – functions the PRELUDE emits as op names               */
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
    const color = cubehelixHex(t, start, rot, gamma);
    tracer.color(cubehelixHex(color));
    return color;
  },

  setBGColor(tracer, hex) {
    this.renderer.setClearColor(hex);
  },
};
