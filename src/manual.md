# Laser‑Tracer Technical Manual

## 1 · Overview

Laser‑Tracer is a real‑time, programmable **virtual 3D vector display**. User scripts—executed inside a sandboxed QuickJS runtime—control a _pen_ that emits particles as it moves through space controlled by a Turtle Graphics-style programs, creating time-decaying volumetric light drawings mimicking phosphor vector monitors.

Every animation frame the engine calls your entry function:

```javascript
function program(pen, draw, time) {
  // • pen  ⇢ stateful pen object (local coordinates)
  // • draw ⇢ world space convenience functions
  // • time ⇢ seconds since scene start (float)
}
```

All movement, rotation, color, and emission commands live on the **`pen`** object. The auxiliary **`draw`** helpers offer convenience calls that ignore the pen’s local frame, emitting geometry directly in world space.

---

## 2 · Quick Reference

| Category                 | Method                                                                                  | Notes                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Transform stack**      | `pen.push()` · `pen.pop()`                                                              | Save / restore pen pose & brush state                                                                                                               |
| **Orientation**          | `pen.yaw(deg)` · `pen.pitch(deg)` · `pen.roll(deg)`                                     | Positive yaw = CCW, positive pitch = nose-up, positive roll = clockwise. Each call **adds** that rotation to the current orientation (incremental). |
| **Motion (no emission)** | `pen.moveTo(x,y,z)`                                                                     | Absolute move                                                                                                                                       |
|                          | `pen.moveBy(dx,dy,dz)`                                                                  | Relative move in pen’s frame                                                                                                                        |
| **Strokes & dots**       | `pen.traceTo(x,y,z)` · `pen.traceBy(dx,dy,dz)`                                          | Evenly spaced particle line                                                                                                                         |
|                          | `pen.dot()`                                                                             | Light a single particle at current pen position                                                                                                     |
| **Style attributes**     | `pen.dotSize(px)` · `pen.traceGap(d)` · `pen.residue(sec)`                              | Size, inter‑particle gap, lifetime                                                                                                                  |
|                          | `pen.fuzz(n,sx,sy,sz)`                                                                  | Extra jittered particles (Gaussian σ)                                                                                                               |
|                          | `pen.colorHex(hex)` · `pen.colorRGB(r,g,b)` · `pen.colorHSV(h,s,v)`                     | Colour setters                                                                                                                                      |
|                          | `pen.colorViridis(t)` · `pen.colorCubehelix(t,start,rot,gamma)`                         | Palette utilities                                                                                                                                   |
| **Macros (local frame)** | `pen.text(str, h)`¹ · `pen.polyline(pts, close)` · `pen.sweep(path, prof, close)`       | Built from primitive pen ops                                                                                                                        |
| **Draw helpers (world)** | `draw.dot(p)` · `draw.trace(p0,p1)`                                                     | Stateless; do not affect pen pose                                                                                                                   |
|                          | `draw.text(str, p, h)`¹ · `draw.polyline(pts, close)` · `draw.sweep(path, prof, close)` | Frame‑independent macros                                                                                                                            |

---

## 3 · Core Concepts

### 3.1 Pen State

In addition to style attributes (color, fuzz, dotSize, etc.), the **pen** carries two pieces of state representing its local frame as your program runs:

- **Position** `vec3` – current XYZ location.
- **Orientation** `quat` – local axes for _By_ motions (`moveBy`, `traceBy`).

Pen state persists automatically; you do **not** need to re‑initialise each frame. The default pose is at (0, 0, 0). Local axes align with world axes as follows: **+X right, +Y up, +Z toward the camera**. The viewer starts at (0 0 150) looking down –Z.

The `push` and `pop` methods allow you to save and restore the pen's state, enabling you to create nested coordinate systems or make temporary/local changes to style attributes while retaining ability to return to the previous/parent state. Use `push` to save the current pen state and `pop` to restore it.

### 3.2 Drawing with `dots` and `traces`

