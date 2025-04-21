# Laser-Tracer Technical Manual

## Overview

Laser-Tracer is a real-time, programmable 3D (virtual) vector display that enables the creation of dynamic illuminated structures through sandboxed JavaScript scripting using turtle-graphics-style primitives. Users write code within a secure QuickJS environment, leveraging a set of specially provided functions to define visual/dynamic behavior. Programs are executed automatically once per animation frame:

```javascript
function program(timeMs) {
  /* ... */
}
```

This contains the user program which calls built-in functions that define points or paths along which glowing particles are spawned, mimicing the decay dynamics of real vector displays.

## Frame Execution Model

### Program Entry Point

- Define a function `program(timeMs)`.
- Automatically called once per frame with `timeMs` as the current timestamp in milliseconds.

### Persistent State Between Frames

- **Tracer Pose** (position and orientation) persists automatically.
- **Brush State** (color, size, fuzz, spacing, residue) also persists automatically.

Particles emitted during frame execution remain visible for their lifetime and gradually decay visually.

Important: Laser‑Tracer is a phosphor‑style vector display. A line persists only as long as each individual particle’s residue. If you want a line to stay bright indefinitely, you must retrace it every frame (or on some cadence faster than the fade‑out you intend). Think of trace() as “refreshing the stroke” rather than placing a permanent object (same for points placed with deposit()).

## Drawing Primitives

### Motion (No Particle Emission)

- **`move(x,y,z)`**: Moves tracer instantly to absolute coordinates `(x,y,z)`.
- **`moveRel(dx,dy,dz)`**: Moves tracer relative to its current orientation and position.

### Drawing + Motion

- **`trace(x,y,z)`**: Emits particles evenly spaced from current position to `(x,y,z)` and moves tracer to `(x,y,z)`.
- **`traceRel(dx,dy,dz)`**: Similar to `trace`, but relative to tracer's orientation and position.

### Drawing Only

- **`deposit(x,y,z)`**: Emits particles exactly at `(x,y,z)` without intermediate spacing. Updates tracer position accordingly.

### Tracer Orientation

- **`yaw(θ)`**: Yaw rotation in degrees, positive left/CCW.
- **`pitch(θ)`**: Pitch rotation in degrees, positive nose-up.
- **`roll(θ)`**: Roll rotation in degrees, positive clockwise.

Orientation is cumulative, affecting subsequent relative movements.

### Stack Operations

- **`push()`**: Saves current tracer pose and brush state.
- **`pop()`**: Restores previously saved pose and brush state.

## Brush & Particle System

### Brush Parameters

- **`size(px)`**: Diameter of each particle sprite (pixels).
- **`spacing(d)`**: Distance in world-units between particles emitted by `trace()`. Has no effect if only `deposit()`s are used.
- **`residue(s)`**: Lifetime of particles in seconds.
- **`fuzz(count, sx, sy, sz)`**: Spawns `count` jittered particles (according to a Gaussian distribution) around each emitted particle.

### Color Functions

- **`colorHex(hex)`**: Sets particle color with RGB hex value (e.g., `0xffaa00`).
- **`colorRGB(r,g,b)`**: RGB values between 0 and 1.
- **`colorHSV(h,s,v)`**: Hue [0–1], saturation [0–1], value [0–1].
- **`colorViridis(t)`**: Selects color from Viridis palette; `t` in [0–1].
- **`colorCubehelix(t, start=0.5, rot=-1.5, gamma=1)`**: Parametric Cubehelix color scheme.

### Particle Lifetime & Persistence

- Each particle emitted remains visible for its `residue` lifetime; alpha value goes to zero gradually.

## Performance Recommendations

- Recommended particle cap: approximately **500,000 visible particles** for smooth 60 FPS performance on mid-range GPUs.
- Be mindful of **`spacing`**: ≥ 0.5 world-units. Smaller spacing dramatically increases particle count.
- Suggested **`residue`** values:
  - Short (`0.2–1s`).
  - Medium (`1–3s`).
  - Long (`3–10s`).
- Moderate fuzz (`count ≤ 10`) is usually sufficient without excessive performance costs. You can also zero out the fuzz completely with fuzz(0) if more basic/sharp lines are desired.

## Examples

### Shield Mandala

