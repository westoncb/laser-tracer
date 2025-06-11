/* ================================================================
   SOLAR SYSTEM DEMO
   A modern Laser-Tracer implementation showing a sun, planets, and
   cube frame grid system
================================================================= */

// First frame initialization flag
let firstFrame = true;

// Main program entry point - called every frame
function program(pen, scene, time) {
  // First-time initialization
  if (firstFrame) {
    scene.setBGColor(0x000020); // Deep space blue
    scene.setCamera({ x: 0, y: 0, z: 150 }, { x: 0, y: 0, z: 0 });
    firstFrame = false;
  }

  // Configure global properties
  pen.residue(5);

  // Draw cube wireframe with grid lines
  pen.moveTo(0, 0, 0);
  drawCubeFrame(pen, time);

  // Draw solar system inside the cube
  drawSolarSystem(pen, time);
}

//----------------------------------------------------------------------
// drawCubeFrame – CAD‑style cube grid with major / minor subdivisions
//----------------------------------------------------------------------
function drawCubeFrame(pen, time) {
  // ---------------- parameters --------------------------------------
  const cubeSize = 40; // half‑extent of cube
  const majorDiv = 10; // major grid squares per side
  const minorDiv = 5; // minor subdivisions inside each major square
  const spacingMaj = 1.0; // particle spacing for major lines
  const spacingMin = 1.5; // particle spacing for minor lines

  pen.residue(3);

  // Define cube faces with orientations
  const faces = [
    { name: "FRONT", rot: [0, 0, 0] }, // +Z
    { name: "BACK", rot: [0, 180, 0] }, // -Z
    { name: "LEFT", rot: [0, -90, 0] }, // -X
    { name: "RIGHT", rot: [0, 90, 0] }, // +X
    { name: "TOP", rot: [90, 0, 180] }, // +Y
    { name: "BOTTOM", rot: [-90, 0, 180] }, // -Y
  ];

  // Draw each face of the cube
  for (const face of faces) {
    pen.push();
    // Apply face orientation
    pen.pitch(face.rot[0]);
    pen.yaw(face.rot[1]);
    pen.roll(face.rot[2]);

    // Position at the face
    pen.moveBy(0, 0, -cubeSize);

    // ----- minor grid (thinner, dimmer) -----
    pen.dotSize(4).traceGap(spacingMin).fuzz(3, 1).colorHSV(0.33, 0.3, 0.25); // muted green
    drawGrid(pen, cubeSize, majorDiv * minorDiv, false, minorDiv);

    // ----- major grid (heavier, brighter) ---
    pen.dotSize(4).fuzz(3, 2).traceGap(spacingMaj).colorHSV(0.33, 0.35, 0.45); // brighter green
    drawGrid(pen, cubeSize, majorDiv, true);

    // Draw face label
    pen.push();
    pen
      .moveBy(0, 0, -0.5) // Slightly in front of the grid
      .dotSize(5)
      .residue(0.5)
      .traceGap(0.15)
      .fuzz(0)
      .colorRGB(0.8, 1, 0.8); // Yellow for labels

    // Center the text on the face
    const textWidth = face.name.length * 5; // Approximate width
    pen.moveBy(0, 0, 0).text(face.name, 5);
    pen.pop();

    pen.pop();
  }

  // Helper to draw a grid on a face
  function drawGrid(pen, size, divisions, drawEveryLine, minorStep = 1) {
    const step = (2 * size) / divisions;

    // Draw horizontal lines
    for (let i = 0; i <= divisions; i++) {
      if (!drawEveryLine && i % minorStep !== 0) continue;
      const pos = -size + i * step;

      // Horizontal line
      pen.push();
      pen.moveBy(-size, pos, 0);
      pen.traceBy(2 * size, 0, 0);
      pen.pop();

      // Vertical line
      pen.push();
      pen.moveBy(pos, -size, 0);
      pen.traceBy(0, 2 * size, 0);
      pen.pop();
    }
  }
}

