/* ================================================================
   LORENZ FLOW – real‑time stream‑tracer demo
================================================================= */

// ---------- FIELD PARAMETERS ------------------------------------
const sigma = 5;
const rho = 42;
const beta = 9 / 3;

// ---------- INTEGRATOR SETTINGS ---------------------------------
const N_PARTICLES = 256; // keep it modest for first test
const DT = 0.004; // time‑step per rendered frame
const SEED_RADIUS = 1.0; // random seed sphere around origin

// ---------- BRUSH ------------------------------------------------
const PX_SIZE = 3; // sprite px
const SPACING = 0.25; // unused (deposit only)
const RESIDUE = 9; // seconds – fade
const FUZZ_N = 6; // soft glow
const FUZZ_SIG = 0.2;

// ---------- PERSISTENT STATE -------------------------------------
if (!globalThis.__lorenz) {
  // first frame bootstrap
  const pts = [];
  for (let i = 0; i < N_PARTICLES; i++) {
    // random seed near origin
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

function program(tMs) {
  // --- brush -----------------------------------------------------
  size(PX_SIZE);
  residue(RESIDUE);
  fuzz(FUZZ_N, FUZZ_SIG);

  const pts = globalThis.__lorenz.pts;

  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = lorenzStep(p0, DT);
    pts[i] = p1; // persist new position

    // approximate local stretching intensity
    const dx = sigma * (p1.y - p1.x);
    const dy = p1.x * (rho - p1.z) - p1.y;
    const dz = p1.x * p1.y - beta * p1.z;
    // cubehelix phase by orbit index so lobes differ
    const phase = (i / N_PARTICLES + tMs * 0.00005) % 1;

    // stretch as above
    const stretch = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const sNorm = Math.min(1, stretch / 50);

    // gamma <1 brightens fast zones, darkens slow
    const gamma = 0.5 + 0.5 * sNorm; // 0.5..1
    colorCubehelix(phase, 0.5, -1.5, gamma);

    deposit(p0.x, p0.y, p0.z);
    deposit(p1.x, p1.y, p1.z);
  }
}
