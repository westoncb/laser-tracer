const triWorld = [
  { x: -4, y: -2, z: 0 },
  { x: 4, y: -2, z: 0 },
  { x: 0, y: 4, z: 0 },
];

// Define styles to avoid repetition
const styles = {
  triangle: {
    color: 0xaa88ff,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: [0, 0.1],
    residue: 6,
  },
  mainBeam: {
    color: 0xaa88ff,
    dotSize: 5,
    fuzz: [6, 0.1],
    residue: 1,
  },
  sideBeam: {
    dotSize: 2,
    fuzz: [6, 0.05],
    residue: 1,
  },
  text: {
    color: 0xcc0020,
    dotSize: 7,
    traceGap: 0.05,
    fuzz: [3, 0.05],
    residue: 0.08,
  },
};

// Helper to apply a style
function applyStyle(pen, style) {
  pen
    .colorHex(style.color || 0xffffff)
    .dotSize(style.dotSize || 3)
    .traceGap(style.traceGap || 0.1)
    .residue(style.residue || 1);

  if (style.fuzz) {
    pen.fuzz(style.fuzz[0], style.fuzz[1]);
  }

  return pen;
}

function program(pen, d, time) {
  setCamera({ x: 4, y: 3, z: 25 }, { x: 4, y: -1, z: 0 });

  // Define beam colors and positions
  const beams = [
    { color: 0xaa88ff, pos: [0, -2, 0], name: "main" },
    { color: 0xff44aa, pos: [0, -2, 2], name: "front" },
    { color: 0x00ffff, pos: [0, -2, -2], name: "back" },
    { color: 0xffff00, pos: [-2, -2, 0], name: "left" },
    { color: 0x00ff00, pos: [2, -2, 0], name: "right" },
  ];

  // Master transform group for everything
  pen
    .push()
    .traceGap(0.1)
    .moveTo(4, 2, 0)
    .yaw(time * 100); // spin 100°/s - affects everything inside

  // Draw the solid triangle
  applyStyle(pen.push(), styles.triangle).polyline(triWorld, true).pop();

  // Draw the fuzzy triangle
  applyStyle(pen.push(), styles.triangle)
    .fuzz(5, 4)
    .polyline(triWorld, true)
    .pop();

  // Draw all beams
  beams.forEach((beam) => {
    const style = beam.name === "main" ? styles.mainBeam : styles.sideBeam;
    applyStyle(pen.push(), style)
      .colorHex(beam.color)
      .moveBy(...beam.pos)
      .traceTo(4, 6, 0)
      .pop();
  });

  // Text element
  applyStyle(pen, styles.text)
    .moveBy(0, -4, 0)
    .yaw(time * -100) // Counter-rotate
    .text("hello lasers", 1);

  pen.pop(); // End of the master transform group
}
