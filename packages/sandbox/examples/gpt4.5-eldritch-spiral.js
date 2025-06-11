let BOOT = true;

function program(pen, scene, time) {
  if (BOOT) {
    scene.setCamera({ x: 0, y: 0, z: 220 }, { x: 0, y: 0, z: 0 });
    BOOT = false;
  }

  const tMs = time * 1000;
  const numTendrils = 8;
  const segments = 100;
  const baseRadius = 15;
  const maxRadius = 80;
  const twistSpeed = 0.0004;
  const pulseSpeed = 0.002;

  pen.residue(1.5).fuzz(6, 0.5).traceGap(1);

  for (let i = 0; i < numTendrils; i++) {
    pen.push();

    const angleOffset = (Math.PI * 2 * i) / numTendrils;
    pen
      .yaw((angleOffset * 180) / Math.PI)
      .pitch(15 * Math.sin(tMs * 0.0006 + i));

    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      const spiralAngle = angleOffset + t * 12 * Math.PI + tMs * twistSpeed;
      const pulse =
        Math.sin(tMs * pulseSpeed + t * Math.PI * 4 + i) * 0.5 + 0.5;
      const radius =
        baseRadius + (maxRadius - baseRadius) * Math.pow(t, 0.7) * pulse;

      const x = radius * Math.cos(spiralAngle);
      const y = radius * Math.sin(spiralAngle);
      const z = Math.sin(t * 8 * Math.PI + tMs * 0.001 + i) * 10;

      const hue = (t * 0.2 + pulse * 0.1 + i * 0.05 + tMs * 0.00005) % 1;
      const brightness = 0.6 + 0.4 * pulse;

      pen.dotSize(3 + 4 * pulse * (1 - t)).colorHSV(hue, 0.9, brightness);

      if (j === 0) {
        pen.moveTo(x, y, z);
      } else {
        pen.traceTo(x, y, z);
      }
    }

    pen.pop();
  }

  // Central eldritch core
  pen
    .fuzz(200, 5.0)
    .residue(4)
    .dotSize(5)
    .colorHSV((tMs * 0.0001) % 1, 1.0, 0.8)
    .dot(0, 0, 0); // 'deposit' is now 'dot' with coordinates
}
