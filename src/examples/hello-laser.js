const triWorld = [
  { x: -4, y: -2, z: 0 },
  { x: 4, y: -2, z: 0 },
  { x: 0, y: 4, z: 0 },
];

function program(pen, draw, time) {
  setCamera({ x: 2, y: 3, z: 25 }, { x: 2, y: -1, z: 0 });

  // Master transform group for everything
  pen
    .push()
    .traceGap(0.1)
    .moveTo(4, 2, 0)
    .yaw(time * 100) // spin 100°/s - affects everything inside this group

    .push()
    .colorHex(0xaa88ff)
    .dotSize(4)
    .traceGap(0.1)
    .residue(6)
    .fuzz(0)
    .polyline(triWorld, true) // draw in local frame
    .pop()

    // Draw the triangle
    .push()
    .colorHex(0xaa88ff)
    .dotSize(4)
    .residue(6)
    .fuzz(5, 4)
    .polyline(triWorld, true) // draw in local frame

    .pop();

  pen
    .residue(1)
    // All beams will now share the same rotation as the triangle

    // Main central beam
    .push()
    .colorHex(0xaa88ff)
    .moveBy(0, -2, 0)
    .fuzz(6, 0.1)
    .dotSize(5)
    .traceTo(4, 6, 0)
    .pop()

    // Front beam (magenta)
    .push()
    .colorHex(0xff44aa)
    .moveBy(0, -2, 2) // Offset in front (+z)
    .fuzz(6, 0.05)
    .dotSize(2)
    .traceTo(4, 6, 0)
    .pop()

    // Back beam (cyan)
    .push()
    .colorHex(0x00ffff)
    .moveBy(0, -2, -2) // Offset in back (-z)
    .fuzz(6, 0.05)
    .dotSize(2)
    .traceTo(4, 6, 0)
    .pop()

    // Left beam (yellow)
    .push()
    .colorHex(0xffff00)
    .moveBy(-2, -2, 0) // Offset to left (-x)
    .fuzz(6, 0.05)
    .dotSize(2)
    .traceTo(4, 6, 0)
    .pop()

    // Right beam (blue)
    .push()
    .colorHex(0x00ff00)
    .moveBy(2, -2, 0) // Offset to right (+x)
    .fuzz(6, 0.05)
    .dotSize(2)
    .traceTo(4, 6, 0)
    .pop()

    // Text element also spinning with everything else
    .moveBy(0, -4, 0)
    .colorHex(0xcc0020)
    .yaw(time * -100) // This only affects the text, making it counter-rotate
    .dotSize(7)
    .traceGap(0.05)
    .fuzz(3, 0.05)
    .residue(0.08)
    .text("hello lasers", 1);

  pen.pop(); // End of the master transform group
}
