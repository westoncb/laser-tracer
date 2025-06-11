// SketchPad 2025: Advanced Turbine CAD Visualization
// A clean, professional rendering focused on a single high-quality model

// Persistent state variables
let frameCount = 0;
let lastRenderTime = 0;
let viewAngle = 30;
let viewElevation = 15;
let modelScale = 1.0;
let rotationSpeed = 0.05;

// Material definitions with distinct visual styles
const MATERIALS = {
  TITANIUM: {
    name: "TITANIUM ALLOY",
    color: { r: 0, g: 0.9, b: 0.4 }, // Bright green
    dotSize: 5,
    traceGap: 0.1,
    fuzz: 3,
    fuzzSize: 0.06,
    residue: 0.8,
  },
  STEEL: {
    name: "HEAT-RES STEEL",
    color: { r: 0.9, g: 0.6, b: 0.1 }, // Amber
    dotSize: 6,
    traceGap: 0.15,
    fuzzSize: 0.04,
    fuzz: 2,
    residue: 1.0,
  },
  CERAMIC: {
    name: "CERAMIC COMP",
    color: { r: 0.2, g: 0.8, b: 1.0 }, // Cyan-blue
    dotSize: 4,
    traceGap: 0.08,
    fuzzSize: 0.05,
    fuzz: 4,
    residue: 0.6,
  },
  MEASUREMENT: {
    name: "DIMENSION",
    color: { r: 1, g: 0.9, b: 0.3 }, // Yellow
    dotSize: 3,
    traceGap: 0.12,
    fuzzSize: 0.03,
    fuzz: 2,
    residue: 0.5,
  },
  INTERFACE: {
    name: "INTERFACE",
    color: { r: 0, g: 0.7, b: 0.3 }, // Deep green
    dotSize: 4,
    traceGap: 0.1,
    fuzzSize: 0.02,
    fuzz: 1,
    residue: 0.4,
  },
};

// Apply material settings to pen
function applyMaterial(pen, material) {
  pen
    .colorRGB(material.color.r, material.color.g, material.color.b)
    .dotSize(material.dotSize)
    .traceGap(material.traceGap)
    .fuzz(material.fuzz, material.fuzzSize)
    .residue(material.residue);

  return pen;
}

// Create a turbine blade with proper airfoil shape
function createTurbineBlade(pen, angle, length, twist) {
  pen.push();

  // Rotate to blade position
  pen.yaw(angle);

  // Blade parameters
  const rootDist = 8;
  const bladeLength = length || 10;
  const bladeWidth = 3;
  const bladeTwist = twist || 15;

  // Create blade profile points (airfoil shape)
  const bladePts = [];
  const profilePts = 12;

  // Leading edge to trailing edge (top surface)
  for (let i = 0; i <= profilePts; i++) {
    const t = i / profilePts;
    const width = Math.sin(t * Math.PI) * bladeWidth;
    const chord = t * bladeLength;
    const twist = t * bladeTwist;

    bladePts.push({
      x: rootDist + chord,
      y: width,
      z: 0,
    });
  }

  // Trailing edge to leading edge (bottom surface)
  for (let i = profilePts; i >= 0; i--) {
    const t = i / profilePts;
    const width = -Math.sin(t * Math.PI) * bladeWidth * 0.7; // Asymmetric airfoil
    const chord = t * bladeLength;
    const twist = t * bladeTwist;

    bladePts.push({
      x: rootDist + chord,
      y: width,
      z: 0,
    });
  }

  // Draw blade outline
  pen.polyline(bladePts, true);

  // Add structural details
  // Spar line
  pen.polyline(
    [
      { x: rootDist + 2, y: 0, z: 0 },
      { x: rootDist + bladeLength - 1, y: 0, z: 0 },
    ],
    false,
  );

  // Ribs across the blade
  for (let i = 1; i <= 3; i++) {
    const ribPos = rootDist + (bladeLength * i) / 4;
    const ribWidth = Math.sin((i / 4) * Math.PI) * bladeWidth;

    pen.polyline(
      [
        { x: ribPos, y: -ribWidth * 0.7, z: 0 },
        { x: ribPos, y: ribWidth, z: 0 },
      ],
      false,
    );
  }

  // Add attachment point
  pen.polyline(
    [
      { x: rootDist - 1, y: -2, z: 0 },
      { x: rootDist + 1, y: -2, z: 0 },
      { x: rootDist + 1, y: 2, z: 0 },
      { x: rootDist - 1, y: 2, z: 0 },
      { x: rootDist - 1, y: -2, z: 0 },
    ],
    false,
  );

  // Add bolt pattern
  const boltPoints = [];
  for (let i = 0; i < 6; i++) {
    const boltAngle = (i / 6) * Math.PI * 2;
    boltPoints.push({
      x: rootDist,
      y: Math.sin(boltAngle) * 1.5,
      z: Math.cos(boltAngle) * 1.5,
    });
  }

  pen.polyline(boltPoints, true);

  pen.pop();
}

