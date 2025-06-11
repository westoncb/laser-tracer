# Laser-Tracer Technical Manual

## 1 · Overview

Laser-Tracer is a real-time, programmable **virtual 3D vector display**. User scripts—executed inside a sandboxed QuickJS runtime—control a `pen` that emits particles as it moves through space, creating time-decaying volumetric light drawings that mimic phosphor vector monitors.

Every animation frame, the engine calls your entry function:

```javascript
function program(pen, scene, time) {
  // • pen   ⇢ stateful pen object for all drawing
  // • scene ⇢ helpers for camera and background color
  // • time  ⇢ seconds since scene start (float)
}
```

---

## 2 · Quick Reference

| Category                 | Method                                                                           | Notes                                                                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Transform stack**      | `pen.push()` · `pen.pop()`                                                       | Save / restore pen pose & brush state                                                                                                                       |
| **Orientation**          | `pen.yaw(deg)` · `pen.pitch(deg)` · `pen.roll(deg)`                              | Positive yaw = CCW, positive pitch = nose-up, positive roll = counter-clockwise. Each call **adds** that rotation to the current orientation (incremental). |
| **Motion (no emission)** | `pen.moveTo(x,y,z)`                                                              | Absolute move                                                                                                                                               |
|                          | `pen.moveBy(dx,dy,dz)`                                                           | Relative move in pen’s frame                                                                                                                                |
| **Strokes & dots**       | `pen.traceTo(x,y,z)` · `pen.traceBy(dx,dy,dz)`                                   | Evenly spaced particle line                                                                                                                                 |
|                          | `pen.dot()`                                                                      | Light a single particle at current pen position                                                                                                             |
| **Style attributes**     | `pen.dotSize(px)` · `pen.traceGap(d)` · `pen.residue(sec)`                       | Size, inter-particle gap, lifetime                                                                                                                          |
|                          | `pen.fuzz(n,sx,sy,sz)`                                                           | Extra jittered particles (Gaussian σ)                                                                                                                       |
|                          | `pen.colorHex(hex)` · `pen.colorRGB(r,g,b)` · `pen.colorHSV(h,s,v)`              | Color setters                                                                                                                                               |
|                          | `pen.colorViridis(t)` · `pen.colorCubehelix(t,start,rot,gamma)`                  | Palette utilities                                                                                                                                           |
| **Macros (local frame)** | `pen.text(str, h)` · `pen.polyline(pts, close)` · `pen.sweep(path, prof, close)` | Built from primitive pen ops                                                                                                                                |
| **Scene Helpers**        | `scene.setBGColor(hex)` · `scene.setCamera(...)` · `scene.orbitCamera(...)`      | See Section 6 for details                                                                                                                                   |

---

## 3 · Core Concepts

### 3.1 Pen State

In addition to style attributes (color, fuzz, dotSize, etc.), the **pen** carries two pieces of state representing its local frame as your program runs:

- **Position** `vec3` – current XYZ location.
- **Orientation** `quat` – local axes for _By_ motions (`moveBy`, `traceBy`).

Pen state—including its position, orientation (quaternion), and current style attributes—remains intact from one animation frame to the next.

- **Initial pose** The pen starts at the world origin **(0 , 0 , 0)** with an identity orientation, so its local axes coincide with the global, right-handed basis:

  - **+X** → right
  - **+Y** → up
  - **+Z** → out of the screen, toward the camera

- **Default camera** A `PerspectiveCamera` is created at **(0 , 0 , 150)** and points straight back toward the origin along the –Z axis.

Because the camera moves independently of the pen, altering camera position/direction never alters the underlying world axes; the pen’s +X/+Y/+Z directions stay fixed in space unless your script rotates them.

The `push` and `pop` methods allow you to save and restore the pen's state, enabling you to create nested coordinate systems or make temporary/local changes to style attributes while retaining ability to return to the previous/parent state. Use `push` to save the current pen state and `pop` to restore it.

### 3.2 Drawing with `dots` and `traces`

