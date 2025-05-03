/* -----------------------------------------------------------------
   Compact Turbine
   Housing, hub & shaft share the Z axis.
   Blade disc sits at the front face of the hub and rotates
   around Z via pen.roll().
------------------------------------------------------------------ */

//// ── tweakables ────────────────────────────────────────────────
const HUB_R = 8,
  HUB_H = 8,
  SEG = 24;
const SHAFT_R = 2,
  SHAFT_L = 18;
const BLADE_N = 9,
  BLADE_L = 10,
  BLADE_W = 3;
const HOUSING = { z0: -12, z1: 12, r0: 12, rMid: 14, r1: 10 };

//// ── simple material helper ───────────────────────────────────
const Ti = { r: 0, g: 0.9, b: 0.4, size: 4, gap: 0.12 };
const Fe = { r: 0.9, g: 0.6, b: 0.1, size: 4, gap: 0.15 };
function mat(p, m) {
  return p
    .colorRGB(m.r, m.g, m.b)
    .dotSize(m.size)
    .traceGap(m.gap)
    .fuzz(2, 0.1)
    .residue(0.8);
}

//// ── geometry builders ────────────────────────────────────────
function hub(p) {
  p.push();
  mat(p, Ti);
  for (const z of [-HUB_H / 2, HUB_H / 2]) {
    const ring = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * 2 * Math.PI;
      ring.push({ x: Math.cos(a) * HUB_R, y: Math.sin(a) * HUB_R, z });
    }
    p.polyline(ring, true);
  }
  for (let i = 0; i < SEG; i += 3) {
    const a = (i / SEG) * 2 * Math.PI,
      x = Math.cos(a) * HUB_R,
      y = Math.sin(a) * HUB_R;
    p.polyline(
      [
        { x, y, z: -HUB_H / 2 },
        { x, y, z: HUB_H / 2 },
      ],
      false,
    );
  }
  p.pop();
}

function shaft(p) {
  p.push();
  mat(p, Fe);
  for (const z of [-SHAFT_L / 2, SHAFT_L / 2]) {
    const ring = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * 2 * Math.PI;
      ring.push({ x: Math.cos(a) * SHAFT_R, y: Math.sin(a) * SHAFT_R, z });
    }
    p.polyline(ring, true);
  }
  for (let i = 0; i < SEG; i += 4) {
    const a = (i / SEG) * 2 * Math.PI,
      x = Math.cos(a) * SHAFT_R,
      y = Math.sin(a) * SHAFT_R;
    p.polyline(
      [
        { x, y, z: -SHAFT_L / 2 },
        { x, y, z: SHAFT_L / 2 },
      ],
      false,
    );
  }
  p.pop();
}

function blade(p) {
  p.push();
  mat(p, Ti);
  const pts = [],
    N = 12,
    ROOT = HUB_R + 1; // clear the hub wall
  for (let i = 0; i <= N; i++) {
    // upper surface
    const t = i / N;
    pts.push({
      x: ROOT + t * BLADE_L,
      y: Math.sin(t * Math.PI) * BLADE_W,
      z: 0,
    });
  }
  for (let i = N; i >= 0; i--) {
    // lower surface
    const t = i / N;
    pts.push({
      x: ROOT + t * BLADE_L,
      y: -Math.sin(t * Math.PI) * BLADE_W * 0.7,
      z: 0,
    });
  }
  p.polyline(pts, true);
  p.pop();
}

function housing(p) {
  p.push();
  mat(p, Fe);
  const rings = [];
  for (let i = 0; i <= 5; i++) {
    const t = i / 5,
      z = HOUSING.z0 + t * (HOUSING.z1 - HOUSING.z0);
    const r =
      t < 0.5 // bulge interpolation
        ? HOUSING.r0 * (1 - 2 * t) + HOUSING.rMid * (2 * t)
        : HOUSING.rMid * (1 - 2 * (t - 0.5)) + HOUSING.r1 * (2 * (t - 0.5));
    const pts = [];
    for (let j = 0; j <= SEG; j++) {
      const a = (j / SEG) * 2 * Math.PI;
      pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z });
    }
    p.polyline(pts, true);
    rings.push(pts);
  }
  for (let i = 0; i < SEG; i += 3) {
    // longitudinal seams
    p.polyline(
      rings.map((r) => r[i]),
      false,
    );
  }
  p.pop();
}

//// ── ground grid (optional) ───────────────────────────────────
function grid(p) {
  p.push();
  p.colorRGB(0, 0.4, 0.2).dotSize(7).traceGap(0.5).fuzz(0).residue(0.5);
  const G = 40,
    S = 5;
  for (let x = -G; x <= G; x += S)
    p.polyline(
      [
        { x, y: -25, z: -G },
        { x, y: -25, z: G },
      ],
      false,
    );
  for (let z = -G; z <= G; z += S)
    p.polyline(
      [
        { x: -G, y: -25, z },
        { x: G, y: -25, z },
      ],
      false,
    );
  p.pop();
}

//// ── main loop ────────────────────────────────────────────────
let first = true;
function program(pen, d, time) {
  if (first) {
    setBGColor(0x000010);
    first = false;
  }
  // orbitCamera({ x: 0, y: 0, z: 0 }, 60, time * 15, 25); // nice arc-orbit
  grid(pen);

  pen.push();
  // pen.roll(time * 30); // spin whole rotor

  // station positions along Z axis
  const bladeZ = HOUSING.z0 + 1; // just inside front
  const hubZ = bladeZ + HUB_H / 2;
  const shaftZ = 0; // spans whole

  // shaft (centered)
  shaft(pen);

  // hub (shifted)
  pen.push();
  pen.moveBy(0, 0, hubZ);
  hub(pen);
  pen.pop();

  // blades disc at bladeZ, spinning in local roll
  pen.push();
  pen.moveBy(0, 0, bladeZ);
  for (let i = 0; i < BLADE_N; i++) {
    pen.push();
    pen.roll((i / BLADE_N) * 360);
    blade(pen);
    pen.pop();
  }
  pen.pop();

  // housing shell (static, encompasses everything)
  housing(pen);

  pen.pop();
}
