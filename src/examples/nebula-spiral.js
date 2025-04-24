/* === Cubehelix Nebula Spiral ================================= */

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

/* fast Gaussian via Box‑Muller */
function gauss() {
  const u = Math.random(),
    v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* spiral parameters */
let θ = 0; // running angle

function program(t) {
  const N = 700; // backbone samples / frame
  const splat = 6; // fuzz points per backbone vertex
  const R0 = 28,
    R1 = 16; // base radius & wobble

  size(2); // each micro‑point thickness
  residue(1);
  fuzz(5, 0.25);

  for (let i = 0; i < N; i++) {
    θ += 0.03;
    const r = R0 + R1 * Math.sin(θ * 0.2 + t * 0.3); // pulsating radius
    const x0 = r * Math.cos(θ);
    const y0 = r * Math.sin(θ);
    const z0 = (i - N / 2) * 0.14;

    /* cubehelix hue scrolls along backbone */
    const hue = (t * 0.04 + i * 0.002) % 1;
    color(cubehelix(hue));

    /* deposit backbone centre */
    deposit(x0, y0, z0);
  }
}
