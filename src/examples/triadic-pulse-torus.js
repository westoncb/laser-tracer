/* — Triadic Pulse Torus — colour beats synced to scale “breath” */

function hsv(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return (
    ((Math.round(f(5) * 255) << 16) |
      (Math.round(f(3) * 255) << 8) |
      Math.round(f(1) * 255)) >>>
    0
  );
}

function program(tMs) {
  const t = tMs * 0.001;
  const R = 45 + 10 * Math.sin(t); // torus breath
  const r = 7;
  const N = 800;
  size(3);
  spacing(24);
  residue(5);
  fuzz(6, 2);

  /* colour pulses in a 3‑step triad every π/2 s */
  const triad = [0xff3344, 0x33ff66, 0x3366ff];
  const beat = Math.floor((t * 2) % 3);

  for (let i = 0; i < N; i++) {
    const u = (i / N) * Math.PI * 2;
    const v = Math.sin(u * 5 + t) * Math.PI; // flower
    const x = (R + r * Math.cos(v)) * Math.cos(u);
    const y = (R + r * Math.cos(v)) * Math.sin(u);
    const z = r * Math.sin(v);
    color(triad[(beat + i) % 3]);
    trace(i ? x : x, y, z); // one ribbon
  }
}
