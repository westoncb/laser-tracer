function program(pen, draw, t) {
  // brush
  pen.dotSize(6).traceGap(0.3).residue(4);
  pen.colorViridis((t * 0.1) % 1);

  // spinning triangle (stateless)
  const R = 18;
  const pts = Array.from({ length: 3 }, (_, i) => ({
    x: R * Math.cos(t + (i * 2 * Math.PI) / 3),
    y: R * Math.sin(t + (i * 2 * Math.PI) / 3),
    z: 0,
  }));
  draw.polyline(pts, true);

  // local propeller (state-ful)
  pen.push();
  pen.moveTo(0, 0, 0);
  pen.yaw(t * 120);
  for (let i = 0; i < 4; i++) {
    pen.traceBy(0, 0, 12);
    pen.moveBy(0, 0, -12);
    pen.yaw(90);
  }
  pen.pop();
}
