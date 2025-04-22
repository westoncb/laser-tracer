# Laser-Tracer Technical Manual

## Overview

Laser-Tracer is a real-time, programmable 3D virtual vector display enabling dynamic illuminated structures through sandboxed JavaScript scripting with turtle-graphics-style primitives. Users write code in a secure QuickJS environment using provided functions to define visual behavior. Programs execute automatically each animation frame:

```javascript
function program(timeMs) {
  /* Your code here */
}
```

Each frame executes your user-defined program, spawning glowing particles mimicking phosphor decay dynamics of real vector displays.

## Quick Reference Cheat-Sheet

| Verb         | Syntax                        | Description                            |
| ------------ | ----------------------------- | -------------------------------------- |
| **Teleport** | `teleport(x,y,z)`             | Move instantly; no particles emitted   |
|              | `moveRel(dx,dy,dz)`           | Relative move; no particles emitted    |
| **Drawing**  | `trace(x,y,z)`                | Draw line, evenly spaced particles     |
|              | `traceRel(dx,dy,dz)`          | Relative line; evenly spaced particles |
|              | `deposit(x,y,z)`              | Single particle emission at position   |
| **Pose**     | `yaw(θ)` `pitch(θ)` `roll(θ)` | Change tracer orientation (degrees)    |
|              | `push()` `pop()`              | Save/restore tracer pose & brush state |

# Laser-Tracer Technical Manual

## Overview

Laser-Tracer is a real-time, programmable 3D virtual vector display enabling dynamic illuminated structures through sandboxed JavaScript scripting with turtle-graphics-style primitives. Users write code in a secure QuickJS environment using provided functions to define visual behavior. Programs execute automatically each animation frame:

```javascript
function program(timeMs) {
  /* Your code here */
}
```

Each frame executes your user-defined program, spawning glowing particles mimicking phosphor decay dynamics of real vector displays.

## Quick Reference Cheat-Sheet

| Verb        | Syntax                        | Description                                    |
| ----------- | ----------------------------- | ---------------------------------------------- |
| **Move**    | `move(x,y,z)`                 | Move instantly; no particles emitted           |
|             | `moveRel(dx,dy,dz)`           | Relative move; no particles emitted            |
| **Drawing** | `trace(x,y,z)`                | Draw line, particles spaced by `spacing()`     |
|             | `traceRel(dx,dy,dz)`          | Relative line; particles spaced by `spacing()` |
|             | `deposit(x,y,z)`              | Single particle emission at position           |
| **Pose**    | `yaw(θ)` `pitch(θ)` `roll(θ)` | Change tracer orientation (degrees)            |
|             | `push()` `pop()`              | Save/restore tracer pose & brush state         |
| **Brush**   | `size(px)`                    | Particle sprite diameter (pixels)              |
|             | `spacing(d)`                  | Particle spacing along `trace()` lines         |
|             | `residue(s)`                  | Particle lifetime (seconds)                    |
|             | `fuzz(count, sx, sy, sz)`     | Gaussian jitter around particle positions      |
| **Colors**  | `colorHex(hex)`               | Set RGB color via hex value                    |
|             | `colorRGB(r,g,b)`             | RGB color, values [0–1]                        |
|             | `colorHSV(h,s,v)`             | HSV color, values [0–1]                        |
|             | `colorViridis(t)`             | Viridis palette; `t` in [0–1]                  |
|             | `colorCubehelix(t,...)`       | Cubehelix palette; parametric colors           |

## Table of Contents

