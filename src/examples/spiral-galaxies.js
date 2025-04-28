// SPIRAL GALAXIES - Compact demonstration of Laser-Tracer capabilities
let t = 0;

function program(pen, draw, time) {
  t += 0.01;
  setBGColor(0x000824);

  // Galaxy generation function
  function galaxy(x, y, z, size, arms, twist, colorFunc) {
    const pts = 200;
    pen.push().dotSize(2).traceGap(0.3).residue(8).fuzz(5, 0.1);

    for (let i = 0; i < pts; i++) {
      const r = (i / pts) * size;
      const ang = i * twist + t * 2;
      const arm = Math.floor(Math.random() * arms);
      const armAng = (arm / arms) * Math.PI * 2;

      const px = x + r * Math.cos(ang + armAng);
      const py = y + r * Math.sin(ang + armAng);
      const pz = z + (Math.random() - 0.5) * (size / 10);

      colorFunc(i / pts);
      draw.dot({ x: px, y: py, z: pz });
    }
    pen.pop();
  }

  // Create three galaxies with different parameters
  galaxy(0, 0, 0, 30, 3, 0.3, (p) => pen.colorViridis((p + time * 0.1) % 1));
  galaxy(-40, 20, 20, 20, 2, 0.5, (p) =>
    pen.colorHSV(p * 280 + time * 20, 0.8, 0.9),
  );
  galaxy(30, -25, -10, 25, 4, 0.2, (p) =>
    pen.colorCubehelix(p, 0.5, -1.5, 1.2),
  );

  // Add some connecting beams between galaxies
  pen.dotSize(3).traceGap(1).residue(5).colorHex(0x88ccff);
  draw.trace({ x: 0, y: 0, z: 0 }, { x: -40, y: 20, z: 20 });
  draw.trace({ x: 0, y: 0, z: 0 }, { x: 30, y: -25, z: -10 });

  // Title using compact pen settings chain
  pen
    .push()
    .moveTo(0, 50, 0)
    .colorHex(0x4488ff)
    .dotSize(4)
    .traceGap(0.3)
    .residue(1)
    .text("SPIRAL GALAXIES", 5);
  pen.pop();

  // Slowly rotating camera reference frame
  pen.yaw(Math.sin(time * 0.2) * 2);
  pen.pitch(Math.cos(time * 0.15) * 2);
}
