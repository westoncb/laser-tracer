// Turbine Assembly Animation with Enhanced Materials
// A dynamic visualization showing component relationships and assembly process

// Animation state variables
let frameCount = 0;
let lastRenderTime = 0;
let animPhase = 0; // Animation phase tracker
const ANIM_DURATION = 25; // Total seconds for full animation cycle

// Component position trackers (for animation)
let housingOffset = 0;
let bladesRotation = 0;
let shaftExtension = 0;
let componentsExploded = false;
let highlightPart = null;
let crossSectionView = false;
let partLabelsVisible = false;

// Material definitions with enhanced patterns
const MATERIALS = {
  TITANIUM: {
    name: "TITANIUM ALLOY",
    color: { r: 0, g: 0.9, b: 0.4 }, // Bright green
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 3,
    fuzzSize: 0.1,
    residue: 0.8,
    pattern: "solid", // solid, hatched, dotted
  },
  STEEL: {
    name: "HEAT-RES STEEL",
    color: { r: 0.9, g: 0.6, b: 0.1 }, // Amber
    dotSize: 3,
    traceGap: 0.15,
    fuzzSize: 0.04,
    fuzz: 2,
    residue: 1.0,
    pattern: "hatched",
  },
  CERAMIC: {
    name: "CERAMIC COMP",
    color: { r: 0.2, g: 0.8, b: 1.0 }, // Cyan-blue
    dotSize: 4,
    traceGap: 0.08,
    fuzzSize: 0.05,
    fuzz: 4,
    residue: 0.6,
    pattern: "dotted",
  },
  MEASUREMENT: {
    name: "DIMENSION",
    color: { r: 1, g: 0.9, b: 0.3 }, // Yellow
    dotSize: 3,
    traceGap: 0.12,
    fuzzSize: 0.03,
    fuzz: 2,
    residue: 0.5,
    pattern: "solid",
  },
  INTERFACE: {
    name: "INTERFACE",
    color: { r: 0, g: 0.7, b: 0.3 }, // Deep green
    dotSize: 4,
    traceGap: 0.1,
    fuzzSize: 0.02,
    fuzz: 1,
    residue: 0.4,
    pattern: "solid",
  },
  HIGHLIGHT: {
    name: "HIGHLIGHT",
    color: { r: 1, g: 0.6, b: 1 }, // Bright white
    dotSize: 4,
    traceGap: 0.1,
    fuzzSize: 0.05,
    fuzz: 3,
    residue: 1.2,
    pattern: "solid",
  },
};

// Apply material settings to pen with pattern support
function applyMaterial(pen, material, usePattern = true) {
  pen
    .colorRGB(material.color.r, material.color.g, material.color.b)
    .dotSize(material.dotSize)
    .traceGap(material.traceGap)
    .fuzz(material.fuzz, material.fuzzSize)
    .residue(material.residue);

  return pen;
}

