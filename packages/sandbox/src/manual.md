# Laser‑Tracer Technical Manual

## 1 · Overview

Laser‑Tracer is a real‑time, programmable **virtual 3‑D vector display**. User scripts—executed inside a sandboxed QuickJS runtime—control a *pen* that emits particles as it moves through space, driven by Turtle‑Graphics‑style **programs**, to create time‑decaying volumetric light drawings that mimic phosphor vector monitors.

Every animation frame the engine calls your entry function:

```javascript
function program(pen, time) {
  // • pen  ⇢ stateful pen object
  // • time ⇢ seconds since scene start (float)
}
```

---

## 2 · Quick Reference

| Category                 | Method                                                                            | Notes                                                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Transform stack**      | `pen.push()` · `pen.pop()`                                                        | Save / restore pen pose & brush state                                                                                                                       |
| **Orientation**          | `pen.yaw(deg)` · `pen.pitch(deg)` · `pen.roll(deg)`                               | Positive yaw = CCW, positive pitch = nose‑up, positive roll = counter‑clockwise. Each call **adds** that rotation to the current orientation (incremental). |
| **Motion (no emission)** | `pen.moveTo(x,y,z)`                                                               | Absolute move                                                                                                                                               |
|                          | `pen.moveBy(dx,dy,dz)`                                                            | Relative move in the pen’s local frame                                                                                                                      |
| **Strokes & dots**       | `pen.traceTo(x,y,z)` · `pen.traceBy(dx,dy,dz)`                                    | Evenly spaced particle line                                                                                                                                 |
|                          | `pen.dot()`                                                                       | Light a single particle at current pen position                                                                                                             |
| **Style attributes**     | `pen.dotSize(px)` · `pen.traceGap(d)` · `pen.residue(sec)`                        | Size, inter‑particle gap, lifetime                                                                                                                          |
|                          | `pen.fuzz(n,sx,sy,sz)`                                                            | Extra jittered particles (Gaussian σ)                                                                                                                       |
|                          | `pen.colorHex(hex)` · `pen.colorRGB(r,g,b)` · `pen.colorHSV(h,s,v)`               | Color setters                                                                                                                                               |
|                          | `pen.colorViridis(t)` · `pen.colorCubehelix(t,start,rot,gamma)`                   | Palette utilities                                                                                                                                           |
| **Macros (local frame)** | `pen.text(str, h)`¹ · `pen.polyline(pts, close)` · `pen.sweep(path, prof, close)` | Built from primitive pen ops                                                                                                                                |

¹ Currently supports ASCII code points 32–126 only.

---

## 3 · Core Concepts

### 3.1 Pen State

In addition to style attributes (color, fuzz, dotSize, etc.), the **pen** carries two pieces of state representing its local frame as your program runs:

* **Position** `vec3` – current XYZ location.
* **Orientation** `quat` – local axes for *By* motions (`moveBy`, `traceBy`).

Pen state—including its position, orientation (quaternion), and current style attributes—remains intact from one animation frame to the next.

* **Initial pose** The pen starts at the world origin **(0 , 0 , 0)** with an identity orientation, so its local axes coincide with the global, right‑handed basis:

  * **+X** → right
  * **+Y** → up
  * **+Z** → out of the screen, toward the camera

* **Default camera** A `PerspectiveCamera` is created at **(0 , 0 , 150)** and points straight back toward the origin along the –Z axis.

Because the camera moves independently of the pen, altering camera position/direction never alters the underlying world axes; the pen’s +X/+Y/+Z directions stay fixed in space unless your script rotates them.

The `push` and `pop` methods allow you to save and restore the pen's state, enabling you to create nested coordinate systems or make temporary/local changes to style attributes while retaining the ability to return to the previous/parent state. Use `push` to save the current pen state and `pop` to restore it.

### 3.2 Drawing with `dots` and `traces`

A central principle in the design of **Laser‑Tracer** is that everything you see ultimately comes from executions of the `dot()` command. `pen.dot()` spawns a particle (optionally accompanied by a 'fuzz' of additional particles); `traceTo/By(x,y,z)` triggers a series of `dot()` executions along the requested path, with spacing determined by the current `pen.traceGap` style attribute. Macros (e.g. `text` or `polyline`) take this one step further by composing `trace` calls into higher‑order shapes.

### 3.3 Pen Motion and Orientation

* **To methods** (`moveTo`, `traceTo`) act in **world space**—“go to this absolute coordinate.”
* **By methods** (`moveBy`, `traceBy`) act in the **pen’s local frame**—“move by this vector, interpreted in my current orientation.”

