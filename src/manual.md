# Laser‑Tracer Technical Manual

## 1 · Overview

Laser‑Tracer is a real‑time, programmable **virtual 3D vector display**. User scripts—executed inside a sandboxed QuickJS runtime—control a _pen_ that emits particles as it moves through space controlled by a Turtle Graphics-style programs, creating time-decaying volumetric light drawings mimicking phosphor vector monitors.

Every animation frame the engine calls your entry function:

```javascript
function program(pen, time) {
  // • pen  ⇢ stateful pen object
  // • time ⇢ seconds since scene start (float)
}
```

---

## 2 · Quick Reference

| Category                 | Method                                                                            | Notes                                                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Transform stack**      | `pen.push()` · `pen.pop()`                                                        | Save / restore pen pose & brush state                                                                                                                       |
| **Orientation**          | `pen.yaw(deg)` · `pen.pitch(deg)` · `pen.roll(deg)`                               | Positive yaw = CCW, positive pitch = nose-up, positive roll = counter-clockwise. Each call **adds** that rotation to the current orientation (incremental). |
| **Motion (no emission)** | `pen.moveTo(x,y,z)`                                                               | Absolute move                                                                                                                                               |
|                          | `pen.moveBy(dx,dy,dz)`                                                            | Relative move in pen’s frame                                                                                                                                |
| **Strokes & dots**       | `pen.traceTo(x,y,z)` · `pen.traceBy(dx,dy,dz)`                                    | Evenly spaced particle line                                                                                                                                 |
|                          | `pen.dot()`                                                                       | Light a single particle at current pen position                                                                                                             |
| **Style attributes**     | `pen.dotSize(px)` · `pen.traceGap(d)` · `pen.residue(sec)`                        | Size, inter‑particle gap, lifetime                                                                                                                          |
|                          | `pen.fuzz(n,sx,sy,sz)`                                                            | Extra jittered particles (Gaussian σ)                                                                                                                       |
|                          | `pen.colorHex(hex)` · `pen.colorRGB(r,g,b)` · `pen.colorHSV(h,s,v)`               | Color setters                                                                                                                                               |
|                          | `pen.colorViridis(t)` · `pen.colorCubehelix(t,start,rot,gamma)`                   | Palette utilities                                                                                                                                           |
| **Macros (local frame)** | `pen.text(str, h)`¹ · `pen.polyline(pts, close)` · `pen.sweep(path, prof, close)` | Built from primitive pen ops                                                                                                                                |
|                          |

---

## 3 · Core Concepts

### 3.1 Pen State

In addition to style attributes (color, fuzz, dotSize, etc.), the **pen** carries two pieces of state representing its local frame as your program runs:

- **Position** `vec3` – current XYZ location.
- **Orientation** `quat` – local axes for _By_ motions (`moveBy`, `traceBy`).

Pen state—including its position, orientation (quaternion), and current style attributes—remains intact from one animation frame to the next.

- **Initial pose** The pen starts at the world origin **(0 , 0 , 0)** with an identity orientation, so its local axes coincide with the global, right-handed basis:

  - **+X** → right
  - **+Y** → up
  - **+Z** → out of the screen, toward the camera

- **Default camera** A `PerspectiveCamera` is created at **(0 , 0 , 150)** and points straight back toward the origin along the –Z axis.

Because the camera moves independently of the pen, altering camera position/direction never alters the underlying world axes; the pen’s +X/+Y/+Z directions stay fixed in space unless your script rotates them.

The `push` and `pop` methods allow you to save and restore the pen's state, enabling you to create nested coordinate systems or make temporary/local changes to style attributes while retaining ability to return to the previous/parent state. Use `push` to save the current pen state and `pop` to restore it.

### 3.2 Drawing with `dots` and `traces`

A central principle in the design of Laser Tracer is that at the end of the day everything you see is made up of executions of the `dot()` command. `pen.dot()` spawns a particle (possibly with a 'fuzz' of other particles around it); `traceTo/By(x,y,z)` causes triggers a number of `dot()` executions along the path defined by the call, with spacing determined by the current `pen.traceGap` style attribute. Macros (e.g. `text` or `polyline`) take this one step further by composing `trace` calls into yet higher-order objects.

### 3.3 Pen Motion and Orientation

