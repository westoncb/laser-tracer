// Quasicrystal Visualization for Laser-Tracer
// A scientific presentation on higher-dimensional order

// State variables
let frameCount = 0;
let lastRenderTime = 0;
let currentSlide = 0;
let slideTransition = 0;
let rotationAngle = 0;
let userInteraction = false;

// Animation timing
const SLIDE_DURATION = 12; // seconds per slide
const TRANSITION_TIME = 1.5; // seconds for transition

// Color palettes
const COLORS = {
  text: { r: 0, g: 0.9, b: 0.4 }, // Green text
  highlight: { r: 1, g: 1, b: 0.4 }, // Yellow highlight
  atomsReal: { r: 0.9, g: 0.4, b: 0.1 }, // Orange atoms
  atomsRecip: { r: 0.2, g: 0.7, b: 1.0 }, // Blue reciprocal
  grid: { r: 0.4, g: 0.4, b: 0.4 }, // Gray grid
  projection: { r: 1, g: 0.3, b: 0.7 }, // Magenta projection
  dimension: { r: 0.7, g: 0.7, b: 0.1 }, // Gold dimension
};

// Basic drawing utilities with scientific style
function applyStyle(pen, style) {
  const {
    color,
    dotSize = 4,
    traceGap = 0.2,
    fuzz = 3,
    fuzzSize = 0.05,
    residue = 0.6,
  } = style;

  pen
    .colorRGB(color.r, color.g, color.b)
    .dotSize(dotSize)
    .traceGap(traceGap)
    .fuzz(fuzz, fuzzSize)
    .residue(residue);

  return pen;
}

// Draw grid in 2D or 3D
function drawGrid(pen, size, spacing, is3D = false) {
  pen.push();

  applyStyle(pen, {
    color: COLORS.grid,
    dotSize: 2,
    traceGap: 0.5,
    fuzz: 1,
    fuzzSize: 0.1,
    residue: 0.3,
  });

  const minCoord = -size / 2;
  const maxCoord = size / 2;

  // Draw X and Z lines
  for (let x = minCoord; x <= maxCoord; x += spacing) {
    pen.polyline(
      [
        { x: x, y: 0, z: minCoord },
        { x: x, y: 0, z: maxCoord },
      ],
      false,
    );
  }

  for (let z = minCoord; z <= maxCoord; z += spacing) {
    pen.polyline(
      [
        { x: minCoord, y: 0, z: z },
        { x: maxCoord, y: 0, z: z },
      ],
      false,
    );
  }

  // Draw Y lines if 3D
  if (is3D) {
    for (let x = minCoord; x <= maxCoord; x += spacing) {
      pen.polyline(
        [
          { x: x, y: minCoord, z: 0 },
          { x: x, y: maxCoord, z: 0 },
        ],
        false,
      );
    }

    for (let y = minCoord; y <= maxCoord; y += spacing) {
      pen.polyline(
        [
          { x: minCoord, y: y, z: 0 },
          { x: maxCoord, y: y, z: 0 },
        ],
        false,
      );
    }
  }

  pen.pop();
}

// Draw an atom with optional label
function drawAtom(pen, pos, radius, style, label = null) {
  pen.push();

  applyStyle(pen, style);

  // Draw atom as circle
  const segments = 16;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push({
      x: pos.x + Math.cos(angle) * radius,
      y: pos.y + Math.sin(angle) * radius,
      z: pos.z,
    });
  }

  pen.polyline(points, true);

  // Add cross lines for 3D effect
  pen.polyline(
    [
      { x: pos.x - radius * 0.7, y: pos.y, z: pos.z },
      { x: pos.x + radius * 0.7, y: pos.y, z: pos.z },
    ],
    false,
  );

  pen.polyline(
    [
      { x: pos.x, y: pos.y - radius * 0.7, z: pos.z },
      { x: pos.x, y: pos.y + radius * 0.7, z: pos.z },
    ],
    false,
  );

  // Add label if provided
  if (label) {
    applyStyle(pen, {
      color: COLORS.text,
      dotSize: 3,
      traceGap: 0.1,
      fuzz: 1,
    });

    draw.text(
      label,
      {
        x: pos.x,
        y: pos.y + radius + 1,
        z: pos.z,
      },
      1,
    );
  }

  pen.pop();
}

