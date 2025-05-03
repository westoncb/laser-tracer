//o3 vibe sketching 3

/* ===============================================================
   Laser‑Tracer · “Psychic Nebula”
   ----------------------------------------------------------------
   1. Φ‑vortex  : ever‑growing phyllotaxis spiral → innate ordering
   2. Lorenz storm : 400 tracers following Lorenz attractor → bound chaos
   3. Platonic shells : cube ↔ octa ↔ dodeca fade in/out → archetypal frames
================================================================= */

//// ---------- parameters ----------
const VORTEX_DOTS = 900;
const VORTEX_K = 0.55; // radial scale
const PHI = (1 + Math.sqrt(5)) / 2;
const LORENZ_N = 400;
const DT = 0.012;
const SIGMA = 10,
  RHO = 28,
  BETA = 8 / 3;
const SHELL_FADE_T = 12; // seconds per fade cycle

//// ---------- persistent state ----------
let first = true;
const lorenz = []; // {x,y,z}

function initLorenz() {
  for (let i = 0; i < LORENZ_N; i++) {
    lorenz.push({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
    });
  }
}

//// ---------- helpers ----------
function platonicEdges(type, r) {
  // returns array of [p1, p2] edge pairs; p = {x,y,z}
  const edges = [];
  if (type === "cube") {
    for (let xi of [-1, 1])
      for (let yi of [-1, 1])
        for (let zi of [-1, 1])
          if (xi === -1)
            edges.push([
              { x: xi * r, y: yi * r, z: zi * r },
              { x: yi * r, y: xi * r, z: zi * r },
            ]);
  } else if (type === "octa") {
    const v = [
      { x: 0, y: 0, z: r },
      { x: 0, y: 0, z: -r },
      { x: r, y: 0, z: 0 },
      { x: -r, y: 0, z: 0 },
      { x: 0, y: r, z: 0 },
      { x: 0, y: -r, z: 0 },
    ];
    const pairs = [
      [0, 2],
      [0, 4],
      [0, 3],
      [0, 5],
      [1, 2],
      [1, 4],
      [1, 3],
      [1, 5],
      [2, 4],
      [4, 3],
      [3, 5],
      [5, 2],
    ];
    for (const [a, b] of pairs) edges.push([v[a], v[b]]);
  } else if (type === "dodeca") {
    const φ = (1 + Math.sqrt(5)) / 2;
    const a = r / Math.sqrt(3);
    const b = a / φ;
    const c = a * φ;
    const raw = [
      [a, a, a],
      [a, a, -a],
      [a, -a, a],
      [a, -a, -a],
      [-a, a, a],
      [-a, a, -a],
      [-a, -a, a],
      [-a, -a, -a],
      [0, b, c],
      [0, b, -c],
      [0, -b, c],
      [0, -b, -c],
      [b, c, 0],
      [b, -c, 0],
      [-b, c, 0],
      [-b, -c, 0],
      [c, 0, b],
      [-c, 0, b],
      [c, 0, -b],
      [-c, 0, -b],
    ].map(([x, y, z]) => ({ x, y, z }));
    const faces = [
      [0, 8, 9, 4, 14],
      [0, 14, 12, 2, 16],
      [0, 16, 18, 1, 8],
      [1, 18, 19, 5, 9],
      [1, 9, 8, 0, 16],
      [2, 12, 13, 3, 10],
      [2, 10, 11, 6, 16],
      [3, 13, 15, 7, 11],
      [3, 11, 10, 2, 12],
      [4, 9, 5, 19, 17],
      [4, 17, 12, 0, 14],
      [5, 19, 18, 1, 9],
      [6, 11, 7, 15, 17],
      [6, 17, 14, 0, 16],
      [7, 15, 13, 3, 11],
      [8, 1, 9, 5, 4],
      [10, 2, 12, 17, 6],
      [13, 2, 14, 4, 15],
      [18, 16, 6, 17, 19],
      [19, 17, 15, 13, 18],
    ];
    const edgeSet = new Set();
    for (const f of faces) {
      for (let i = 0; i < f.length; i++) {
        const a = f[i],
          b = f[(i + 1) % f.length];
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        edgeSet.add(key);
      }
    }
    for (const key of edgeSet) {
      const [a, b] = key.split("-").map(Number);
      edges.push([raw[a], raw[b]]);
    }
  }
  return edges;
}

//// ---------- main ----------
function program(pen, draw, time) {
  if (first) {
    setBGColor(0x000006);
    initLorenz();
    first = false;
    setCamera({ x: 0, y: 0, z: 48 }, { x: 0, y: 0, z: 0 });
  }

  //// 0 · gentle global spin
  pen.push();
  pen.yaw(time * 3);
  pen.pitch(Math.sin(time * 0.2) * 5);

  //// 1 · Φ‑vortex
  pen.push();
  pen.dotSize(3.8).fuzz(48, 0.7).traceGap(0.18).residue(1.4);
  for (let n = 0; n < VORTEX_DOTS; n++) {
    const r = VORTEX_K * Math.sqrt(n);
    const a = (n * 2 * Math.PI) / PHI;
    const z = Math.sin(n * 0.03 + time) * 3;
    const hue = (0.55 + r * 0.03 + time * 0.02) % 1;
    pen.colorCubehelix(hue, 0.6, -1.4, 0.9);
    pen.moveTo(r * Math.cos(a), r * Math.sin(a), z).dot();
  }
  pen.pop();

  //// 2 · Lorenz storm
  pen.push();
  pen.dotSize(6).fuzz(2, 0.15).residue(0.7);
  for (const p of lorenz) {
    // integrate
    const dx = SIGMA * (p.y - p.x);
    const dy = p.x * (RHO - p.z) - p.y;
    const dz = p.x * p.y - BETA * p.z;
    p.x += dx * DT;
    p.y += dy * DT;
    p.z += dz * DT;

    const hue = (p.z * 0.03 + time * 0.04) % 1;
    pen.colorCubehelix(hue, 0.5, -1.3, 0.8);
    pen.moveTo(p.x, p.y, p.z).dot();
  }
  pen.pop();

  //// 3 · Platonic shells fade in/out
  const shellTypes = ["cube", "octa", "dodeca"];
  shellTypes.forEach((type, idx) => {
    const phase = (time / SHELL_FADE_T + idx / shellTypes.length) % 1;
    const alpha = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2);
    pen.push();
    pen.dotSize(3).traceGap(0.1).fuzz(2, 0.12).residue(1.0);
    pen.colorCubehelix((0.1 + idx * 0.2 + time * 0.01) % 1, 0.65, -1.4, alpha);
    const edges = platonicEdges(type, 10 + idx * 3);
    for (const [a, b] of edges) {
      pen.moveTo(a.x, a.y, a.z);
      pen.traceTo(b.x, b.y, b.z);
    }
    pen.pop();
  });

  pen.pop(); // global spin
}
