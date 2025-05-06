import * as THREE from "three";

/* ---------- fast N(0,1) RNG (Marsaglia polar, cached) ---------------- */
export const gauss = (() => {
  let spare = null;
  return () => {
    if (spare !== null) {
      const g = spare;
      spare = null;
      return g;
    }
    let u, v, s;
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (!s || s >= 1);
    const m = Math.sqrt((-2 * Math.log(s)) / s);
    spare = v * m;
    return u * m;
  };
})();

// octahedral → Uint16×2 pack
export function packOct16(v) {
  // v: THREE.Vector3 (normalised)
  const ax = Math.abs(v.x),
    ay = Math.abs(v.y),
    az = Math.abs(v.z);
  let p = new THREE.Vector2(v.x, v.y).divideScalar(ax + ay + az);
  if (v.z < 0)
    p.set(
      (1 - Math.abs(p.y)) * Math.sign(p.x),
      (1 - Math.abs(p.x)) * Math.sign(p.y),
    );
  return {
    u: Math.floor((p.x * 0.5 + 0.5) * 65535 + 0.5),
    v: Math.floor((p.y * 0.5 + 0.5) * 65535 + 0.5),
  };
}

export const deg2rad = (d) => (d * Math.PI) / 180;
