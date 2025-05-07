// IMPOSSIBLE ARCHITECTURE - Non-Euclidean geometric structures
// Inspired by M.C. Escher, Monument Valley, and hyperbolic geometry

let rotation = 0;
let structures = [];

// Initialize our impossible structures
function createStructures() {
  // Main central structure
  structures.push({
    type: "penrose",
    position: { x: 0, y: 0, z: 0 },
    scale: 30,
    rotation: 0,
    complexity: 5,
  });

  // Orbital structures
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    structures.push({
      type: "mobius",
      position: {
        x: 60 * Math.cos(angle),
        y: 60 * Math.sin(angle),
        z: 0,
      },
      scale: 15 + Math.random() * 10,
      rotation: Math.random() * Math.PI * 2,
      complexity: 3 + Math.floor(Math.random() * 3),
    });
  }

  // Floating staircases
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const radius = 25 + Math.random() * 20;
    structures.push({
      type: "staircase",
      position: {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: -30 + Math.random() * 60,
      },
      scale: 8 + Math.random() * 7,
      rotation: Math.random() * Math.PI * 2,
      complexity: 2 + Math.floor(Math.random() * 3),
    });
  }
}

// Initialize
createStructures();

function program(pen, draw, time) {
  setBGColor(0x000810);
  rotation += 0.01;

  // Global camera rotation for disorienting effect
  pen.yaw(Math.sin(time * 0.1) * 5);
  pen.pitch(Math.cos(time * 0.08) * 3);

  // Render impossible geometries
  structures.forEach((structure) => {
    renderStructure(structure, time);
  });

  // Render impossible connections between structures
  renderConnections(time);
}

function renderStructure(structure, time) {
  const pos = structure.position;

  pen
    .push()
    .dotSize(1.5)
    .traceGap(0.8)
    .residue(5 + Math.sin(time) * 2)
    .fuzz(2, 0.2);

  if (structure.type === "penrose") {
    // Penrose triangle - an impossible object
    renderPenroseTriangle(pos, structure.scale, time);
  } else if (structure.type === "mobius") {
    // Mobius strip with architectural elements
    renderMobiusArchitecture(
      pos,
      structure.scale,
      structure.rotation + time * 0.2,
      structure.complexity,
    );
  } else if (structure.type === "staircase") {
    // Infinite staircase (Penrose stairs)
    renderImpossibleStaircase(
      pos,
      structure.scale,
      structure.rotation + time * 0.1,
      structure.complexity,
    );
  }

  pen.pop();
}

function renderPenroseTriangle(position, scale, time) {
  const corners = [
    { x: -0.5, y: -0.289, z: 0 },
    { x: 0.5, y: -0.289, z: 0 },
    { x: 0, y: 0.577, z: 0 },
  ];

  // Transform corners
  const transformedCorners = corners.map((corner) => {
    return {
      x: position.x + corner.x * scale,
      y: position.y + corner.y * scale,
      z: position.z + corner.z * scale,
    };
  });

  pen.colorHSV(210 + Math.sin(time) * 30, 0.7, 0.9);

  // Draw each edge of the triangle with an impossible twist
  for (let i = 0; i < 3; i++) {
    const nextI = (i + 1) % 3;
    const start = transformedCorners[i];
    const end = transformedCorners[nextI];

    // Create multiple segments with z-shifts to create impossible effect
    const segments = 10;
    let lastPoint = start;

    for (let s = 1; s <= segments; s++) {
      const t = s / segments;
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;

      // The impossible twist - z coordinate follows a different logic
      const zOffset = Math.sin((t + i / 3) * Math.PI) * scale * 0.2;
      const z = position.z + zOffset;

      const currentPoint = { x, y, z };

      // Draw architectural beam
      drawBeam(lastPoint, currentPoint, 1 + Math.sin(time + i + t) * 0.5);
      lastPoint = currentPoint;
    }
  }

  // Add interior structure for more architectural feel
  for (let i = 0; i < 5; i++) {
    const t1 = i / 5;
    const innerPoint1 = {
      x: position.x + Math.cos(t1 * Math.PI * 2 + time * 0.5) * scale * 0.2,
      y: position.y + Math.sin(t1 * Math.PI * 2 + time * 0.5) * scale * 0.2,
      z: position.z + Math.sin(t1 * Math.PI + time) * scale * 0.15,
    };

    const t2 = ((i + 2) % 5) / 5;
    const innerPoint2 = {
      x: position.x + Math.cos(t2 * Math.PI * 2 + time * 0.5) * scale * 0.2,
      y: position.y + Math.sin(t2 * Math.PI * 2 + time * 0.5) * scale * 0.2,
      z: position.z + Math.sin(t2 * Math.PI + time) * scale * 0.15,
    };

    pen.colorHSV(230 + i * 30, 0.8, 0.8);
    drawBeam(innerPoint1, innerPoint2, 0.7);
  }
}

