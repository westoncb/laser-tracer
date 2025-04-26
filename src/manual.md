# Laser-Tracer Technical Manual

## Overview

Laser-Tracer is a real-time, programmable virtual 3D vector display system that lets users create dynamic illuminated structures through simple turtle-graphics-style scripting in a sandboxed JavaScript environment (QuickJS). Each user-written script defines the tracer's movements, orientation, and particle-emission properties to produce a wide range of visual structures. Scripts execute automatically once per animation frame:

```javascript
function program(time) {
  // Your drawing commands here
}
```

Each call defines points or paths, through built-in functions that spawn glowing particles, which mimic the decay characteristics of phosphor-based vector displays. Time parameter is in seconds.

---

## Quick Reference

| Functions                                           | Description                                                                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `move(x,y,z)` / `moveRel(dx,dy,dz)`                 | Instantly move tracer (absolute/relative).                                                                   |
| `trace(x,y,z)` / `traceRel(dx,dy,dz)`               | Draw line emitting particles (spacing-dependent, abs./rel.).                                                 |
| `deposit(x,y,z)` / `depositRel(dx,dy,dz)`           | Emit single particle at position (abs./rel.).                                                                |
| `yaw(deg)` / `pitch(deg)` / `roll(deg)`             | Rotate tracer. Yaw: left⇄right (CCW +). Pitch: up⇅down (+ nose-up). Roll: rotate forward axis (+ clockwise). |
| `push()` / `pop()`                                  | Save/restore tracer pose and brush state.                                                                    |
| `size(px)` / `spacing(dist)`                        | Set particle size (px) and spacing for `trace()`.                                                            |
| `residue(seconds)`                                  | Particle lifetime.                                                                                           |
| `fuzz(count,sx,sy,sz)`                              | Extra jittered particles; Gaussian spread (`sx, sy, sz`).                                                    |
| `colorHex(hex)`/`colorRGB(r,g,b)`/`colorHSV(h,s,v)` | Set particle color.                                                                                          |
| `colorViridis(t)` / `colorCubehelix(t,...)`         | Set particle color from special palettes.                                                                    |
| `drawText(...)` / `drawTextRel(...)`                | Emit text glyphs (absolute/relative).                                                                        |

## Core Concepts

### Tracer State and Relative vs Absolute Commands

Laser-Tracer maintains a tracer state consisting of:

- **Position:** A vector indicating current tracer location.
- **Orientation:** A quaternion representing current tracer rotation.

**Absolute Commands** (`move`, `trace`, `deposit`) set tracer state directly to provided coordinates.

**Relative Commands** (`moveRel`, `traceRel`, `depositRel`) perform operations based on current tracer state and update tracer position afterward. Each relative command implicitly modifies tracer position, affecting subsequent relative operations.

Tracer starts at 0,0,0. The camera is initialized looking down the negative Z-axis from 0,0,150.

### Frame Execution

- **Entry Point:** Define a function `program(time)`.
- **Automatic Execution:** Called once per animation frame, with `time` providing the current timestamp in seconds.
- **Persistent State:** Tracer pose (position/orientation) and brush state (color, size, fuzz, spacing, residue) persist automatically between frames.

### Particle Lifetime and Persistence

- **Residue:** Each emitted particle remains visible for its defined lifetime (`residue`). Alpha fades gradually.
- **Continuous Drawing:** To maintain persistent visual lines, re-emit ("refresh") the strokes each frame or at regular intervals shorter than particle lifetimes.

---

## Drawing Primitives

### Movement (No Particle Emission)

- **`move(x, y, z)`**: Instantly move tracer to absolute coordinates.
- **`moveRel(dx, dy, dz)`**: Move tracer relative to current orientation and position.

### Drawing with Movement

- **`trace(x, y, z)`**: Emit particles at evenly spaced intervals (determined by the `spacing()` brush property) from the current position to `(x,y,z)` and update tracer position.
- **`traceRel(dx, dy, dz)`**: Relative version of `trace`, using tracer’s current orientation and position.

### Single Point Drawing

- **`deposit(x, y, z)`**: Emit a particle exactly at `(x,y,z)`, updating tracer position.
- **`depositRel(dx, dy, dz)`**: Relative version of `deposit`; depositRel(0,0,0) emits a particle at the tracer’s current position and updates that position.

---

## Orientation Controls

Tracer orientation is cumulative, affecting subsequent relative movements:

- **`yaw(degrees)`**: Rotate tracer left/right (positive = CCW).
- **`pitch(degrees)`**: Rotate tracer up/down (positive = nose-up).
- **`roll(degrees)`**: Rotate tracer around forward axis (positive = clockwise).

---

## Transformation Stack (push/pop)

