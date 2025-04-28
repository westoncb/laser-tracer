// Mathematical field-based movement inspired by shader
function program(pen, draw, time) {
  const PHI = 1.618033988749895;
  const PSI = 2.399459110339632;
  const SQRT5 = 2.23606797749979;
  const t = time * 1;

  setBGColor(0x020305);

  // Create a mathematically-driven field
  function fieldVector(p) {
    return {
      x: Math.sin(p.x * PHI + t),
      y: Math.sin(p.y * PSI + p.x),
      z: Math.sin(p.z * SQRT5 + p.y),
    };
  }

  // Create "mathematical lens" concept from shader
  function createLens(p) {
    const focal = Math.log(Math.hypot(p.x, p.y, p.z) + 1.0) * PHI;
    const detail =
      Math.sin(p.x * PHI + p.y * PSI + p.z * SQRT5 + t) * 0.5 + 0.5;

    return {
      focal: focal,
      aperture: 0.1 + detail * 1.4,
      chromatic: {
        x: PHI,
        y: PSI,
        z: SQRT5,
      },
    };
  }

  // Generate particles that follow mathematical fields
  const points = 150;
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * Math.PI * 2;
    const phi = Math.acos(2 * (i / points) - 1);
    const radius = 2.0 + Math.sin(i * PHI) * 0.5;

    // Initial position on sphere
    let p = {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi),
    };

    // Get lens properties for this point
    const lens = createLens(p);

    // Create trail following mathematical field
    pen.push();

    // Use lens properties to affect particle appearance
    pen
      .dotSize(1 + lens.aperture)
      .traceGap(0.5 / lens.aperture)
      .residue(1 + lens.aperture * 4)
      .fuzz(3, 0.3);

    // Use mathematical illumination concept
    const attention =
      p.x * lens.chromatic.x + p.y * lens.chromatic.y + p.z * lens.chromatic.z;
    const interest = Math.sin(attention * 8.0 + t);

    if (interest > 0) {
      // Create mathematical color transition similar to shader
      const hue = (Math.sin(lens.focal * PHI + t) * 0.5 + 0.5) * 360;
      const saturation = 0.6 + interest * 0.4;
      const value = 0.7 + lens.aperture * 0.3;

      pen.colorHSV(hue / 360, saturation, value);
    } else {
      // Shadow colors for contrast
      pen.colorHSV(240 / 360, 0.5, 0.3 + lens.aperture * 0.2);
    }

    // Draw initial point
    draw.dot(p);

    // Create field-guided path
    const steps = 10 + Math.floor(lens.aperture * 10);
    for (let j = 0; j < steps; j++) {
      // Get field vector at current position
      const field = fieldVector(p);

      // Scale based on lens properties
      const stepSize = 0.05 * lens.aperture;

      // Move point along field
      p = {
        x: p.x + field.x * stepSize,
        y: p.y + field.y * stepSize,
        z: p.z + field.z * stepSize,
      };

      // Draw next point
      draw.dot(p);
    }

    pen.pop();
  }

  // Add visual interest points - similar to shader's mathematical highlights
  const interestPoints = 5;
  for (let i = 0; i < interestPoints; i++) {
    const angle = (i / interestPoints) * Math.PI * 2 + t;
    const p = {
      x: Math.sin(angle * PHI) * 1.5,
      y: Math.cos(angle * PSI) * 1.5,
      z: Math.sin(angle * SQRT5) * 1.5,
    };

    const lens = createLens(p);

    // Create "gleam" effect from shader
    pen
      .push()
      .dotSize(1 + lens.aperture)
      .traceGap(0.2)
      .residue(10)
      .fuzz(2, 1.0)
      .colorHSV(40 / 360, 0.3, 0.9);

    draw.dot(p);
    pen.pop();
  }

  // Add mathematical self-similarity at interesting locations
  const selfSimilarPoints = 3;
  for (let i = 0; i < selfSimilarPoints; i++) {
    const angle = (i / selfSimilarPoints) * Math.PI * 2 + t * 0.7;
    const center = {
      x: Math.sin(angle * SQRT5) * 2.5,
      y: Math.cos(angle * PHI) * 2.5,
      z: Math.sin(angle * PSI) * 2.5,
    };

    const lens = createLens(center);

    // Create fractal-like structure
    drawFractalStructure(center, 3, lens, draw, pen, t);
  }
}

// Helper function for fractal structures
function drawFractalStructure(center, depth, lens, draw, pen, t) {
  if (depth <= 0) return;

  pen
    .push()
    .dotSize(depth * 0.5)
    .traceGap(0.3)
    .residue(depth * 2)
    .fuzz(depth, 0.2)
    .colorHSV((180 + depth * 40) / 360, 0.6, 0.7);

  // Create branches similar to self-composing geometry in shader
  const branches = 3 + depth;
  for (let i = 0; i < branches; i++) {
    const theta = (i / branches) * Math.PI * 2;
    const phi = Math.PI / 3;

    const direction = {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    };

    const endPoint = {
      x: center.x + direction.x * depth * 0.5,
      y: center.y + direction.y * depth * 0.5,
      z: center.z + direction.z * depth * 0.5,
    };

    draw.trace(center, endPoint);

    // Recursive branch
    if (i % 2 === 0) {
      drawFractalStructure(endPoint, depth - 1, lens, draw, pen, t);
    }
  }

  pen.pop();
}
