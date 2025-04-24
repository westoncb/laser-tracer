/* — Cubehelix Spiral — smooth chroma‑luminance spin */

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

let θ = 0;
function program(t) {
  const N = 1200;
  size(3);
  residue(4);
  fuzz(3, 2);

  for (let i = 0; i < N; i++) {
    θ += 0.02;
    const r = 30 + 15 * Math.sin(t * 0.6 + i * 0.005);
    const x = r * Math.cos(θ);
    const y = r * Math.sin(θ);
    const z = (i - N / 2) * 0.12;
    color(cubehelix((t * 0.05 + i * 0.002) % 1));
    deposit(x, y, z);
  }
}