- **Rotation**   (Positive angles follow the right‑hand rule.)

  * **Yaw (+Y axis):** clockwise when viewed from above (top‑down, looking toward –Y).
  * **Pitch (+X axis):** nose‑up (rotates the local +Z axis toward +Y).
  * **Roll (+Z axis):** counter‑clockwise when viewed top‑down.

Each rotation call adds its angle to the pen's quaternion without changing position; rotations are applied in **intrinsic yaw → pitch → roll order** (local space):

```text
quat *= Δyaw * Δpitch * Δroll
```

Subsequent `…By` moves follow these newly‑rotated axes, while `…To` moves always treat their target as global coordinates.

### 3.4 Macros — higher‑level drawing shortcuts

**Macros** bundle sequences of primitive **pen** commands so you can describe complex geometry with a single call. They always run in the pen’s **local frame**, inheriting the current pose and all style attributes (`dotSize`, `traceGap`, `color`, `fuzz`, `residue`). Each macro performs its work inside an automatic `push()` / `pop()`, so when the call returns the pen’s position, orientation, and style are exactly as they were before—their side effects are purely visual.

| Macro        | Call signature                                    | What it does                                                                                                                                                                                                |
| ------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **text**     | `pen.text(str, height = 4)`                       | Stroke‑renders `str` using a single‑line, all‑caps vector font (ASCII 32–126). Cap‑height is `height` world units; glyphs are drawn in the XY plane and advance along +X.                                   |
| **polyline** | `pen.polyline(points[], close = false)`           | Connects a list of `{x,y,z}` vertices with straight traced segments. If `close` is **true** it automatically adds a final edge from last to first.                                                          |
| **sweep**    | `pen.sweep(path[], profile[], closePath = false)` | Extrudes a 2‑D `profile` polyline along the 3‑D `path`, emitting a set of profile *slices* oriented by local Frenet yaw/pitch. Set `closePath` to join the last slice back to the first (torus‑like loops). |

**Parameter conventions**

* `points[]`, `path[]`, `profile[]` are plain arrays of `{x,y,z}` objects (not `THREE.Vector3`).
* Heights and distances are **world units**.
* All macros return the pen object, so they can be chained like primitive commands.

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

This draws a rotated triangle without disturbing the outer pen pose or style.

### 3.5 Frame Execution & Persistence

`program(pen, time)` runs **once per rendered frame**. Any variables you declare **outside** the function keep their values across calls, letting you track counters, seeds, etc. Pen state, on the other hand, automatically persists across frames—though it is accessed from within the `program()` function; the engine keeps a consistent reference to the same pen object for the entire session.

---

## 4 · Pen style attributes

The commands below change how **future** particles are spawned. Each setter returns the pen so you can chain calls, and the values persist until you override them or restore a snapshot with `push()/pop()`.

### 4.1 Spatial & temporal controls

