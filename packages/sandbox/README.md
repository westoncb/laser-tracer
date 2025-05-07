# Laser‑Tracer Sandbox

React + Vite playground that hot‑reloads user scripts in a QuickJS VM.

```bash
pnpm --filter sandbox dev   # open http://localhost:5173/
```

The sandbox consumes the **core** library directly from the workspace, so any changes in `packages/core/src` live‑reload in the browser.

### Folder structure

```
src/
  components/LaserCanvas.jsx   – wraps @laser-tracer/core System
  vm/                          – QuickJS bindings + prelude
  tracers/                     – demo laser‑tracer scripts
```