A central principle in the design of Laser Tracer is that at the end of the day everything you see is made up of executions of the `dot()` command. `pen.dot()` spawns a particle (possibly with a 'fuzz' of other particles around it); `traceTo/By(x,y,z)` causes triggers a number of `dot()` executions along the path defined by the call, with spacing detemined by the current `pen.traceGap` style attribute. Macros (e.g. `text` or `polyline`) take this one step further by composing `trace` calls into yet higher-order objects.

### 3.3 Absolute vs Relative Motions

- **To methods** (`moveTo`, `traceTo`) act in **world space**. They say: "move from the pen's current position to this coordinate."
- **By methods** (`moveBy`, `traceBy`) act in the **pen’s local frame**. They say: "move from the pen’s current position and orientation by this vector."

### 3.4 The `draw` object

The `draw` object provides mirror methods to the `pen` object but always act fully in world space, ignoring the pen's local frame. However, they are still executed internally through the pen, so its same brush settings (dotSize, color, etc.) are applied.

### 3.5 Macros

_Macros_ are predefined compositions of primitive commands—think higher‑level drawing shortcuts.

| Macro        | Description                                       | Pen variant                   | Draw variant          |
| ------------ | ------------------------------------------------- | ----------------------------- | --------------------- |
| **text**     | Stroke‑rendered glyph string                      | `pen.text()` (frame‑relative) | `draw.text()` (world) |
| **polyline** | Connect point list with traced segments           | `pen.polyline()`              | `draw.polyline()`     |
| **sweep**    | Extrude polyline along a path to create a surface | `pen.sweep()`                 | `draw.sweep()`        |

Calling a macro through **`pen`** means your operating from the pen's local frame—same as always. Macros are just pre-packed sequences of pen commands. Using macros defined on `draw` carry the same distinction always present between `pen` and `draw`: draw operations are fully in world space/absolute coords. When you draw with macros pen style attributes like `traceGap`, `dotSize`, `fuzz` are applied as usual.

### 3.6 Frame Execution & Persistence

`program(pen, draw, time)` runs **once per rendered frame**. Any variables outside the function keep their values across calls, allowing counters, random seeds, etc.

---

## 4 · Pen style attributes

| Setter           | Typical Range | Effect                                                                                                                          |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **dotSize(px)**  | 0.1 – 12      | Emmitted diameter on screen                                                                                                     |
| **traceGap(d)**  | ≥ 0.1 - 1     | Distance between successive dots emitted by trace operations                                                                    |
| **residue(sec)** | 0.1 – 10      | Particle lifetime before fade‑out                                                                                               |
| **fuzz(n,σ)**    | n ≤ 10        | For each dot, spawn n additional dots sampled from a 3-D Gaussian with standard deviations (sx, sy, sz) around the original dot |

_Color setters_ accept either hex, normalized RGB, normalized HSV, or palette parameters.

---

## 5 · Performance Guidelines

| Factor            | Tip                                                     |
| ----------------- | ------------------------------------------------------- |
| Visible particles | Stay ≤ **500 k** for 60 fps on mid‑range GPUs           |
| traceGap          | Smaller gaps ←→ more dots; keep ≥ 0.2 unless necessary  |
| fuzz              | Each dot spawns _n_·(1+fuzz) particles – ramp carefully |
| residue           | Short lifetimes reduce accumulated particles            |

---

## 6 · Canvas/camera settings

`setBGColor(hex)` – set background color.
`setCamera(position: {x, y, z}, lookAt: {x, y, z})` – set camera position and look-at point.

---

## 7 · Examples

### 7.1 Basic example

```javascript
// Laser‑Tracer demo – WEBBED ORB
let spin = 0;

function program(pen, draw, t) {
  const R = 30;
  const arms = 7;

  pen.dotSize(2).traceGap(15).residue(12).fuzz(40, 0.2);

  spin += 0.6 * (1 / 60); // manual Δt ~ 1/60s

  for (let a = 0; a < arms; a++) {
    const ang = (a / arms) * Math.PI * 2 + spin;
    const x = R * Math.cos(ang);
    const y = R * Math.sin(ang);
    const z = Math.sin(ang * 3 + t) * 30;

    pen.colorViridis((a / arms + t * 0.2) % 1);

    pen.moveTo(0, 0, 0).traceTo(x, y, z).traceTo(0, 0, 0); // return to hub
  }
}
```