| Method                      | Units             | Typical range             | What it does                                                                                                                                                                              |
| --------------------------- | ----------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pen.dotSize(px)`           | **screen pixels** | 0.1 – 12                  | Diameter of each particle sprite. Size is screen‑space and therefore independent of camera zoom.                                                                                          |
| `pen.traceGap(d)`           | **world units**   | 0.1 – 1 (≤0.2 costs perf) | Minimum distance between consecutive dots laid down by a `trace*` call. Smaller → smoother lines, but more particles.                                                                     |
| `pen.residue(sec)`          | seconds           | 0.1 – 10                  | Lifetime before a particle begins an exponential fade: α(t) = e^(–t / residue).                                                                                                           |
| `pen.fuzz(n, sx[, sy, sz])` | world units       | n ≤ 10, σ ≈ 0 – 5         | For every “base” dot the engine spawns **n** extra dots whose offsets are drawn from **N(0, diag(σx², σy², σz²))**. If you provide only `sx`, it is reused for all axes (`sy = sz = sx`). |

---

### 4.2 Color setters

All color calls target the same brush property—whichever you call last wins.

| Method                                                      | Signature (all arguments normalised 0–1 unless noted) | Description                                      |
| ----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `pen.colorHex(hex)`                                         | `hex` ∈ `0x000000` … `0xFFFFFF`                       | Set raw 24‑bit RGB.                              |
| `pen.colorRGB(r, g, b)`                                     | `r, g, b`                                             | Linear RGB triplet.                              |
| `pen.colorHSV(h, s, v)`                                     | `h, s, v`                                             | Hue‑saturation‑value.                            |
| `pen.colorViridis(t)`                                       | `t`                                                   | Maps *t* through the 256‑sample Viridis palette. |
| `pen.colorCubehelix(t, start = 0.5, rot = –1.5, gamma = 1)` | see above                                             | Parametric Cubehelix ramp (color‑blind‑safe).    |

---

## 5 · Performance Guidelines

| Factor            | Tip                                                             |
| ----------------- | --------------------------------------------------------------- |
| Visible particles | Keep ≤ **500 k** for 60 fps on mid‑range GPUs                   |
| traceGap          | Smaller gaps ←→ more dots                                       |
| fuzz              | Each dot spawns *n*·(1 + fuzz) extra particles — ramp carefully |
| residue           | Short lifetimes reduce accumulated particles                    |

---

## 6 · Canvas & camera helpers

These utilities are **global functions**. They act instantly and do **not** affect the pen’s pose or style.

| Function                                    | Signature                                    | What it does                                                                                                                                                                               |
| ------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `setBGColor(hex)`                           | `hex` — 24‑bit RGB (`0xRRGGBB`)              | Sets the WebGL clear‑color; affects the whole canvas.                                                                                                                                      |
| `setCamera(pos, look)`                      | `pos`, `look` are `{x, y, z}`                | Moves the perspective camera to `pos` and orients it so it looks at `look`. Also re‑centres any attached **OrbitControls** so user drags pivot around the same target.                     |
| `orbitCamera(center, radius, azDeg, elDeg)` | `center {x,y,z}`, `radius`, `azDeg`, `elDeg` | Positions the camera on a sphere of `radius` around *center*. **Azimuth 0°** looks along +X; **elevation 0°** is the horizon. Internally calls `setCamera`, so OrbitControls stay in sync. |

---

## 7 · Examples

### 7.1 Mathematical art

```javascript
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
  }

  //// 0 · gentle global spin
  pen.push();
  pen.yaw(time * 3);
  pen.pitch(Math.sin(time * 0.2) * 5);

  //// 1 · Φ‑vortex
  pen.push();
  pen.dotSize(3.8).fuzz(64, 0.7).traceGap(0.18).residue(1.4);
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
  const fade = Math.sin((time / SHELL_FADE_T) * Math.PI * 2) * 0.5 + 0.5; // 0‒1
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
```

### 7.2 Presentation slides

```javascript
/* ───── 1 · Palette & quick style helper ─────────────────── */
const STYLE = {
  //[r,g,b , size , gap , fuzz , residue]
  title: [0, 0.9, 0.4, 4, 0.1, 1, 0.8],
  caption: [1, 1, 0.4, 2.5, 0.1, 2, 0.6],
  real: [0.9, 0.4, 0.1, 3.5, 0.15, 1, 0.6],
  recip: [0.2, 0.7, 1.0, 3.0, 0.15, 1, 0.6],
  grid: [0.4, 0.5, 0.6, 4, 0.3, 4, 0.6],
  arrow: [0.7, 0.7, 0.7, 3.0, 0.2, 1, 0.6],
};

function styl(p, key, k = 1) {
  // k = fade scale
  const [r, g, b, s, gap, f, res] = STYLE[key];
  return p
    .colorRGB(r, g, b)
    .dotSize(s * k)
    .traceGap(gap)
    .fuzz(f, 0.1)
    .residue(res * k);
}

/* ───── 2 · Micro‑primitives ─────────────────────────────── */
const SEG = 24;
function ring(p, r) {
  // XY ring
  const v = [];
  for (let i = 0; i <= SEG; i++) {
    const a = (i / SEG) * Math.PI * 2;
    v.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z: 0 });
  }
  p.polyline(v, true);
}
function arrowFig(p) {
  styl(p, "arrow");
  p.moveTo(-4, 0, 0)
    .traceTo(4, 0, 0)
    .moveTo(4, 0, 0)
    .traceTo(2, 1, 0)
    .moveTo(4, 0, 0)
    .traceTo(2, -1, 0);
}

/* ---- Penrose star ---- */
function penrose(p) {
  styl(p, "real");
  const R = 10,
    pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5;
    pts.push({ x: R * Math.cos(a), y: R * Math.sin(a), z: 0 });
  }
  p.polyline(pts, true); // outer star
  for (let i = 0; i < 5; i++) {
    // inner rhombs
    const a = (i * 2 * Math.PI) / 5,
      b = (((i + 1) % 5) * 2 * Math.PI) / 5,
      r1 = 4,
      r2 = 7,
      c = Math.PI / 10;
    p.polyline(
      [
        { x: 0, y: 0, z: 0 },
        { x: r1 * Math.cos(a), y: r1 * Math.sin(a), z: 0 },
        { x: r2 * Math.cos(a + c), y: r2 * Math.sin(a + c), z: 0 },
        { x: r1 * Math.cos(b), y: r1 * Math.sin(b), z: 0 },
        { x: 0, y: 0, z: 0 },
      ],
      false,
    );
  }
}