- **To methods** (`moveTo`, `traceTo`) act in **world space**. They say: "move from the pen's current position to this coordinate."
- **By methods** (`moveBy`, `traceBy`) act in the **pen’s local frame**. They say: "move from the pen’s current position and orientation by this vector."

* **Rotation**
  Positive angles follow the right-hand rule.

- **Yaw (+Y axis):** clockwise when viewed from above (+Y looking toward –Y).
- **Pitch (+X axis):** nose-up (rotates the local +Z axis toward +Y).
- **Roll (+Z axis):** counter-clockwise when viewed from the camera side (+Z looking toward –Z).

Each rotation call adds its angle to the pen's quaternion without changing position. Subsequent `...By` operations will follow these newly-rotated axes, while `...To` operations continue to use global coordinates. In simpler terms: rotate first, then a `By` movement travels along your rotated direction, while a `To` movement always goes directly to absolute world coordinates regardless of orientation.

### 3.4 Macros — higher-level drawing shortcuts

**Macros** bundle sequences of primitive **pen** commands so you can describe complex geometry with a single call. They always run in the pen’s **local frame**, inheriting the current pose and all style attributes (`dotSize`, `traceGap`, `color`, `fuzz`, `residue`). Each macro performs its work inside an automatic `push()` / `pop()`, so when the call returns the pen’s position, orientation, and style are exactly as they were before.

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

`program(pen, time)` runs **once per rendered frame**. Any variables outside the function keep their values across calls, allowing counters, random seeds, etc. Pen state on the other hand automatically persists across frames thought it's dealt within from within the `program(...)` function; the system holds onto a consistent reference to the pen object as the program runs.

---

## 4 · Pen style attributes

The commands below change how **future** particles are spawned.
Each setter returns the pen so you can chain calls, and the values persist until you override them or restore a snapshot with `push()/pop()`.

### 4.1 Spatial & temporal controls

| Method                      | Units             | Typical range             | What it does                                                                                                                                                                              |
| --------------------------- | ----------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pen.dotSize(px)`           | **screen pixels** | 0.1 – 12                  | Diameter of each particle sprite. Size is _screen-space_ and therefore independent of camera zoom.                                                                                        |
| `pen.traceGap(d)`           | **world units**   | 0.1 – 1 (≤0.2 costs perf) | Minimum distance between consecutive dots laid down by a `trace*` call. Smaller → smoother lines, but more particles.                                                                     |
| `pen.residue(sec)`          | seconds           | 0.1 – 10                  | Lifetime before a particle begins an exponential fade: α(t) = e^(– t / residue).                                                                                                          |
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

## 5 · Performance Guidelines

| Factor            | Tip                                                     |
| ----------------- | ------------------------------------------------------- |
| Visible particles | Stay ≤ **500 k** for 60 fps on mid‑range GPUs           |
| traceGap          | Smaller gaps ←→ more dots; keep ≥ 0.2 unless necessary  |
| fuzz              | Each dot spawns _n_·(1+fuzz) particles – ramp carefully |
| residue           | Short lifetimes reduce accumulated particles            |

---

## 6 · Canvas & camera helpers

These utilities are **global functions**. They act instantly and do **not** affect the pen’s pose or style.

| Function                                    | Signature                                                      | What it does                                                                                                                                                                                                                     |
| ------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setBGColor(hex)`                           | `hex` — 24-bit RGB (`0xRRGGBB`)                                | Sets the WebGL clear-color; affects the whole canvas.                                                                                                                                                                            |
| `setCamera(pos x, y, z, look x, y, z)`      | two `{x,y,z}` points _(look-at defaults to the origin)_        | Moves the perspective camera to `pos` and orients it so it looks at `look`. Also re-centres any attached **OrbitControls** so user drags pivot around the same target.                                                           |
| `orbitCamera(center, radius, azDeg, elDeg)` | `center { x,y,z }`, `radius` _(world units)_, `azDeg`, `elDeg` | Convenience wrapper that positions the camera on a sphere of `radius` around `center`, where **azimuth = 0°** looks along +X and **elevation = 0°** is the horizon. Internally calls `setCamera`, so OrbitControls stay in sync. |

---

## 7 · Examples

### 7.1 Basic comprehensive example

