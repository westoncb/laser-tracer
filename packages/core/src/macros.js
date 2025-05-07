import {
  hsv2hex,
  rgb2hex,
  frenetYawPitch,
  viridisHex,
  cubehelixHex,
} from "./util.js";

/* ---------- simple color helpers -------------------------------- */
export function colorRGB(r, g, b) {
  this.color(rgb2hex(r, g, b));
  return this;
}
export function colorHSV(h, s, v) {
  this.color(hsv2hex(h, s, v));
  return this;
}
export function colorViridis(t) {
  this.color(viridisHex(t));
  return this;
}
export function colorCubehelix(t, start = 0.5, rot = -1.5, gamma = 1) {
  this.color(cubehelixHex(t, start, rot, gamma));
  return this;
}

/* ---------- private helper -------------------------------------- */
function _drawProfile(pen, profile, close) {
  const p0 = profile[0];
  pen.moveBy(p0.x, p0.y, p0.z);
  for (let i = 1; i < profile.length; i++) {
    const a = profile[i - 1],
      b = profile[i];
    pen.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
  if (close && profile.length > 2) {
    const a = profile[profile.length - 1],
      b = profile[0];
    pen.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
}

/* ---------- polyline helpers ----------------------------------- */
export function polylineLocal(pts, close = false) {
  if (!pts?.length) return this;
  this.push();
  const p0 = pts[0];
  this.moveBy(p0.x, p0.y, p0.z);
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1],
      b = pts[i];
    this.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
  if (close && pts.length > 2) {
    const a = pts.at(-1),
      b = pts[0];
    this.traceBy(b.x - a.x, b.y - a.y, b.z - a.z);
  }
  this.pop();
  return this;
}

export function polylineWorld(pts, close = false) {
  if (!pts?.length) return this;
  this.push();
  this.moveTo(pts[0].x, pts[0].y, pts[0].z);
  for (let i = 1; i < pts.length; i++) {
    const b = pts[i];
    this.traceTo(b.x, b.y, b.z);
  }
  if (close && pts.length > 2) {
    const b = pts[0];
    this.traceTo(b.x, b.y, b.z);
  }
  this.pop();
  return this;
}

/* ---------- sweep helpers -------------------------------------- */
export function sweepLocal(path, profile, closePath = false) {
  if (!path || path.length < 2 || !profile || profile.length < 2) return this;

  const tang = path.map((p, i) =>
    i < path.length - 1
      ? {
          x: path[i + 1].x - p.x,
          y: path[i + 1].y - p.y,
          z: path[i + 1].z - p.z,
        }
      : closePath
        ? { x: path[0].x - p.x, y: path[0].y - p.y, z: path[0].z - p.z }
        : { x: 1, y: 0, z: 0 },
  );

  this.push();
  for (let i = 0; i < path.length; i++) {
    const P = path[i],
      t = tang[i];
    this.push();
    this.moveBy(P.x, P.y, P.z);
    const [yaw, pitch] = frenetYawPitch(t.x, t.y, t.z);
    this.yaw(yaw).pitch(pitch);
    _drawProfile(this, profile, true);
    this.pop();
  }
  this.pop();
  return this;
}

export function sweepWorld(path, profile, closePath = false) {
  if (!path || path.length < 2 || !profile || profile.length < 2) return this;

  const tang = path.map((p, i) =>
    i < path.length - 1
      ? {
          x: path[i + 1].x - p.x,
          y: path[i + 1].y - p.y,
          z: path[i + 1].z - p.z,
        }
      : closePath
        ? { x: path[0].x - p.x, y: path[0].y - p.y, z: path[0].z - p.z }
        : { x: 1, y: 0, z: 0 },
  );

  for (let i = 0; i < path.length; i++) {
    const P = path[i],
      t = tang[i];
    this.push();
    this.moveTo(P.x, P.y, P.z);
    const [yaw, pitch] = frenetYawPitch(t.x, t.y, t.z);
    this.yaw(yaw).pitch(pitch);
    _drawProfile(this, profile, true);
    this.pop();
  }
  return this;
}
