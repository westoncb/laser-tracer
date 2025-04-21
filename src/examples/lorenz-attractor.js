/* Lorenz attractor – classic chaos */

function hsv(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return (
    (Math.round(f(5) * 255) << 16) |
    (Math.round(f(3) * 255) << 8) |
    Math.round(f(1) * 255)
  );
}

let x = 0.1,
  y = 0,
  z = 0; // initial point
function program(tMs) {
  const dt = 0.004,
    σ = 10,
    β = 8 / 3,
    ρ = 28; // Lorenz params
  const steps = 600; // ∼N deposits per frame
  size(3);
  spacing(4);
  residue(6);
  fuzz(5, 0.4);

  for (let i = 0; i < steps; i++) {
    const dx = σ * (y - x),
      dy = x * (ρ - z) - y,
      dz = x * y - β * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    const hue = (tMs * 0.02 + i) % 360;
    color(hsv(hue, 1, 1));
    deposit(x * 2, y * 2, z * 2);
  }
}