// Draw a diffraction pattern peak
function drawDiffractionPeak(pen, pos, intensity = 1.0) {
  pen.push();

  // Scale visual size based on intensity
  const size = 0.5 + intensity * 2;
  const brightness = 0.5 + intensity * 0.5;

  applyStyle(pen, {
    color: {
      r: COLORS.atomsRecip.r * brightness,
      g: COLORS.atomsRecip.g * brightness,
      b: COLORS.atomsRecip.b * brightness,
    },
    dotSize: 3 + intensity * 3,
    fuzz: 4 + intensity * 6,
    fuzzSize: 0.1 + intensity * 0.1,
    residue: 0.8,
  });

  // Draw as a bright dot with glow
  pen.moveTo(pos.x, pos.y, pos.z);
  pen.dot();

  // For stronger peaks, add a small circle
  if (intensity > 0.7) {
    const segments = 8;
    const points = [];

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push({
        x: pos.x + Math.cos(angle) * size * 0.3,
        y: pos.y + Math.sin(angle) * size * 0.3,
        z: pos.z,
      });
    }

    pen.polyline(points, true);
  }

  pen.pop();
}

// Draw line with arrow at end
function drawArrow(pen, start, end, style, headSize = 0.5) {
  pen.push();

  applyStyle(pen, style);

  // Draw line
  pen.polyline([start, end], false);

  // Calculate direction vector
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dz = end.z - start.z;

  // Normalize
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const ux = dx / length;
  const uy = dy / length;
  const uz = dz / length;

  // Find perpendicular vector for arrowhead
  let px, py, pz;
  if (Math.abs(uy) < 0.9) {
    // Use up vector cross
    px = -uz;
    py = 0;
    pz = ux;
  } else {
    // Use right vector cross
    px = 0;
    py = -uz;
    pz = uy;
  }

  // Normalize perpendicular vector
  const pLength = Math.sqrt(px * px + py * py + pz * pz);
  px /= pLength;
  py /= pLength;
  pz /= pLength;

  // Draw arrowhead
  pen.polyline(
    [
      {
        x: end.x - ux * headSize - px * headSize,
        y: end.y - uy * headSize - py * headSize,
        z: end.z - uz * headSize - pz * headSize,
      },
      end,
      {
        x: end.x - ux * headSize + px * headSize,
        y: end.y - uy * headSize + py * headSize,
        z: end.z - uz * headSize + pz * headSize,
      },
    ],
    false,
  );

  pen.pop();
}

// Generate Penrose tiling (P3) vertices
function generatePenroseTiling(iterations = 4) {
  // Golden ratio
  const phi = (1 + Math.sqrt(5)) / 2;

  // Initialize with a pentagon
  let vertices = [];
  for (let i = 0; i < 5; i++) {
    const angle = (2 * Math.PI * i) / 5 - Math.PI / 10;
    vertices.push({
      x: Math.cos(angle) * 20,
      y: Math.sin(angle) * 20,
      z: 0,
    });
  }

  // Add pentagon connections
  let edges = [];
  for (let i = 0; i < 5; i++) {
    edges.push({
      start: i,
      end: (i + 1) % 5,
      type: "thick",
    });
    edges.push({
      start: i,
      end: (i + 2) % 5,
      type: "thin",
    });
  }

  // Subdivide edges for 'iterations' times
  for (let iter = 0; iter < iterations; iter++) {
    const newEdges = [];

    for (const edge of edges) {
      const start = vertices[edge.start];
      const end = vertices[edge.end];

      if (edge.type === "thick") {
        // Subdivide thick edge
        const ratio1 = 1 / phi;
        const ratio2 = 1 - ratio1;

        const newPointIdx = vertices.length;
        vertices.push({
          x: start.x * ratio1 + end.x * ratio2,
          y: start.y * ratio1 + end.y * ratio2,
          z: 0,
        });

        newEdges.push({
          start: edge.start,
          end: newPointIdx,
          type: "thick",
        });

        newEdges.push({
          start: newPointIdx,
          end: edge.end,
          type: "thin",
        });
      } else {
        // Subdivide thin edge
        const ratio = 1 / phi;

        const newPointIdx = vertices.length;
        vertices.push({
          x: start.x * ratio + end.x * (1 - ratio),
          y: start.y * ratio + end.y * (1 - ratio),
          z: 0,
        });

        newEdges.push({
          start: edge.start,
          end: newPointIdx,
          type: "thin",
        });

        newEdges.push({
          start: newPointIdx,
          end: edge.end,
          type: "thick",
        });
      }
    }

    edges = newEdges;
  }

  return { vertices, edges };
}