```javascript
/* ================================================================
   Laser-Tracer demo :  "Everything but the kitchen sink"
   ---------------------------------------------------------------
   Highlights
     • Global helpers : setBGColor, orbitCamera
     • Axis gizmo     : pen.moveTo / pen.traceTo / pen.text
     • Style setters  : dotSize, traceGap, fuzz, color*
     • Orientation    : yaw / pitch / roll
     • Macros         : polyline(), sweep(), text()
     • State          : first-frame bootstrap, per-frame counter
================================================================ */

//// ----------  scene constants  ----------
const AXIS_LEN = 25; // length of XYZ axes
const CUBE_SIZE = 8; // half-extent for neon cube
const RING_RADIUS = 18; // torus path
const RING_SEGMENTS = 64; // sides on torus sweep
const RING_PIPE_R = 2.0; // pipe radius (profile size)

//// ----------  geometry helpers  ----------
function cubeEdges(size) {
  const s = size;
  return [
    // bottom
    [
      { x: -s, y: -s, z: -s },
      { x: s, y: -s, z: -s },
      { x: s, y: s, z: -s },
      { x: -s, y: s, z: -s },
    ],
    // top
    [
      { x: -s, y: -s, z: s },
      { x: s, y: -s, z: s },
      { x: s, y: s, z: s },
      { x: -s, y: s, z: s },
    ],
    // verticals
    [
      { x: -s, y: -s, z: -s },
      { x: -s, y: -s, z: s },
    ],
    [
      { x: s, y: -s, z: -s },
      { x: s, y: -s, z: s },
    ],
    [
      { x: s, y: s, z: -s },
      { x: s, y: s, z: s },
    ],
    [
      { x: -s, y: s, z: -s },
      { x: -s, y: s, z: s },
    ],
  ];
}

function circlePoints(r, segments) {
  const pts = [];
  for (let i = 0; i < segments; ++i) {
    const a = (i / segments) * Math.PI * 2;
    pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z: 0 });
  }
  return pts;
}

//// ----------  persistent state  ----------
let firstFrame = true;
let ringPhase = 0; // animated colour offset

//// ----------  main entry  ----------
function program(pen, time) {
  /* ── bootstrap (run once) ─────────────────────────── */
  if (firstFrame) {
    setBGColor(0x000010); // deep navy
    firstFrame = false;
  }

  /* ── animated camera orbit ────────────────────────── */
  orbitCamera({ x: 0, y: 0, z: 0 }, 60, time * 20, 20);

  /* ── world-space XYZ axes ─────────────────────────── */
  pen.dotSize(4).traceGap(0.1).fuzz(0);

  // +X (red)
  pen
    .push()
    .colorRGB(1, 0, 0)
    .moveTo(0, 0, 0)
    .traceTo(AXIS_LEN, 0, 0)
    .moveTo(AXIS_LEN + 0.8, 0, 0)
    .text("X", 2)
    .pop();

  // +Y (green)
  pen
    .push()
    .colorRGB(0, 1, 0)
    .moveTo(0, 0, 0)
    .traceTo(0, AXIS_LEN, 0)
    .moveTo(0, AXIS_LEN + 0.8, 0)
    .text("Y", 2)
    .pop();

  // +Z (blue)
  pen
    .push()
    .colorRGB(0, 0, 1)
    .moveTo(0, 0, 0)
    .traceTo(0, 0, AXIS_LEN)
    .moveTo(0, 0, AXIS_LEN + 0.8)
    .text("Z", 2)
    .pop();

  /* ── spinning neon cube (local frame) ─────────────── */
  pen
    .push()
    .yaw(time * 30)
    .pitch(20)
    .roll(-10);

  const hue = (time * 0.1) % 1;
  pen.colorHSV(hue, 1, 1).dotSize(4).traceGap(0.2).fuzz(4, 0.2);

  for (const edge of cubeEdges(CUBE_SIZE)) {
    pen.polyline(edge, edge.length > 2); // close squares
  }
  pen.pop();

  /* ── glowing torus (“ring”) via sweep() ───────────── */
  // Path: circle in the XZ-plane, centred at origin
  const path = circlePoints(RING_RADIUS, RING_SEGMENTS);

  // Profile: tiny circle lying in the XY-plane
  const prof = circlePoints(RING_PIPE_R, 12);

  ringPhase = (ringPhase + 0.003) % 1; // slow rainbow
  pen
    .colorViridis(ringPhase)
    .dotSize(3)
    .traceGap(0.1)
    .fuzz(2, 0.15)
    .sweep(path, prof, true); // closePath = true
}
```
