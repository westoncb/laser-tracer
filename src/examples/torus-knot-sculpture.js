/* =============================================================
   Laser-Tracer demo: Mathematical Torus Knot Sculpture
   -------------------------------------------------------------
   A singular, elegant mathematical structure based on a torus knot
   with flowing energy patterns and dynamic symmetry.
   
   This demonstrates:
   - Precision parametric equations
   - Coherent mathematical structure
   - Elegant, flowing animations
   - Advanced coordinate transformations
   - Field visualization techniques
================================================================ */

// ────────────────── Structure Parameters ────────────────────────
const KNOT_PARAMS = {
  p: 2,           // Number of times around the torus
  q: 3,           // Number of times through the hole
  radius: 18,     // Major radius 
  thickness: 6,   // Minor radius
  tubularSegments: 45, // Resolution of the primary curve
  radialSegments: 10,   // Resolution around the tube
  harmonics: 4,         // Number of harmonic waves
  detail: 0.4           // Level of geometric detail (0-1)
};

// ────────────────── Visual Parameters ──────────────────────────
const VISUAL = {
  primaryColor: { r: 0.1, g: 0.8, b: 1.0 },     // Main structure color
  energyColor: { r: 1.0, g: 0.3, b: 0.7 },      // Energy flow color
  accentColor: { r: 1.0, g: 0.9, b: 0.2 },      // Accent color
  dotSize: 7,         // Base dot size for main structure
  energyDotSize: 9,   // Size for energy particles
  traceGap: 0.15,       // Gap between dots on main structure
  energyTraceGap: 0.5, // Gap for energy traces
  fuzzFactor: 1,        // Particle fuzz amount
  residue: 0.8          // Particle lifetime
};

// ────────────────── Mathematical Utilities ─────────────────────
// Convert Euler angles to quaternion
function eulerToQuaternion(pitch, yaw, roll) {
  // Convert to radians
  const p = pitch * Math.PI / 180;
  const yz = yaw * Math.PI / 180;
  const r = roll * Math.PI / 180;
  
  // Calculate half angles
  const cp = Math.cos(p/2);
  const sp = Math.sin(p/2);
  const cy = Math.cos(yz/2);
  const sy = Math.sin(yz/2);
  const cr = Math.cos(r/2);
  const sr = Math.sin(r/2);
  
  // Compute quaternion components
  const w = cp * cy * cr + sp * sy * sr;
  const x = sp * cy * cr - cp * sy * sr;
  const y = cp * sy * cr + sp * cy * sr;
  const z = cp * cy * sr - sp * sy * cr;
  
  return { w, x, y, z };
}

// Rotate a point using a quaternion
function rotatePointWithQuaternion(point, quat) {
  const { x, y, z } = point;
  const { w, x: qx, y: qy, z: qz } = quat;
  
  // Convert point to quaternion form (0, x, y, z)
  const px = w * x + qy * z - qz * y;
  const py = w * y + qz * x - qx * z;
  const pz = w * z + qx * y - qy * x;
  const pw = -qx * x - qy * y - qz * z;
  
  // Apply rotation (quaternion multiplication)
  return {
    x: px * w + pw * qx + py * qz - pz * qy,
    y: py * w + pw * qy + pz * qx - px * qz,
    z: pz * w + pw * qz + px * qy - py * qx
  };
}

// ────────────────── Geometry Generators ─────────────────────────
// Generate the main torus knot curve
function generateTorusKnotCurve(params, t, timeOffset = 0) {
  const { p, q, radius, thickness } = params;
  
  // Calculate the position on the knot
  const angle = t * Math.PI * 2;
  const pAngle = p * angle;
  const qAngle = q * angle;
  
  // Basic torus knot equation
  const r = radius + thickness * Math.cos(qAngle);
  
  // Add dynamic wave pattern based on time
  const wave = Math.sin(pAngle * 3 + timeOffset * 5) * 
               Math.sin(qAngle * 2 + timeOffset * 3) * 
               thickness * 0.15;
  
  return {
    x: r * Math.cos(pAngle) + wave,
    y: r * Math.sin(pAngle) + wave,
    z: thickness * Math.sin(qAngle)
  };
}