//------------------------------------------------------------------
// spiralSample(i, n)
//   • quasi‑uniform point on the unit sphere
//   • progressive: first N samples already well distributed
//------------------------------------------------------------------
function spiralSample(i, n) {
  const g = Math.PI * (3 - Math.sqrt(5)); // golden angle
  const z = 1 - (2 * (i + 0.5)) / n; // z ∈ [‑1, 1]
  const r = Math.sqrt(1 - z * z); // radius in xy‑plane
  const theta = g * i;
  return [r * Math.cos(theta), z, r * Math.sin(theta)];
}

//------------------------------------------------------------------
// drawEllipsoidLit
//   cx,cy,cz     : centre
//   rx,ry,rz     : radii
//   hue          : 0‑1
//   intensity    : base Value multiplier   (default 1)
//   opts = {
//     light   : [lx, ly, lz]   // point‑light position  (null ⇒ no shading)
//     emissive: false          // true ⇒ skip shading completely
//     ambient : 0.2            // ambient floor (0‑1)
//   }
//------------------------------------------------------------------
function drawEllipsoidLit(
  pen,
  cx,
  cy,
  cz,
  rx,
  ry,
  rz,
  hue,
  samples,
  opts = {},
) {
  const {
    light = null, // null → lighting disabled
    emissive = false,
    ambient = 0.2, // tweak if you want darker nightsides
  } = opts;

  const intensity = 1;
  const N = samples; // surface resolution
  const invRx = 1 / rx,
    invRy = 1 / ry,
    invRz = 1 / rz;

  for (let i = 0; i < N; i++) {
    // --- even point on unit sphere -------------------------------
    const [ux, uy, uz] = spiralSample(i, N);

    // --- surface position ----------------------------------------
    const px = cx + ux * rx;
    const py = cy + uy * ry;
    const pz = cz + uz * rz;

    // --- brightness ----------------------------------------------
    let value = intensity; // default (for emissive / no‑light)

    if (!emissive && light) {
      // surface normal for an ellipsoid: ∇F = [x/rx², y/ry², z/rz²]
      let nx = ux * invRx;
      let ny = uy * invRy;
      let nz = uz * invRz;
      const nLen = Math.hypot(nx, ny, nz);
      nx /= nLen;
      ny /= nLen;
      nz /= nLen;

      // light direction
      let lx = light[0] - px;
      let ly = light[1] - py;
      let lz = light[2] - pz;
      const lLen = Math.hypot(lx, ly, lz);
      lx /= lLen;
      ly /= lLen;
      lz /= lLen;

      const diffuse = Math.max(0, nx * lx + ny * ly + nz * lz); // Lambert
      value = intensity * (ambient + (1 - ambient) * diffuse);
    }

    pen.colorHSV(hue, 0.5, value);
    pen.moveTo(px, py, pz);
    pen.dot();
  }
}