A central principle in the design of Laser Tracer is that at the end of the day everything you see is made up of executions of the `dot()` command. `pen.dot()` spawns a particle (possibly with a 'fuzz' of other particles around it); `traceTo/By(x,y,z)` causes a number of `dot()` executions along the path defined by the call, with spacing determined by the current `pen.traceGap` style attribute. Macros (e.g. `text` or `polyline`) take this one step further by composing `trace` calls into yet higher-order objects.

**Guideline for values** Almost always want dotSize >= 2; for solid lines, probably want a traceGap <= .2

### 3.3 Pen Motion and Orientation

- **To methods** (`moveTo`, `traceTo`) act in **world space**. They say: "move from the pen's current position to this coordinate."
- **By methods** (`moveBy`, `traceBy`) act in the **pen’s local frame**. They say: "move from the pen’s current position and orientation by this vector."

- **Rotation**
  Positive angles follow the right-hand rule.

  - **Yaw (+Y axis):** clockwise when viewed from above (+Y looking toward –Y).
  - **Pitch (+X axis):** nose-up (rotates the local +Z axis toward +Y).
  - **Roll (+Z axis):** counter-clockwise when viewed from +Y looking toward –Y (top-down).

Each rotation call adds its angle to the pen's quaternion without changing position; we apply rotations in intrinsic yaw→pitch→roll order, all in pen-local space. Subsequent `...By` operations will follow these newly-rotated axes, while `...To` operations continue to use global coordinates. In simpler terms: rotate first, then a `By` movement travels along your rotated direction, while a `To` movement always goes directly to absolute world coordinates regardless of orientation.

### 3.4 Macros — higher-level drawing shortcuts

**Macros** bundle sequences of primitive **pen** commands so you can describe complex geometry with a single call. They always run in the pen’s **local frame**, inheriting the current pose and all style attributes (`dotSize`, `traceGap`, `color`, `fuzz`, `residue`). Each macro performs its work inside an automatic `push()` / `pop()`, so when the call returns the pen’s position, orientation, and style are exactly as they were before; their side effects are entirely visual.

---

| Macro        | Call signature                                    | What it does                                                                                                                                                                                                           |
| ------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **text**     | `pen.text(str, height = 4)`                       | Stroke-renders `str` using a single-line, all-caps vector font (ASCII 32-126). Cap-height is `height` world units; glyphs are drawn in the XY plane and advance along +X.                                              |
| **polyline** | `pen.polyline(points[], close = false)`           | Connects a list of `{ x,y,z }` vertices with straight traced segments. If `close` is **true** it automatically adds a final edge from last to first.                                                                   |
| **sweep**    | `pen.sweep(path[], profile[], closePath = false)` | Extrudes a 2-D `profile` polyline along the 3-D `path`, emitting a set of profile "slices" oriented by local Frenet yaw/pitch. Set `closePath` to join the last slice back to the first (useful for torus-like loops). |

**Parameter conventions**

- `points[]`, `path[]`, `profile[]` are plain arrays of `{ x,y,z }` objects (not THREE.Vector3).
- Heights and distances are **world units**.
- All macros return the pen object, so they chain like the primitive commands.

Example:

```javascript
pen
  .push()
  .yaw(45)
  .polyline(
    [
      { x: 0, y: 0, z: 0 },
      { x: 5, y: 0, z: 0 },
      { x: 5, y: 5, z: 0 },
    ],
    true,
  )
  .pop();
```

draws a rotated triangle without disturbing the pen’s outer pose or style.

### 3.5 Frame Execution & Persistence

`program(pen, scene, time)` runs **once per rendered frame**. Any variables outside the function keep their values across calls, allowing counters, random seeds, etc. The pen's state also automatically persists across frames.

---

## 4 · Pen style attributes

The commands below change how **future** particles are spawned.
Each setter returns the pen so you can chain calls, and the values persist until you override them or restore a snapshot with `push()/pop()`.

### 4.1 Spatial & temporal controls

