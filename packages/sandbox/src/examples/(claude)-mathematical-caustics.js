/* ================================================================
   MATHEMATICAL CAUSTICS - Laser-Tracer Native Approach
   Focusing on trajectories, surfaces, and mathematical interest
================================================================= */

// Mathematical constants
const PHI = 1.618033988749895;
const PSI = 2.399459110339632;
const TAU = 6.283185307179586;
const SQRT5 = 2.23606797749979;

let BOOT = true;

function program(pen, draw, time) {
  if (BOOT) {
    setCamera({ x: 0, y: 0, z: 40 }, { x: 0, y: 0, z: 0 });
    BOOT = false;
  }

  setBGColor(0x020204);
  const t = time * 0.2;

  // Mathematical lens system - identifies interesting regions in space
  function createLens(p, time) {
    const focal = Math.log(Math.hypot(p.x, p.y, p.z) + 1.0) * PHI;
    const detail =
      Math.sin(p.x * PHI + p.y * PSI + p.z * SQRT5 + time) * 0.5 + 0.5;

    return {
      focal: focal,
      aperture: 0.01 + detail * 1,
      chromatic: { x: PHI, y: PSI, z: SQRT5 },
    };
  }

  // Vector field that guides particles
  function vectorField(p, time) {
    const lens = createLens(p, time);

    // Create mathematical interest
    const attention =
      p.x * Math.sin(time * PHI) +
      p.y * Math.cos(time * PSI) +
      p.z * Math.sin(time * SQRT5);

    // Create a vector that follows mathematical properties
    return {
      x: Math.sin(p.y * lens.chromatic.y + time) * lens.aperture,
      y: Math.sin(p.z * lens.chromatic.z + attention) * lens.aperture,
      z: Math.sin(p.x * lens.chromatic.x + lens.focal) * lens.aperture,
    };
  }

  // 1. TRACE MATHEMATICAL TRAJECTORIES
  traceInterestingTrajectories(t);

  // 2. DRAW EPHEMERAL SURFACES AT FOCAL POINTS
  drawMathematicalSurfaces(t);

  // 3. HIGHLIGHT MATHEMATICAL INTERSECTIONS
  highlightIntersections(t);

  // Subtle camera motion guided by mathematics
  pen.yaw(Math.sin(t * 0.3) * 10).pitch(Math.cos(t * 0.2) * 8);

  // TRAJECTORY TRACER
  function traceInterestingTrajectories(time) {
    const particleCount = 180;

    // Trace paths through the mathematical fields
    for (let i = 0; i < particleCount; i++) {
      // Starting position - distributed based on golden ratio
      const fi = (i * PHI) % 1; // Distributes points more evenly than random
      const theta = fi * TAU;
      const phi = Math.acos(2 * ((i / particleCount + time * 0.1) % 1) - 1);
      const radius = 8 + Math.sin(i * 0.1) * 2;

      // Create starting point on a sphere
      let p = {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      };

      // Get lens properties for this starting point
      const lens = createLens(p, time);

      // Set up pen properties based on mathematical interest
      const hue = (Math.sin(lens.focal * PHI + time) * 0.5 + 0.5) * 360;
      const saturation = 0.5 + lens.aperture * 0.5;
      const value = 0.6 + lens.aperture * 0.4;

      pen
        .push()
        .dotSize(1 + lens.aperture)
        .traceGap(0.1 + (1.0 - lens.aperture) * 0.4) // Finer detail in interesting regions
        .residue(lens.aperture * 8)
        .fuzz(3, 0.2)
        .colorHSV(hue / 360, saturation, value);

      // Trace a path following the vector field
      const steps = 20 + Math.floor(lens.aperture * 40);
      let lastPoint = p;

      for (let j = 0; j < steps; j++) {
        // Get field vector at current position
        const vector = vectorField(p, time);

        // Scale based on mathematical interest
        const stepSize = 0.1 + lens.aperture * 0.1;

        // Move along field
        p = {
          x: p.x + vector.x * stepSize,
          y: p.y + vector.y * stepSize,
          z: p.z + vector.z * stepSize,
        };

        // Add some subtle chaos based on mathematical properties
        if (j % 5 === 0) {
          const chaos = Math.sin(lens.focal * j) * lens.aperture * 0.2;
          p.x += chaos * Math.sin(time + j);
          p.y += chaos * Math.cos(time * 1.1 + j);
          p.z += chaos * Math.sin(time * 0.9 + j);
        }

        // Draw step
        draw.trace(lastPoint, p);
        lastPoint = p;

        // Update color based on position to show mathematical properties
        if (j % 3 === 0) {
          const newLens = createLens(p, time);
          const attention =
            p.x * newLens.chromatic.x +
            p.y * newLens.chromatic.y +
            p.z * newLens.chromatic.z;
          const newHue = (hue + attention * 20) % 360;
          pen.colorHSV(newHue / 360, saturation, value);
        }
      }

      pen.pop();
    }
  }

  // EPHEMERAL SURFACES
  function drawMathematicalSurfaces(time) {
    // Create surfaces at mathematical interest points
    const loci = 4; // Number of focal surfaces

    for (let s = 0; s < loci; s++) {
      // Position surface at mathematically interesting locations
      const angle = (s / loci) * TAU + time * 0.3;
      const center = {
        x: Math.sin(angle * PHI) * 12,
        y: Math.cos(angle * PSI) * 12,
        z: Math.sin(angle * SQRT5) * 8,
      };

      // Get lens properties
      const lens = createLens(center, time);

      // Skip if not interesting
      if (lens.aperture < 0.8) continue;

      // Surface profiles that respond to mathematical properties
      const segments = 12 + Math.floor(lens.aperture * 8);
      const profile = [];
      const path = [];

      // Create a profile based on mathematical properties
      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * TAU;
        const r =
          1.0 + Math.sin(theta * lens.chromatic.x + time) * 0.5 * lens.aperture;

        profile.push({
          x: r * Math.cos(theta),
          y: r * Math.sin(theta),
          z: 0,
        });
      }

      // Create a path based on mathematical lens
      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * TAU;
        const r =
          3.0 +
          Math.sin(theta * lens.chromatic.y + time * 1.3) * 1.5 * lens.aperture;

        path.push({
          x: r * Math.cos(theta),
          y: 0,
          z: r * Math.sin(theta),
        });
      }

      // Set up pen for the surface
      pen
        .push()
        .colorHSV((((s / loci) * 180 + time * 20) % 360) / 360, 0.6, 0.7)
        .dotSize(0.8)
        .traceGap(0.3)
        .residue(2 + lens.aperture * 3)
        .fuzz(2, 0.1);

      // Position the surface in the world with mathematical orientation
      pen
        .moveTo(center.x, center.y, center.z)
        .yaw(time * 30 + s * 90)
        .pitch(Math.sin(time + s) * 30)
        .roll(Math.cos(time * 0.7 + s) * 20);

      // Draw the surface with the pen's sweep macro
      pen.sweep(path, profile, true);

      pen.pop();
    }
  }

  // MATHEMATICAL INTERSECTIONS
  function highlightIntersections(time) {
    // Add gleams at interesting mathematical points
    const points = 12;

    for (let i = 0; i < points; i++) {
      // Create points distributed through space
      const theta = (i / points) * TAU;
      const phi = Math.acos(Math.sin(i * PHI + time));
      const radius = 10 + Math.sin(i + time) * 6;

      const p = {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      };

      // Get lens properties
      const lens = createLens(p, time);

      // Only highlight truly interesting points
      if (lens.aperture < 0.9) continue;

      // Create a gleam of light
      pen
        .push()
        .colorHSV(
          (Math.sin(lens.focal * PHI) * 60 + 30) / 360, // Golden hues
          0.3, // Low saturation for gleam effect
          0.9, // High value for brightness
        )
        .dotSize(2 + lens.aperture * 2)
        .residue(6)
        .fuzz(12, 1.5);

      draw.dot(p);

      // Add emanating rays for dramatic effect
      const rays = 6;
      for (let r = 0; r < rays; r++) {
        const rayTheta = (r / rays) * TAU;
        const rayPhi = Math.PI / 4; // 45 degree angle

        const rayDir = {
          x: Math.sin(rayPhi) * Math.cos(rayTheta),
          y: Math.sin(rayPhi) * Math.sin(rayTheta),
          z: Math.cos(rayPhi),
        };

        // Ray length varies with mathematical properties
        const length = 3 + lens.aperture * 8;

        // Ray endpoint
        const end = {
          x: p.x + rayDir.x * length,
          y: p.y + rayDir.y * length,
          z: p.z + rayDir.z * length,
        };

        pen.dotSize(1).traceGap(0.05).residue(3);

        draw.trace(p, end);
      }

      pen.pop();
    }
  }
}
