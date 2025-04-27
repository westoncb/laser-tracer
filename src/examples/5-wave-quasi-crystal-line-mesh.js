/* ================================================================
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
  /* global brush ------------------------------------------------ */
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
      style.colorViridis(Math.abs(A) / 1.5);
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