| Method                      | Units             | Typical range             | What it does                                                                                                                                                                              |
| --------------------------- | ----------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pen.dotSize(px)`           | **screen pixels** | 0.1 – 12                  | Diameter of each particle sprite. Size is _screen-space_ and therefore independent of camera zoom.                                                                                        |
| `pen.traceGap(d)`           | **world units**   | 0.1 – 1 (≤0.2 costs perf) | Minimum distance between consecutive dots laid down by a `trace*` call. Smaller → smoother lines, but more particles.                                                                     |
| `pen.residue(sec)`          | seconds           | 0.1 – 10                  | Lifetime before a particle begins an exponential fade.                                                                                                                                    |
| `pen.fuzz(n, sx[, sy, sz])` | world units       | n ≤ 10, σ ≈ 0 – 5         | For every “base” dot the engine spawns **n** extra dots whose offsets are drawn from **N(0, diag(σx², σy², σz²))**. If you provide only `sx`, it is reused for all axes (`sy = sz = sx`). |

---

### 4.2 Color setters

All color calls target the same brush property—whichever you call last wins.

| Method                                                      | Signature (all arguments normalised to 0–1 unless noted) | Description                                                                  |
| ----------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `pen.colorHex(hex)`                                         | `hex` ∈ `0x000000` … `0xFFFFFF`                          | Set raw 24-bit RGB.                                                          |
| `pen.colorRGB(r, g, b)`                                     | `r,g,b`                                                  | Linear RGB triplet.                                                          |
| `pen.colorHSV(h, s, v)`                                     | `h,s,v`                                                  | Hue-saturation-value.                                                        |
| `pen.colorViridis(t)`                                       | `t`                                                      | Maps _t_ through the 256-sample Viridis perceptual palette.                  |
| `pen.colorCubehelix(t, start = 0.5, rot = –1.5, gamma = 1)` | see above                                                | Parametric Cubehelix palette; lets you sweep through color-blind-safe ramps. |

---

## 5 · Performance Guidelines

| Factor            | Tip                                              |
| ----------------- | ------------------------------------------------ |
| Visible particles | Stay ≤ **500 k** for 60 fps on mid-range GPUs    |
| traceGap          | Smaller gaps ←→ more dots                        |
| fuzz              | Each dot spawns _1+n_ particles – ramp carefully |
| residue           | Short lifetimes reduce accumulated particles     |

---

## 6 · The `scene` Object

The `scene` object is the second argument passed to your `program` function. It provides helpers for controlling global aspects of the scene, such as the camera and background. These utilities act instantly and do **not** affect the pen’s pose or style.

| Function                     | Signature                                    | What it does                                                                                                                                                           |
| ---------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scene.setBGColor(hex)`      | `hex` — 24-bit RGB (`0xRRGGBB`)              | Sets the WebGL clear-color; affects the whole canvas.                                                                                                                  |
| `scene.setCamera(pos, look)` | `pos`, `look` — two `{x,y,z}` points         | Moves the perspective camera to `pos` and orients it so it looks at `look`. Also re-centres any attached **OrbitControls** so user drags pivot around the same target. |
| `scene.orbitCamera(...)`     | `center {x,y,z}`, `radius`, `azDeg`, `elDeg` | Convenience wrapper that positions the camera on a sphere of `radius` around `center`, where **azimuth = 0°** looks along +X and **elevation = 0°** is the horizon.    |

## 7 · Examples

### 7.1 A First Laser-Tracer program: Hello Lasers

