# @laser-tracer/core

`@laser-tracer/core` is a real-time 3D drawing engine for creating time-decaying volumetric light drawings that mimic the look and feel of classic phosphor vector monitors.

The library provides a canvas you can insert into any web page and a `Pen` object. Using an API inspired by LOGO turtle graphics, you can issue commands to the pen, moving it through 3D space to draw shapes, figures, and animations. Each stroke of the pen emits a stream of particles that glow and fade over time.

## Features

- **High-Performance Particle Engine**: Renders large numbers of persistent particles using a paged, ring-buffered `BufferGeometry` for minimal garbage collection and efficient GPU data transfer.
- **Expressive Pen API**: A stateful, chainable `Pen` object that provides a rich set of methods for drawing, transformation, and styling, mimicking a 3D turtle graphics system.
- **Simple Scene Management**: A `System` class that bootstraps the entire THREE.js environment, including the renderer, camera, and orbit controls, so you can get drawing immediately.
- **Flexible Integration**: Can be mounted into any DOM element and provides a simple `run` loop to animate your creations.
- **Two Render Modes**: Includes a `light` mode for an authentic, emissive vector monitor look and a `solid` mode that uses a matcap texture for shaded, solid-looking particles.

## How It Works

The engine's architecture is designed for simplicity of use:

1.  **`System`**: The main entry point. This class initializes the renderer and camera controls. It owns the main animation loop (`run`) that drives your drawing commands over time.
2.  **`Pen`**: Your primary interface for all drawing operations. It holds the current drawing state (position, orientation, color, etc.) and translates your API calls like `pen.traceTo()` into particles spawned by the `ParticleSystem`. It also manages a transformation stack (`push`/`pop`) for creating hierarchical models and managing brush styles.

---

## Installation

```bash
npm install @laser-tracer/core
```

---

## Usage

Here is a basic example of how to initialize the system and use the `pen` to draw a moving dot.

```javascript
import { System } from "@laser-tracer/core";

// 1. Get a reference to a container element
const mountElement = document.getElementById("my-canvas-container");

// 2. Initialize the system
const lt = new System();
const { pen, scene } = lt.init(mountElement, {
  maxParticles: 500000,
  renderMode: "light", // or 'solid'
});

// Set a background color for a retro feel
scene.setBGColor(0x050005);

// 3. Define your animation logic
function myAnimation(pen, scene, time) {
  const speed = 2;
  const radius = 20;

  // Calculate a position based on time
  const x = Math.cos(time * speed) * radius;
  const z = Math.sin(time * speed) * radius;

  // Use the pen to draw
  pen
    .colorHex(0xffaa00)
    .dotSize(5)
    .residue(1.5) // Let the 'phosphor' trail last for 1.5 seconds
    .moveTo(x, 0, z)
    .dot();
}

// 4. Start the render loop
lt.run(myAnimation);
```

---

## API Reference

### `System` Class

The main class that manages the entire rendering environment.

`new System()`
Creates a new, uninitialized system instance.

`.init(mount, opts)`
Initializes the renderer and scene.

- `mount`: An `HTMLCanvasElement` or a container `HTMLElement` to append a new canvas to.
- `opts`: An optional configuration object.
  - `maxParticles` (number, default: `500000`): The maximum number of particles to allocate.
  - `renderMode` (string, default: `"light"`): Can be `"light"` or `"solid"`.
- **Returns**: An object `{ pen, scene }` containing the initialized `Pen` and `SceneAPI` instances.

`.run(frameCallback)`
Starts the `requestAnimationFrame` loop.

- `frameCallback(pen, scene, time)`: A function called every frame.
  - `pen`: The `Pen` instance.
  - `scene`: The `SceneAPI` instance.
  - `time`: The total elapsed time in seconds.
- **Returns**: A `stop()` function to cancel the animation frame loop.

`.dispose()`
Stops the render loop and frees all associated GPU and memory resources.

### `Pen` Class

The stateful drawing interface. All methods are chainable.

#### Transform & Orientation

- `.push()`: Saves the current pen state (position, rotation, style) to the stack.
- `.pop()`: Restores the last saved state from the stack.
- `.moveTo(x, y, z)`: Moves the pen to an absolute world coordinate.
- `.moveBy(dx, dy, dz)`: Moves the pen relative to its current position and orientation.
- `.yaw(degrees)`, `.pitch(degrees)`, `.roll(degrees)`: Rotates the pen's local coordinate frame.

#### Drawing

- `.dot()`: Emits a single particle at the pen's current position.
- `.traceTo(x, y, z)`: Draws a line of particles from the current position to an absolute world coordinate.
- `.traceBy(dx, dy, dz)`: Draws a line of particles relative to the current position and orientation.

#### Style Attributes

- `.dotSize(pixels)`: Sets the screen-space size of particles.
- `.traceGap(worldUnits)`: Sets the distance between particles in a trace line.
- `.residue(seconds)`: Sets the lifetime of newly created particles, controlling the "phosphor decay" time.
- `.fuzz(count, sx, sy, sz)`: Configures jitter. For each particle, `count` extra particles will be spawned with a random offset.
- `.colorHex(0xRRGGBB)`, `.colorRGB(r, g, b)`, `.colorHSV(h, s, v)`, etc.: Sets the current drawing color.

### `SceneAPI` Class

A stateless helper object for controlling global scene properties.

- `.setBGColor(0xRRGGBB)`: Sets the background clear color.
- `.setCamera(position, lookAt)`: Sets the camera's absolute position and look-at target. Both arguments are objects of the form `{ x, y, z }`.
- `.orbitCamera(center, radius, azimuthDeg, elevationDeg)`: A helper for placing the camera on a sphere around a central point.