```javascript
function program(tMs) {
  const layers = 6; // Number of concentric layers
  const spokesPerLayer = 32; // Spokes in each layer
  const baseRadius = 10; // Starting radius
  const layerGap = 8; // Gap between layers
  const rotationSpeed = 0.00000001; // Gentle rotation speed
  const pulseSpeed = 0.002; // Gentle pulsation speed

  residue(6);
  spacing(0.5);
  fuzz(10, 1);

  roll(tMs * rotationSpeed * 30);

  for (let layer = 0; layer < layers; layer++) {
    const radius = baseRadius + layer * layerGap;
    const pulse = 0.5 + 0.5 * Math.sin(tMs * pulseSpeed + layer);

    for (let spoke = 0; spoke < spokesPerLayer; spoke++) {
      push();

      const angle = (360 / spokesPerLayer) * spoke + layer * 5;
      yaw(angle);

      const innerRadius = radius * pulse;
      const outerRadius = (radius + layerGap / 2) * (1.2 - pulse * 0.2);

      // Color shifts gently per layer and spoke
      const hue =
        (layer / layers + (spoke / spokesPerLayer) * 0.5 + tMs * 0.00005) % 1;
      size(2 + 3 * pulse);
      colorHSV(hue, 0.5, 0.9);

      moveRel(0, 0, innerRadius);
      traceRel(0, 0, outerRadius);

      pop();
    }
  }

  // Center glow
  size(15);
  residue(6);
  fuzz(400, 2.5);
  colorHSV((tMs * 0.00003 + 0.5) % 1, 0.4, 1.0);
  deposit(0, 0, 0);
}
```

### Lorenz Flow

```javascript
/* ================================================================
   LORENZ FLOW – real‑time stream‑tracer demo
   -----------------------------------------------------------------
   • Exercises: persistent per‑particle state, per‑frame integration,
     colour‑by‑height, hundreds of deposits each frame.
   • Parameters are exposed up top for quick experimentation.
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
```

### Cubehelix Spiral

```javascript
/* — Cubehelix Spiral — smooth chroma‑luminance spin */

let θ = 0;
function program(tMs) {
  const t = tMs * 0.001;
  const N = 1200;
  size(6);
  spacing(10);
  residue(9);
  fuzz(0);

  for (let i = 0; i < N; i++) {
    θ += 0.02;
    const r = 30 + 15 * Math.sin(t * 0.6 + i * 0.005);
    const x = r * Math.cos(θ);
    const y = r * Math.sin(θ);
    const z = (i - N / 2) * 0.12;
    colorCubehelix((t * 0.05 + i * 0.002) % 1);
    deposit(x, y, z);
  }
}
```

### Webbed Orb

```javascript
function program(tMs) {
  const t = tMs * 0.001;
  const R = 30;
  const arms = 7; // number of spikes
  size(2);
  spacing(15);
  residue(20);
  fuzz(10, 0.4);

  for (let a = 0; a < arms; a++) {
    const angle = (a / arms) * Math.PI * 2 + t * 0.6;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const z = Math.sin(angle * 3 + t) * 30; // wavy height
    color(0xff3366);
    trace(x, y, z);

    /* return to hub so next arm is clean */
    trace(0, 0, 0);
  }
}
```

### Beat Lattice

```javascript
/* grid + wave parameters */
const SIZE = 150;
const CELLS = 60;
const INC = SIZE / CELLS;
const k1 = Math.PI / 14,
  k2 = Math.PI / 15; // spatial freqs
const φ = Math.PI / 4; // ±45° waves

const plane = (x, z, k, a) => Math.cos(k * (x * Math.cos(a) + z * Math.sin(a)));

function program(tMs) {
  const t = tMs * 0.001;

  size(3);
  spacing(40);
  residue(12);
  fuzz(6, 1.5);

  for (let i = 0; i <= CELLS; i++) {
    for (let j = 0; j <= CELLS; j++) {
      const x = i * INC - SIZE / 2;
      const z = j * INC - SIZE / 2;

      /* four coherent plane waves */
      const w1 = plane(x, z, k1, φ);
      const w2 = plane(x, z, k1, -φ);
      const w3 = plane(x, z, k2, φ) * Math.cos(t * 0.7);
      const w4 = plane(x, z, k2, -φ) * Math.sin(t * 0.7);

      const A = (w1 + w2 + w3 + w4) * 0.5; // −1 … +1

      if (Math.abs(A) < 0.22) continue; // performance threshold

      /* colour + height encoding */
      const h = (A + 1) * 0.5; // 0 … 1
      colorCubehelix(h, 0.3, -2.1, 0.6);
      const y = A * 10;

      deposit(x, y, z);
    }
  }
}
```
