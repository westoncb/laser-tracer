/* ================================================================
   COSMIC BLOOM - Laser-Tracer Demonstration

   This program demonstrates multiple aspects of the Laser-Tracer system:
   - Transform stack (push/pop)
   - Orientation controls (yaw/pitch/roll)
   - Motion commands (moveTo/moveBy)
   - Emission commands (traceTo/traceBy/dot)
   - Brush parameters (size, gap, residue, fuzz)
   - Color control (colorHSV, colorViridis, colorCubehelix)
   - Macro usage (text, polyline, sweep)
================================================================= */

// Static data for our shapes
const spiralPath = [];
const segmentCount = 32;
for (let i = 0; i < segmentCount; i++) {
  const angle = (i / segmentCount) * Math.PI * 2;
  const radius = 5 + (i / segmentCount) * 15;
  spiralPath.push({
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
    z: 0,
  });
}

// Create a small square profile for our sweep operations
const squareProfile = [
  { x: -0.5, y: -0.5, z: 0 },
  { x: 0.5, y: -0.5, z: 0 },
  { x: 0.5, y: 0.5, z: 0 },
  { x: -0.5, y: 0.5, z: 0 },
];

// Initial state for our animation
let mainRotation = 0;
let pulseFactor = 0;
let particlePositions = [];

// Initialize our particle system
for (let i = 0; i < 100; i++) {
  // Create particles in a spherical distribution
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const radius = 20 + Math.random() * 30;

  particlePositions.push({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.sin(phi) * Math.sin(theta),
    z: radius * Math.cos(phi),
    // Add velocity and color phase for animation
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    vz: (Math.random() - 0.5) * 0.2,
    phase: Math.random(),
  });
}

function program(pen, draw, time) {
  setBGColor(0x050520);

  // Update our animation state
  mainRotation += 0.01;
  pulseFactor = Math.sin(time * 1.5) * 0.5 + 0.5; // 0-1 pulsing value

  // Draw title text at the top
  pen
    .push()
    .moveTo(0, 65, 0)
    .colorHex(0x88ccff)
    .dotSize(1.5)
    .traceGap(0.2)
    .residue(2)
    .text("COSMIC BLOOM", 5);
  pen.pop();

  // SECTION 1: Central Spiral Structure
  pen
    .push()
    .dotSize(2 + pulseFactor * 1.5)
    .traceGap(0.5)
    .residue(4 + pulseFactor * 3)
    .fuzz(3, 0.15);

  // Draw three intersecting spirals with different colors and orientations
  for (let spiral = 0; spiral < 3; spiral++) {
    const spiralAngle = spiral * ((Math.PI * 2) / 3) + mainRotation;

    pen
      .push()
      .moveTo(0, 0, 0)
      .yaw((spiralAngle * 180) / Math.PI)
      .pitch(45);

    // Color each spiral uniquely
    const colorPhase = (spiral / 3 + time * 0.1) % 1;
    pen.colorCubehelix(colorPhase, 0.5, -1.5, 1.2);

    // Draw the spiral with the pen.polyline macro
    pen.polyline(spiralPath, false);

    pen.pop();
  }
  pen.pop();

  // SECTION 2: Orbiting Rings
  pen.push().dotSize(1.5).traceGap(1).residue(6).fuzz(2, 0.1);

  // Create three orbiting rings
  for (let ring = 0; ring < 3; ring++) {
    const ringAngle = ring * ((Math.PI * 2) / 3) + mainRotation * 0.7;
    const ringRadius = 35;
    const ringX = ringRadius * Math.cos(ringAngle);
    const ringY = ringRadius * Math.sin(ringAngle);

    pen
      .push()
      .moveTo(ringX, ringY, 0)
      .yaw(time * 20 + ring * 30)
      .pitch(60 + ring * 15)
      .roll(time * 15);

    // Color the ring
    pen.colorViridis((ring / 3 + time * 0.2) % 1);

    // Create a ring using the sweep macro with a circular path
    const ringPath = [];
    const ringSegments = 24;
    for (let i = 0; i < ringSegments; i++) {
      const a = (i / ringSegments) * Math.PI * 2;
      const r = 12;
      ringPath.push({
        x: r * Math.cos(a),
        y: r * Math.sin(a),
        z: 0,
      });
    }

    pen.sweep(ringPath, squareProfile, true);
    pen.pop();
  }
  pen.pop();

  // SECTION 3: Particle System with Trails
  pen
    .push()
    .dotSize(2 + pulseFactor * 2)
    .traceGap(0.4)
    .residue(1.5 + pulseFactor * 2)
    .fuzz(4, 0.3);

  // Update and render each particle
  for (let i = 0; i < particlePositions.length; i++) {
    const p = particlePositions[i];

    // Update position and apply a gentle attraction to origin
    const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    const attraction = 0.01 * (dist / 50);

    p.vx -= p.x * attraction;
    p.vy -= p.y * attraction;
    p.vz -= p.z * attraction;

    // Add some oscillation
    p.vx += Math.sin(time + p.phase * 10) * 0.02;
    p.vy += Math.cos(time * 0.7 + p.phase * 5) * 0.02;
    p.vz += Math.sin(time * 1.3 + p.phase * 8) * 0.02;

    // Update position
    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;

    // Apply a subtle damping to prevent extreme velocities
    p.vx *= 0.995;
    p.vy *= 0.995;
    p.vz *= 0.995;

    // Color based on distance and phase
    const colorT = (p.phase + time * 0.1) % 1;
    const energyLevel = Math.min(
      1,
      Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz) * 10,
    );
    pen.colorHSV(colorT, 0.7 + energyLevel * 0.3, 0.8 + energyLevel * 0.2);

    // Draw the particle
    const prevX = p.x - p.vx * 5;
    const prevY = p.y - p.vy * 5;
    const prevZ = p.z - p.vz * 5;

    // Use draw.trace for world space rendering (independent of pen orientation)
    draw.trace({ x: prevX, y: prevY, z: prevZ }, { x: p.x, y: p.y, z: p.z });

    // Add a dot at the current position
    draw.dot({ x: p.x, y: p.y, z: p.z });
  }
  pen.pop();

  // SECTION 4: Constellation Lines
  pen.push().dotSize(1).traceGap(4).residue(8).fuzz(1, 0.05).colorHex(0xaaddff);

  // Connect particles that are close to each other
  for (let i = 0; i < particlePositions.length; i++) {
    const p1 = particlePositions[i];

    for (let j = i + 1; j < particlePositions.length; j++) {
      const p2 = particlePositions[j];

      // Calculate distance between particles
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dz = p1.z - p2.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // If they're close enough, draw a line between them
      if (dist < 15) {
        // Fade intensity based on distance
        const intensity = 1 - dist / 15;
        pen.colorRGB(0.6 * intensity, 0.8 * intensity, 1 * intensity);

        draw.trace(
          { x: p1.x, y: p1.y, z: p1.z },
          { x: p2.x, y: p2.y, z: p2.z },
        );
      }
    }
  }
  pen.pop();

  // SECTION 5: Animated Signature at Bottom
  pen
    .push()
    .moveTo(0, -65, 0)
    .colorHSV(((time * 20) % 360) / 360, 0.7, 0.9)
    .dotSize(1.2)
    .traceGap(0.2)
    .residue(1.5)
    .text("LASER-TRACER", 3);
  pen.pop();
}
