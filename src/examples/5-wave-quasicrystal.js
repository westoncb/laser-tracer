/* 5 Wave Quasicrystal */

const GRID = 65,
  STEP = 1,
  KLEN = 0.35;
const AMP_SCALE = 16,
  RESID = 0.7;
const FUZZ_N = 3,
  FUZZ_R = 0.25;

/* pre-compute XY grid */
const OFF = [];
for (let z = 0; z < GRID; z++)
  for (let x = 0; x < GRID; x++)
    OFF.push({
      x: (x - (GRID - 1) / 2) * STEP,
      z: (z - (GRID - 1) / 2) * STEP,
    });

function wave5(px, pz, θ) {
  let a = 0;
  for (let k = 0; k < 5; k++) {
    const φ = θ + (k * 2 * Math.PI) / 5;
    a += Math.cos(px * Math.cos(φ) * KLEN + pz * Math.sin(φ) * KLEN);
  }
  return a / 5; // [-1,1]
}

function program(t) {
  size(8);
  residue(RESID);
  fuzz(FUZZ_N, FUZZ_R);

  move(0, 0, 42);
  const θ = t * 0.4;
  for (const p of OFF) {
    const A = wave5(p.x, p.z, θ);
    colorViridis(Math.abs(A));
    deposit(p.x, A * AMP_SCALE, p.z, Math.abs(A));
  }
}
