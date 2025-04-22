/*──────────────────────────────────────────────────────────────────────
  LASER‑TRACER · TEXT SHOWCASE
  ──────────────────────────────────────────────────────────────────────
  Primitives used
  ───────────────
  • drawText / drawTextRel
  • push / pop transform stack
  • yaw / pitch / roll
  • relative motion & phosphor persistence tweaks
──────────────────────────────────────────────────────────────────────*/
function program(timeMs) {
  const t = timeMs * 0.001; // seconds

  /* Global settings — good defaults for text */
  size(4);
  spacing(0.2); // fine spacing for smooth strokes
  residue(5); // medium fade
  fuzz(3, 0.15); // slight glow
  colorHSV((t * 0.02) % 1, 1, 1);

  /* ───────── Static title ───────── */
  push();
  drawText("LASER TRACER", 0, 15, 0, 6); // centred on X axis
  pop();

  /* ───────── Orbiting digit ring ─────────
     Ten digits march around the origin at 30‑unit radius          */
  push();
  yaw(t * 20); // whole ring rotates
  const radius = 30;
  const step = (Math.PI * 2) / 10; // 10 glyphs

  for (let i = 0; i < 10; i++) {
    push();
    yaw(i * step * (180 / Math.PI)); // place glyph along ring
    moveRel(radius, 0, 0);
    size(3);
    colorHSV((i / 10 + t * 0.1) % 1, 0.8, 1);
    drawTextRel(String(i), 0, 0, 0, 3); // local frame
    pop();
  }
  pop();

  /* ───────── Spinning HELLO WORLD ───────── */
  push();
  yaw(t * 30); // slow spin around Y
  pitch(Math.sin(t) * 20);
  roll(Math.cos(t * 0.7) * 15);

  moveRel(0, -10, -25); // pull a bit toward camera
  size(5);
  colorHex(0x55eaff);
  residue(1.2); // shorter trail for blur‑like effect
  fuzz(8, 0.3); // softer glow
  drawTextRel("HELLO WORLD", 0, 0, 0, 5);
  pop();

  /* ───────── Debug origin ───────── */
  residue(0.5);
  fuzz(0);
  size(6);
  colorHex(0xffffff);
  deposit(0, 0, 0); // white dot at world origin
}
