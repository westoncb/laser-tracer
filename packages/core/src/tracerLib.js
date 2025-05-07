import * as THREE from "three";
import {
  hsv2hex,
  rgb2hex,
  frenetYawPitch,
  viridisHex,
  cubehelixHex,
} from "./util.js";

/* --- draws one profile slice ------------------------------------ */
function _drawProfile(tracer, profile, close) {
  // local XY plane – use traceBy deltas
  const p0 = profile[0];
  tracer.moveBy(p0.x, p0.y, p0.z);
  for (let i = 1; i < profile.length; i++) {
    const a = profile[i - 1],
      b = profile[i];
    tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
  if (close && profile.length > 2) {
    const a = profile[profile.length - 1],
      b = profile[0];
    tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                         */
/* ------------------------------------------------------------------ */
export default class TracerLib {
  constructor(renderer, camera, orbitControls) {
    this.renderer = renderer;
    this.camera = camera;
    this.orbitControls = orbitControls;
  }

  /** colorHex(tracer, 0xff00ff) */
  colorHex(tracer, hex) {
    tracer.color(hex >>> 0);
  }

  /** colorRGB(tracer, r,g,b)  with r,g,b ∈ [0,1] */
  colorRGB(tracer, r, g, b) {
    tracer.color(rgb2hex(r, g, b));
  }

  /** colorHSV(tracer, h,s,v)  with h,s,v ∈ [0,1] */
  colorHSV(tracer, h, s, v) {
    tracer.color(hsv2hex(h, s, v));
  }

  /** colorViridis(tracer, t) with t ∈ [0,1] */
  colorViridis(tracer, t) {
    tracer.color(viridisHex(t));
  }

  /** colorCubehelix(tracer, t, start?, rot?, gamma?) */
  colorCubehelix(tracer, t, start = 0.5, rot = -1.5, gamma = 1) {
    const hex = cubehelixHex(t, start, rot, gamma);
    tracer.color(hex);
  }

  setBGColor(tracer, hex) {
    this.renderer.setClearColor(hex);
  }

  /* ==================================================================
     POLYLINE HELPERS
     ------------------------------------------------------------------
     • polylineLocal → vertices interpreted in CURRENT pen frame
     • polylineWorld → vertices are absolute world coordinates
     • close=true    → last→first edge is drawn automatically
     • Each helper isolates its work with push/pop so it never drifts
       the tracer's cursor or brush state.
  ================================================================== */
  polylineLocal(tracer, pts, close = false) {
    if (!pts || pts.length === 0) return;

    tracer.push();

    // move pen to first vertex (local coords → moveBy)
    const p0 = pts[0];
    tracer.moveBy(p0.x, p0.y, p0.z);

    // trace edges with LOCAL deltas
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1],
        b = pts[i];
      tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
    }

    if (close && pts.length > 2) {
      const a = pts[pts.length - 1],
        b = pts[0];
      tracer.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
    }

    tracer.pop();
  }

  polylineWorld(tracer, pts, close = false) {
    if (!pts || pts.length === 0) return;

    tracer.push();

    // move pen to first vertex (absolute → moveTo)
    const p0 = pts[0];
    tracer.moveTo(p0.x, p0.y, p0.z);

    // trace edges with absolute endpoints
    for (let i = 1; i < pts.length; i++) {
      const b = pts[i];
      tracer.traceTo(b.x, b.y, b.z);
    }

    if (close && pts.length > 2) {
      const b = pts[0];
      tracer.traceTo(b.x, b.y, b.z);
    }

    tracer.pop();
  }

  /* ----------------------------------------------------------------
     LOCAL  – inherits current pen orientation
  -----------------------------------------------------------------*/
  sweepLocal(tracer, path, profile, closePath = false) {
    if (!path || path.length < 2 || !profile || profile.length < 2) return;

    // pre-compute tangents
    const tang = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i],
        b = path[i + 1];
      tang.push({ x: b.x - a.x, y: b.y - a.y, z: b.z - a.z });
    }
    if (closePath) tang.push(tang[0]);

    tracer.push(); // isolate sweep
    for (let i = 0; i < path.length; i++) {
      const P = path[i];
      const t = tang[i < tang.length ? i : i - 1];

      tracer.push(); // per-slice transform
      tracer.moveBy(P.x, P.y, P.z);

      // orient slice: yaw about Y, pitch about X
      const [yaw, pitch] = frenetYawPitch(t.x, t.y, t.z);
      tracer.yaw(yaw);
      tracer.pitch(pitch);

      _drawProfile(tracer, profile, true); // closed profile
      tracer.pop();
    }
    tracer.pop();
  }

  /* ----------------------------------------------------------------
     WORLD  – path points are absolute; ignores existing pen rot
  -----------------------------------------------------------------*/
  sweepWorld(tracer, path, profile, closePath = false) {
    if (!path || path.length < 2 || !profile || profile.length < 2) return;

    // compute tangents
    const tang = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i],
        b = path[i + 1];
      tang.push({ x: b.x - a.x, y: b.y - a.y, z: b.z - a.z });
    }
    if (closePath) tang.push(tang[0]);

    for (let i = 0; i < path.length; i++) {
      const P = path[i];
      const t = tang[i < tang.length ? i : i - 1];

      tracer.push();
      tracer.moveTo(P.x, P.y, P.z); // absolute anchor

      const [yaw, pitch] = frenetYawPitch(t.x, t.y, t.z);
      tracer.yaw(yaw);
      tracer.pitch(pitch);

      _drawProfile(tracer, profile, true);
      tracer.pop();
    }
  }

  /**
   * Immediately position the camera and align OrbitControls.
   * Pass:
   *   pos   – {x,y,z} (world space)
   *   look  – {x,y,z} (world space)  (default: {0,0,0})
   */
  setCamera(tracer, posX, posY, posZ, lookX, lookY, lookZ) {
    if (!this.camera) return console.warn("TracerLib: camera not initialised");
    this.externalCameraControl = true;

    this.camera.position.set(posX, posY, posZ);
    this.camera.lookAt(lookX, lookY, lookZ);

    if (this.orbitControls) {
      this.orbitControls.target.set(lookX, lookY, lookZ);
      this.orbitControls.update(); // keep damping in sync
    }
  }

  /**
   * Convenience polar-orbit wrapper.
   *   center   – {x,y,z}
   *   radius   – number
   *   azDeg    – azimuth in degrees (0° = +X, 90° = +Z)
   *   elDeg    – elevation in degrees (0° = horizon, +90° = pole)
   */
  orbitCamera(tracer, center, radius, azDeg, elDeg) {
    const az = THREE.MathUtils.degToRad(azDeg);
    const el = THREE.MathUtils.degToRad(elDeg);

    const rCos = radius * Math.cos(el);
    const pos = {
      x: center.x + rCos * Math.cos(az),
      y: center.y + radius * Math.sin(el),
      z: center.z + rCos * Math.sin(az),
    };

    this.setCamera(tracer, pos.x, pos.y, pos.z, center.x, center.y, center.z);
  }

  /*───────────────────────────────────────────────────────────*/
  /* Relinquish control when user drags the mouse   */
  /*───────────────────────────────────────────────────────────*/
  tickControls() {
    // Call once per frame from your main render loop
    if (this.orbitControls && !this.externalCameraControl) {
      this.orbitControls.update(); // regular user-driven orbiting
    }
    this.externalCameraControl = false; // reset for next script frame
  }
}
