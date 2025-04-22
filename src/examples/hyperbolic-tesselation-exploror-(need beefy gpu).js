// Hyperbolic Tessellation Explorer — Laser‑Tracer edition
// -------------------------------------------------------

/***** 1 · Persistent configuration *****************************************/
if (!globalThis.__hyperCfg) {
  globalThis.__hyperCfg = {
    p: 7, // polygon sides
    q: 3, // polygons per vertex
    depth: 3, // BFS shells
    worldScale: 30, // unit disk → world scaling
    colorMode: 0, // 0=level-based, 1=distance-based, 2=geometric
    timeOffset: 0, // for animation continuity
    showGuidelines: false, // toggle for educational view
  };
}

/***** 2 · Complex‑number helpers *******************************************/
const C = (x, y = 0) => [x, y];
const add = ([a, b], [c, d]) => [a + c, b + d];
const sub = ([a, b], [c, d]) => [a - c, b - d];
const mul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const conj = ([a, b]) => [a, -b];
const abs2 = ([a, b]) => a * a + b * b;
const abs = (z) => Math.sqrt(abs2(z));
const arg = ([a, b]) => Math.atan2(b, a);
const div = ([a, b], [c, d]) => {
  const denom = c * c + d * d;
  return [(a * c + b * d) / denom, (b * c - a * d) / denom];
};

/***** 3 · Hyperbolic geometry **********************************************/
function edgeLength(p, q) {
  return Math.acosh(Math.cos(Math.PI / p) / Math.sin(Math.PI / q));
}

function circumRadius(p, q) {
  const a = edgeLength(p, q);
  return 2 * Math.asinh(Math.tanh(a / 2) / Math.tan(Math.PI / p));
}

// Convert hyperbolic distance to Poincaré disk radius
const diskR = (hypR) => Math.tanh(hypR / 2);

// Calculate hyperbolic distance in Poincaré disk
function hyperbolicDistance(a, b) {
  const num = abs2(sub(a, b));
  const denom = (1 - abs2(a)) * (1 - abs2(b));
  return 2 * Math.atanh(Math.sqrt(num / denom));
}

function basePolygonVerts(p, radius) {
  const verts = [];
  const r = diskR(radius);
  for (let k = 0; k < p; k++) {
    const θ = (2 * Math.PI * k) / p;
    verts.push(C(r * Math.cos(θ), r * Math.sin(θ)));
  }
  return verts;
}

/* 3.1 · Disk isometry translating 0 → c  (disc automorphism) */
function translate0to(c, z) {
  // T_c(z) = (z + c) / (1 + c̄ z)
  return div(add(z, c), add([1, 0], mul(conj(c), z)));
}

/* 3.2 · Reflection of point z across geodesic defined by a–b */
// Reflection across geodesic (circle or diameter) via inversion
function reflect(z, a, b) {
  // If a,b,0 colinear → geodesic is a diameter; reflect by 180° about that line
  const cross = a[0] * b[1] - a[1] * b[0];
  if (Math.abs(cross) < 1e-6) {
    // Rotate 180° around the midpoint direction vector
    const axis = Math.atan2(a[1], a[0]);
    const zArg = Math.atan2(z[1], z[0]);
    const r = Math.sqrt(abs2(z));
    const reflArg = 2 * axis - zArg;
    return [r * Math.cos(reflArg), r * Math.sin(reflArg)];
  }
  // Circle centre orthogonal to unit circle
  const absA2 = abs2(a),
    absB2 = abs2(b);
  const numx = b[0] * (1 - absA2) - a[0] * (1 - absB2);
  const numy = b[1] * (1 - absA2) - a[1] * (1 - absB2);
  const denom = 2 * cross;
  const c = [-numy / denom, numx / denom];
  const dx = z[0] - c[0],
    dy = z[1] - c[1];
  const r2 = abs2(sub(a, c));
  const mag2 = dx * dx + dy * dy;
  const k = r2 / mag2;
  return [c[0] + k * dx, c[1] + k * dy];
}

/***** 4 · Drawing helpers ***************************************************/
const W = globalThis.__hyperCfg.worldScale;
const toWorld = ([x, y]) => [x * W, y * W];

function drawStraight(u, v) {
  const [x1, y1] = toWorld(u);
  const [x2, y2] = toWorld(v);
  move(x1, y1, 0);
  trace(x2, y2, 0);
}

function drawArc(center, r, u, v, segs = 18) {
  const [cx, cy] = center;
  const [wcX, wcY] = toWorld([cx, cy]);
  const R = r * W;
  let a0 = Math.atan2(u[1] - cy, u[0] - cx);
  let a1 = Math.atan2(v[1] - cy, v[0] - cx);
  if (a1 - a0 > Math.PI) a0 += 2 * Math.PI;
  if (a0 - a1 > Math.PI) a1 += 2 * Math.PI;
  let prev = null;
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const a = a0 * (1 - t) + a1 * t;
    const x = wcX + R * Math.cos(a);
    const y = wcY + R * Math.sin(a);
    if (prev) {
      move(prev[0], prev[1], 0);
      trace(x, y, 0);
    }
    prev = [x, y];
  }
}