// Generate diffraction pattern for a quasicrystal
function generateDiffractionPattern(centerX = 0, centerY = 0, symmetry = 5) {
  const points = [];
  const intensities = [];

  // Generate peaks with n-fold symmetry
  const rings = 6;
  const peaksPerRing = 10;

  for (let ring = 1; ring <= rings; ring++) {
    const radius = ring * 3;

    for (let i = 0; i < peaksPerRing * symmetry; i++) {
      const angle = (i / (peaksPerRing * symmetry)) * Math.PI * 2;

      // Add symmetry
      if (i % symmetry === 0) {
        // Main peaks at symmetry angles
        points.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          z: 0,
        });

        intensities.push(1.0 - (ring - 1) * 0.12);
      } else if (i % (symmetry / 2) === 0 && ring > 1) {
        // Secondary peaks
        points.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          z: 0,
        });

        intensities.push(0.8 - (ring - 1) * 0.12);
      } else if (ring % 2 === 0 && i % (symmetry / 5) === 0) {
        // Tertiary peaks
        points.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          z: 0,
        });

        intensities.push(0.5 - (ring - 1) * 0.12);
      }
    }
  }

  return { points, intensities };
}

// Draw a 2D to 3D projection visualization
function drawProjection(pen, time) {
  pen.push();

  // Draw higher-dimensional space (simplified 4D to 3D)
  const offset = 15;

  // Draw 4D "cube" as two 3D cubes with connections
  const cubeSize = 6;

  // First cube
  applyStyle(pen, {
    color: COLORS.grid,
    dotSize: 3,
    traceGap: 0.2,
  });

  // Draw first cube
  const cube1 = [
    { x: -cubeSize + offset, y: -cubeSize, z: -cubeSize },
    { x: cubeSize + offset, y: -cubeSize, z: -cubeSize },
    { x: cubeSize + offset, y: cubeSize, z: -cubeSize },
    { x: -cubeSize + offset, y: cubeSize, z: -cubeSize },
    { x: -cubeSize + offset, y: -cubeSize, z: cubeSize },
    { x: cubeSize + offset, y: -cubeSize, z: cubeSize },
    { x: cubeSize + offset, y: cubeSize, z: cubeSize },
    { x: -cubeSize + offset, y: cubeSize, z: cubeSize },
  ];

  // Connect cube edges
  pen.polyline([cube1[0], cube1[1], cube1[2], cube1[3], cube1[0]], false);
  pen.polyline([cube1[4], cube1[5], cube1[6], cube1[7], cube1[4]], false);
  pen.polyline([cube1[0], cube1[4]], false);
  pen.polyline([cube1[1], cube1[5]], false);
  pen.polyline([cube1[2], cube1[6]], false);
  pen.polyline([cube1[3], cube1[7]], false);

  // Second cube (represents 4th dimension)
  const cube2 = [
    { x: -cubeSize - offset, y: -cubeSize, z: -cubeSize },
    { x: cubeSize - offset, y: -cubeSize, z: -cubeSize },
    { x: cubeSize - offset, y: cubeSize, z: -cubeSize },
    { x: -cubeSize - offset, y: cubeSize, z: -cubeSize },
    { x: -cubeSize - offset, y: -cubeSize, z: cubeSize },
    { x: cubeSize - offset, y: -cubeSize, z: cubeSize },
    { x: cubeSize - offset, y: cubeSize, z: cubeSize },
    { x: -cubeSize - offset, y: cubeSize, z: cubeSize },
  ];

  // Connect cube edges
  pen.polyline([cube2[0], cube2[1], cube2[2], cube2[3], cube2[0]], false);
  pen.polyline([cube2[4], cube2[5], cube2[6], cube2[7], cube2[4]], false);
  pen.polyline([cube2[0], cube2[4]], false);
  pen.polyline([cube2[1], cube2[5]], false);
  pen.polyline([cube2[2], cube2[6]], false);
  pen.polyline([cube2[3], cube2[7]], false);

  // Connect between cubes (4D connections)
  applyStyle(pen, {
    color: { r: 0.5, g: 0.5, b: 0.5 },
    dotSize: 2,
    traceGap: 0.4,
    fuzz: 1,
  });

  for (let i = 0; i < 8; i++) {
    pen.polyline([cube1[i], cube2[i]], false);
  }

  // Draw projection plane
  applyStyle(pen, {
    color: COLORS.projection,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 2,
  });

  // Animated angle for the projection plane
  const angle = time * 0.1;
  const projNormal = {
    x: Math.cos(angle),
    y: Math.sin(angle),
    z: 0.5,
  };

  const planeSize = 20;
  const planeCenter = { x: 0, y: 0, z: 0 };

  // Calculate basis vectors for the plane
  let u = { x: -projNormal.y, y: projNormal.x, z: 0 };
  let v = {
    x: -projNormal.x * projNormal.z,
    y: -projNormal.y * projNormal.z,
    z: projNormal.x * projNormal.x + projNormal.y * projNormal.y,
  };

  // Normalize u
  const uLength = Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z);
  u.x /= uLength;
  u.y /= uLength;
  u.z /= uLength;

  // Normalize v
  const vLength = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  v.x /= vLength;
  v.y /= vLength;
  v.z /= vLength;

  // Create points for the projection plane
  const plane = [
    {
      x: planeCenter.x - u.x * planeSize + v.x * planeSize,
      y: planeCenter.y - u.y * planeSize + v.y * planeSize,
      z: planeCenter.z - u.z * planeSize + v.z * planeSize,
    },
    {
      x: planeCenter.x + u.x * planeSize + v.x * planeSize,
      y: planeCenter.y + u.y * planeSize + v.y * planeSize,
      z: planeCenter.z + u.z * planeSize + v.z * planeSize,
    },
    {
      x: planeCenter.x + u.x * planeSize - v.x * planeSize,
      y: planeCenter.y + u.y * planeSize - v.y * planeSize,
      z: planeCenter.z + u.z * planeSize - v.z * planeSize,
    },
    {
      x: planeCenter.x - u.x * planeSize - v.x * planeSize,
      y: planeCenter.y - u.y * planeSize - v.y * planeSize,
      z: planeCenter.z - u.z * planeSize - v.z * planeSize,
    },
  ];

  // Draw the projection plane
  pen.polyline([plane[0], plane[1], plane[2], plane[3], plane[0]], false);

  // Draw grid on the projection plane
  const gridLines = 5;

  for (let i = 1; i < gridLines; i++) {
    const t = i / gridLines;

    // Calculate the endpoints for the u-direction grid lines
    const u1 = {
      x: plane[0].x * (1 - t) + plane[3].x * t,
      y: plane[0].y * (1 - t) + plane[3].y * t,
      z: plane[0].z * (1 - t) + plane[3].z * t,
    };

    const u2 = {
      x: plane[1].x * (1 - t) + plane[2].x * t,
      y: plane[1].y * (1 - t) + plane[2].y * t,
      z: plane[1].z * (1 - t) + plane[2].z * t,
    };

    // Calculate the endpoints for the v-direction grid lines
    const v1 = {
      x: plane[0].x * (1 - t) + plane[1].x * t,
      y: plane[0].y * (1 - t) + plane[1].y * t,
      z: plane[0].z * (1 - t) + plane[1].z * t,
    };

    const v2 = {
      x: plane[3].x * (1 - t) + plane[2].x * t,
      y: plane[3].y * (1 - t) + plane[2].y * t,
      z: plane[3].z * (1 - t) + plane[2].z * t,
    };

    // Draw the grid lines
    pen.polyline([u1, u2], false);
    pen.polyline([v1, v2], false);
  }

  // Draw projection lines
  applyStyle(pen, {
    color: COLORS.highlight,
    dotSize: 2,
    traceGap: 0.1,
    fuzz: 3,
  });

  // Create points in the higher dimension
  const numPoints = 20;
  const points4D = [];

  for (let i = 0; i < numPoints; i++) {
    // Create structured 4D grid of points (simplified as two 3D grids)
    const ix = (i % 4) - 1.5;
    const iy = (Math.floor(i / 4) % 4) - 1.5;
    const iz = Math.floor(i / 16) - 0.5;
    const iw = (i % 2) * 2 - 1;

    const x = ix * 4;
    const y = iy * 4;
    const z = iz * 4;
    const w = iw;

    // Position in the "4D" space
    const point4D = {
      x: x + (w < 0 ? -offset : offset),
      y: y,
      z: z,
    };

    points4D.push(point4D);

    // Project onto the 3D plane
    const dot = x * projNormal.x + y * projNormal.y + z * projNormal.z;

    const projection = {
      x: x - dot * projNormal.x,
      y: y - dot * projNormal.y,
      z: z - dot * projNormal.z,
    };

    // Draw the point in 4D
    applyStyle(pen, {
      color: COLORS.atomsReal,
      dotSize: 3,
      fuzz: 2,
    });

    drawAtom(pen, point4D, 0.5, {
      color: COLORS.atomsReal,
      dotSize: 3,
      fuzz: 2,
    });

    // Draw projection line
    pen.polyline(
      [
        point4D,
        {
          x: projection.x,
          y: projection.y,
          z: projection.z,
        },
      ],
      false,
    );

    // Draw projected point
    applyStyle(pen, {
      color: COLORS.projection,
      dotSize: 3,
      fuzz: 4,
    });

    drawAtom(
      pen,
      {
        x: projection.x,
        y: projection.y,
        z: projection.z,
      },
      0.3,
      {
        color: COLORS.projection,
        dotSize: 3,
        fuzz: 4,
      },
    );
  }

  pen.pop();
}