// Draw turbine hub with cooling channels
function drawTurbineHub(pen) {
  pen.push();

  // Main cylindrical hub
  const hubHeight = 8;
  const hubRadius = 8;
  const segments = 24;

  // Draw front and back circular faces
  for (let side = -1; side <= 1; side += 2) {
    const z = (side * hubHeight) / 2;
    const circlePoints = [];

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      circlePoints.push({
        x: Math.cos(angle) * hubRadius,
        y: Math.sin(angle) * hubRadius,
        z: z,
      });
    }

    pen.polyline(circlePoints, true);
  }

  // Connect circles with axial lines
  for (let i = 0; i < segments; i += 2) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * hubRadius;
    const y = Math.sin(angle) * hubRadius;

    pen.polyline(
      [
        { x: x, y: y, z: -hubHeight / 2 },
        { x: x, y: y, z: hubHeight / 2 },
      ],
      false,
    );
  }

  // Add cooling channels (ceramic material)
  applyMaterial(pen, MATERIALS.CERAMIC);

  // Radial cooling channels
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const x = Math.cos(angle);
    const y = Math.sin(angle);

    // Create channel path
    pen.polyline(
      [
        { x: x * hubRadius * 0.5, y: y * hubRadius * 0.5, z: -hubHeight / 2 },
        { x: x * hubRadius * 0.5, y: y * hubRadius * 0.5, z: hubHeight / 2 },
      ],
      false,
    );

    // Add some details to the channel
    for (let z = -hubHeight / 2; z <= hubHeight / 2; z += hubHeight / 4) {
      pen.polyline(
        [
          { x: x * hubRadius * 0.3, y: y * hubRadius * 0.3, z: z },
          { x: x * hubRadius * 0.7, y: y * hubRadius * 0.7, z: z },
        ],
        false,
      );
    }
  }

  // Return to previous material
  applyMaterial(pen, MATERIALS.TITANIUM);

  // Add central shaft
  const shaftRadius = 2;
  const shaftLength = 20;

  // Shaft circles
  for (let side = -1; side <= 1; side += 2) {
    const z = (side * shaftLength) / 2;
    const circlePoints = [];

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      circlePoints.push({
        x: Math.cos(angle) * shaftRadius,
        y: Math.sin(angle) * shaftRadius,
        z: z,
      });
    }

    pen.polyline(circlePoints, true);
  }

  // Shaft connecting lines
  for (let i = 0; i < segments; i += 3) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * shaftRadius;
    const y = Math.sin(angle) * shaftRadius;

    pen.polyline(
      [
        { x: x, y: y, z: -shaftLength / 2 },
        { x: x, y: y, z: shaftLength / 2 },
      ],
      false,
    );
  }

  pen.pop();
}

