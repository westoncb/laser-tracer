let BOOT = true;

function program(pen, d, time) {
  if (BOOT) {
    setCamera({ x: 0, y: 150, z: 0 }, { x: 0, y: 0, z: 0 });
    BOOT = false;
  }

  const tMs = time * 1000;
  const layers = 6; // Number of concentric layers
  const spokesPerLayer = 32; // Spokes in each layer
  const baseRadius = 10; // Starting radius
  const layerGap = 8; // Gap between layers
  const rotationSpeed = 0.00000001; // Gentle rotation speed
  const pulseSpeed = 0.002; // Gentle pulsation speed

  pen.residue(3).traceGap(0.5).fuzz(5, 1);

  pen.roll(tMs * rotationSpeed * 30);

  for (let layer = 0; layer < layers; layer++) {
    const radius = baseRadius + layer * layerGap;
    const pulse = 0.5 + 0.5 * Math.sin(tMs * pulseSpeed + layer);

    for (let spoke = 0; spoke < spokesPerLayer; spoke++) {
      pen.push();

      const angle = (360 / spokesPerLayer) * spoke + layer * 5;
      pen.yaw(angle);

      const innerRadius = radius * pulse;
      const outerRadius = (radius + layerGap / 2) * (1.2 - pulse * 0.2);

      // Color shifts gently per layer and spoke
      const hue =
        (layer / layers + (spoke / spokesPerLayer) * 0.5 + tMs * 0.00005) % 1;
      pen.dotSize(1 + 3 * pulse).colorHSV(hue, 0.5, 0.9);

      pen.moveBy(0, 0, innerRadius).traceBy(0, 0, outerRadius - innerRadius);

      pen.pop();
    }
  }

  // Center glow
  pen
    .dotSize(3)
    .residue(3)
    .fuzz(200, 2.5)
    .colorHSV((tMs * 0.00003 + 0.5) % 1, 0.4, 1.0)
    .moveTo(0, 0, 0)
    .dot();
}
