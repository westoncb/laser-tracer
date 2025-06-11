/* ───── Solid cube · fill · grid · edges · labels · rigid spin ───── */

// ENABLE SOLID RENDERING WITH THE RADIO BUTTON IN THE UI

//// 1 · Global tweaks ────────────────────────────────────────────────
const HALF = 6; // half-edge  (cube = 12³)
const FILL_STEP = 0.5; // row spacing for flood fill
const GRID_STEP = 2; // spacing between grid lines
const LAYER_ΔZ = 0.15; // per-layer push-off (avoids Z-fight)
const CAM_R = 38; // (unused now, kept for reference)

//// 2 · Style helpers ───────────────────────────────────────────────
function fillStyle(p) {
  return p
    .colorRGB(0.6, 0.68, 0.75)
    .dotSize(20)
    .traceGap(0.3)
    .fuzz(0)
    .residue(2);
}
function gridStyle(p) {
  return p
    .colorRGB(0.25, 0.32, 0.4)
    .dotSize(13)
    .traceGap(0.2)
    .fuzz(0)
    .residue(2);
}
function edgeStyle(p) {
  return p
    .colorRGB(0.02, 0.03, 0.05)
    .dotSize(14)
    .traceGap(0.12)
    .fuzz(0)
    .residue(2);
}
function textStyle(p) {
  return p
    .colorRGB(0.9, 0.25, 0.15)
    .dotSize(12)
    .traceGap(0.18)
    .fuzz(0)
    .residue(2);
}

//// 3 · Generic drawing helpers ────────────────────────────────────
function floodFillXY(p, size, step) {
  for (let y = -size; y <= size + 1e-6; y += step)
    p.push()
      .moveBy(-size, y, 0)
      .traceBy(2 * size, 0, 0)
      .pop();
}
function gridXY(p, size, step) {
  for (let x = -size; x <= size + 1e-6; x += step)
    p.push()
      .moveBy(x, -size, 0)
      .traceBy(0, 2 * size, 0)
      .pop();
  for (let y = -size; y <= size + 1e-6; y += step)
    p.push()
      .moveBy(-size, y, 0)
      .traceBy(2 * size, 0, 0)
      .pop();
}
function outlineSquare(p, size) {
  const r = size;
  p.polyline(
    [
      { x: -r, y: -r, z: 0 },
      { x: r, y: -r, z: 0 },
      { x: r, y: r, z: 0 },
      { x: -r, y: r, z: 0 },
    ],
    true,
  );
}

//// 4 · Single-face routine (LOCAL coordinates) ─────────────────────
function drawFace(p, offset, orientFn, caption) {
  p.push();
  p.moveBy(offset.x, offset.y, offset.z); // local translation ↖︎ key change
  orientFn(p); // rotate so local +Z points outward

  /* 0 ─ Fill layer */
  fillStyle(p);
  floodFillXY(p, HALF, FILL_STEP);

  /* 1 ─ Grid lines */
  p.push().moveBy(0, 0, LAYER_ΔZ);
  gridStyle(p);
  gridXY(p, HALF, GRID_STEP);
  p.pop();

  /* 2 ─ Dark outline */
  p.push().moveBy(0, 0, 2 * LAYER_ΔZ);
  edgeStyle(p);
  outlineSquare(p, HALF);
  p.pop();

  /* 3 ─ Label text */
  if (caption) {
    p.push().moveBy(0, 0, 3 * LAYER_ΔZ);
    textStyle(p).text(caption, 1.5); // text auto-centres on current pen pos
    p.pop();
  }

  p.pop();
}

//// 5 · Assemble the six faces ──────────────────────────────────────
function buildCube(p) {
  const s = HALF;
  drawFace(p, { x: 0, y: 0, z: s }, (q) => {}, "FRONT"); // +Z
  drawFace(p, { x: 0, y: 0, z: -s }, (q) => q.yaw(180), "BACK"); // –Z
  drawFace(p, { x: s, y: 0, z: 0 }, (q) => q.yaw(90), "RIGHT"); // +X
  drawFace(p, { x: -s, y: 0, z: 0 }, (q) => q.yaw(-90), "LEFT"); // –X
  drawFace(p, { x: 0, y: s, z: 0 }, (q) => q.pitch(-90), "TOP"); // +Y
  drawFace(p, { x: 0, y: -s, z: 0 }, (q) => q.pitch(90), "BOTTOM"); // –Y
}

//// 6 · Main loop ──────────────────────────────────────────────────
let first = true;
function program(pen, _, time) {
  if (first) {
    setBGColor(0x665544);
    first = false;
    setCamera({ x: 0, y: 0, z: 32 }, { x: 0, y: 0, z: 0 });
  }

  pen.push(); // global model transform
  pen.yaw(time * 12).pitch(Math.sin(time * 0.6) * 6); // spin & gentle wobble
  buildCube(pen); // cube sticks together now
  pen.pop();
}