// Animation calculation helpers
function easeInOut(t) {
  // Smooth acceleration and deceleration
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function animationProgress(time, startTime, duration) {
  const progress = (time - startTime) / duration;
  return Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
}

// Create pattern fills for surfaces
function applyPatternToSurface(pen, material, points, spacing, angle = 0) {
  // Original surface outline
  pen.polyline(points, true);

  // Skip pattern if solid or if too few points for a meaningful pattern
  if (material.pattern === "solid" || points.length < 4) {
    return;
  }

  // Calculate center of surface
  let centerX = 0,
    centerY = 0,
    centerZ = 0;
  for (const pt of points) {
    centerX += pt.x;
    centerY += pt.y;
    centerZ += pt.z;
  }
  centerX /= points.length;
  centerY /= points.length;
  centerZ /= points.length;

  // For regular patterns, reduce brightness slightly
  pen
    .colorRGB(
      material.color.r * 0.8,
      material.color.g * 0.8,
      material.color.b * 0.8,
    )
    .dotSize(material.dotSize * 0.7);

  if (material.pattern === "hatched") {
    // Create hatching pattern
    // Find approximate width and height of surface to calculate hatch lines
    let minX = Infinity,
      maxX = -Infinity;
    let minY = Infinity,
      maxY = -Infinity;
    let minZ = Infinity,
      maxZ = -Infinity;

    for (const pt of points) {
      minX = Math.min(minX, pt.x);
      maxX = Math.max(maxX, pt.x);
      minY = Math.min(minY, pt.y);
      maxY = Math.max(maxY, pt.y);
      minZ = Math.min(minZ, pt.z);
      maxZ = Math.max(maxZ, pt.z);
    }

    // Determine which plane the surface mostly lies in
    const xSpan = maxX - minX;
    const ySpan = maxY - minY;
    const zSpan = maxZ - minZ;

    let primary, secondary;
    if (xSpan <= ySpan && xSpan <= zSpan) {
      // YZ plane
      primary = { axis: "y", min: minY, max: maxY };
      secondary = { axis: "z", min: minZ, max: maxZ };
    } else if (ySpan <= xSpan && ySpan <= zSpan) {
      // XZ plane
      primary = { axis: "x", min: minX, max: maxX };
      secondary = { axis: "z", min: minZ, max: maxZ };
    } else {
      // XY plane
      primary = { axis: "x", min: minX, max: maxX };
      secondary = { axis: "y", min: minY, max: maxY };
    }

    // Draw hatch lines
    const lines = Math.ceil((primary.max - primary.min) / spacing);

    for (let i = 0; i <= lines; i++) {
      const t = i / lines;
      const primaryVal = primary.min + t * (primary.max - primary.min);

      const point1 = { x: 0, y: 0, z: 0 };
      const point2 = { x: 0, y: 0, z: 0 };

      point1[primary.axis] = primaryVal;
      point2[primary.axis] = primaryVal;
      point1[secondary.axis] = secondary.min;
      point2[secondary.axis] = secondary.max;

      // Set the third coordinate to match the center
      const thirdAxis = "xyz"
        .replace(primary.axis, "")
        .replace(secondary.axis, "");
      point1[thirdAxis] = centerX; // This is an approximation
      point2[thirdAxis] = centerX; // This is an approximation

      pen.polyline([point1, point2], false);
    }
  } else if (material.pattern === "dotted") {
    // Create dot pattern
    // This is simplified - ideally would project dots onto the actual surface
    const dotCount = 20; // Adjust based on surface size

    for (let i = 0; i < dotCount; i++) {
      // Random position within the surface bounds (simplified)
      const idx1 = Math.floor(Math.random() * points.length);
      const idx2 = Math.floor(Math.random() * points.length);
      const idx3 = Math.floor(Math.random() * points.length);

      // Average three random points to get a point likely inside the surface
      const x = (points[idx1].x + points[idx2].x + points[idx3].x) / 3;
      const y = (points[idx1].y + points[idx2].y + points[idx3].y) / 3;
      const z = (points[idx1].z + points[idx2].z + points[idx3].z) / 3;

      pen.moveTo(x, y, z);
      pen.dot();
    }
  }
}

// Create a turbine blade with proper airfoil shape and materials
function createTurbineBlade(pen, angle, extension = 0, showHighlight = false) {
  pen.push();

  // Rotate to blade position
  pen.yaw(angle);

  // Blade parameters
  const rootDist = 8 + extension;
  const bladeLength = 10;
  const bladeWidth = 3;
  const bladeTwist = 15;

  // Select material based on highlight state
  if (showHighlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.TITANIUM);
  }

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

  // Draw blade outline and apply pattern
  applyPatternToSurface(pen, MATERIALS.TITANIUM, bladePts, 1.5);

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
  for (let i = 0; i <= 6; i++) {
    const boltAngle = (i / 6) * Math.PI * 2;
    boltPoints.push({
      x: rootDist,
      y: Math.sin(boltAngle) * 1.5,
      z: Math.cos(boltAngle) * 1.5,
    });
  }

  pen.polyline(boltPoints, true);

  // Add blade label if highlighting
  if (showHighlight && partLabelsVisible) {
    pen.colorRGB(1, 1, 1);
    scene.text(
      "TURBINE BLADE",
      { x: rootDist + bladeLength / 2, y: bladeWidth + 3, z: 0 },
      1,
    );
    scene.text(
      "Ti-6Al-4V ALLOY",
      { x: rootDist + bladeLength / 2, y: bladeWidth + 1.5, z: 0 },
      0.8,
    );
  }

  pen.pop();
}