- [Overview](#overview)
- [Quick Reference Cheat-Sheet](#quick-reference-cheat-sheet)
- [Frame Execution Model](#frame-execution-model)
- [Tracer Pose](#tracer-pose)
- [Drawing Primitives](#drawing-primitives)
- [Brush & Particle System](#brush--particle-system)
- [Performance Recommendations](#performance-recommendations)
- [Example Programs](#example-programs)

## Frame Execution Model

### Program Entry Point

- Define `program(timeMs)`.
- Called once per frame, `timeMs` is current timestamp in milliseconds.

### Persistent State Between Frames

- **Tracer Pose** (position + orientation quaternion) persists.
- **Brush State** (color, size, fuzz, spacing, residue) persists.

Particles emitted each frame remain visible for their residue lifetime, fading out linearly over their lifetime.

**Important**: Laser-Tracer is phosphor-like; lines persist only as particles fade. Retrace each frame to maintain visible lines or points.

## Tracer Pose

Tracer Pose includes a full 3-D orientation (quaternion) and position. Orientation is cumulative:

- `yaw(θ)`: Yaw left/CCW by θ degrees
- `pitch(θ)`: Pitch nose-up by θ degrees
- `roll(θ)`: Roll clockwise by θ degrees
- `moveRel(dx,dy,dz)` and `traceRel(dx,dy,dz)` are orientation-relative moves.
- Save and restore pose with `push()` and `pop()`.

## Drawing Primitives

### Motion (No Particles)

- **`move(x,y,z)`**: Instantly moves without emitting particles.
- **`moveRel(dx,dy,dz)`**: Relative move based on current orientation.

### Drawing + Motion

- **`trace(x,y,z)`**: Emits particles spaced by the `spacing()` parameter along the line from current position to `(x,y,z)`, then moves tracer there.
- **`traceRel(dx,dy,dz)`**: Orientation-relative trace operation.

Particle spacing is set by `spacing(d)` (world-units). Smaller spacing increases particle density significantly.

### Drawing Only

- **`deposit(x,y,z)`**: Emits particles exactly at specified coordinates. Updates tracer position without intermediate particle spacing.

## Brush & Particle System

### Brush Parameters

- **`size(px)`**: Particle sprite diameter in pixels.
- **`spacing(d)`**: Distance between particles along `trace()` lines (default: 1 world-unit).
- **`residue(s)`**: Particle lifetime (seconds); linear fade-out.
- **`fuzz(count, sx, sy, sz)`**: Jitter around emitted particles (Gaussian distribution).

### Color Functions

- **`colorHex(hex)`**: RGB hex color (e.g., `0xffaa00`).
- **`colorRGB(r,g,b)`**: RGB components (0–1).
- **`colorHSV(h,s,v)`**: Hue, Saturation, Value (0–1).
- **`colorViridis(t)`**: Viridis palette color; `t` (0–1).
- **`colorCubehelix(t, start=0.5, rot=-1.5, gamma=1)`**: Parametric Cubehelix colors.

## Performance Recommendations

- Recommended particle cap: ~500,000 visible particles for 60 FPS.
- Recommended particle spacing (`spacing`): ≥0.5 world-units (default is 1; decreasing spacing increases particle density).
- Recommended `residue` lifetimes:
  - Short (0.2–1s)
  - Medium (1–3s)
  - Long (3–10s)
- Moderate fuzz (`count ≤ 10`) balances visuals/performance. Use `fuzz(0)` for sharp lines.

## Example Programs

- [Shield Mandala](#)
- [Lorenz Flow](#)
- [Cubehelix Spiral](#)
- [Webbed Orb](#)
- [Beat Lattice](#)

(Links to individual examples would be provided here.)

| | `colorRGB(r,g,b)` | RGB color, values [0–1] |
| | `colorHSV(h,s,v)` | HSV color, values [0–1] |
| | `colorViridis(t)` | Viridis palette; `t` in [0–1] |
| | `colorCubehelix(t,...)` | Cubehelix palette; parametric colors |

## Table of Contents

- [Overview](#overview)
- [Quick Reference Cheat-Sheet](#quick-reference-cheat-sheet)
- [Frame Execution Model](#frame-execution-model)
- [Tracer Pose](#tracer-pose)
- [Drawing Primitives](#drawing-primitives)
- [Brush & Particle System](#brush--particle-system)
- [Performance Recommendations](#performance-recommendations)
- [Example Programs](#example-programs)

## Frame Execution Model

### Program Entry Point

- Define `program(timeMs)`.
- Called once per frame, `timeMs` is current timestamp in milliseconds.

### Persistent State Between Frames

- **Tracer Pose** (position + orientation quaternion) persists.

## Tracer Pose

Tracer Pose includes a full 3-D orientation (quaternion) and position. Orientation is cumulative:

- `yaw(θ)`: Yaw left/CCW by θ degrees
- `pitch(θ)`: Pitch nose-up by θ degrees
- `roll(θ)`: Roll clockwise by θ degrees
- `moveRel(dx,dy,dz)` and `traceRel(dx,dy,dz)` are orientation-relative moves.
- Save and restore pose with `push()` and `pop()`.

## Drawing Primitives

### Motion (No Particles)

- **`teleport(x,y,z)`**: Instantly moves without emitting particles.
- **`moveRel(dx,dy,dz)`**: Relative teleport based on current orientation.

### Drawing + Motion

- **`trace(x,y,z)`**: Emits evenly spaced particles along line to `(x,y,z)`, then moves tracer there.
- **`traceRel(dx,dy,dz)`**: Orientation-relative trace operation.

Particle spacing is set by `spacing(d)` (world-units). Smaller spacing increases particle density significantly.

### Drawing Only

- **`deposit(x,y,z)`**: Emits particles exactly at specified coordinates. Updates tracer position without intermediate particle spacing.

## Brush & Particle System

### Brush Parameters

### Color Functions

- **`colorHex(hex)`**: RGB hex color (e.g., `0xffaa00`).
- **`colorRGB(r,g,b)`**: RGB components (0–1).
- **`colorHSV(h,s,v)`**: Hue, Saturation, Value (0–1).
- **`colorViridis(t)`**: Viridis palette color; `t` (0–1).
- **`colorCubehelix(t, start=0.5, rot=-1.5, gamma=1)`**: Parametric Cubehelix colors.

## Performance Recommendations

- Recommended particle cap: ~500,000 visible particles for 60 FPS.
- Suggested minimum `spacing`: ≥ 0.5 world-units.
- Recommended `residue` lifetimes:
  - Short (0.2–1s)
  - Medium (1–3s)
  - Long (3–10s)
- Moderate fuzz (`count ≤ 10`) balances visuals/performance. Use `fuzz(0)` for sharp lines.

## Example Programs

- [Shield Mandala](#)
- [Lorenz Flow](#)
- [Cubehelix Spiral](#)
- [Webbed Orb](#)
- [Beat Lattice](#)

(Links to individual examples would be provided here.)