// Set up slide 1: Introduction to Quasicrystals
function drawSlide1(pen, time, transitionFactor) {
  pen.push();

  // Move everything based on transition
  pen.moveBy(0, 0, -40 * transitionFactor);

  // Title
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 5,
    traceGap: 0.1,
    fuzz: 2,
    residue: 1.0,
  });

  draw.text("QUASICRYSTALS", { x: 0, y: 18, z: 0 }, 2);
  pen.dotSize(3);
  draw.text("ORDERED BUT APERIODIC", { x: 0, y: 15, z: 0 }, 1);

  // Draw simple 2D Penrose tiling
  const { vertices, edges } = generatePenroseTiling(2);

  // Scale down the tiling
  const scale = 0.8;

  // Draw the edges with different styles for thick/thin
  applyStyle(pen, {
    color: COLORS.atomsReal,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 2,
  });

  // Animate rotation of the tiling
  const rotation = time * 0.05;
  const cosRot = Math.cos(rotation);
  const sinRot = Math.sin(rotation);

  for (const edge of edges) {
    const start = vertices[edge.start];
    const end = vertices[edge.end];

    // Apply rotation
    const startRotated = {
      x: (start.x * cosRot - start.y * sinRot) * scale,
      y: (start.x * sinRot + start.y * cosRot) * scale,
      z: 0,
    };

    const endRotated = {
      x: (end.x * cosRot - end.y * sinRot) * scale,
      y: (end.x * sinRot + end.y * cosRot) * scale,
      z: 0,
    };

    if (edge.type === "thick") {
      applyStyle(pen, {
        color: COLORS.atomsReal,
        dotSize: 4,
        traceGap: 0.1,
        fuzz: 2,
      });
    } else {
      applyStyle(pen, {
        color: COLORS.highlight,
        dotSize: 3,
        traceGap: 0.1,
        fuzz: 2,
      });
    }

    pen.polyline([startRotated, endRotated], false);
  }

  // Draw key points
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  draw.text("ORDERED BUT NEVER REPEATS", { x: 0, y: -19, z: 0 }, 1);
  draw.text("HAS FORBIDDEN SYMMETRIES", { x: 0, y: -21, z: 0 }, 1);
  draw.text("DISCOVERED IN 1982", { x: 0, y: -23, z: 0 }, 1);

  pen.pop();
}