Laser-Tracer maintains a transformation stack similar to matrix stacks in traditional graphics:

- **`push()`**: Save current tracer pose (position/orientation) and brush properties.
- **`pop()`**: Restore previously saved pose and brush state.

Use push/pop for hierarchical, recursive, or complex nested transformations.

---

## Brush Parameters

Control visual appearance of emitted particles:

- **`size(px)`**: Particle sprite diameter in pixels.
- **`spacing(dist)`**: Distance between particles emitted by `trace()`. Ignored by `deposit()`.
- **`residue(seconds)`**: Lifetime of particles.
- **`fuzz(count, sx, sy, sz)`**: Emit additional jittered particles around each particle (Gaussian-distributed fuzziness).

### Color Functions

- **`colorHex(hex)`**: Set particle color with RGB hex value (e.g., `0xffaa00`).
- **`colorRGB(r,g,b)`**: Set particle color with RGB values [0–1].
- **`colorHSV(h,s,v)`**: Set particle color using HSV values [0–1].
- **`colorViridis(t)`**: Choose color from the Viridis palette, t ∈ [0–1] maps along the palette.
- **`colorCubehelix(t, start=0.5, rot=-1.5, gamma=1)`**: Cubehelix parametric color scheme.

---

### Text Rendering

- **`drawText(txt, x, y, z, height)`**: Emit glyphs at absolute position.
- **`drawTextRel(txt, dx, dy, dz, height)`**: Emit glyphs at relative position.

Text is drawn using trace commands which are impacted by `spacing` and `fuzz` brush properties.

## Persistent Variables

Variables defined outside the `program(time)` function persist across frames, allowing stateful animations or persistent particle systems.

Example:

```javascript
let angle = 0;
function program(time) {
  angle += 0.01;
  yaw(angle);
  traceRel(0, 0, 10);
}
```

## Performance Recommendations

- **Particle Limit:** Aim for ≤ **500,000 visible particles** for smooth performance on typical GPUs.
- **Spacing:** Recommended ≥ `0.2` world-units. Smaller spacing drastically increases particle count.
- **Residue Guidelines:**
  - Short: `0.2–1s`
  - Medium: `1–3s`
  - Long: `3–10s`
- **Fuzz:** Moderate fuzz (typically `count ≤ 10`). Every deposit (or indirect deposits through trace commands) spawns extra `count` particles, significantly increasing particle counts.

---

## Examples

```javascript
/* ================================================================
WEBBED ORB
================================================================= */

function program(t) {
  const R = 30;
  const arms = 7; // number of spikes
  size(2);
  spacing(15);
  residue(12);
  fuzz(40, 0.2);

  for (let a = 0; a < arms; a++) {
    const angle = (a / arms) * Math.PI * 2 + t * 0.6;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const z = Math.sin(angle * 3 + t) * 30; // wavy height

    // Use viridis color palette instead of fixed color
    // Each arm gets a different position in the spectrum
    // The position shifts over time for animation
    colorViridis((a / arms + t * 0.2) % 1);

    trace(x, y, z);

    /* return to hub so next arm is clean */
    trace(0, 0, 0);
  }
}
```

```javascript
/* ================================================================
   LORENZ FLOW – real‑time stream‑tracer
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
```

```javascript
/* Quasicrystal Field Surface – dense variant (≈7.2 k deposits/frame) */

const GRID = 60,
  STEP = 1,
  KLEN = 0.35;
const AMP_SCALE = 16,
  RESID = 2;
const FUZZ_N = 4,
  FUZZ_R = 0.3;

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
  size(10);
  residue(RESID);
  fuzz(FUZZ_N, FUZZ_R);

  push();
  move(0, 0, 42); // bring field ~108 wu from camera
  const θ = t * 0.4; // temporal phase
  for (const p of OFF) {
    const A = wave5(p.x, p.z, θ);
    colorViridis(Math.abs(A));
    push();
    moveRel(p.x, A * AMP_SCALE, p.z);
    depositRel(0, 0, 0);
    pop();
  }
  pop();
}
```