function drawGeodesic(u, v) {
  const cross = u[0] * v[1] - u[1] * v[0];
  if (Math.abs(cross) < 1e-6) {
    drawStraight(u, v);
    return;
  }
  const absu2 = abs2(u),
    absv2 = abs2(v);
  const numx = v[0] * (1 - absu2) - u[0] * (1 - absv2);
  const numy = v[1] * (1 - absu2) - u[1] * (1 - absv2);
  const denom = 2 * cross;
  const c = [-numy / denom, numx / denom];
  const r = Math.sqrt(abs2(sub(u, c)));
  drawArc(c, r, u, v);
}

// Advanced coloring functions
function getPolygonColor(centre, level, t) {
  const cfg = globalThis.__hyperCfg;
  let hue, sat, val;

  // Baseline pulse effect
  const pulse = 1 + 0.2 * Math.sin(t * 0.6 + level * 0.5);

  switch (cfg.colorMode) {
    case 0: // Level-based coloring (shell by shell)
      hue = (level * 0.12 + t * 0.08) % 1;
      sat = 0.8;
      val = pulse;
      break;

    case 1: // Distance-based coloring
      // Color based on hyperbolic distance from origin
      const dist = 2 * Math.atanh(abs(centre));
      hue = (dist * 0.15 + t * 0.1) % 1;
      sat = 0.7 + 0.3 * Math.sin(dist * 1.5);
      val = 0.5 + 0.5 * pulse * (1 - Math.min(1, dist / 6)); // Fade with distance
      break;

    case 2: // Geometric coloring
      // Color based on angle and distance
      const angle = (arg(centre) / (2 * Math.PI) + 0.5) % 1; // 0-1
      const distFactor = Math.min(1, abs(centre) * 1.2);
      hue = (angle + t * 0.1) % 1;
      sat = 0.5 + 0.5 * distFactor;
      val = pulse * (1 - distFactor * 0.3);
      break;
  }

  return { hue, sat, val };
}

function fillPolygon(verts, color) {
  // Create glow effect by placing particles inside polygon
  const fillCount = 8 + Math.floor(verts.length / 2);

  // Average center (not accurate for hyperbolic space but visually works)
  let cx = 0,
    cy = 0;
  for (const v of verts) {
    cx += v[0];
    cy += v[1];
  }
  cx /= verts.length;
  cy /= verts.length;
  const center = [cx, cy];

  // Fill with slightly different color
  colorHSV(color.hue, color.sat * 0.8, color.val * 0.7);
  size(1.5);
  fuzz(0);
  residue(4);

  // Place particles radiating from center
  for (let i = 0; i < fillCount; i++) {
    const t = i / fillCount;
    const angle = t * Math.PI * 2;

    // Scale factor to reach near edge
    const targetVert = verts[i % verts.length];
    const dist = 0.6; // Partial distance to edge

    // Interpolate in Poincaré disk
    const direction = [Math.cos(angle), Math.sin(angle)];
    const magnitude = abs(direction);
    const normalized = [direction[0] / magnitude, direction[1] / magnitude];

    // Linear interpolation - not geodesic but looks ok
    const pt = [
      center[0] + (targetVert[0] - center[0]) * dist,
      center[1] + (targetVert[1] - center[1]) * dist,
    ];

    const [x, y] = toWorld(pt);
    deposit(x, y, 0);
  }
}

function drawPolygonOutline(verts, color) {
  colorHSV(color.hue, color.sat, color.val);

  // Draw polygon edges
  size(2);
  spacing(1.8);
  residue(8);
  fuzz(0);

  for (let i = 0; i < verts.length; i++) {
    drawGeodesic(verts[i], verts[(i + 1) % verts.length]);
  }

  // Highlight vertices
  size(3);
  spacing(2);
  fuzz(3, 0.4);
  residue(9);

  for (const v of verts) {
    const [x, y] = toWorld(v);
    deposit(x, y, 0);
  }
}

function drawPolygon(centre, protoVerts, level, t) {
  // Get color based on selected mode
  const color = getPolygonColor(centre, level, t);

  // Transform the polygon to its position
  const verts = protoVerts.map((v) => translate0to(centre, v));

  // Fill interior first (so outline draws on top)
  fillPolygon(verts, color);

  // Draw the outline
  drawPolygonOutline(verts, color);

  // Optional: Show guidelines (educational)
  if (globalThis.__hyperCfg.showGuidelines && level < 2) {
    drawGuidelines(centre, verts);
  }
}

