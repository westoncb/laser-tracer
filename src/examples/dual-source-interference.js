/* === Ripple Lace – dual‑source interference ================= */

/* Quick HSV → hex */
function hsv(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  const r = Math.round(f(5) * 255),
    g = Math.round(f(3) * 255),
    b = Math.round(f(1) * 255);
  return ((r << 16) | (g << 8) | b) >>> 0;
}

/* Wave parameters */
const GRID = 160; // total grid size
const CELLS = 80; // resolution (CELLS² deposits / frame)
const INC = GRID / CELLS;
const λ = 18; // wavelength
const k = (Math.PI * 2) / λ; // spatial frequency
const ampl = 7; // vertical scale in tracer coords

/* Soft palette: positive phase → teal–cyan, negative → magenta–pink */
function phaseColor(phase) {
  if (phase >= 0) {
    return hsv(180 + phase * 40, 0.8, 1); // 180–220°
  } else {
    return hsv(300 + -phase * 40, 0.8, 1); // 300–340°
  }
}

function program(tMs) {
  const t = tMs * 0.001; // seconds

  /* Moving source centres (slow Lissajous drift) */
  const src1 = {
    x: 20 * Math.sin(t * 0.23),
    y: 20 * Math.cos(t * 0.17),
  };
  const src2 = {
    x: 20 * Math.sin(t * 0.31 + 1.3),
    y: 20 * Math.cos(t * 0.19 + 0.7),
  };

  size(3);
  residue(6);

  for (let i = 0; i <= CELLS; i++) {
    for (let j = 0; j <= CELLS; j++) {
      const x = i * INC - GRID / 2;
      const y = j * INC - GRID / 2;

      /* Distance to each source → phase */
      const d1 = Math.hypot(x - src1.x, y - src1.y);
      const d2 = Math.hypot(x - src2.x, y - src2.y);

      /* Interference: cosine sum → amplitude */
      const phase1 = Math.cos(k * d1 - t * 4);
      const phase2 = Math.cos(k * d2 - t * 4);
      const A = (phase1 + phase2) * 0.5; // -1 … +1

      /* Threshold for rendering – skip weak points to save particles */
      if (Math.abs(A) < 0.15) continue;

      color(phaseColor(A));
      const z = A * ampl; // height encodes intensity
      deposit(x, z, y); // y→z swap for top‑down view
    }
  }
}