// Slide 2: From real space to reciprocal space
function drawSlide2(pen, time, transitionFactor) {
  pen.push();

  // Move everything based on transition
  pen.moveBy(-40 * transitionFactor, 0, 0);

  // Title
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: 2,
    residue: 1.0,
  });

  draw.text("REAL SPACE TO RECIPROCAL SPACE", { x: 0, y: 18, z: 0 }, 1.5);

  // Draw real space atoms on the left
  applyStyle(pen, {
    color: COLORS.atomsReal,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: 2,
  });

  draw.text("REAL SPACE", { x: -15, y: 12, z: 0 }, 1);

  // Draw simple atoms arrangement
  const atomPositions = [];

  // Create a small 2D quasiperiodic pattern
  const fibonacci = [1, 1, 2, 3, 5, 8];
  let atomCount = 0;

  for (let i = 0; i < fibonacci.length; i++) {
    for (let j = 0; j < fibonacci.length; j++) {
      // Check Fibonacci condition (simplified quasiperiodic)
      if ((i + j) % 2 === 0) {
        const x = -15 + (i - fibonacci.length / 2) * 3;
        const y = (j - fibonacci.length / 2) * 3;

        atomPositions.push({ x, y, z: 0 });
        atomCount++;

        drawAtom(pen, { x, y, z: 0 }, 1, {
          color: COLORS.atomsReal,
          dotSize: 4,
          traceGap: 0.1,
          fuzz: 2,
        });
      }
    }
  }

  // Draw reciprocal space on the right
  applyStyle(pen, {
    color: COLORS.atomsRecip,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: 2,
  });

  draw.text("RECIPROCAL SPACE", { x: 15, y: 12, z: 0 }, 1);

  // Draw diffraction pattern
  const { points, intensities } = generateDiffractionPattern(15, 0, 5);

  for (let i = 0; i < points.length; i++) {
    drawDiffractionPeak(pen, points[i], intensities[i]);
  }

  // Draw transformation arrow
  applyStyle(pen, {
    color: COLORS.highlight,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 2,
  });

  // Animated transformation arrow
  const arrowProgress = (Math.sin(time * 2) + 1) / 2;
  const startX = -5 - arrowProgress * 5;
  const endX = 5 + arrowProgress * 5;

  drawArrow(
    pen,
    { x: startX, y: 0, z: 0 },
    { x: endX, y: 0, z: 0 },
    {
      color: COLORS.highlight,
      dotSize: 4,
      traceGap: 0.1,
      fuzz: 3,
    },
  );

  draw.text("FOURIER TRANSFORM", { x: 0, y: 3, z: 0 }, 0.8);

  // Explanation text
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  draw.text("ELECTRON DENSITY", { x: -15, y: -12, z: 0 }, 0.8);
  draw.text("DIFFRACTION PATTERN", { x: 15, y: -12, z: 0 }, 0.8);

  draw.text("RECIPROCAL LATTICE HAS", { x: 0, y: -16, z: 0 }, 1);
  draw.text("FORBIDDEN SYMMETRIES", { x: 0, y: -18, z: 0 }, 1);

  pen.pop();
}