// Generate points for a circle in a plane
function generateCirclePoints(radius, segments) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      z: 0
    });
  }
  return points;
}

// Calculate the Frenet frame at a point on the curve
function calculateFrenetFrame(curve, t, params, deltaT = 0.001) {
  const { tubularSegments } = params;
  
  // Get current point and a point slightly ahead
  const current = curve(t);
  const ahead = curve(t + deltaT);
  
  // Calculate tangent vector (T)
  const tangent = {
    x: ahead.x - current.x,
    y: ahead.y - current.y,
    z: ahead.z - current.z
  };
  
  // Normalize tangent
  const tangentLength = Math.sqrt(
    tangent.x * tangent.x + 
    tangent.y * tangent.y + 
    tangent.z * tangent.z
  );
  
  tangent.x /= tangentLength;
  tangent.y /= tangentLength;
  tangent.z /= tangentLength;
  
  // Calculate a reference up vector
  let up = { x: 0, y: 1, z: 0 };
  
  // If tangent is close to up, use a different reference
  if (Math.abs(tangent.y) > 0.99) {
    up = { x: 1, y: 0, z: 0 };
  }
  
  // Calculate binormal (B) using cross product of tangent and up
  const binormal = {
    x: tangent.y * up.z - tangent.z * up.y,
    y: tangent.z * up.x - tangent.x * up.z,
    z: tangent.x * up.y - tangent.y * up.x
  };
  
  // Normalize binormal
  const binormalLength = Math.sqrt(
    binormal.x * binormal.x + 
    binormal.y * binormal.y + 
    binormal.z * binormal.z
  );
  
  binormal.x /= binormalLength;
  binormal.y /= binormalLength;
  binormal.z /= binormalLength;
  
  // Calculate normal (N) using cross product of binormal and tangent
  const normal = {
    x: binormal.y * tangent.z - binormal.z * tangent.y,
    y: binormal.z * tangent.x - binormal.x * tangent.z,
    z: binormal.x * tangent.y - binormal.y * tangent.x
  };
  
  return { tangent, normal, binormal };
}

// Generate a circular cross-section at a specific point along the knot
function generateCrossSection(center, frame, radius, segments, twist) {
  const { tangent, normal, binormal } = frame;
  const circle = generateCirclePoints(radius, segments);
  
  // Apply twist rotation to each point
  return circle.map(point => {
    // Convert the twist angle to radians
    const twistRad = twist * Math.PI / 180;
    
    // Apply twist rotation in the tangent plane
    const twistedX = point.x * Math.cos(twistRad) - point.y * Math.sin(twistRad);
    const twistedY = point.x * Math.sin(twistRad) + point.y * Math.cos(twistRad);
    
    // Orient the circle in the correct plane using the Frenet frame
    return {
      x: center.x + normal.x * twistedX + binormal.x * twistedY,
      y: center.y + normal.y * twistedX + binormal.y * twistedY,
      z: center.z + normal.z * twistedX + binormal.z * twistedY
    };
  });
}

// Generate spiral patterns along the torus knot
function generateEnergySpiral(params, t, spiralOffset, timeOffset) {
  const { p, q, radius, thickness } = params;
  const point = generateTorusKnotCurve(params, t, timeOffset);
  
  // Calculate spiral offset from the main curve
  const angle = t * Math.PI * 2;
  const spiralAngle = angle * 10 + timeOffset * 20;
  
  // Generate spiraling pattern around the main curve
  const offsetR = thickness * 0.4;
  const frame = calculateFrenetFrame(
    (t) => generateTorusKnotCurve(params, t, timeOffset), 
    t, 
    params
  );
  
  // Rotate the offset around the tangent
  const offsetX = Math.cos(spiralAngle) * offsetR;
  const offsetY = Math.sin(spiralAngle) * offsetR;
  
  return {
    x: point.x + frame.normal.x * offsetX + frame.binormal.x * offsetY,
    y: point.y + frame.normal.y * offsetX + frame.binormal.y * offsetY,
    z: point.z + frame.normal.z * offsetX + frame.binormal.z * offsetY
  };
}

