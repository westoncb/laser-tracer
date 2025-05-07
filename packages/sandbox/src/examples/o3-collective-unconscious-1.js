//o3 vibe sketching 1

/* ================================================================
   Laser‑Tracer :  “Collective Unconscious”
   ---------------------------------------------------------------
   • Pulsing archetypal core
   • Twisting radial filaments
   • Fading swarm of wandering ‘dream’ particles
================================================================ */

//// ---------- tunables ----------
const CORE_RADIUS = 6;
const FILAMENT_COUNT = 32;
const SWARM_PARTS = 1000;
const SWARM_RADIUS = 16;

//// ---------- persistent swarm state ----------
const swarm = []; // {x,y,z,   vx,vy,vz,   born}
function initSwarm() {
  for (let i = 0; i < SWARM_PARTS; i++) spawnParticle(i, 0);
}
function spawnParticle(i, t) {
  const th = Math.random() * 2 * Math.PI;
  const ph = Math.acos(2 * Math.random() - 1);
  const r = SWARM_RADIUS * (0.5 + 0.5 * Math.random());
  swarm[i] = {
    x: r * Math.sin(ph) * Math.cos(th),
    y: r * Math.sin(ph) * Math.sin(th),
    z: r * Math.cos(ph),
    vx: (Math.random() - 0.5) * 0.02,
    vy: (Math.random() - 0.5) * 0.02,
    vz: (Math.random() - 0.5) * 0.02,
    born: t,
  };
}

//// ---------- helper ----------
function paletteShift(pen, t) {
  // smooth cyclic cube‑helix ramp
  return pen.colorCubehelix(((t % 1) + 1) % 1, 0.5, -1.5, 1);
}

//// ---------- main ----------
let first = true;
function program(pen, draw, time) {
  if (first) {
    setBGColor(0x000005);
    setCamera({ x: 0, y: 0, z: 42 }, { x: 0, y: 0, z: 0 });
    initSwarm();
    first = false;
  }

  ////  camera – slow orbital drift
  // orbitCamera({ x: 0, y: 0, z: 0 }, 60, time * 8, 22);

  ////  ── pulsating core ─────────────────────────────
  pen.push();
  pen.dotSize(7);
  const pulse = 0.6 + 0.4 * Math.sin(time * 2);
  const layers = 10;
  for (let i = 0; i < layers; i++) {
    const r = CORE_RADIUS * pulse * Math.sqrt(i / layers);
    const dots = Math.floor(30 + 40 * r);
    for (let j = 0; j < dots; j++) {
      const a = (j / dots) * Math.PI * 2;
      pen.moveTo(Math.cos(a) * r, Math.sin(a) * r, 0).dot();
    }
  }
  pen.pop();

  ////  ── twisting radial filaments ─────────────────
  pen.push();
  pen.dotSize(2.5).traceGap(0.12).fuzz(4, 0.05).residue(1.2);
  for (let k = 0; k < FILAMENT_COUNT; k++) {
    pen.push();
    const ang = (k / FILAMENT_COUNT) * 360 + time * 15;
    pen.roll(ang);
    paletteShift(pen, k / FILAMENT_COUNT + time * 0.1);
    pen.moveTo(CORE_RADIUS, 0, 0);
    pen.traceBy(SWARM_RADIUS - CORE_RADIUS, 0, 0);
    pen.pop();
  }
  pen.pop();

  ////  ── drifting swarm ────────────────────────────
  pen.dotSize(1.2).traceGap(0.2).fuzz(0).residue(0.6);

  for (let i = 0; i < SWARM_PARTS; i++) {
    const p = swarm[i];

    // update position
    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;

    // gentle pull toward centre
    const pull = -0.0005;
    p.vx += p.x * pull;
    p.vy += p.y * pull;
    p.vz += p.z * pull;

    // slight Brownian kick
    p.vx += (Math.random() - 0.5) * 0.0006;
    p.vy += (Math.random() - 0.5) * 0.0006;
    p.vz += (Math.random() - 0.5) * 0.0006;

    // fade‑out / respawn
    const life = 18; // seconds
    if (time - p.born > life) spawnParticle(i, time);

    const hue = (i / SWARM_PARTS + time * 0.02) % 1;
    paletteShift(pen, hue);
    pen.moveTo(p.x, p.y, p.z).dotSize(4).dot();
  }
}
