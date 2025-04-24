function program(time) {
  const tMs = time * 1000;
  const numTendrils = 8;
  const segments = 100;
  const baseRadius = 15;
  const maxRadius = 80;
  const twistSpeed = 0.0004;
  const pulseSpeed = 0.002;

  residue(3.5);
  fuzz(6, 0.5);
  spacing(1);

  for (let i = 0; i < numTendrils; i++) {
    push();

    const angleOffset = (Math.PI * 2 * i) / numTendrils;
    yaw((angleOffset * 180) / Math.PI);
    pitch(15 * Math.sin(tMs * 0.0006 + i));

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

      size(3 + 4 * pulse * (1 - t));
      colorHSV(hue, 0.9, brightness);

      if (j === 0) move(x, y, z);
      else trace(x, y, z);
    }

    pop();
  }

  // Central eldritch core
  fuzz(500, 5.0);
  residue(4);
  size(10);
  colorHSV((tMs * 0.0001) % 1, 1.0, 0.8);
  deposit(0, 0, 0);
}