function drawSolarSystem(pen, time) {
  // 80s neon color palette
  const neonPalette = [
    { h: 0.95, name: "Pink" }, // Neon pink
    { h: 0.58, name: "Cyan" }, // Neon cyan
    { h: 0.18, name: "Yellow" }, // Neon yellow
    { h: 0.83, name: "Purple" }, // Neon purple
  ];

  // Draw Sun
  pen.dotSize(4).fuzz(6, 0.8).residue(4);

  // Draw sun as an ellipsoid with undulating surface
  const sunRadius = 12;
  const pulse = Math.sin(time * 2) * 0.05 + 1;

  // Draw sun surface
  drawEllipsoidLit(
    pen,
    0,
    0,
    0,
    sunRadius * pulse,
    sunRadius * pulse,
    sunRadius * pulse,
    0 + Math.sin(time * 0.3) * 0.5,
    500,
    { emissive: true },
  );

  // Draw sun corona
  pen.dotSize(5).fuzz(16, 3);

  const coronaPoints = 100;
  for (let i = 0; i < coronaPoints; i++) {
    const angle = (i / coronaPoints) * Math.PI * 2;
    const r = sunRadius * 1.5 + Math.sin(angle * 8 + time * 5) * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = Math.sin(angle * 4 + time * 3) * 2;

    pen.colorHSV(0.5 + Math.sin(time * 0.3) * 0.5, 0.8, 0.9);
    pen.moveTo(x, y, z);
    pen.dot();
  }

  // Parameters for planets
  const planets = [
    {
      distance: 24,
      size: 4,
      color: neonPalette[0],
      speed: 1.5,
      moons: 0,
      stretch: { x: 1, y: 1, z: 1 },
    },
    {
      distance: 32,
      size: 5,
      color: neonPalette[1],
      speed: 1.0,
      moons: 0,
      stretch: { x: 1, y: 0.95, z: 1 },
    },
    {
      distance: 39,
      size: 8.0,
      color: neonPalette[2],
      speed: 0.7,
      moons: 1,
      moonColor: neonPalette[0],
      stretch: { x: 1, y: 1, z: 1 },
    },
    {
      distance: 52,
      size: 6,
      color: neonPalette[3],
      speed: 0.5,
      moons: 0,
      rings: true,
      stretch: { x: 1, y: 0.9, z: 1 },
    },
  ];

  // Draw each planet
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    const angle = time * planet.speed;
    const orbitRadius = planet.distance;

    // Calculate position
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const y = Math.cos(angle * 0.5) * 2; // Slight up/down motion

    // Draw planet with surface detail
    pen.dotSize(12).fuzz(3, 0.3);

    // Draw planet as an ellipsoid
    drawEllipsoidLit(
      pen,
      x,
      y,
      z,
      planet.size * planet.stretch.x,
      planet.size * planet.stretch.y,
      planet.size * planet.stretch.z,
      planet.color.h,
      120,
      { emissive: false, ambient: 0.3, light: [0, 0, 0] },
    );

    // Draw moon if planet has one
    if (planet.moons > 0) {
      const moonAngle = angle * 3; // Moon orbits faster
      const moonDist = planet.size * 1.8;
      const moonX = x + Math.cos(moonAngle) * moonDist;
      const moonY = y + Math.sin(moonAngle * 2) * moonDist * 0.5;
      const moonZ = z + Math.sin(moonAngle) * moonDist;

      pen.residue(10);
      // Draw moon as smaller ellipsoid
      drawEllipsoidLit(
        pen,
        moonX,
        moonY,
        moonZ,
        planet.size * 0.2,
        planet.size * 0.2,
        planet.size * 0.2,
        planet.moonColor.h,
        100,
        { emissive: false, ambient: 0.5, light: [0, 0, 0] },
      );
    }

    // Draw rings if planet has them
    if (planet.rings) {
      pen.residue(0.5).dotSize(4).fuzz(2, 0.1);

      // Draw two elliptical rings
      const ringColors = [planet.color.h + 0.3, planet.color.h - 0.3];

      // Draw each ring set
      for (let r = 0; r < 2; r++) {
        const ringRadius = planet.size * (1.8 + r * 0.8);
        const ringWidth = planet.size * 0.2;
        pen.colorHSV(ringColors[r], 0.9, 0.8);

        // Draw inner and outer ring bounds
        for (
          let radius = ringRadius - ringWidth;
          radius <= ringRadius + ringWidth;
          radius += ringWidth
        ) {
          for (let j = 0; j < 180; j++) {
            const a = (j / 180) * Math.PI * 2;
            // Tilt the rings
            const rx = Math.cos(a) * radius;
            const ry = Math.sin(a) * radius * 0.2; // Flattened on y-axis to create tilt effect
            const rz = Math.sin(a) * radius;
            pen.moveTo(x + rx, y + ry, z + rz);
            pen.dot();
          }
        }

        // Fill in between the rings with some points
        const fillPoints = 200;
        for (let j = 0; j < fillPoints; j++) {
          const a = (j / fillPoints) * Math.PI * 2;
          const r = ringRadius - ringWidth + Math.random() * (ringWidth * 2);
          const rx = Math.cos(a) * r;
          const ry = Math.sin(a) * r * 0.2;
          const rz = Math.sin(a) * r;
          pen.moveTo(x + rx, y + ry, z + rz);
          pen.dot();
        }
      }
    }
  }
}
