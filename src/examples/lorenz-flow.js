/* ================================================================
   LORENZ FLOW – real‑time stream‑tracer demo (centered version)
================================================================= */

// ---------- FIELD PARAMETERS ------------------------------------
const sigma = 5;
const rho = 42;
const beta = 9 / 3;

// Offset that puts the attractor’s midpoint at the origin
const CENTER_Z = rho - 1; // = 41 for rho = 42
const CENTER = { x: 0, y: 0, z: CENTER_Z };

// ---------- INTEGRATOR SETTINGS ---------------------------------
const N_PARTICLES = 256;
const DT = 0.004;
const SEED_RADIUS = 1.0;

// ---------- BRUSH ------------------------------------------------
const PX_SIZE = 3;
const RESIDUE = 18;
const FUZZ_N = 6;
const FUZZ_SIG = 0.2;

// ---------- PERSISTENT STATE -------------------------------------
if (!globalThis.__lorenz) {
  const pts = [];
  for (let i = 0; i < N_PARTICLES; i++) {
    // random seed near origin (no shift here – we integrate in native coords)
    const r = Math.random() * SEED_RADIUS;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pts.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    });
  }
  globalThis.__lorenz = { pts };
}

function lorenzStep(p, dt) {
  const dx = sigma * (p.y - p.x);
  const dy = p.x * (rho - p.z) - p.y;
  const dz = p.x * p.y - beta * p.z;
  return {
    x: p.x + dx * dt,
    y: p.y + dy * dt,
    z: p.z + dz * dt,
  };
}

function program(t) {
  const tMs = t * 1000;
  // --- brush -----------------------------------------------------
  size(PX_SIZE);
  residue(RESIDUE);
  fuzz(FUZZ_N, FUZZ_SIG);

  const pts = globalThis.__lorenz.pts;

  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = lorenzStep(p0, DT);
    pts[i] = p1; // persist new position

    // local stretching magnitude (for colour gamma)
    const dx = sigma * (p1.y - p1.x);
    const dy = p1.x * (rho - p1.z) - p1.y;
    const dz = p1.x * p1.y - beta * p1.z;
    const stretch = Math.hypot(dx, dy, dz);
    const sNorm = Math.min(1, stretch / 50);
    const gamma = 0.5 + 0.5 * sNorm; // 0.5‥1

    const phase = (i / N_PARTICLES + tMs * 0.00005) % 1;
    colorCubehelix(phase, 0.5, -1.5, gamma);

    // ---- render *shifted* positions ----------------------------
    deposit(p0.x - CENTER.x, p0.y - CENTER.y, p0.z - CENTER.z);
    deposit(p1.x - CENTER.x, p1.y - CENTER.y, p1.z - CENTER.z);
  }
}