function renderMobiusArchitecture(position, scale, rotation, complexity) {
  const steps = 40;
  const width = scale * 0.2;

  for (let i = 0; i < steps; i++) {
    const t1 = i / steps;
    const t2 = ((i + 1) % steps) / steps;

    const angle1 = t1 * Math.PI * 2;
    const angle2 = t2 * Math.PI * 2;

    const twist1 = t1 * Math.PI;
    const twist2 = t2 * Math.PI;

    // Create two sides of the Mobius strip with architectural elements
    for (let side = -1; side <= 1; side += 2) {
      if (side === -1 || i % 3 === 0) {
        // Skip some sides for windows/openings
        const point1 = {
          x:
            position.x +
            Math.cos(angle1 + rotation) * scale +
            Math.cos(angle1 + twist1) * width * side,
          y:
            position.y +
            Math.sin(angle1 + rotation) * scale +
            Math.sin(angle1 + twist1) * width * side,
          z: position.z + Math.sin(angle1 * complexity) * scale * 0.3,
        };

        const point2 = {
          x:
            position.x +
            Math.cos(angle2 + rotation) * scale +
            Math.cos(angle2 + twist2) * width * side,
          y:
            position.y +
            Math.sin(angle2 + rotation) * scale +
            Math.sin(angle2 + twist2) * width * side,
          z: position.z + Math.sin(angle2 * complexity) * scale * 0.3,
        };

        // Color based on position with architectural color scheme
        pen.colorHSV(
          180 + t1 * 60,
          0.6,
          0.7 + Math.sin(t1 * Math.PI * 4) * 0.3,
        );
        drawBeam(point1, point2, 0.8);

        // Add architectural details - support structures
        if (i % 5 === 0) {
          const centerPoint = {
            x: position.x,
            y: position.y,
            z: position.z,
          };

          pen.colorHSV(210, 0.5, 0.6);
          drawBeam(centerPoint, point1, 0.3);
        }
      }
    }
  }
}

