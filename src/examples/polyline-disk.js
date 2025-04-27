/* ================================================================
   POLYLINE DISK
================================================================= */

const N_RINGS = 18; // how many concentric circles
const N_RING_V = 12; // verts per ring
const N_SPOKES = 18; // local spokes (inherits yaw)
const N_SPK_V = 32; // verts per spoke
const R_MAX = 60; // outer radius
const GAP = 0.22; // particle spacing
const DOT = 3; // sprite size
const RESID = 3;

const rings = []; // world-space polyline arrays
const spokes = []; // local-space polyline arrays

/* ---------- pre-compute concentric circles --------------------- */
for (let rIdx = 1; rIdx <= N_RINGS; rIdx++) {
  const r = (rIdx / N_RINGS) * R_MAX;
  const poly = new Array(N_RING_V);
  for (let i = 0; i < N_RING_V; i++) {
    const a = (i / N_RING_V) * Math.PI * 2;
    poly[i] = { x: r * Math.cos(a), y: 0, z: r * Math.sin(a) };
  }
  rings.push(poly);
}

/* ---------- pre-compute unit spokes (in XY plane) -------------- */
for (let sIdx = 0; sIdx < N_SPOKES; sIdx++) {
  const ang = (sIdx / N_SPOKES) * Math.PI * 2;
  const dir = { x: Math.cos(ang), y: 0, z: Math.sin(ang) };
  const poly = new Array(N_SPK_V);
  for (let i = 0; i < N_SPK_V; i++) {
    const t = i / (N_SPK_V - 1);
    poly[i] = {
      x: dir.x * t * R_MAX,
      y: dir.y * t * R_MAX,
      z: dir.z * t * R_MAX,
    };
  }
  spokes.push(poly);
}

/* --------------------------------------------------------------- */
function program(pen, draw, style, t) {
  /* global brush ------------------------------------------------ */
  style.dotSize(DOT);
  style.residue(RESID);
  style.traceGap(GAP);
  style.fuzz(0);

  /* === WORLD-SPACE RINGS ====================================== */
  style.colorHex(0x3355ff);
  for (const ring of rings) draw.polyline(ring, true); // ignores pen orientation

  /* === LOCAL-SPACE SPOKES (rotating) ========================== */
  pen.push();
  pen.yaw(t * 30); // every spoke inherits yaw
  style.colorViridis((t * 0.08) % 1);

  for (const spoke of spokes) pen.polyline(spoke, false); // local version

  pen.pop();
}