function drawGuidelines(centre, verts) {
  // Draw lines connecting polygon center to origin to show hyperbolic structure
  const [cx, cy] = toWorld(centre);

  size(1);
  spacing(3);
  residue(5);
  fuzz(0);
  colorHSV(0.1, 0.3, 0.5);

  move(0, 0, 0);
  trace(cx, cy, 0);

  // Draw center marker
  size(4);
  fuzz(0);
  colorHSV(0.1, 0.6, 0.8);
  deposit(cx, cy, 0);
}

/***** 5 · BFS tessellation **************************************************/
function tessellate(p, q, depth, t) {
  const proto = basePolygonVerts(p, circumRadius(p, q));
  const queue = [C(0, 0)];
  const seen = new Set(["0,0"]);

  // Add animation for shell appearance
  const animationRate = 1.5; // Seconds per shell
  const shellDelay = (level) => Math.max(0, t - level * animationRate);

  for (let d = 0; d <= depth; d++) {
    // Animate each shell with a delay
    const shellProgress = Math.min(1, shellDelay(d));
    if (shellProgress <= 0) continue;

    const n = queue.length;
    for (let i = 0; i < n; i++) {
      const c = queue.shift();
      drawPolygon(c, proto, d, t);

      // Only add new centers if shell is fully visible
      if (shellProgress >= 0.9) {
        // enqueue neighbours via reflections across each edge
        for (let k = 0; k < p; k++) {
          const a = translate0to(c, proto[k]);
          const b = translate0to(c, proto[(k + 1) % p]);
          const cNext = reflect(c, a, b);
          pushCentre(cNext);
        }
      }
    }
  }

  function pushCentre(z) {
    if (abs2(z) >= 0.999) return;
    const key = `${z[0].toFixed(4)},${z[1].toFixed(4)}`;
    if (!seen.has(key)) {
      seen.add(key);
      queue.push(z);
    }
  }
}

/***** 6 · Decorative boundary & effects ************************************/
function drawBoundary(t) {
  size(2.5);
  spacing(1.0);
  residue(10);
  fuzz(0);

  const segs = 72;
  for (let i = 0; i < segs; i++) {
    const a0 = (2 * Math.PI * i) / segs;
    const a1 = (2 * Math.PI * (i + 1)) / segs;
    const pulse = 0.8 + 0.2 * Math.sin(t * 2 + i * 0.3);
    colorHSV((0.65 + t * 0.1 + i / segs) % 1, 0.9, pulse);
    move(W * Math.cos(a0), W * Math.sin(a0), 0);
    trace(W * Math.cos(a1), W * Math.sin(a1), 0);
  }

  // Add radial markers
  size(1.5);
  spacing(2);
  residue(7);
  fuzz(0);

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const outer = W * 1.03;
    const inner = W * 0.94;

    colorHSV((0.2 + t * 0.2 + i * 0.06) % 1, 0.7, 0.9);

    const x1 = outer * Math.cos(angle);
    const y1 = outer * Math.sin(angle);
    const x2 = inner * Math.cos(angle);
    const y2 = inner * Math.sin(angle);

    move(x1, y1, 0);
    trace(x2, y2, 0);
  }
}

function drawCentralGlow(t) {
  // Add central point of interest
  size(5);
  residue(6);
  fuzz(0);
  colorHSV((t * 0.2) % 1, 0.7, 1.0);
  deposit(0, 0, 0);

  // Add subtle rays
  const rayCount = 8;
  size(1);
  spacing(1);
  residue(4);
  fuzz(0);

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2 + t * 0.3;
    const length = W * 0.2 * (0.5 + 0.5 * Math.sin(t * 0.5 + i));

    colorHSV((t * 0.2 + i / rayCount) % 1, 0.6, 0.8);
    move(0, 0, 0);
    trace(length * Math.cos(angle), length * Math.sin(angle), 0);
  }
}

/***** 7 · Main entry point **************************************************/
function program(timeMs) {
  const cfg = globalThis.__hyperCfg;
  const t = timeMs * 0.001;

  // If pattern changes, track time offset for smooth animation
  const currentPattern = Math.floor(t / 15) % 3;
  const patternKey = `${currentPattern}`;

  // Switch between different patterns
  switch (currentPattern) {
    case 0:
      cfg.p = 7;
      cfg.q = 3;
      cfg.colorMode = 0;
      cfg.showGuidelines = false;
      break;
    case 1:
      cfg.p = 5;
      cfg.q = 4;
      cfg.colorMode = 1;
      cfg.showGuidelines = false;
      break;
    case 2:
      cfg.p = 8;
      cfg.q = 3;
      cfg.colorMode = 2;
      cfg.showGuidelines = true;
      break;
  }

  // Draw the tessellation
  tessellate(cfg.p, cfg.q, cfg.depth, t);

  // Add the decorative elements
  drawBoundary(t);
  drawCentralGlow(t);
}