```javascript
const triWorld = [
  { x: -4, y: -2, z: 0 },
  { x: 4, y: -2, z: 0 },
  { x: 0, y: 4, z: 0 },
];

const styles = {
  triangle: {
    color: 0xaa88ff,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: [0, 0.1],
    residue: 6,
  },
  mainBeam: {
    color: 0xaa88ff,
    dotSize: 5,
    fuzz: [6, 0.1],
    residue: 1,
  },
  sideBeam: {
    dotSize: 2,
    fuzz: [6, 0.05],
    residue: 1,
  },
  text: {
    color: 0xcc0020,
    dotSize: 7,
    traceGap: 0.05,
    fuzz: [3, 0.05],
    residue: 0.08,
  },
};

function applyStyle(pen, style) {
  pen
    .colorHex(style.color || 0xffffff)
    .dotSize(style.dotSize || 3)
    .traceGap(style.traceGap || 0.1)
    .residue(style.residue || 1);

  if (style.fuzz) {
    pen.fuzz(style.fuzz[0], style.fuzz[1]);
  }

  return pen;
}

function program(pen, scene, time) {
  scene.setCamera({ x: 4, y: 3, z: 25 }, { x: 4, y: -1, z: 0 });

  // Define beam colors and positions
  const beams = [
    { color: 0xaa88ff, pos: [0, -2, 0], name: "main" },
    { color: 0xff44aa, pos: [0, -2, 2], name: "front" },
    { color: 0x00ffff, pos: [0, -2, -2], name: "back" },
    { color: 0xffff00, pos: [-2, -2, 0], name: "left" },
    { color: 0x00ff00, pos: [2, -2, 0], name: "right" },
  ];

  // Master transform group for everything
  pen
    .push()
    .traceGap(0.1)
    .moveTo(4, 2, 0)
    .yaw(time * 100); // spin 100°/s - affects everything inside

  // Draw the solid triangle
  applyStyle(pen.push(), styles.triangle).polyline(triWorld, true).pop();

  // Draw the fuzzy triangle
  applyStyle(pen.push(), styles.triangle)
    .fuzz(5, 4)
    .polyline(triWorld, true)
    .pop();

  // Draw all beams
  beams.forEach((beam) => {
    const style = beam.name === "main" ? styles.mainBeam : styles.sideBeam;
    applyStyle(pen.push(), style)
      .colorHex(beam.color)
      .moveBy(...beam.pos)
      .traceTo(4, 6, 0)
      .pop();
  });

  // Text element
  applyStyle(pen, styles.text)
    .moveBy(0, -4, 0)
    .yaw(time * -100) // Counter-rotate
    .text("hello lasers", 1);

  pen.pop(); // End of the master transform group
}
```

### 7.2 Composite 3D Oboject