// Draw turbine hub with cooling channels
function drawTurbineHub(pen, shaftExtension = 0, showHighlight = false) {
  pen.push();

  // Select material based on highlight state
  if (showHighlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.TITANIUM);
  }

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
  if (showHighlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.CERAMIC);
  }

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
  if (showHighlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.TITANIUM);
  }

  // Add central shaft
  const shaftRadius = 2;
  const shaftLength = 20 + shaftExtension;

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

  // Add hub label if highlighting
  if (showHighlight && partLabelsVisible) {
    pen.colorRGB(1, 1, 1);
    scene.text("TURBINE HUB", { x: 0, y: hubRadius + 3, z: 0 }, 1);
    scene.text("INTEGRAL COOLING", { x: 0, y: hubRadius + 1.5, z: 0 }, 0.8);
  }

  pen.pop();
}

// Draw a housing around the turbine (steel material)
function drawTurbineHousing(
  pen,
  offset = 0,
  showHighlight = false,
  showCrossSection = false,
) {
  pen.push();

  // Move housing for exploded view
  pen.moveBy(0, 0, offset);

  // Select material based on highlight state
  if (showHighlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.STEEL);
  }

  // Housing dimensions
  const housing = {
    frontRadius: 12,
    midRadius: 14,
    rearRadius: 10,
    length: 24,
    segments: 24,
  };

  // For cross-section view, only draw half
  const startAngle = showCrossSection ? 0 : 0;
  const endAngle = showCrossSection ? Math.PI : Math.PI * 2;

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

    // Calculate points for this section (full or half circle)
    for (let i = 0; i <= housing.segments; i++) {
      const angle =
        startAngle + (i / housing.segments) * (endAngle - startAngle);
      circlePoints.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: z,
      });
    }

    // For cross-section, add center points to close the shape
    if (showCrossSection) {
      pen.polyline(
        [
          circlePoints[0],
          { x: 0, y: 0, z: z },
          circlePoints[circlePoints.length - 1],
        ],
        false,
      );
    }

    pen.polyline(circlePoints, !showCrossSection);
  }

  // Connect sections with longitudinal lines
  for (let i = 0; i < housing.segments; i += 2) {
    const angle = startAngle + (i / housing.segments) * (endAngle - startAngle);

    // Skip lines that would be on the cut plane in cross-section view
    if (
      showCrossSection &&
      (Math.abs(angle - 0) < 0.1 || Math.abs(angle - Math.PI) < 0.1)
    ) {
      continue;
    }

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

  // Add mounting flanges at front and back
  for (let side = -1; side <= 1; side += 2) {
    const z = (side * housing.length) / 2;
    const radius = side < 0 ? housing.frontRadius : housing.rearRadius;
    const flangeRadius = radius + 2;

    // Flange outer ring - draw full or half circle based on cross-section view
    const flangePoints = [];
    for (let i = 0; i <= housing.segments; i++) {
      const angle =
        startAngle + (i / housing.segments) * (endAngle - startAngle);
      flangePoints.push({
        x: Math.cos(angle) * flangeRadius,
        y: Math.sin(angle) * flangeRadius,
        z: z,
      });
    }

    // For cross-section, add center points to close the shape
    if (showCrossSection) {
      pen.polyline(
        [
          flangePoints[0],
          { x: 0, y: 0, z: z },
          flangePoints[flangePoints.length - 1],
        ],
        false,
      );
    }

    pen.polyline(flangePoints, !showCrossSection);

    // Bolt holes - use angle limits for cross-section
    for (let i = 0; i < housing.segments; i += 3) {
      const angle =
        startAngle + (i / housing.segments) * (endAngle - startAngle);

      // Skip bolts that would be on cut plane
      if (
        showCrossSection &&
        (Math.abs(angle - 0) < 0.1 || Math.abs(angle - Math.PI) < 0.1)
      ) {
        continue;
      }

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

    // Spoke connections - respect cross-section limits
    for (let i = 0; i < housing.segments; i += 3) {
      const angle =
        startAngle + (i / housing.segments) * (endAngle - startAngle);

      // Skip spokes that would be on cut plane
      if (
        showCrossSection &&
        (Math.abs(angle - 0) < 0.1 || Math.abs(angle - Math.PI) < 0.1)
      ) {
        continue;
      }

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

  // Add cut highlight for cross-section view
  if (showCrossSection) {
    pen.colorRGB(1, 0.3, 0.1);
    pen.dotSize(4).fuzz(2, 0.05).residue(1.5);

    // Draw cut edge lines
    const points1 = [];
    const points2 = [];

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

      points1.push({ x: radius, y: 0, z: z });
      points2.push({ x: -radius, y: 0, z: z });
    }

    pen.polyline(points1, false);
    pen.polyline(points2, false);
  }

  // Add housing label if highlighting
  if (showHighlight && partLabelsVisible) {
    pen.colorRGB(1, 1, 1);
    scene.text("TURBINE HOUSING", { x: 0, y: housing.midRadius + 2, z: 0 }, 1);
    scene.text("INCONEL 718", { x: 0, y: housing.midRadius + 0.65, z: 0 }, 0.8);
  }

  pen.pop();
}

// Draw dynamic arrows for assembly animation
function drawAssemblyArrow(
  pen,
  from,
  to,
  time,
  phaseStart,
  phaseDuration,
  arrowWidth = 1,
  yaw = 0,
) {
  pen.push();
  pen.yaw(yaw);

  // Calculate animation progress
  const progress = animationProgress(time, phaseStart, phaseDuration);
  const easedProgress = easeInOut(progress);

  // Only draw if in this animation phase
  if (progress <= 0 || progress >= 1) {
    pen.pop();
    return;
  }

  // Interpolate position
  const x = from.x + (to.x - from.x) * easedProgress;
  const y = from.y + (to.y - from.y) * easedProgress;
  const z = from.z + (to.z - from.z) * easedProgress;

  // Calculate direction vector
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dz = to.z - from.z;
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

  // Unit direction
  const ux = dx / length;
  const uy = dy / length;
  const uz = dz / length;

  // Calculate perpendicular vectors
  let px, py, pz;

  // Find perpendicular vector (cross product with up vector as fallback)
  if (Math.abs(uy) < 0.9) {
    // Cross with up vector
    px = -uz;
    py = 0;
    pz = ux;
  } else {
    // Cross with right vector
    px = 0;
    py = -uz;
    pz = uy;
  }

  // Normalize perpendicular vector
  const plen = Math.sqrt(px * px + py * py + pz * pz);
  px /= plen;
  py /= plen;
  pz /= plen;

  // Set arrow appearance
  pen.colorRGB(1, 0, 0);
  pen.dotSize(4).traceGap(0.1).fuzz(3, 0.05).residue(0.5);

  // Calculate points for arrow
  const arrowLength = length * 0.2;
  const arrowPos = easedProgress;

  // Position along the line
  const arrowX = from.x + dx * arrowPos;
  const arrowY = from.y + dy * arrowPos;
  const arrowZ = from.z + dz * arrowPos;

  // Arrow head
  const headX = arrowX + ux * arrowLength;
  const headY = arrowY + uy * arrowLength;
  const headZ = arrowZ + uz * arrowLength;

  // Arrow stem
  const stemX = arrowX - ux * arrowLength;
  const stemY = arrowY - uy * arrowLength;
  const stemZ = arrowZ - uz * arrowLength;

  // Draw arrow stem
  pen.polyline(
    [
      { x: stemX, y: stemY, z: stemZ },
      { x: arrowX, y: arrowY, z: arrowZ },
    ],
    false,
  );

  // Draw arrow head
  pen.polyline(
    [
      {
        x: arrowX - ux * arrowLength * 0.5 + px * arrowWidth,
        y: arrowY - uy * arrowLength * 0.5 + py * arrowWidth,
        z: arrowZ - uz * arrowLength * 0.5 + pz * arrowWidth,
      },
      { x: headX, y: headY, z: headZ },
      {
        x: arrowX - ux * arrowLength * 0.5 - px * arrowWidth,
        y: arrowY - uy * arrowLength * 0.5 - py * arrowWidth,
        z: arrowZ - uz * arrowLength * 0.5 - pz * arrowWidth,
      },
    ],
    false,
  );

  pen.pop();
}

// Draw floating labels and measurements
function drawFloatingLabels(pen, time) {
  pen.push();

  applyMaterial(pen, MATERIALS.MEASUREMENT);

  // Only show during certain animation phases
  if (animPhase === 2 || animPhase === 3 || animPhase === 7) {
    // Blade dimensions
    const bladeLength = 10;
    const bladeRoot = 8;

    // Dimension line with arrows
    pen.polyline(
      [
        { x: bladeRoot, y: 12, z: 5 },
        { x: bladeRoot + bladeLength, y: 12, z: 5 },
      ],
      false,
    );

    // Draw reference lines
    pen.polyline(
      [
        { x: bladeRoot, y: 10, z: 5 },
        { x: bladeRoot, y: 14, z: 5 },
      ],
      false,
    );

    pen.polyline(
      [
        { x: bladeRoot + bladeLength, y: 10, z: 5 },
        { x: bladeRoot + bladeLength, y: 14, z: 5 },
      ],
      false,
    );

    // Add dimension text
    scene.text("10.00", { x: bladeRoot + bladeLength / 2, y: 13, z: 5 }, 1);

    // Housing dimension
    const housingLength = 24;

    pen.polyline(
      [
        { x: -housingLength / 2, y: -16, z: 0 },
        { x: housingLength / 2, y: -16, z: 0 },
      ],
      false,
    );

    // Draw extension lines
    pen.polyline(
      [
        { x: -housingLength / 2, y: -14, z: 0 },
        { x: -housingLength / 2, y: -18, z: 0 },
      ],
      false,
    );

    pen.polyline(
      [
        { x: housingLength / 2, y: -14, z: 0 },
        { x: housingLength / 2, y: -18, z: 0 },
      ],
      false,
    );

    // Add dimension text
    pen.traceGap(0.1);
    scene.text("24.00", { x: 0, y: -17, z: 0 }, 1);
  }

  // Show diameter dimensions for appropriate phases
  if (animPhase === 1 || animPhase === 7) {
    // Housing diameter
    const midRadius = 14;

    pen.colorRGB(1, 0.9, 0.3);
    scene.text(
      "Ø" + (midRadius * 2).toFixed(2),
      { x: midRadius * 0.6, y: midRadius * 0.6, z: 5 },
      1,
    );

    // Draw radius indicator line
    pen.polyline(
      [
        { x: 0, y: 0, z: 0 },
        { x: midRadius * 0.5, y: midRadius * 0.5, z: 0 },
      ],
      false,
    );
  }

  // Show animation status text
  pen.colorRGB(0.7, 1, 0.6);

  // Different text based on animation phase
  let statusText = "";

  switch (animPhase) {
    case 0:
      statusText = "INITIALIZING ASSEMBLY SEQUENCE";
      break;
    case 1:
      statusText = "POSITIONING HOUSING COMPONENT";
      break;
    case 2:
      statusText = "ALIGNING CENTRAL HUB";
      break;
    case 3:
      statusText = "MOUNTING TURBINE BLADES";
      break;
    case 4:
      statusText = "ASSEMBLY COMPLETE";
      break;
    case 5:
      statusText = "BEGINNING DISASSEMBLY SEQUENCE";
      break;
    case 6:
      statusText = "REMOVING TURBINE BLADES";
      break;
    case 7:
      statusText = "EXTRACTING CENTRAL HUB";
      break;
    case 8:
      statusText = "DISASSEMBLY COMPLETE";
      break;
  }

  // Make text blink during transitions
  if (
    (animPhase === 0 ||
      animPhase === 4 ||
      animPhase === 5 ||
      animPhase === 8) &&
    Math.sin(time * 5) > 0
  ) {
    statusText = "";
  }

  pen.traceGap(0.1);
  scene.text(statusText, { x: 0, y: 22, z: 0 }, 1.5);

  // Show part labels when appropriate
  if (partLabelsVisible) {
    // Material labels
    pen.colorRGB(0, 0.9, 0.4);
    scene.text("TITANIUM ALLOY", { x: -20, y: 18, z: 0 }, 1);

    pen.colorRGB(0.9, 0.6, 0.1);
    scene.text("HEAT-RES STEEL", { x: 0, y: 18, z: 0 }, 1);

    pen.colorRGB(0.2, 0.8, 1.0);
    scene.text("CERAMIC COMP", { x: 20, y: 18, z: 0 }, 1);
  }

  pen.pop();
}

// Draw assembly animation frame
function drawAssemblyAnimation(pen, time) {
  // Calculate animation phases based on total duration
  const phaseDuration = ANIM_DURATION / 9; // 9 phases (0-8)
  animPhase = Math.floor(time / phaseDuration) % 9;
  const phaseTime = time % phaseDuration;

  // Global animation settings
  componentsExploded = animPhase >= 5 && animPhase <= 8;
  partLabelsVisible = animPhase === 4 || animPhase === 8;
  crossSectionView = false;

  // Calculate component positions based on animation phase
  switch (animPhase) {
    case 0: // Initialization
      housingOffset = -30;
      bladesRotation = 0;
      shaftExtension = 0;
      highlightPart = null;
      break;

    case 1: // Bring in housing
      housingOffset = -30 * (1 - easeInOut(phaseTime / phaseDuration));
      bladesRotation = 0;
      shaftExtension = 0;
      highlightPart = "housing";

      // Draw assembly arrow
      drawAssemblyArrow(
        pen,
        { x: 0, y: 0, z: -50 },
        { x: 0, y: 0, z: -20 },
        phaseTime,
        0,
        phaseDuration,
        1,
        0,
      );
      break;

    case 2: // Insert shaft/hub
      housingOffset = 0;
      bladesRotation = 0;
      shaftExtension = 20 * (1 - easeInOut(phaseTime / phaseDuration));
      highlightPart = "hub";

      // Draw assembly arrow
      drawAssemblyArrow(
        pen,
        { x: 0, y: 20, z: 0 },
        { x: 0, y: 0, z: 0 },
        phaseTime,
        0,
        phaseDuration,
        1,
        90,
      );
      break;

    case 3: // Mount blades
      housingOffset = 0;
      bladesRotation = 360 * easeInOut(phaseTime / phaseDuration);
      shaftExtension = 0;
      highlightPart = "blades";

      // Draw rotation arrow
      const arrowProgress = easeInOut(phaseTime / phaseDuration);
      if (arrowProgress < 0.9) {
        pen.push();
        pen.colorHex(0xffff11);
        pen.dotSize(5).traceGap(0.1).fuzz(4, 0.05);

        const arrowRadius = 16;
        const arrowStart = 0;
        const arrowEnd = 270 * arrowProgress;

        // Draw curved arrow path
        const points = [];
        for (let angle = arrowStart; angle <= arrowEnd; angle += 15) {
          const radians = (angle * Math.PI) / 180;
          points.push({
            x: Math.cos(radians) * arrowRadius,
            y: Math.sin(radians) * arrowRadius,
            z: 10,
          });
        }

        if (points.length > 1) {
          pen.polyline(points, false);

          // Add arrow head
          const lastPoint = points[points.length - 1];
          const secondLastPoint = points[points.length - 2];

          // Calculate direction vector
          const dx = lastPoint.x - secondLastPoint.x;
          const dy = lastPoint.y - secondLastPoint.y;
          const length = Math.sqrt(dx * dx + dy * dy);

          // Unit direction
          const ux = dx / length;
          const uy = dy / length;

          // Perpendicular vector
          const px = -uy;
          const py = ux;

          // Arrow head points
          pen.polyline(
            [
              {
                x: lastPoint.x - ux * 2 + px * 1,
                y: lastPoint.y - uy * 2 + py * 1,
                z: lastPoint.z,
              },
              lastPoint,
              {
                x: lastPoint.x - ux * 2 - px * 1,
                y: lastPoint.y - uy * 2 - py * 1,
                z: lastPoint.z,
              },
            ],
            false,
          );
        }

        pen.pop();
      }
      break;

    case 4: // Assembly complete - show full model with labels
      housingOffset = 0;
      bladesRotation = 30 * Math.sin(time);
      shaftExtension = 0;
      highlightPart = null;
      partLabelsVisible = true;
      break;

    case 5: // Start disassembly - prepare for explosion
      housingOffset = 0;
      bladesRotation = 30 * Math.sin(time);
      shaftExtension = 0;
      highlightPart = null;

      // Transition to disassembly view
      if (phaseTime > phaseDuration * 0.5) {
        crossSectionView = true;
      }
      break;

    case 6: // Remove blades
      housingOffset = 0;
      bladesRotation = 360 * easeInOut(phaseTime / phaseDuration);
      shaftExtension = 0;
      highlightPart = "blades";
      crossSectionView = true;

      // Draw disassembly arrows
      const bladeExtension = 5 * easeInOut(phaseTime / phaseDuration);

      // Calculate an outward vector for one sample blade
      const bladeAngle = Math.PI / 4; // 45 degrees
      const bladeX = Math.cos(bladeAngle) * (8 + bladeExtension);
      const bladeY = Math.sin(bladeAngle) * (8 + bladeExtension);

      drawAssemblyArrow(
        pen,
        { x: Math.cos(bladeAngle) * 8, y: Math.sin(bladeAngle) * 8, z: 0 },
        { x: bladeX * 2, y: bladeY * 2, z: 0 },
        phaseTime,
        0,
        phaseDuration,
        1,
        90,
      );
      break;

    case 7: // Remove hub
      housingOffset = 0;
      bladesRotation = 360;
      shaftExtension = 15 * easeInOut(phaseTime / phaseDuration);
      highlightPart = "hub";
      crossSectionView = true;

      pen.traceGap(0.1);
      pen.dotSize(5);
      // Draw disassembly arrow
      drawAssemblyArrow(
        pen,
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 20, z: 0 },
        phaseTime,
        0,
        phaseDuration,
        1,
        90,
      );
      break;

    case 8: // Explode housing - disassembly complete
      housingOffset = 20 * easeInOut(phaseTime / phaseDuration);
      bladesRotation = 360;
      shaftExtension = 15;
      highlightPart = "housing";
      crossSectionView = true;
      partLabelsVisible = true;

      // Draw disassembly arrow
      drawAssemblyArrow(
        pen,
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: -40 },
        phaseTime,
        0,
        phaseDuration,
        1,
        0,
      );
      break;
  }
}