```javascript
/* ================================================================
   PARAMETRIC CAD-GRID CUBE  ·  canonical example
   ----------------------------------------------------------------
   • Regular minor / major face grid
   • Picture-frame “band” rows around each face
   • Face labels that read correctly from outside
================================================================= */

/* ---------------- configuration knobs ------------------------- */
const CFG = {
  halfExtent: 32, // cube half-size (world units)
  cellsMinor: 16, // # of minor cells along one edge
  majorStep: 4, // every Nth grid line is “major”

  /* palette ----------------------------------------------------- */
  colourMinor: 0x335577,
  colourMajor: 0x50c0ff,
  colourBand: 0xff8844,
  colourEdge: 0xffffff,
  colourLabel: 0xffff66,
};

/* ----------------------------------------------------------------
   ENTRY POINT – called once per animation frame
-----------------------------------------------------------------*/
function program(t) {
  /* global brush ------------------------------ */
  residue(0.45);
  spacing(0.25);
  fuzz(0);

  /* gentle spin so we can read the labels ---- */
  push();
  yaw(t * 12); // deg/s
  pitch(Math.sin(t * 0.4) * 15);

  const L = CFG.halfExtent;
  drawCube(L);
  labelFaces(L);
  pop();
}

/* ----------------------------------------------------------------
   drawCube – grids, and edges (all RELATIVE)
-----------------------------------------------------------------*/
function drawCube(L) {
  drawFaces(L);
  drawEdges(L);
}

/* ----------------------------------------------------------------
   1 · Face grids
-----------------------------------------------------------------*/
function drawFaces(L) {
  /* helpers ----------------------------------------------------- */
  const cell = (2 * L) / CFG.cellsMinor;
  const majorRows = new Set();
  for (let i = 0; i <= CFG.cellsMinor; i += CFG.majorStep) majorRows.add(i);

  const drawGrid = () => {
    /* vertical + horizontal in one pass ------------------------ */
    for (let i = 0; i <= CFG.cellsMinor; i++) {
      const x = -L + i * cell;
      const isMajor = majorRows.has(i);

      setLineStyle(isMajor ? "major" : "minor");

      // vertical
      push();
      moveRel(x, -L, 0);
      traceRel(0, 2 * L, 0);
      pop();

      // horizontal
      push();
      moveRel(-L, x, 0);
      traceRel(2 * L, 0, 0);
      pop();
    }
  };

  /* orientations for the six faces (pitch, yaw, roll) ---------- */
  const faces = [
    [0, 0, 0], // front  (+Z)
    [0, 180, 0], // back   (–Z)
    [0, -90, 0], // left   (–X)
    [0, 90, 0], // right  (+X)
    [90, 0, 180], // top    (+Y)
    [-90, 0, 180], // bottom (–Y)
  ];

  for (const r of faces) {
    push();
    pitch(r[0]);
    yaw(r[1]);
    roll(r[2]);
    moveRel(0, 0, -L); // bring face to origin
    drawGrid();
    pop();
  }
}

/* ----------------------------------------------------------------
   2 · Cube edges  (thicker outline improves visual legibility)
-----------------------------------------------------------------*/
function drawEdges(L) {
  setLineStyle("edge");

  const verts = [
    [L, L, L],
    [L, L, -L],
    [L, -L, -L],
    [L, -L, L], // +X
    [-L, L, L],
    [-L, L, -L],
    [-L, -L, -L],
    [-L, -L, L], // –X
  ];

  /* edge indices in quads of four ------------------------------ */
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0], // +X face perimeter
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4], // –X face perimeter
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7], // connecting edges
  ];

  for (const e of edges) {
    const a = verts[e[0]];
    const b = verts[e[1]];
    push();
    moveRel(a[0], a[1], a[2]);
    traceRel(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    pop();
  }
}

/* ----------------------------------------------------------------
   3 · Face labels
-----------------------------------------------------------------*/
function labelFaces(L) {
  /* label brush */
  size(10);
  spacing(0.15);
  fuzz(0);
  colorHex(CFG.colourLabel);

  const H = 5; // glyph height
  const faces = [
    { rot: [0, 0, 0], txt: "FRONT" }, // +Z
    { rot: [0, 180, 0], txt: "BACK" }, // –Z
    { rot: [0, -90, 0], txt: "LEFT" }, // –X
    { rot: [0, 90, 0], txt: "RIGHT" }, // +X
    { rot: [90, 0, 180], txt: "TOP" }, // +Y
    { rot: [-90, 0, 180], txt: "BOTTOM" }, // –Y
  ];

  for (const f of faces) {
    push();
    pitch(f.rot[0]);
    yaw(f.rot[1]);
    roll(f.rot[2]);
    moveRel(0, 0, -L + 0.3); // slight lift to avoid Z-fighting
    drawTextRel(f.txt, 0, 0, 0, H);
    pop();
  }
}

/* ----------------------------------------------------------------
   setLineStyle – central thickness & colour helper
-----------------------------------------------------------------*/
function setLineStyle(kind) {
  switch (kind) {
    case "minor":
      size(10);
      colorHex(CFG.colourMinor);
      break;
    case "major":
      size(10);
      colorHex(CFG.colourMajor);
      break;
    case "edge":
      size(20);
      colorHex(CFG.colourEdge);
      break;
  }
}
```

```javascript
/* 5-Wave Quasicrystal */

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
```