function renderImpossibleStaircase(position, scale, rotation, steps) {
  const baseSize = scale * 0.8;

  // Render each step with an impossible connection
  for (let i = 0; i < steps * 4; i++) {
    const t = i / (steps * 4);
    const nextT = (i + 1) / (steps * 4);

    // Calculate positions in a square pattern
    let x1, y1, z1, x2, y2, z2;
    const segment = Math.floor(t * 4);
    const segmentT = (t * 4) % 1;
    const nextSegment = Math.floor(nextT * 4);
    const nextSegmentT = (nextT * 4) % 1;

    // Create the illusion of rising stairs that connect back to themselves
    const risePerSegment = scale * 0.5; // Height gained per segment
    const apparentRise = segment * risePerSegment + segmentT * risePerSegment;
    const nextApparentRise =
      nextSegment * risePerSegment + nextSegmentT * risePerSegment;

    // The impossible part: we wrap around to create an infinite staircase
    const actualRise = apparentRise % (4 * risePerSegment);
    const nextActualRise = nextApparentRise % (4 * risePerSegment);

    // Square path calculation
    switch (segment % 4) {
      case 0: // Bottom edge
        x1 = position.x - baseSize / 2 + segmentT * baseSize;
        y1 = position.y - baseSize / 2;
        x2 = position.x - baseSize / 2 + nextSegmentT * baseSize;
        y2 = position.y - baseSize / 2;
        break;
      case 1: // Right edge
        x1 = position.x + baseSize / 2;
        y1 = position.y - baseSize / 2 + segmentT * baseSize;
        x2 = position.x + baseSize / 2;
        y2 = position.y - baseSize / 2 + nextSegmentT * baseSize;
        break;
      case 2: // Top edge
        x1 = position.x + baseSize / 2 - segmentT * baseSize;
        y1 = position.y + baseSize / 2;
        x2 = position.x + baseSize / 2 - nextSegmentT * baseSize;
        y2 = position.y + baseSize / 2;
        break;
      case 3: // Left edge
        x1 = position.x - baseSize / 2;
        y1 = position.y + baseSize / 2 - segmentT * baseSize;
        x2 = position.x - baseSize / 2;
        y2 = position.y + baseSize / 2 - nextSegmentT * baseSize;
        break;
    }

    z1 = position.z + actualRise;
    z2 = position.z + nextActualRise;

    // Rotate points around center
    const rotatedX1 =
      position.x +
      (x1 - position.x) * Math.cos(rotation) -
      (y1 - position.y) * Math.sin(rotation);
    const rotatedY1 =
      position.y +
      (x1 - position.x) * Math.sin(rotation) +
      (y1 - position.y) * Math.cos(rotation);

    const rotatedX2 =
      position.x +
      (x2 - position.x) * Math.cos(rotation) -
      (y2 - position.y) * Math.sin(rotation);
    const rotatedY2 =
      position.y +
      (x2 - position.x) * Math.sin(rotation) +
      (y2 - position.y) * Math.cos(rotation);

    // Draw stair step
    pen.colorHSV(270 + t * 120, 0.6, 0.7);
    drawBeam(
      { x: rotatedX1, y: rotatedY1, z: z1 },
      { x: rotatedX2, y: rotatedY2, z: z2 },
      1,
    );

    // Add vertical supports at corners
    if (i % 4 === 0) {
      // Draw vertical support
      pen.colorHSV(220, 0.5, 0.6);
      const supportHeight = scale * 0.3;
      drawBeam(
        { x: rotatedX1, y: rotatedY1, z: z1 },
        { x: rotatedX1, y: rotatedY1, z: z1 - supportHeight },
        0.5,
      );
    }
  }
}

function renderConnections(time) {
  pen.push().dotSize(1).traceGap(1.5).residue(4).fuzz(2, 0.3);

  // Connect main structures with impossible bridges
  for (let i = 1; i < structures.length; i++) {
    const start = structures[0].position;
    const end = structures[i].position;

    // Only connect some structures, not all
    if (i % 2 === 0) {
      pen.colorHSV(150 + i * 30, 0.7, 0.8);

      // Create impossible connection bridge
      const midpoints = 5;
      let lastPoint = { x: start.x, y: start.y, z: start.z };

      for (let j = 1; j <= midpoints; j++) {
        const t = j / midpoints;

        // Bezier curve with impossible z variation
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;

        // The impossible part - z doesn't follow a straight path
        const zImpossible =
          Math.sin(t * Math.PI) * 20 * (1 + Math.sin(time * 0.5 + i));

        const z = start.z + (end.z - start.z) * t + zImpossible;

        const currentPoint = { x, y, z };
        drawBeam(lastPoint, currentPoint, 0.6);
        lastPoint = currentPoint;
      }
    }
  }
  pen.pop();
}

// Helper function to draw architectural beams
function drawBeam(point1, point2, thickness) {
  // Main structural line
  draw.trace(point1, point2);

  // Add parallel lines for thickness
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const dz = point2.z - point1.z;
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

  if (length > 0) {
    // Calculate perpendicular offset vectors
    const scale = thickness / length;
    let offX = -dy * scale;
    let offY = dx * scale;

    // Draw parallel beams
    draw.trace(
      { x: point1.x + offX, y: point1.y + offY, z: point1.z },
      { x: point2.x + offX, y: point2.y + offY, z: point2.z },
    );

    draw.trace(
      { x: point1.x - offX, y: point1.y - offY, z: point1.z },
      { x: point2.x - offX, y: point2.y - offY, z: point2.z },
    );
  }
}