### 7.2 Macro demonstrations

```javascript
/* ================================================================
   MACRO PLAYGROUND
   – Demonstrates text, polyline, and sweep macros
     • draw.*  → frame-independent world geometry
     • pen.*   → follows the pen’s pose each frame
================================================================= */

/* ---------- static data (outside program) ---------------------- */
const frame = [
  // square wire-frame
  { x: -60, y: -60, z: 0 },
  { x: 60, y: -60, z: 0 },
  { x: 60, y: 60, z: 0 },
  { x: -60, y: 60, z: 0 },
];
const labelPos = { x: 0, y: 55, z: 0 }; // above the frame

// helper to build a circle path for sweep
function circlePath(R, segs = 24) {
  const pts = [];
  for (let i = 0; i < segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    pts.push({ x: R * Math.cos(a), y: 0, z: R * Math.sin(a) });
  }
  return pts;
}
const ringPath = circlePath(30); // 30-unit radius ring
const squareProfile = [
  // tiny square profile
  { x: -2, y: -2, z: 0 },
  { x: 2, y: -2, z: 0 },
  { x: 2, y: 2, z: 0 },
  { x: -2, y: 2, z: 0 },
];

/* ---------- animated state ------------------------------------- */
let spin = 0;

/* ============================================================= */
function program(pen, draw, t) {
  /* global style */
  pen.dotSize(2).traceGap(1).residue(12);

  /* 1 · draw.* macros – static world geometry ------------------ */
  draw.polyline(frame, true); // grey frame
  draw.text("MACRO DEMO", labelPos, 5); // header text

  // build the ring tube only once (t ≈ 0 on first frame)
  if (t < 0.05) draw.sweep(ringPath, squareProfile, true);

  /* 2 · pen.* macros – follow the pen’s orientation ------------ */
  spin += 0.025; // radians per frame
  pen
    .push()
    .moveTo(0, 0, 0)
    .yaw((spin * 180) / Math.PI) // convert to degrees
    .colorViridis((t * 0.15) % 1);

  // rotating triangle with pen.polyline
  pen.polyline(
    [
      { x: 0, y: 0, z: 0 },
      { x: 20, y: 0, z: 0 },
      { x: 10, y: 17.3, z: 0 },
    ],
    true,
  );

  // label that spins with the triangle
  pen.traceGap(0.25).text("spin!", 4);

  pen.pop();
}
```

### 7.3 Persistent custom state