/* ---- Diffraction rings ---- */
function diffraction(p) {
  styl(p, "recip");
  const rings = 5,
    sym = 10;
  for (let r = 1; r <= rings; r++) {
    const R = r * 2.5;
    for (let i = 0; i < sym; i++) {
      const a = (i * 2 * Math.PI) / sym;
      p.moveTo(Math.cos(a) * R, Math.sin(a) * R, 0).dot();
      if (r > 1 && !(i & 1)) {
        // connectors
        const a2 = (((i + 1) % sym) * 2 * Math.PI) / sym,
          R2 = R - 2.5;
        p.moveTo(Math.cos(a) * R2, Math.sin(a) * R2, 0).traceTo(
          Math.cos(a2) * R,
          Math.sin(a2) * R,
          0,
        );
      }
    }
  }
}

/* ---- 4D→3D projection cube ---- */
function projCube(p, time) {
  const S = 8,
    pts = [
      [-S, -S, -S],
      [S, -S, -S],
      [S, S, -S],
      [-S, S, -S],
      [-S, -S, S],
      [S, -S, S],
      [S, S, S],
      [-S, S, S],
    ].map(([x, y, z]) => ({ x, y, y, z }));
  styl(p, "grid");
  [
    [0, 1, 2, 3, 0],
    [4, 5, 6, 7, 4],
  ].forEach((loop) =>
    p.polyline(
      loop.map((i) => pts[i]),
      false,
    ),
  );
  [0, 1, 2, 3].forEach((i) => p.polyline([pts[i], pts[i + 4]], false));
  // fourth‑dimension spokes
  styl(p, "recip");
  const t = (Math.sin(time * 0.8) * 0.3 + 0.5) * 0.7;
  pts.forEach(({ x, y, z }) => {
    const q = { x: x * (1 - t), y: y * (1 - t), z: z * (1 - t) };
    p.moveTo(x, y, z).traceTo(q.x, q.y, q.z);
  });
}

/* ───── 3 · Slide registry ───────────────────────────────── */
const SLIDES = [
  {
    title: "QUASICRYSTALS",
    caption: "ORDERED • APERIODIC",
    draw(p, t) {
      p.yaw(t * 10);
      penrose(p);
    },
  },

  {
    title: "REAL → RECIPROCAL",
    caption: "FOURIER TRANSFORM",
    draw(p, t) {
      p.push()
        .moveBy(-12, 0, 0)
        .yaw(t * 5);
      penrose(p);
      p.pop();
      arrowFig(p);
      p.push()
        .moveBy(12, 0, 0)
        .yaw(-t * 5);
      diffraction(p);
      p.pop();
    },
  },

  {
    title: "HIGHER‑D SLICE",
    caption: "4D CUBE → 3D PROJECTION",
    draw(p, t) {
      p.yaw(t * 8).pitch(Math.sin(t * 0.4) * 15);
      projCube(p, t);
    },
  },
];

/* ───── 4 · Layout helpers ───────────────────────────────── */
const DUR = 8,
  TRANS = 2,
  X = 40;
function ease(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function drawSlide(p, idx, phase, time, fade) {
  const dir = idx & 1 ? 1 : -1;
  p.push().moveBy(dir * X * ease(phase), 0, 0);

  styl(p, "title", fade).text(SLIDES[idx].title, 2.2 * fade);
  p.push().moveBy(0, -16, 0);
  styl(p, "caption", fade).text(SLIDES[idx].caption, 1.2 * fade);
  p.pop();

  p.push();
  SLIDES[idx].draw(p, time);
  p.pop();
  p.pop();
}

function navDots(p, cur) {
  const dx = 3,
    w = (SLIDES.length - 1) * dx;
  for (let i = 0; i < SLIDES.length; i++) {
    styl(p, i === cur ? "caption" : "grid");
    p.moveTo(-w / 2 + i * dx, -18, 0).dot();
  }
}

/* ───── 5 · Main loop ───────────────────────────────────── */
let first = true;
function program(pen, time) {
  if (first) {
    setBGColor(0x000015);
    setCamera({ x: 0, y: 0, z: 60 }, { x: 0, y: 0, z: 0 });
    first = false;
  }

  const n = SLIDES.length,
    t = time % (n * DUR),
    idx = Math.floor(t / DUR),
    prog = (t % DUR) / DUR,
    f = Math.max(0, ((prog - (1 - TRANS / DUR)) * DUR) / TRANS); // 0→1

  drawSlide(pen, idx, f, time, 1 - f);
  drawSlide(pen, (idx + 1) % n, 1 - f, time, f);

  pen.push();
  navDots(pen, idx);
  pen.pop();
}
```

### 7.3 Composite 3D Structure

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
function program(pen, time) {
  if (first) {
    setBGColor(0x000010);
    first = false;
  }
  orbitCamera({ x: 0, y: 0, z: 0 }, 60, time * 15, 25); // nice arc-orbit
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
