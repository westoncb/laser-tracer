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

## Quick Reference

| Functions                                           | Description                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| `move(x,y,z)` / `moveRel(dx,dy,dz)`                 | Instantly move tracer (absolute/relative).                         |
| `trace(x,y,z)` / `traceRel(dx,dy,dz)`               | Draw line emitting particles (spacing-dependent, abs./rel.).       |
| `deposit(x,y,z)` / `depositRel(dx,dy,dz)`           | Emit single particle at position (abs./rel.).                      |
| `yaw(deg)` / `pitch(deg)` / `roll(deg)`             | Rotate tracer (yaw=CCW left-right, pitch=nose-up/down, roll=axis). |
| `push()` / `pop()`                                  | Save/restore tracer pose and brush state.                          |
| `size(px)` / `spacing(dist)`                        | Set particle size (px) and spacing for `trace()`.                  |
| `residue(seconds)`                                  | Particle lifetime.                                                 |
| `fuzz(count,sx,sy,sz)`                              | Extra jittered particles; Gaussian spread (`sx, sy, sz`).          |
| `colorHex(hex)`/`colorRGB(r,g,b)`/`colorHSV(h,s,v)` | Set particle color.                                                |
| `colorViridis(t)` / `colorCubehelix(t,...)`         | Set particle color from special palettes.                          |
| `drawText(...)` / `drawTextRel(...)`                | Emit text glyphs (absolute/relative).                              |

## Core Concepts

### Tracer State and Relative vs Absolute Commands

Laser-Tracer maintains a tracer state consisting of:

- **Position:** A vector indicating current tracer location.
- **Orientation:** A quaternion representing current tracer rotation.

**Absolute Commands** (`move`, `trace`, `deposit`) set tracer state directly to provided coordinates.

**Relative Commands** (`moveRel`, `traceRel`, `depositRel`) perform operations based on current tracer state and update tracer position afterward. Each relative command implicitly modifies tracer position, affecting subsequent relative operations.

### Frame Execution

- **Entry Point:** Define a function `program(time)`.
- **Automatic Execution:** Called once per animation frame, with `time` providing the current timestamp in milliseconds.
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
- **`colorViridis(t)`**: Choose color from the Viridis palette, `t` in [0–1].
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

<blank for now>