```javascript
/* ================================================================
   LORENZ FLOW – real-time stream-tracer demo (centered version)
   — updated for program(pen, draw, time) API
================================================================= */

/* ---------- FIELD PARAMETERS ---------------------------------- */
const sigma = 5;
const rho = 42;
const beta = 9 / 3;

/* Offset that puts the attractor midpoint at the origin */
const CENTER_Z = rho - 1; // 41 for rho = 42
const CENTER = { x: 0, y: 0, z: CENTER_Z };

/* ---------- INTEGRATOR SETTINGS ------------------------------- */
const N_PARTICLES = 256;
const DT = 0.004;
const SEED_RADIUS = 1.0;

/* ---------- BRUSH --------------------------------------------- */
const PX_SIZE = 3;
const RESIDUE = 18;
const FUZZ_N = 6;
const FUZZ_SIG = 0.2;

/* ---------- PERSISTENT STATE ---------------------------------- */
const pts = []; // particle positions
for (let i = 0; i < N_PARTICLES; i++) {
  // random seed inside a small sphere
  const r = Math.random() * SEED_RADIUS;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  pts.push({
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.sin(phi) * Math.sin(theta),
    z: r * Math.cos(phi),
  });
}

/* ---------- Lorenz integrator step ---------------------------- */
function lorenzStep(p, dt) {
  const dx = sigma * (p.y - p.x);
  const dy = p.x * (rho - p.z) - p.y;
  const dz = p.x * p.y - beta * p.z;
  return { x: p.x + dx * dt, y: p.y + dy * dt, z: p.z + dz * dt };
}

/* ============================================================= */
function program(pen, draw, t) {
  /* configure brush once per frame (all calls chain) */
  pen.dotSize(PX_SIZE).residue(RESIDUE).fuzz(FUZZ_N, FUZZ_SIG);

  const tMs = t * 1000;

  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = lorenzStep(p0, DT);
    pts[i] = p1; // persist new position

    /* local stretching magnitude → colour γ  ------------------- */
    const dx = sigma * (p1.y - p1.x);
    const dy = p1.x * (rho - p1.z) - p1.y;
    const dz = p1.x * p1.y - beta * p1.z;
    const stretch = Math.hypot(dx, dy, dz);
    const sNorm = Math.min(1, stretch / 50);
    const gamma = 0.5 + 0.5 * sNorm; // 0.5‥1

    const phase = (i / N_PARTICLES + tMs * 0.00005) % 1;
    pen.colorCubehelix(phase, 0.5, -1.5, gamma);

    /* render points, shifted so attractor is centred at origin */
    draw.dot({ x: p0.x - CENTER.x, y: p0.y - CENTER.y, z: p0.z - CENTER.z });
    draw.dot({ x: p1.x - CENTER.x, y: p1.y - CENTER.y, z: p1.z - CENTER.z });
  }
}
```

### 7.3 Camera control example

```javascript
/* Endless Warp-tunnel */

/* ----- Tunables ------------------------------------------------- */
const SEGMENTS = 64; // dots per ring
const GAP = 8; // spacing between rings
const VIS_RINGS = 60; // rings kept visible at any time
const R0 = 30; // base radius
const PULSE_AMP = 6;
const PULSE_HZ = 0.6;

/* ----- Helper: point on ring ----------------------------------- */
function ringPoint(i, segs, r, z) {
  const a = (i / segs) * Math.PI * 2;
  return { x: r * Math.cos(a), y: r * Math.sin(a), z };
}

function program(pen, draw, time) {
  /* 1 · Camera ride -------------------------------------------- */
  const SPEED = 25; // forward units · s⁻¹
  const camZ = -time * SPEED;
  const camX = Math.sin(time * 0.7) * 15;
  const camY = Math.sin(time * 0.35) * 4;

  setCamera({ x: camX, y: camY, z: camZ }, { x: 0, y: 0, z: camZ - 50 });

  setBGColor(0x000010);
  pen.dotSize(2).traceGap(1).residue(8).fuzz(3, 0.5);

  /* 2 · Determine which ring index is at camera’s nose ---------- */
  // Global ring index grows with distance travelled
  const baseIndex = Math.floor(-camZ / GAP);

  /* 3 · Draw visible slice of tunnel ---------------------------- */
  for (let k = 0; k < VIS_RINGS; k++) {
    const ringIdx = baseIndex + k; // unique, ever-increasing
    const z = -(ringIdx * GAP); // world-space Z

    /* Breathing radius gives motion even on static geometry */
    const pulse = Math.sin((time * PULSE_HZ - ringIdx * 0.15) * Math.PI * 2);
    const r = R0 + pulse * PULSE_AMP;

    pen.colorViridis((ringIdx * 0.02 + time * 0.1) % 1);

    for (let i = 0; i < SEGMENTS; i++) {
      const p = ringPoint(i, SEGMENTS, r, z);
      draw.dot(p);
    }
  }

  /* 4 · Occasional flash sprite -------------------------------- */
  if (Math.floor(time * 3) % 10 === 0) {
    pen.colorHSV(0, 0, 1).dotSize(6).residue(0.4).fuzz(0);
    draw.dot({ x: camX, y: camY, z: camZ - 20 });
  }
}
```