// Draw a housing around the turbine (steel material)
function drawTurbineHousing(pen) {
  pen.push();

  // Housing dimensions
  const housing = {
    frontRadius: 12,
    midRadius: 14,
    rearRadius: 10,
    length: 24,
    segments: 24,
  };

  // Draw circular sections of housing at different z positions
  const sections = 5;

  for (let section = 0; section <= sections; section++) {
    const t = section / sections;
    const z = -housing.length / 2 + t * housing.length;

    // Calculate radius at this section (bulged in the middle)
    let radius;
    if (t < 0.5) {
      // Front to middle
      const u = t / 0.5;
      radius = housing.frontRadius * (1 - u) + housing.midRadius * u;
    } else {
      // Middle to rear
      const u = (t - 0.5) / 0.5;
      radius = housing.midRadius * (1 - u) + housing.rearRadius * u;
    }

    // Draw circle at this section
    const circlePoints = [];
    for (let i = 0; i <= housing.segments; i++) {
      const angle = (i / housing.segments) * Math.PI * 2;
      circlePoints.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: z,
      });
    }

    pen.polyline(circlePoints, true);
  }

  // Connect sections with longitudinal lines
  for (let i = 0; i < housing.segments; i += 2) {
    const angle = (i / housing.segments) * Math.PI * 2;
    const points = [];

    for (let section = 0; section <= sections; section++) {
      const t = section / sections;
      const z = -housing.length / 2 + t * housing.length;

      // Calculate radius at this section
      let radius;
      if (t < 0.5) {
        const u = t / 0.5;
        radius = housing.frontRadius * (1 - u) + housing.midRadius * u;
      } else {
        const u = (t - 0.5) / 0.5;
        radius = housing.midRadius * (1 - u) + housing.rearRadius * u;
      }

      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: z,
      });
    }

    pen.polyline(points, false);
  }

  // Add mounting flanges at front and back (thicker lines)
  for (let side = -1; side <= 1; side += 2) {
    const z = (side * housing.length) / 2;
    const radius = side < 0 ? housing.frontRadius : housing.rearRadius;
    const flangeRadius = radius + 2;

    // Flange outer ring
    const flangePoints = [];
    for (let i = 0; i <= housing.segments; i++) {
      const angle = (i / housing.segments) * Math.PI * 2;
      flangePoints.push({
        x: Math.cos(angle) * flangeRadius,
        y: Math.sin(angle) * flangeRadius,
        z: z,
      });
    }

    pen.polyline(flangePoints, true);

    // Bolt holes
    for (let i = 0; i < housing.segments; i += 3) {
      const angle = (i / housing.segments) * Math.PI * 2;
      const cx = Math.cos(angle) * (radius + 1);
      const cy = Math.sin(angle) * (radius + 1);

      const boltPoints = [];
      for (let j = 0; j <= 8; j++) {
        const boltAngle = (j / 8) * Math.PI * 2;
        boltPoints.push({
          x: cx + Math.cos(boltAngle) * 0.6,
          y: cy + Math.sin(boltAngle) * 0.6,
          z: z,
        });
      }

      pen.polyline(boltPoints, true);
    }

    // Spoke connections
    for (let i = 0; i < housing.segments; i += 3) {
      const angle = (i / housing.segments) * Math.PI * 2;
      pen.polyline(
        [
          { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, z: z },
          {
            x: Math.cos(angle) * flangeRadius,
            y: Math.sin(angle) * flangeRadius,
            z: z,
          },
        ],
        false,
      );
    }
  }

  pen.pop();
}

// Draw measurement dimensions
function drawDimensions(pen) {
  pen.push();

  // Overall length dimension
  const length = 24;

  // Bottom dimension line with arrows
  pen.polyline(
    [
      { x: -length / 2, y: -18, z: 0 },
      { x: length / 2, y: -18, z: 0 },
    ],
    false,
  );

  // Extension lines
  pen.polyline(
    [
      { x: -length / 2, y: -16, z: 0 },
      { x: -length / 2, y: -20, z: 0 },
    ],
    false,
  );

  pen.polyline(
    [
      { x: length / 2, y: -16, z: 0 },
      { x: length / 2, y: -20, z: 0 },
    ],
    false,
  );

  // Arrowheads
  pen.polyline(
    [
      { x: -length / 2, y: -18, z: 0 },
      { x: -length / 2 + 1, y: -17.5, z: 0 },
      { x: -length / 2 + 1, y: -18.5, z: 0 },
      { x: -length / 2, y: -18, z: 0 },
    ],
    true,
  );

  pen.polyline(
    [
      { x: length / 2, y: -18, z: 0 },
      { x: length / 2 - 1, y: -17.5, z: 0 },
      { x: length / 2 - 1, y: -18.5, z: 0 },
      { x: length / 2, y: -18, z: 0 },
    ],
    true,
  );

  // Dimension text
  scene.text("24.00", { x: 0, y: -20, z: 0 }, 1);

  // Diameter dimension
  const radius = 14;

  // Radius indicator line
  pen.polyline(
    [
      { x: 0, y: 0, z: 0 },
      { x: radius * 0.7, y: radius * 0.7, z: 0 },
    ],
    false,
  );

  // Radius extension line
  pen.polyline(
    [
      { x: radius * 0.7, y: radius * 0.7, z: 0 },
      { x: radius * 0.9, y: radius * 0.9, z: 0 },
    ],
    false,
  );

  // Dimension text with diameter symbol
  scene.text(
    "Ø" + (radius * 2).toFixed(2),
    { x: radius * 0.85, y: radius * 0.85, z: 0 },
    0.8,
  );

  // Blade length dimension
  const bladeLength = 10;
  const bladeRoot = 8;

  pen.polyline(
    [
      { x: bladeRoot, y: 16, z: 0 },
      { x: bladeRoot + bladeLength, y: 16, z: 0 },
    ],
    false,
  );

  // Extension lines
  pen.polyline(
    [
      { x: bladeRoot, y: 14, z: 0 },
      { x: bladeRoot, y: 18, z: 0 },
    ],
    false,
  );

  pen.polyline(
    [
      { x: bladeRoot + bladeLength, y: 14, z: 0 },
      { x: bladeRoot + bladeLength, y: 18, z: 0 },
    ],
    false,
  );

  // Dimension text
  scene.text("10.00", { x: bladeRoot + bladeLength / 2, y: 17, z: 0 }, 0.8);

  pen.pop();
}