// Generate energy node points along the knot
function generateEnergyNodes(params, count, time) {
  const nodes = [];
  const { p, q } = params;
  
  for (let i = 0; i < count; i++) {
    // Distribute nodes evenly, then add time-based movement
    let t = (i / count) + time * 0.1;
    t = t % 1; // Keep within 0-1 range
    
    // Generate the node position
    const point = generateTorusKnotCurve(params, t, time);
    
    // Add a pulsing effect
    const pulse = Math.sin(time * 3 + i * 0.7) * 0.5 + 0.5;
    
    nodes.push({
      position: point,
      intensity: pulse,
      phase: i / count
    });
  }
  
  return nodes;
}

// ────────────────── Drawing Functions ─────────────────────────
// Draw the main torus knot structure
function drawTorusKnot(pen, params, time) {
  const { tubularSegments, radialSegments, thickness, detail } = params;
  
  // Set visual properties for main structure
  pen.colorRGB(
      VISUAL.primaryColor.r, 
      VISUAL.primaryColor.g, 
      VISUAL.primaryColor.b
    )
    .dotSize(VISUAL.dotSize)
    .traceGap(VISUAL.traceGap)
    .fuzz(VISUAL.fuzzFactor, 0.1)
    .residue(VISUAL.residue);
  
  // Calculate the twist rate
  const twistRate = 360 + Math.sin(time * 0.5) * 180;
  
  // Generate longitudinal lines along the knot
  for (let i = 0; i < radialSegments; i++) {
    const longitudinalLine = [];
    const angle = (i / radialSegments) * Math.PI * 2;
    
    for (let j = 0; j <= tubularSegments; j++) {
      const t = j / tubularSegments;
      const centerPoint = generateTorusKnotCurve(params, t, time);
      
      // Calculate the Frenet frame at this point
      const frame = calculateFrenetFrame(
        (t) => generateTorusKnotCurve(params, t, time), 
        t, 
        params
      );
      
      // Generate a point on the tube surface
      const tubeRadius = thickness * (0.8 + Math.sin(t * Math.PI * params.p * 2 + time * 2) * 0.2);
      const twist = t * twistRate;
      const tubePoint = generateCrossSection(
        centerPoint, 
        frame,
        tubeRadius,
        radialSegments,
        twist
      )[i];
      
      longitudinalLine.push(tubePoint);
    }
    
    // Draw the longitudinal line
    pen.polyline(longitudinalLine, false);
  }
  
  // Generate cross-section rings at intervals
  const ringInterval = Math.max(3, Math.floor(tubularSegments * (1 - detail) * 0.1));
  for (let i = 0; i < tubularSegments; i += ringInterval) {
    const t = i / tubularSegments;
    const centerPoint = generateTorusKnotCurve(params, t, time);
    
    // Calculate the Frenet frame at this point
    const frame = calculateFrenetFrame(
      (t) => generateTorusKnotCurve(params, t, time), 
      t, 
      params
    );
    
    // Generate a circle in the correct orientation
    const tubeRadius = thickness * (0.8 + Math.sin(t * Math.PI * params.p * 2 + time * 2) * 0.2);
    const twist = t * twistRate;
    const crossSection = generateCrossSection(
      centerPoint, 
      frame,
      tubeRadius,
      radialSegments,
      twist
    );
    
    // Draw the cross-section ring
    pen.polyline(crossSection, true);
  }
}