// Slide 3: Higher dimensional spaces
function drawSlide3(pen, time, transitionFactor) {
  pen.push();

  // Move everything based on transition
  pen.moveBy(0, 40 * transitionFactor, 0);

  // Title
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: 2,
    residue: 1.0,
  });

  draw.text("HIGHER DIMENSIONAL ORDER", { x: 0, y: 18, z: 0 }, 1.5);

  // Draw the projection visualization
  drawProjection(pen, time);

  // Explanatory text
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  draw.text("QUASICRYSTAL IS A 3D SLICE", { x: 0, y: -19, z: 0 }, 1);
  draw.text("OF 6D PERIODIC LATTICE", { x: 0, y: -21, z: 0 }, 1);

  // Label dimensions
  applyStyle(pen, {
    color: COLORS.dimension,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  draw.text("6D SPACE", { x: 0, y: 8, z: 10 }, 1);
  draw.text("3D PROJECTION", { x: 0, y: -8, z: -5 }, 1);

  pen.pop();
}

// Slide 4: Diffraction pattern indexing
function drawSlide4(pen, time, transitionFactor) {
  pen.push();

  // Move everything based on transition
  pen.moveBy(-40 * transitionFactor, 0, 0);

  // Title
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: 2,
    residue: 1.0,
  });

  draw.text("DIFFRACTION PATTERN INDEXING", { x: 0, y: 18, z: 0 }, 1.5);

  // Draw diffraction pattern with indices
  const { points, intensities } = generateDiffractionPattern(0, 0, 5);

  for (let i = 0; i < points.length; i++) {
    drawDiffractionPeak(pen, points[i], intensities[i]);

    // Add indices to some key peaks
    if (intensities[i] > 0.8) {
      applyStyle(pen, {
        color: COLORS.highlight,
        dotSize: 2,
        traceGap: 0.1,
        fuzz: 1,
      });

      // Create 6D index (simplified)
      const distance = Math.sqrt(
        points[i].x * points[i].x + points[i].y * points[i].y,
      );
      const angle = Math.atan2(points[i].y, points[i].x);
      const angleNormalized = (angle / (Math.PI * 2)) * 5; // 5-fold symmetry

      // Generate six integers based on the point's position
      const index1 = Math.round((Math.cos(angle) * distance) / 3);
      const index2 = Math.round((Math.sin(angle) * distance) / 3);
      const index3 = Math.round(
        (Math.cos(angle + (Math.PI * 2) / 5) * distance) / 3,
      );
      const index4 = Math.round(
        (Math.sin(angle + (Math.PI * 2) / 5) * distance) / 3,
      );
      const index5 = Math.round(
        (Math.cos(angle + (Math.PI * 4) / 5) * distance) / 3,
      );
      const index6 = Math.round(
        (Math.sin(angle + (Math.PI * 4) / 5) * distance) / 3,
      );

      // Format as H1..H6 indices
      const indices = `${index1}${index2}${index3}${index4}${index5}${index6}`;

      draw.text(
        indices,
        {
          x: points[i].x + 1.5,
          y: points[i].y + 1.5,
          z: points[i].z,
        },
        0.5,
      );
    }
  }

  // Draw indexing explanation
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  draw.text("INDEXED WITH 6 INTEGERS", { x: 0, y: -21, z: 0 }, 1);
  draw.text("INSTEAD OF 3 HKL INDICES", { x: 0, y: -23, z: 0 }, 1);

  // Visual representation of 6D basis vectors
  const basisCenter = { x: 0, y: -5, z: 0 };
  const basisRadius = 5;

  // Draw 6 vectors in star pattern for icosahedral basis
  applyStyle(pen, {
    color: COLORS.dimension,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;

    drawArrow(
      pen,
      basisCenter,
      {
        x: basisCenter.x + Math.cos(angle) * basisRadius,
        y: basisCenter.y + Math.sin(angle) * basisRadius,
        z: basisCenter.z,
      },
      {
        color: COLORS.dimension,
        dotSize: 3,
        traceGap: 0.1,
        fuzz: 1,
      },
    );

    // Label each basis vector
    draw.text(
      `E${i + 1}`,
      {
        x: basisCenter.x + Math.cos(angle) * (basisRadius + 1.5),
        y: basisCenter.y + Math.sin(angle) * (basisRadius + 1.5),
        z: basisCenter.z,
      },
      0.7,
    );
  }

  pen.pop();
}