// Draw reference grid
function drawGrid(pen) {
  pen.push();

  // Faded grid material
  const gridMaterial = {
    name: "GRID",
    color: { r: 0, g: 0.4, b: 0.2 },
    dotSize: 1.5,
    traceGap: 0.5,
    fuzz: 1,
    fuzzSize: 0.1,
    residue: 0.3,
  };

  applyMaterial(pen, gridMaterial);

  // Major grid lines
  const gridSize = 50;
  const gridStep = 10;

  // XZ plane (floor)
  for (let x = -gridSize; x <= gridSize; x += gridStep) {
    pen.polyline(
      [
        { x: x, y: -25, z: -gridSize },
        { x: x, y: -25, z: gridSize },
      ],
      false,
    );
  }

  for (let z = -gridSize; z <= gridSize; z += gridStep) {
    pen.polyline(
      [
        { x: -gridSize, y: -25, z: z },
        { x: gridSize, y: -25, z: z },
      ],
      false,
    );
  }

  // Minor grid lines (with lesser intensity)
  pen.colorRGB(0, 0.25, 0.12).dotSize(1);

  const minorStep = gridStep / 5;

  for (let x = -gridSize; x <= gridSize; x += minorStep) {
    // Skip major lines
    if (x % gridStep === 0) continue;

    pen.polyline(
      [
        { x: x, y: -25, z: -gridSize },
        { x: x, y: -25, z: gridSize },
      ],
      false,
    );
  }

  for (let z = -gridSize; z <= gridSize; z += minorStep) {
    // Skip major lines
    if (z % gridStep === 0) continue;

    pen.polyline(
      [
        { x: -gridSize, y: -25, z: z },
        { x: gridSize, y: -25, z: z },
      ],
      false,
    );
  }

  // Origin marker
  pen.colorRGB(0, 1, 0.5).dotSize(3);

  pen.polyline(
    [
      { x: -3, y: -25, z: 0 },
      { x: 3, y: -25, z: 0 },
    ],
    false,
  );

  pen.polyline(
    [
      { x: 0, y: -25, z: -3 },
      { x: 0, y: -25, z: 3 },
    ],
    false,
  );

  pen.pop();
}

