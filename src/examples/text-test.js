/* ================================================================
   WORD‑CUBE — transform‑hierarchy & text‑helper playground
   --------------------------------------------------------------- */

function program(t) {
  /* ── global defaults ───────────────────────────────────────── */
  size(4); // sprite diameter
  spacing(0.5); // smooth text strokes
  residue(0.25); // medium fade
  fuzz(8, 0.2); // gentle glow

  /* ───────── rotating master frame ───────── */
  push();
  yaw(t * 15); // slow spin around Y
  pitch(Math.sin(t * 0.3) * 20); // gentle nod
  roll(Math.cos(t * 0.4) * 10); // subtle bank

  const L = 25; // half‑extent of cube faces

  /* Face descriptors: rotation (deg), hue, placeholder word */
  const faces = [
    { rot: [0, 0, 0], hue: 0.0, word: "FRONT" },
    { rot: [0, 180, 0], hue: 0.1, word: "BACK" },
    { rot: [0, -90, 0], hue: 0.23, word: "LEFT" },
    { rot: [0, 90, 0], hue: 0.35, word: "RIGHT" },
    { rot: [90, 0, 0], hue: 0.5, word: "TOP" },
    { rot: [-90, 0, 0], hue: 0.65, word: "BOTTOM" },
  ];

  for (const f of faces) {
    push(); // —— face frame ——
    /* orient the frame so +Z faces outward */
    pitch(f.rot[0]);
    yaw(f.rot[1]);
    roll(f.rot[2]);

    /* move out to the face plane */
    moveRel(0, 0, -L);

    /* central word */
    colorHSV((f.hue + t * 0.05) % 1, 0.9, 1);
    drawTextRel(f.word, 0, 0, 0, 6); // height = 6 world‑units

    /* nested letter ring around the word ------------------- */
    const letters = f.word.split("");
    const ringRadius = 10;
    const dθ = 360 / letters.length;

    for (let i = 0; i < letters.length; i++) {
      push(); // — letter frame —
      yaw(i * dθ); // place around circle
      moveRel(ringRadius, 0, 0); // slide outward
      pitch(90); // stand letters upright

      size(3);
      colorHSV((f.hue + i * 0.07 + t * 0.15) % 1, 0.8, 0.9);
      drawTextRel(letters[i], 0, 0, 0, 3);
      pop();
    }
    pop(); // —— /face frame ——
  }
  pop(); // —— /master frame ——

  /* origin reference dot */
  residue(0.5);
  size(5);
  fuzz(0);
  colorHex(0xffffff);
  deposit(0, 0, 0);
}
