# @laser-tracer/core

Real‑time 3D "vector display" engine with a Logo/Turtle-like API.

## Quick usage

```html
<div id="mount" style="width:800px;height:600px"></div>
<script type="module">
  import { System } from "@laser-tracer/core";

  const mount = document.getElementById("mount");
  const sys = new System();
  const { pen, scene } = sys.init(mount, { renderMode: "light" });

  function frame(t) {
    pen
      .push()
      .colorHex(0xff00ff)
      .moveTo(0, 0, 0)
      .traceTo(Math.sin(t) * 30, Math.cos(t) * 30, 0)
      .pop();
    sys.tick(1 / 60);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
</script>
```

## API surface

- `new System().init(mount[, opts]) → { pen, scene }`
- `pen` – drawing DSL (push/pop, yaw/pitch/roll, traceBy/To, etc.)
- `scene` – helpers (`setBGColor`, `setCamera`, `orbitCamera`).
- `sys.run(onFrame)` – managed‑loop convenience.