// Draw energy flows along the torus knot
function drawEnergyFlows(pen, params, time) {
  const { tubularSegments, harmonics } = params;
  
  // Set visual properties for energy flows
  pen.colorRGB(
      VISUAL.energyColor.r, 
      VISUAL.energyColor.g, 
      VISUAL.energyColor.b
    )
    .dotSize(VISUAL.energyDotSize)
    .traceGap(VISUAL.energyTraceGap)
    .fuzz(VISUAL.fuzzFactor + 1, 0.15)
    .residue(VISUAL.residue * 0.8);
  
  // Draw spiral energy flows along the knot
  for (let h = 0; h < harmonics; h++) {
    const spiralPhase = h / harmonics;
    const timeOffset = time + spiralPhase * 10;
    
    const spiralPoints = [];
    const spiralSteps = tubularSegments * 2;
    
    for (let i = 0; i <= spiralSteps; i++) {
      const t = (i / spiralSteps + time * 0.1) % 1;
      spiralPoints.push(generateEnergySpiral(
        params, 
        t, 
        h, 
        timeOffset
      ));
    }
    
    pen.polyline(spiralPoints, false);
  }
}

// Draw pulsing energy nodes at key points
function drawEnergyNodes(pen, params, time) {
  const nodeCount = params.p * params.q; // One node for each "crossing"
  const nodes = generateEnergyNodes(params, nodeCount, time);
  
  // Draw each energy node
  for (const node of nodes) {
    pen.push();
    
    // Set color based on node phase
    pen.colorRGB(
      VISUAL.accentColor.r * node.intensity, 
      VISUAL.accentColor.g * node.intensity, 
      VISUAL.accentColor.b * node.intensity
    )
    .dotSize(VISUAL.dotSize * (0.8 + node.intensity * 0.6))
    .fuzz(VISUAL.fuzzFactor + 4 * node.intensity, 0.2)
    .residue(VISUAL.residue * 0.6);
    
    // Position and draw the node
    pen.moveTo(node.position.x, node.position.y, node.position.z);
    pen.dot();
    
    // Draw energy rays emanating from the node
    if (node.intensity > 0.7) {
      const rayCount = 5;
      const rayLength = node.intensity * 3;
      
      for (let i = 0; i < rayCount; i++) {
        const angle1 = (i / rayCount) * Math.PI * 2;
        const angle2 = ((i + 0.5) / rayCount) * Math.PI * 2;
        
        // Create a quaternion for rotation
        const quat = eulerToQuaternion(
          Math.sin(angle1) * 180, 
          Math.cos(angle2) * 180,
          Math.sin(time + node.phase * 10) * 180
        );
        
        // Direction vector
        const dir = rotatePointWithQuaternion({ x: rayLength, y: 0, z: 0 }, quat);
        
        // Draw the ray
        pen.traceBy(dir.x, dir.y, dir.z);
      }
    }
    
    pen.pop();
  }
}

// ────────────────── Main Entry Point ───────────────────────────
let first = true;

function program(pen, d, time) {
  if (first) {
    setBGColor(0x000812); // Deep blue background
    first = false;
  }
  
  // Dynamic camera movement
  // const cameraTime = time * 0.2;
  // const cameraRadius = 60 + Math.sin(cameraTime * 0.7) * 15;
  // const cameraAzimuth = cameraTime * 15;
  // const cameraElevation = 30 + Math.sin(cameraTime * 0.5) * 15;
  
  // orbitCamera(
  //   { x: 0, y: 0, z: 0 }, 
  //   cameraRadius, 
  //   cameraAzimuth, 
  //   cameraElevation
  // );

  // Apply a gentle overall rotation to the structure
  pen.push();
  pen.yaw(time * 5);
  pen.pitch(Math.sin(time * 0.3) * 10);
  
  // Draw all components of the structure
  drawTorusKnot(pen, KNOT_PARAMS, time);
  drawEnergyFlows(pen, KNOT_PARAMS, time);
  // drawEnergyNodes(pen, KNOT_PARAMS, time);
  
  pen.pop();
}