// Slide 5: Recovering the structure
function drawSlide5(pen, time, transitionFactor) {
  pen.push();

  // Move everything based on transition
  pen.moveBy(0, 40 * transitionFactor, 0);

  // Title
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 4,
    traceGap: 0.1,
    fuzz: 2,
    residue: 1.0,
  });

  draw.text("SOLVING THE STRUCTURE", { x: 0, y: 18, z: 0 }, 1.5);

  // Draw workflow diagram
  const workflowX = 0;
  const workflowY = 5;
  const boxWidth = 30;
  const boxHeight = 3;
  const boxSpacing = 6;

  // Draw workflow boxes
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  const steps = [
    "COLLECT DIFFRACTION DATA",
    "LOCATE PEAKS AND INDEX",
    "RECOVER PHASES",
    "FOURIER SYNTHESIS",
    "ATOMIC MODEL",
  ];

  for (let i = 0; i < steps.length; i++) {
    // Position for this step
    const boxX = workflowX - boxWidth / 2;
    const boxY = workflowY - i * boxSpacing;

    // Draw box
    pen.polyline(
      [
        { x: boxX, y: boxY, z: 0 },
        { x: boxX + boxWidth, y: boxY, z: 0 },
        { x: boxX + boxWidth, y: boxY - boxHeight, z: 0 },
        { x: boxX, y: boxY - boxHeight, z: 0 },
        { x: boxX, y: boxY, z: 0 },
      ],
      false,
    );

    // Draw step text
    draw.text(
      steps[i],
      { x: workflowX, y: boxY - boxHeight / 2 - 0.5, z: 0 },
      0.8,
    );

    // Draw connecting arrow if not the last step
    if (i < steps.length - 1) {
      drawArrow(
        pen,
        { x: workflowX, y: boxY - boxHeight, z: 0 },
        {
          x: workflowX,
          y: boxY - boxHeight - (boxSpacing - boxHeight) + 1,
          z: 0,
        },
        {
          color: COLORS.text,
          dotSize: 3,
          traceGap: 0.1,
          fuzz: 1,
        },
      );
    }
  }

  // Animated highlight showing current step
  const highlightStep = Math.floor((time % 10) / 2);

  if (highlightStep < steps.length) {
    applyStyle(pen, {
      color: COLORS.highlight,
      dotSize: 4,
      traceGap: 0.1,
      fuzz: 3,
    });

    const boxX = workflowX - boxWidth / 2;
    const boxY = workflowY - highlightStep * boxSpacing;

    pen.polyline(
      [
        { x: boxX, y: boxY, z: 0 },
        { x: boxX + boxWidth, y: boxY, z: 0 },
        { x: boxX + boxWidth, y: boxY - boxHeight, z: 0 },
        { x: boxX, y: boxY - boxHeight, z: 0 },
        { x: boxX, y: boxY, z: 0 },
      ],
      false,
    );
  }

  // Final explanations
  applyStyle(pen, {
    color: COLORS.text,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  pen.colorHex(0xff11ff);

  draw.text("SAME PIPELINE AS CRYSTALS", { x: 0, y: -25, z: 0 }, 1);
  draw.text("BUT WITH HIGHER DIMENSIONS", { x: 0, y: -27, z: 0 }, 1);

  pen.pop();
}

// Draw currently active slide
function drawCurrentSlide(pen, time, slideIndex, transitionProgress) {
  // Calculate transition factor (0 = fully visible, 1 = fully transitioned out)
  let inTransitionFactor = 0;
  let outTransitionFactor = 0;

  if (transitionProgress < 0.5) {
    // First half of transition - current slide moving out
    outTransitionFactor = transitionProgress * 2;
  } else {
    // Second half of transition - next slide moving in
    inTransitionFactor = (1 - transitionProgress) * 2;
  }

  // Draw current slide (moving out)
  switch (slideIndex) {
    case 0:
      drawSlide1(pen, time, outTransitionFactor);
      break;
    case 1:
      drawSlide2(pen, time, outTransitionFactor);
      break;
    case 2:
      drawSlide3(pen, time, outTransitionFactor);
      break;
    case 3:
      drawSlide4(pen, time, outTransitionFactor);
      break;
    case 4:
      drawSlide5(pen, time, outTransitionFactor);
      break;
  }

  // Draw next slide (moving in)
  if (transitionProgress > 0) {
    const nextSlide = (slideIndex + 1) % 5;

    switch (nextSlide) {
      case 0:
        drawSlide1(pen, time, inTransitionFactor);
        break;
      case 1:
        drawSlide2(pen, time, inTransitionFactor);
        break;
      case 2:
        drawSlide3(pen, time, inTransitionFactor);
        break;
      case 3:
        drawSlide4(pen, time, inTransitionFactor);
        break;
      case 4:
        drawSlide5(pen, time, inTransitionFactor);
        break;
    }
  }
}

// Main program function
function program(pen, draw, time) {
  // Initialize on first frame
  if (frameCount === 0) {
    setBGColor(0x000005); // Almost black background

    // Set fixed camera position for presentation view
    setCamera({ x: 0, y: 0, z: 70 }, { x: 0, y: 0, z: 0 });
  }

  // Calculate which slide to show
  const slideTime = time % (SLIDE_DURATION * 5); // 5 slides total
  currentSlide = Math.floor(slideTime / SLIDE_DURATION);

  // Calculate transition progress
  let transitionProgress = 0;
  const slideRemainder = slideTime % SLIDE_DURATION;

  // Transition during the last TRANSITION_TIME seconds of each slide
  if (slideRemainder > SLIDE_DURATION - TRANSITION_TIME) {
    transitionProgress =
      (slideRemainder - (SLIDE_DURATION - TRANSITION_TIME)) / TRANSITION_TIME;
  }

  // Draw current slide with transition effects
  drawCurrentSlide(pen, time, currentSlide, transitionProgress);

  // Draw navigation bar
  pen.push();

  applyStyle(pen, {
    color: COLORS.grid,
    dotSize: 2,
    traceGap: 0.1,
    fuzz: 1,
  });

  // Position at bottom of screen
  pen.moveTo(0, -25, 0);

  // Draw slide indicator dots
  const dotSpacing = 4;
  const totalWidth = (5 - 1) * dotSpacing;

  for (let i = 0; i < 5; i++) {
    const dotX = -totalWidth / 2 + i * dotSpacing;

    // Highlight current slide dot
    if (i === currentSlide) {
      applyStyle(pen, {
        color: { r: 0, g: 0.5, b: 1 },
        dotSize: 12,
        fuzz: 3,
      });
    } else {
      applyStyle(pen, {
        color: COLORS.grid,
        dotSize: 12,
        fuzz: 1,
      });
    }

    // Draw dot
    pen.moveTo(dotX, -30, 0);
    pen.dot();
  }

  pen.pop();

  // Update frame counter
  frameCount++;
}