// Draw info panel with part details
function drawInfoPanel(pen, time) {
  pen.push();

  applyMaterial(pen, MATERIALS.INTERFACE);

  // Position panel in top left
  const panelX = -25;
  const panelY = 20;
  const panelZ = 20;

  // Panel outline
  pen.polyline(
    [
      { x: panelX, y: panelY, z: panelZ },
      { x: panelX + 20, y: panelY, z: panelZ },
      { x: panelX + 20, y: panelY - 15, z: panelZ },
      { x: panelX, y: panelY - 15, z: panelZ },
      { x: panelX, y: panelY, z: panelZ },
    ],
    false,
  );

  // Panel title
  scene.text(
    "TURBINE ASSEMBLY",
    { x: panelX + 2, y: panelY - 2, z: panelZ },
    1.2,
  );

  // Panel content
  const infoLines = [
    "MODEL: XTR-2025",
    "MATERIAL COMPOSITION:",
    "- TITANIUM ALLOY (PRIMARY)",
    "- HEAT-RES STEEL (HOUSING)",
    "- CERAMIC COMP (COOLING)",
    "MAX TEMP: 1200°C",
    "RPM: 25000",
    "BLADE COUNT: 9",
  ];

  for (let i = 0; i < infoLines.length; i++) {
    const line = infoLines[i];

    // Use appropriate material color for each line
    if (line.includes("TITANIUM")) {
      applyMaterial(pen, MATERIALS.TITANIUM);
    } else if (line.includes("STEEL")) {
      applyMaterial(pen, MATERIALS.STEEL);
    } else if (line.includes("CERAMIC")) {
      applyMaterial(pen, MATERIALS.CERAMIC);
    } else {
      applyMaterial(pen, MATERIALS.INTERFACE);
    }

    scene.text(
      line,
      { x: panelX + 1, y: panelY - 4 - i * 1.3, z: panelZ },
      0.9,
    );
  }

  // Add system time (blinking separator)
  const showColon = Math.sin(time * 4) > 0;
  const timeText = "SYS" + (showColon ? ":" : " ") + time.toFixed(1) + "s";

  applyMaterial(pen, MATERIALS.INTERFACE);
  scene.text(timeText, { x: panelX + 12, y: panelY - 14, z: panelZ }, 0.9);

  pen.pop();
}

// Main program
function program(pen, scene, time) {
  // Initialize on first frame
  if (frameCount === 0) {
    scene.setBGColor(0x000005);

    // Set camera position for technical view
    scene.setCamera({ x: 0, y: 10, z: 120 }, { x: 0, y: 0, z: 0 });
  }

  // Track frame timing
  lastRenderTime = time;

  // Calculate rotation based on time
  const rotation = time * rotationSpeed * 360; // Convert to degrees

  // Draw reference grid first (at bottom layer)
  drawGrid(pen);

  // Set up model at the center
  pen.push();

  // Slowly rotate model for demonstration
  pen.yaw(rotation);
  pen.pitch(viewElevation);

  // Draw turbine components with appropriate materials
  // 1. Draw the housing (steel material)
  applyMaterial(pen, MATERIALS.STEEL);
  drawTurbineHousing(pen);

  // 2. Draw hub (titanium material)
  applyMaterial(pen, MATERIALS.TITANIUM);
  drawTurbineHub(pen);

  // 3. Draw blades with proper spacing (titanium material)
  const bladeCount = 9;
  for (let i = 0; i < bladeCount; i++) {
    const angle = (i / bladeCount) * 360;
    createTurbineBlade(pen, angle, 10, 15);
  }

  pen.pop();

  // Draw dimensions (after model, so they appear on top)
  applyMaterial(pen, MATERIALS.MEASUREMENT);
  drawDimensions(pen);

  // Draw information panel
  drawInfoPanel(pen, time);

  // Draw view mode indicator
  applyMaterial(pen, MATERIALS.INTERFACE);
  scene.text("VIEW: ANALYTICAL", { x: -15, y: 23, z: 0 }, 1.2);

  // Draw material legend
  const legendX = 15;
  const legendY = 20;
  const legendZ = 20;

  // Legend title
  scene.text("MATERIALS", { x: legendX, y: legendY, z: legendZ }, 1);

  // Material indicators
  const materials = [MATERIALS.TITANIUM, MATERIALS.STEEL, MATERIALS.CERAMIC];

  for (let i = 0; i < materials.length; i++) {
    const mat = materials[i];

    // Line sample
    applyMaterial(pen, mat);
    pen.polyline(
      [
        { x: legendX, y: legendY - 2 - i * 1.5, z: legendZ },
        { x: legendX + 5, y: legendY - 2 - i * 1.5, z: legendZ },
      ],
      false,
    );

    // Label
    scene.text(
      mat.name,
      { x: legendX + 6, y: legendY - 2 - i * 1.5, z: legendZ },
      0.9,
    );
  }

  // Update frame counter
  frameCount++;
}
