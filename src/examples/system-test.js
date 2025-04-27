/* ================================================================
   LASER-TRACER “ALL-FEATURE” TESTBED
   ---------------------------------------------------------------
   What you should see
   -------------------
   1.  A wire icosahedron that spins slowly (absolute lines)
   2.  A local-space “propeller” made with traceBy + yaw
   3.  A comet that leaves a fuzzy trail with time-varying colour
   4.  A scrolling timestamp label to prove text & colour helpers
================================================================= */

const golden = 0xffcc33; /* ================================================================
   5-Wave Quasi-Crystal · line-mesh variant
   ---------------------------------------------------------------
   • 64×64 grid, linked with horizontal & vertical traces
   • pen.traceBy() lets orientation (pen.yaw) propagate automatically
================================================================= */

const GRID = 60; // cells per side  (even ⇒ no centre seam)
const STEP = 1.2; // spacing (world units)
const KLEN = 0.35; // wave-vector length
const AMP = 8; // vertical amplitude
const GAP = 0.4; // particle spacing along stroke
const SIZE = 6; // sprite size
const RESID = 1; // lifetime (s)

/* ---------- helpers -------------------------------------------- */
function wave5(px, pz, θ) {
  let a = 0;
  for (let k = 0; k < 5; k++) {
    const φ = θ + (k * 2 * Math.PI) / 5;
    a += Math.cos(px * Math.cos(φ) * KLEN + pz * Math.sin(φ) * KLEN);
  }
  return a / 5; // [-1,1]
}

/* --------------------------------------------------------------- */
function program(pen, draw, style, t) {
  /* global style ------------------------------------------------ */
  style.dotSize(SIZE);
  style.residue(RESID);
  style.fuzz(1, 0.1);
  style.traceGap(GAP);

  /* orient & lift the slab ------------------------------------- */
  pen.push();
  pen.moveBy(0, 0, 40);
  pen.yaw(t * 12); // slow spin

  const θ = t * 0.4;
  const half = (GRID - 1) * STEP * 0.5;

  /* ---- draw horizontal strips -------------------------------- */
  for (let z = 0; z < GRID; z++) {
    // start each row with an absolute move, then relative traces
    pen.push();
    const pz = (z - (GRID - 1) / 2) * STEP;
    const px0 = -half;
    let A0 = wave5(px0, pz, θ);
    pen.moveBy(px0, A0 * AMP, pz);

    for (let x = 1; x < GRID; x++) {
      const px = (x - (GRID - 1) / 2) * STEP;
      const A = wave5(px, pz, θ);
      pen.colorViridis(Math.abs(A) / 1.5);
      pen.traceBy(STEP, (A - A0) * AMP, 0); // relative Δx, Δy, Δz
      A0 = A;
    }
    pen.pop();
  }

  /* ---- draw vertical strips ---------------------------------- */
  for (let x = 0; x < GRID; x++) {
    pen.push();
    const px = (x - (GRID - 1) / 2) * STEP;
    const pz0 = -half;
    let A0 = wave5(px, pz0, θ);
    pen.moveBy(px, A0 * AMP, pz0);

    for (let z = 1; z < GRID; z++) {
      const pz = (z - (GRID - 1) / 2) * STEP;
      const A = wave5(px, pz, θ);
      style.colorViridis(Math.abs(A));
      pen.traceBy(0, (A - A0) * AMP, STEP); // Δx, Δy, Δz
      A0 = A;
    }
    pen.pop();
  }

  pen.pop(); // restore world frame
}

const magenta = 0xff44ff;
const cyan = 0x44ddff;

/* ----- icosahedron vertex data (units == world) ---------------- */
const φ = (1 + Math.sqrt(5)) / 2;
const S = 12; // overall scale
const VTX = [
  [-1, φ, 0],
  [1, φ, 0],
  [-1, -φ, 0],
  [1, -φ, 0],
  [0, -1, φ],
  [0, 1, φ],
  [0, -1, -φ],
  [0, 1, -φ],
  [φ, 0, -1],
  [φ, 0, 1],
  [-φ, 0, -1],
  [-φ, 0, 1],
].map(([x, y, z]) => ({ x: x * S, y: y * S, z: z * S }));

const EDGE = [
  [0, 1],
  [0, 5],
  [0, 7],
  [0, 11],
  [0, 10],
  [1, 5],
  [1, 7],
  [1, 9],
  [1, 8],
  [2, 3],
  [2, 4],
  [2, 6],
  [2, 11],
  [2, 10],
  [3, 4],
  [3, 6],
  [3, 9],
  [3, 8],
  [4, 5],
  [4, 9],
  [4, 11],
  [5, 9],
  [5, 11],
  [6, 7],
  [6, 8],
  [6, 10],
  [7, 8],
  [7, 10],
  [8, 9],
  [10, 11],
];

/* -------------------------------------------------------------- */
function program(pen, draw, style, t) {
  /* === global brush =========================================== */
  style.traceGap(0.4);
  style.dotSize(6);
  style.residue(4);

  /* === 1 · spinning icosahedron (absolute, stateless) ========= */
  style.colorHex(golden);
  const spin = t * 12; // deg/s
  const rotY = Math.cos(t * 0.5) * 20;
  pen.push();
  pen.yaw(spin);
  pen.pitch(rotY);

  style.colorHex(golden); // (keep brush settings outside loop)
  for (const [a, b] of EDGE) {
    pen.moveTo(0, 0, 0);
    pen.traceBy(VTX[a].x, VTX[a].y, VTX[a].z);
    pen.traceBy(VTX[b].x - VTX[a].x, VTX[b].y - VTX[a].y, VTX[b].z - VTX[a].z);
  }
  pen.pop();

  /* === 2 · local “propeller” using traceBy + yaw ============== */
  style.colorHex(magenta);
  style.traceGap(0.25);
  style.dotSize(4);

  pen.push();
  pen.moveTo(0, 0, 0); // hub at origin
  pen.yaw(t * 180); // spin 180° per second

  const blade = { x: 0, y: 0, z: 14 };
  for (let i = 0; i < 4; i++) {
    pen.traceBy(blade.x, blade.y, blade.z);
    pen.moveBy(-blade.x, -blade.y, -blade.z); // return to hub
    pen.yaw(90); // next blade
  }
  pen.pop();

  /* === 3 · comet with fuzzy trail ============================= */
  const comet = {
    x: 26 * Math.cos(t * 0.7),
    y: 18 * Math.sin(t * 0.9),
    z: 12 * Math.sin(t * 0.6),
  };
  style.colorHex(cyan);
  style.dotSize(10);
  style.fuzz(4, 0.3, 0.3, 0.3);

  draw.point(comet);

  /* === 4 · live timestamp text ================================ */
  style.fuzz(0); // crisp text
  style.dotSize(12);
  style.residue(0.1);
  style.traceGap(0.1);
  const txt = `t = ${t.toFixed(2)} s`;
  const scroll = ((t * 8) % 40) - 20; // scroll left→right
  draw.text(txt, { x: -28 + scroll * 10, y: -18, z: 0 }, 3);
}

/*
  roll,pitch,yaw need to be global rather than on pen, same with push,pop
  moveBy should probably just be translate

  frame.roll, frame.translate, frame.push, etc.

  draw.line(from, to)
  draw.point(pos)
  etc

  brush.size, brush.stipple, brush.fuzz, etc.
*/