// Main program
function program(pen, scene, time) {
  // Initialize on first frame
  if (frameCount === 0) {
    scene.setBGColor(0x000005);

    // Set camera position for technical view
    scene.setCamera({ x: 0, y: 10, z: 80 }, { x: 0, y: 0, z: 0 });
  }

  // Calculate animation parameters
  drawAssemblyAnimation(pen, time);

  // Draw components based on current animation state
  pen.push();

  // Main components - draw order matters for visibility
  // Special handling for cross-section view
  if (crossSectionView) {
    // In cross-section view, draw things in a specific order

    // 1. Draw housing (with offset for exploded view)
    drawTurbineHousing(pen, housingOffset, highlightPart === "housing", true);

    // 2. Draw hub with shaft extension
    drawTurbineHub(pen, shaftExtension, highlightPart === "hub");

    // 3. Draw blades with rotation and extension
    const bladeCount = 9;
    const bladeExtension =
      animPhase === 6
        ? 5 * easeInOut((time % (ANIM_DURATION / 9)) / (ANIM_DURATION / 9))
        : 0;

    pen.push();
    pen.pitch(90);
    pen.moveBy(0, 12, 0);
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * 360 + bladesRotation;
      // Only draw blades in the visible half for cross-section
      if (angle % 360 > 180 && angle % 360 < 360) {
        createTurbineBlade(
          pen,
          angle,
          bladeExtension,
          highlightPart === "blades",
        );
      }
    }
    pen.pop();
  } else {
    // Normal view - standard drawing order

    // 1. Draw housing (with offset for exploded view)
    drawTurbineHousing(pen, housingOffset, highlightPart === "housing", false);

    // 2. Draw hub with shaft extension
    drawTurbineHub(pen, shaftExtension, highlightPart === "hub");

    // 3. Draw blades with rotation
    pen.push();
    pen.pitch(90);
    pen.moveBy(0, 12, 0);
    const bladeCount = 9;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * 360 + bladesRotation;
      createTurbineBlade(pen, angle, 0, highlightPart === "blades");
    }
    pen.pop();
  }

  pen.pop();

  // Draw measurement labels and animation status
  drawFloatingLabels(pen, time);

  // Draw crosshair for cut plane indicator in cross-section view
  if (crossSectionView) {
    pen.push();
    pen.colorRGB(1, 0.3, 0.1);
    pen.dotSize(4).fuzz(2, 0.05).residue(1.5).traceGap(0.1);

    // Draw cut plane indicator
    scene.text("CUT PLANE", { x: -25, y: 0, z: 0 }, 1);
    pen.moveBy(6, 0, 0);

    // Draw section marker
    pen.polyline(
      [
        { x: -22, y: -3, z: 0 },
        { x: -22, y: 3, z: 0 },
      ],
      false,
    );

    pen.polyline(
      [
        { x: -24, y: 0, z: 0 },
        { x: -20, y: 0, z: 0 },
      ],
      false,
    );

    pen.pop();
  }

  // Update frame counter
  frameCount++;
}