```javascript
/* -----------------------------------------------------------------
   Compact Turbine
   Housing, hub & shaft share the Z axis.
   Blade disc sits at the front face of the hub and rotates
   around Z via pen.roll().
------------------------------------------------------------------ */

//// ── tweakables ────────────────────────────────────────────────
const HUB_R = 8,
  HUB_H = 8,
  SEG = 24;
const SHAFT_R = 2,
  SHAFT_L = 18;
const BLADE_N = 9,
  BLADE_L = 10,
  BLADE_W = 3;
const HOUSING = { z0: -12, z1: 12, r0: 12, rMid: 14, r1: 10 };

//// ── simple material helper ───────────────────────────────────
const Ti = { r: 0, g: 0.9, b: 0.4, size: 4, gap: 0.12 };
const Fe = { r: 0.9, g: 0.6, b: 0.1, size: 4, gap: 0.15 };
function mat(p, m) {
  return p
    .colorRGB(m.r, m.g, m.b)
    .dotSize(m.size)
    .traceGap(m.gap)
    .fuzz(2, 0.1)
    .residue(0.8);
}

//// ── geometry builders ────────────────────────────────────────
function hub(p) {
  p.push();
  mat(p, Ti);
  for (const z of [-HUB_H / 2, HUB_H / 2]) {
    const ring = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * 2 * Math.PI;
      ring.push({ x: Math.cos(a) * HUB_R, y: Math.sin(a) * HUB_R, z });
    }
    p.polyline(ring, true);
  }
  for (let i = 0; i < SEG; i += 3) {
    const a = (i / SEG) * 2 * Math.PI,
      x = Math.cos(a) * HUB_R,
      y = Math.sin(a) * HUB_R;
    p.polyline(
      [
        { x, y, z: -HUB_H / 2 },
        { x, y, z: HUB_H / 2 },
      ],
      false,
    );
  }
  p.pop();
}

function shaft(p) {
  p.push();
  mat(p, Fe);
  for (const z of [-SHAFT_L / 2, SHAFT_L / 2]) {
    const ring = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * 2 * Math.PI;
      ring.push({ x: Math.cos(a) * SHAFT_R, y: Math.sin(a) * SHAFT_R, z });
    }
    p.polyline(ring, true);
  }
  for (let i = 0; i < SEG; i += 4) {
    const a = (i / SEG) * 2 * Math.PI,
      x = Math.cos(a) * SHAFT_R,
      y = Math.sin(a) * SHAFT_R;
    p.polyline(
      [
        { x, y, z: -SHAFT_L / 2 },
        { x, y, z: SHAFT_L / 2 },
      ],
      false,
    );
  }
  p.pop();
}

function blade(p) {
  p.push();
  mat(p, Ti);
  const pts = [],
    N = 12,
    ROOT = HUB_R + 1; // clear the hub wall
  for (let i = 0; i <= N; i++) {
    // upper surface
    const t = i / N;
    pts.push({
      x: ROOT + t * BLADE_L,
      y: Math.sin(t * Math.PI) * BLADE_W,
      z: 0,
    });
  }
  for (let i = N; i >= 0; i--) {
    // lower surface
    const t = i / N;
    pts.push({
      x: ROOT + t * BLADE_L,
      y: -Math.sin(t * Math.PI) * BLADE_W * 0.7,
      z: 0,
    });
  }
  p.polyline(pts, true);
  p.pop();
}

function housing(p) {
  p.push();
  mat(p, Fe);
  const rings = [];
  for (let i = 0; i <= 5; i++) {
    const t = i / 5,
      z = HOUSING.z0 + t * (HOUSING.z1 - HOUSING.z0);
    const r =
      t < 0.5 // bulge interpolation
        ? HOUSING.r0 * (1 - 2 * t) + HOUSING.rMid * (2 * t)
        : HOUSING.rMid * (1 - 2 * (t - 0.5)) + HOUSING.r1 * (2 * (t - 0.5));
    const pts = [];
    for (let j = 0; j <= SEG; j++) {
      const a = (j / SEG) * 2 * Math.PI;
      pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z });
    }
    p.polyline(pts, true);
    rings.push(pts);
  }
  for (let i = 0; i < SEG; i += 3) {
    // longitudinal seams
    p.polyline(
      rings.map((r) => r[i]),
      false,
    );
  }
  p.pop();
}

//// ── ground grid (optional) ───────────────────────────────────
function grid(p) {
  p.push();
  p.colorRGB(0, 0.4, 0.2).dotSize(1.5).traceGap(0.5).fuzz(0).residue(0.5);
  const G = 40,
    S = 5;
  for (let x = -G; x <= G; x += S)
    p.polyline(
      [
        { x, y: -25, z: -G },
        { x, y: -25, z: G },
      ],
      false,
    );
  for (let z = -G; z <= G; z += S)
    p.polyline(
      [
        { x: -G, y: -25, z },
        { x: G, y: -25, z },
      ],
      false,
    );
  p.pop();
}

//// ── main loop ────────────────────────────────────────────────
let first = true;
function program(pen, scene, time) {
  if (first) {
    scene.setBGColor(0x000010);
    first = false;
  }
  scene.orbitCamera({ x: 0, y: 0, z: 0 }, 60, time * 15, 25); // nice arc-orbit
  grid(pen);

  pen.push();
  pen.roll(time * 30); // spin whole rotor

  // station positions along Z axis
  const bladeZ = HOUSING.z0 + 1; // just inside front
  const hubZ = bladeZ + HUB_H / 2;
  const shaftZ = 0; // spans whole

  // shaft (centered)
  shaft(pen);

  // hub (shifted)
  pen.push();
  pen.moveBy(0, 0, hubZ);
  hub(pen);
  pen.pop();

  // blades disc at bladeZ, spinning in local roll
  pen.push();
  pen.moveBy(0, 0, bladeZ);
  for (let i = 0; i < BLADE_N; i++) {
    pen.push();
    pen.roll((i / BLADE_N) * 360);
    blade(pen);
    pen.pop();
  }
  pen.pop();

  // housing shell (static, encompasses everything)
  housing(pen);

  pen.pop();
}
```
