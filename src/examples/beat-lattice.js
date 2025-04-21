// wave params
const PLANE_SIZE = 150;
const CELLS = 60;
const INC = PLANE_SIZE / CELLS;
const k1 = Math.PI / 14; // spatial freqs
const k2 = Math.PI / 15;
const φ = Math.PI / 4; // ±45° waves
const plane = (x, z, k, a) => Math.cos(k * (x * Math.cos(a) + z * Math.sin(a)));

// custom cubehelix implementation
function cubehelix(h) {
  const a = 0.5,
    b = 1.4; // brightness, saturation
  const ang = 2 * Math.PI * (h + 0.5);
  const amp = b * ang;
  const c = a + amp * (Math.cos(ang) - 0.148 * Math.sin(ang));
  const d = a + amp * (Math.sin(ang) - 0.292 * Math.cos(ang));
  const e = a + amp * (0.3 * Math.cos(ang) + Math.sin(ang));
  const r = (c < 0 ? 0 : c > 1 ? 255 : c * 255) & 255;
  const g = (d < 0 ? 0 : d > 1 ? 255 : d * 255) & 255;
  const b2 = (e < 0 ? 0 : e > 1 ? 255 : e * 255) & 255;
  return (r << 16) | (g << 8) | b2;
}

function program(tMs) {
  const t = tMs * 0.001;
  size(3);
  residue(6);
  fuzz(7, 2);

  for (let i = 0; i <= CELLS; i++) {
    for (let j = 0; j <= CELLS; j++) {
      const x = i * INC - PLANE_SIZE / 2;
      const z = j * INC - PLANE_SIZE / 2;

      const w1 = plane(x, z, k1, φ);
      const w2 = plane(x, z, k1, -φ);
      const w3 = plane(x, z, k2, φ) * Math.cos(t * 0.7);
      const w4 = plane(x, z, k2, -φ) * Math.sin(t * 0.7);

      const A = (w1 + w2 + w3 + w4) * 0.5; // −1 … +1

      /* colour + height encoding */
      const h = (A + 1) * 0.5; // 0 … 1
      color(cubehelix(h, 0.3, -2.1, 0.6));
      const y = A * 10;

      deposit(x, y, z);
    }
  }
}
