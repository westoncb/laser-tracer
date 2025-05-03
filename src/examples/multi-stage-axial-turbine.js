/* =============================================================
   Laser-Tracer demo : Multi-stage Axial Turbine
   -------------------------------------------------------------
   Four alternating Rotor / Stator stages, plus a diffuser
   and converging nozzle.  All components line up on the Z axis.
================================================================ */

// ────────────────── high-level machine description ─────────────
const STAGES = [
  { type: "rotor",  blades:  9, hubR: 7,  tipR: 13, length: 3, mat: "rotor"  },
  { type: "stator", vanes:  14, innerR: 8, outerR: 14, length: 2, mat: "stator"},
  { type: "rotor",  blades: 11, hubR: 8,  tipR: 14, length: 3, mat: "rotor"  },
  { type: "stator", vanes:  16, innerR: 9, outerR: 15, length: 2, mat: "stator"},
];

const DIFFUSER = { inR: 16, outR: 20, length: 4 };
const NOZZLE   = { inR: 20, outR:  8, length: 5 };

// ────────────────── materials ──────────────────────────────────
const MATERIALS = {
  rotor:  { r: 0.0, g: 0.9, b: 0.4, size: 4, gap: 0.12 },
  stator: { r: 0.9, g: 0.6, b: 0.1, size: 4, gap: 0.14 },
  casing: { r: 0.3, g: 0.7, b: 1.0, size: 3, gap: 0.18 },
};

function mat(p, m) {
  const { r, g, b, size, gap } = MATERIALS[m];
  return p.colorRGB(r, g, b).dotSize(size).traceGap(gap)
          .fuzz(2, 0.1).residue(0.8);
}

// ────────────────── tiny helpers ───────────────────────────────
const SEG = 36;
function circle(r, z) {
  const pts = [];
  for (let i = 0; i <= SEG; i++) {
    const a = (i / SEG) * Math.PI * 2;
    pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z });
  }
  return pts;
}

// ────────────────── component builders ─────────────────────────
// Each builder draws **and returns its axial length** so the
// assembler can advance the cursor automatically.

function buildRotorStage(p, spec, spinDeg) {
  const { blades, hubR, tipR, length, mat: m } = spec;
  mat(p, m);

  // simple straight blades from hubR to tipR
  for (let i = 0; i < blades; i++) {
    p.push();
    p.roll((i / blades) * 360 + spinDeg);

    p.polyline(
      [
        { x: hubR, y: 0, z: 0 },
        { x: tipR, y: 0, z: length },
      ],
      false,
    );
    p.pop();
  }

  // front & back hub rings
  p.polyline(circle(hubR, 0), true);
  p.polyline(circle(hubR, length), true);
  // tip shroud (optional)
  p.polyline(circle(tipR, length), true);

  return length;
}

function buildStatorStage(p, spec) {
  const { vanes, innerR, outerR, length, mat: m } = spec;
  mat(p, m);

  for (let i = 0; i < vanes; i++) {
    p.push();
    p.roll((i / vanes) * 360);
    p.polyline(
      [
        { x: innerR, y: 0, z: 0 },
        { x: outerR, y: 0, z: length },
      ],
      false,
    );
    p.pop();
  }

  // shroud rings
  p.polyline(circle(innerR, 0), true);
  p.polyline(circle(innerR, length), true);

  return length;
}

function buildDiffuser(p, { inR, outR, length }) {
  mat(p, "casing");
  const rings = [];
  for (let i = 0; i <= 4; i++) {
    const t = i / 4;
    const r = inR * (1 - t) + outR * t;
    const z = t * length;
    const ring = circle(r, z);
    p.polyline(ring, true);
    rings.push(ring);
  }
  // longitudinal seams
  for (let i = 0; i < SEG; i += 3) {
    p.polyline(rings.map((ring) => ring[i]), false);
  }
  return length;
}

function buildNozzle(p, { inR, outR, length }) {
  mat(p, "casing");
  const rings = [];
  for (let i = 0; i <= 4; i++) {
    const t = i / 4;
    const r = inR * (1 - t) + outR * t;
    const z = t * length;
    const ring = circle(r, z);
    p.polyline(ring, true);
    rings.push(ring);
  }
  for (let i = 0; i < SEG; i += 3) {
    p.polyline(rings.map((ring) => ring[i]), false);
  }
  return length;
}

// ────────────────── ground grid (unchanged) ────────────────────
function grid(p) {
  p.push();
  p.colorRGB(0, 0.4, 0.2).dotSize(1.5).traceGap(0.5).fuzz(0).residue(0.5);
  const G = 60,
    S = 10;
  for (let x = -G; x <= G; x += S)
    p.polyline(
      [
        { x, y: -30, z: -G },
        { x, y: -30, z: G },
      ],
      false,
    );
  for (let z = -G; z <= G; z += S)
    p.polyline(
      [
        { x: -G, y: -30, z },
        { x: G, y: -30, z },
      ],
      false,
    );
  p.pop();
}

// ────────────────── main loop ──────────────────────────────────
let first = true;
function program(pen, time) {
  if (first) {
    setBGColor(0x000008);
    first = false;
  }

  orbitCamera({ x: 0, y: 0, z: 0 }, 90, time * 10, 20);
  grid(pen);

  pen.push();
  pen.roll(time * 20); // global spin for show

  let zCursor = 0;

  // assemble stages in order
  for (const st of STAGES) {
    pen.push();
    pen.moveBy(0, 0, zCursor);

    if (st.type === "rotor") {
      zCursor += buildRotorStage(pen, st, time * 360);
    } else {
      zCursor += buildStatorStage(pen, st);
    }
    pen.pop();
  }

  // diffuser
  pen.push();
  pen.moveBy(0, 0, zCursor);
  zCursor += buildDiffuser(pen, DIFFUSER);
  pen.pop();

  // nozzle
  pen.push();
  pen.moveBy(0, 0, zCursor);
  buildNozzle(pen, NOZZLE);
  pen.pop();

  pen.pop(); // global spin frame
}
