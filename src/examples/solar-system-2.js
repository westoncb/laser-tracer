function program(timeMs) {
  push(); // save whatever pose we inherited

  const t = timeMs * 0.001;
  residue(5);
  drawSolarSystem(t);
  drawCubeFrame();

  pop(); // restore old pose for next frame
}

//----------------------------------------------------------------------
// drawCubeFrame – CAD‑style cube grid with major / minor subdivisions
//----------------------------------------------------------------------
function drawCubeFrame(t) {
  // ---------------- parameters --------------------------------------
  const cubeSize = 40; // half‑extent of cube
  const majorDiv = 10; // major grid squares per side
  const minorDiv = 5; // minor subdivisions inside each major square
  const spacingMaj = 1.0; // particle spacing for major lines
  const spacingMin = 1.5; // particle spacing for minor lines
  const pulse = Math.sin(t * 0.5) * 0.5 + 0.5; // 0‥1 edge‑glow

  residue(3);

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
    push();
    // Apply face orientation
    pitch(face.rot[0]);
    yaw(face.rot[1]);
    roll(face.rot[2]);

    // Position at the face
    moveRel(0, 0, -cubeSize);

    // ----- minor grid (thinner, dimmer) -----
    size(2);
    spacing(spacingMin);
    fuzz(3, 1);
    colorHSV(0.33, 0.3, 0.25); // muted green
    drawGrid(cubeSize, majorDiv * minorDiv, false, minorDiv);

    // ----- major grid (heavier, brighter) ---
    size(4);
    fuzz(3, 2);
    spacing(spacingMaj);
    colorHSV(0.33, 0.35, 0.45); // brighter green
    drawGrid(cubeSize, majorDiv, true);

    // Draw face label
    push();
    moveRel(0, 0, -0.5); // Slightly in front of the grid
    size(4);
    residue(0.5);
    spacing(0.15);
    fuzz(0);
    colorRGB(0.8, 1, 0.8); // Yellow for labels
    // drawTextRel(face.name, 0, 0, 0, 5);
    pop();

    pop();
  }

  // Helper to draw a grid on a face
  function drawGrid(size, divisions, drawEveryLine, minorStep = 1) {
    const step = (2 * size) / divisions;

    // Draw horizontal lines
    for (let i = 0; i <= divisions; i++) {
      if (!drawEveryLine && i % minorStep !== 0) continue;
      const pos = -size + i * step;

      // Horizontal line
      push();
      moveRel(-size, pos, 0);
      traceRel(2 * size, 0, 0);
      pop();

      // Vertical line
      push();
      moveRel(pos, -size, 0);
      traceRel(0, 2 * size, 0);
      pop();
    }
  }
}

// ----------------------------------------------------------------------
// generateEllipsoid – now with normal-space roll compensation
// ----------------------------------------------------------------------
// cx,cy,cz   – centre
// rx,ry,rz   – radii (stretch)
// samples    – # of points
// rollDeg    – rotation about +Z, degrees  (default 0)
// ----------------------------------------------------------------------
function generateEllipsoid(
  cx,
  cy,
  cz,
  rx,
  ry,
  rz,
  samples,
  rollDeg = 0, // NEW
) {
  const pts = [];
  const norms = [];

  const inv = [1 / rx, 1 / ry, 1 / rz];

  // pre-compute sin/cos of the roll once
  const rollRad = (rollDeg * Math.PI) / 180;
  const cosR = Math.cos(rollRad);
  const sinR = Math.sin(rollRad);

  for (let i = 0; i < samples; i++) {
    // ----- golden-spiral direction on unit sphere -----
    const g = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const z = 1 - (2 * (i + 0.5)) / samples;
    const r = Math.sqrt(1 - z * z);
    const theta = g * i;
    const ux = r * Math.cos(theta);
    const uy = z;
    const uz = r * Math.sin(theta); // (ux,uy,uz) is unit

    // ----- point position (local space) --------------
    pts.push([cx + ux * rx, cy + uy * ry, cz + uz * rz]);

    // ----- normal (scaled sphere → ellipsoid) --------
    let nx = ux * inv[0],
      ny = uy * inv[1],
      nz = uz * inv[2];
    const nLen = Math.hypot(nx, ny, nz);
    nx /= nLen;
    ny /= nLen;
    nz /= nLen;

    // ----- apply Z-roll to normal only ---------------
    // (x',y',z) = Rz(roll) · (x,y,z)
    const rxn = nx * cosR - ny * sinR;
    const ryn = nx * sinR + ny * cosR;

    norms.push([rxn, ryn, nz]);
  }

  return { points: pts, normals: norms };
}

//----------------------------------------------------------------------
// Rendering function with lighting calculations
//----------------------------------------------------------------------
function drawLitPoints(points, normals, base = [0, 0, 0], options = {}) {
  const {
    hue = 0,
    saturation = 0.5,
    intensity = 1,
    emissive = false,
    ambient = 0.2,
    lights = [{ position: [0, 0, 0], brightness: 1, hue: null }],
    specular = 0,
    shininess = 32,
  } = options;

  for (let i = 0; i < points.length; i++) {
    // world-space position of this vertex
    const px = points[i][0] + base[0];
    const py = points[i][1] + base[1];
    const pz = points[i][2] + base[2];
    const [nx, ny, nz] = normals[i];

    let bright = intensity;
    let finalHue = hue,
      colorMix = 0;

    if (!emissive && lights.length) {
      let diff = 0,
        spec = 0,
        hueW = 0,
        hueAcc = 0;

      for (const L of lights) {
        const [lx, ly, lz] = L.position;
        let dx = lx - px,
          dy = ly - py,
          dz = lz - pz;
        const ll = Math.hypot(dx, dy, dz);
        if (!ll) continue;
        dx /= ll;
        dy /= ll;
        dz /= ll;

        const lambert = Math.max(0, nx * dx + ny * dy + nz * dz) * L.brightness;
        diff += lambert;

        if (L.hue != null) {
          hueAcc += lambert * L.hue;
          hueW += lambert;
        }

        if (specular) {
          let vx = -px,
            vy = -py,
            vz = -pz;
          const vl = Math.hypot(vx, vy, vz);
          vx /= vl;
          vy /= vl;
          vz /= vl;
          const hx = dx + vx,
            hy = dy + vy,
            hz = dz + vz;
          const hl = Math.hypot(hx, hy, hz);
          const hDotN = (hx / hl) * nx + (hy / hl) * ny + (hz / hl) * nz;
          if (hDotN > 0) spec += Math.pow(hDotN, shininess) * L.brightness;
        }
      }

      if (hueW) {
        colorMix = Math.min(1, hueW);
        finalHue = (hueAcc / hueW) % 1;
      }

      bright =
        intensity *
        (ambient + (1 - ambient) * Math.min(1, diff) + specular * spec);
    }

    const outHue =
      finalHue !== hue ? hue * (1 - colorMix) + finalHue * colorMix : hue;

    colorHSV(outHue, saturation, Math.min(1, bright));

    push();
    residue(Math.random() * 0.3 + 0.2);
    depositRel(points[i][0], points[i][1], points[i][2]); // still local offset
    pop();
  }
}

//----------------------------------------------------------------------
// Solar system drawing with transform hierarchy
//----------------------------------------------------------------------
function drawSolarSystem(t) {
  // 80s neon color palette
  const neonPalette = [
    { h: 0.95, name: "Pink" }, // Neon pink
    { h: 0.58, name: "Cyan" }, // Neon cyan
    { h: 0.18, name: "Yellow" }, // Neon yellow
    { h: 0.83, name: "Purple" }, // Neon purple
  ];

  // Parameters for planets
  const planets = [
    {
      name: "MERCURY",
      distance: 20,
      size: 3,
      color: neonPalette[0],
      speed: 1,
      rotationSpeed: 2,
      moons: 0,
      stretch: { x: 1, y: 1, z: 1 },
    },
    {
      name: "VENUS",
      distance: 30,
      size: 5,
      color: neonPalette[2],
      speed: 1.0,
      rotationSpeed: 1.5,
      moons: 0,
      stretch: { x: 1, y: 0.95, z: 1 },
    },
    {
      name: "EARTH",
      distance: 42,
      size: 8.0,
      color: neonPalette[1],
      speed: 0.7,
      rotationSpeed: 2,
      moons: 1,
      moonInfo: [
        {
          name: "MOON",
          distance: 1.8,
          size: 0.2,
          color: neonPalette[0],
          speed: 1,
        },
      ],
      stretch: { x: 1.12, y: 1, z: 1 },
    },
    {
      name: "SATURN",
      distance: 72,
      size: 9,
      color: neonPalette[3],
      speed: 0.5,
      rotationSpeed: 3,
      moons: 0,
      rings: true,
      stretch: { x: 1, y: 0.9, z: 1 },
    },
  ];

  // Draw the sun at the center of the solar system
  const sunLight = drawSun(t);

  // Draw each planet in its orbit
  for (const planet of planets) {
    // Calculate orbital position (orbiting in XZ plane)
    const angle = t * planet.speed;
    const orbitX = Math.cos(angle) * planet.distance;
    const orbitZ = Math.sin(angle) * planet.distance;
    const orbitY = Math.sin(angle * 0.3) * 3; // slight up/down motion

    // Planet position
    push();
    move(orbitX, orbitY, orbitZ);

    size(8);
    residue(0.5);
    fuzz(2, 0.5);

    // Draw planet
    drawCelestialBody(
      planet,
      [orbitX, orbitY, orbitZ],
      t,
      planet.name,
      2.5,
      [sunLight], // Pass sun as light source
    );

    // Draw moons
    if (planet.moons > 0 && planet.moonInfo) {
      for (const moon of planet.moonInfo) {
        const moonAngle = t * moon.speed;

        // Moon orbit calculation
        const moonX = Math.cos(moonAngle) * moon.distance * planet.size;
        const moonZ = Math.sin(moonAngle) * moon.distance * planet.size;
        const moonY =
          Math.sin(moonAngle * 2) * moon.distance * planet.size * 0.3;

        push();
        moveRel(moonX, moonY, moonZ);

        // Create a moon object with properties from the moon info
        const moonBody = {
          size: moon.size * planet.size,
          color: moon.color,
          rotationSpeed: moon.speed * 2,
          stretch: { x: 1, y: 1, z: 1 },
        };

        residue(0.2);

        // Draw the moon
        drawCelestialBody(
          moonBody,
          [moonX, moonZ, moonY],
          t,
          moon.name,
          1.5, // Fixed smaller label size for moons
          [sunLight], // Pass sun as light source
        );

        pop();
      }
    }

    // Draw rings if planet has them
    if (planet.rings) {
      drawRings(planet, t, [sunLight]);
    }

    pop();
  }
}

//----------------------------------------------------------------------
// Draw the sun at the center of the solar system
//----------------------------------------------------------------------
function drawSun(t) {
  // Sun parameters
  const sunRadius = 15;
  const pulse = Math.sin(t * 2) * 0.1 + 1;
  const sunHue = (t * 0.1) % 1.0;

  // Generate sun surface geometry
  size(10);
  fuzz(5, 1);
  residue(1);

  // Draw main sun surface as emissive object
  const { points, normals } = generateEllipsoid(
    0,
    0,
    0,
    sunRadius * pulse,
    sunRadius * pulse,
    sunRadius * pulse,
    300,
  );

  move(0, 0, 0);
  // Draw the sun as an emissive light source
  drawLitPoints(points, normals, [0, 0, 0], {
    hue: sunHue,
    saturation: 0.9,
    intensity: 1.2,
    emissive: true,
  });

  // Add the sun as a point light source
  return {
    position: [0, 0, 0],
    brightness: 10,
    hue: sunHue,
  };
}

//----------------------------------------------------------------------
// Draw a planet with optional label
//----------------------------------------------------------------------
/**
 * Draw a celestial body with lighting and optional label
 * Replaces the previous drawPlanet function with a more general one
 */
function drawCelestialBody(
  body,
  position,
  t,
  label = null,
  labelSize = 4,
  lights = [],
) {
  // Apply rotation to the body
  const rotSpeed = body.rotationSpeed || 2;
  push();
  roll(t * rotSpeed * 50);

  // Generate the sphere geometry
  const { points, normals } = generateEllipsoid(
    0,
    0,
    0,
    body.size * body.stretch.x,
    body.size * body.stretch.y,
    body.size * body.stretch.z,
    200,
    t * rotSpeed * 50,
  );

  // Draw the body - making it emissive for now until lighting is fixed
  drawLitPoints(points, normals, position, {
    hue: body.color.h,
    saturation: 0.5,
    intensity: 1,
    emissive: false,
    ambient: 0.7,
    lights: lights,
    specular: 0.4,
    shininess: 64,
  });
  pop();

  // Draw the label if provided
  if (label) {
    push();
    residue(0.5);
    // Position label above the body
    moveRel(0, body.size * 1.3, 0);

    // Label settings
    size(7);
    spacing(0.15);
    fuzz(0);
    colorHSV(body.color.h, 0.9, 1.0);

    // Draw the text
    drawTextRel(label, 0, 0, 0, labelSize * 0.8);
    pop();
  }
}

//----------------------------------------------------------------------
// drawRings – tilted, properly-lit rings
//----------------------------------------------------------------------
// planet   – planet descriptor (needs .size, .color.h)
// t        – time in seconds
// lights   – array of light objects (e.g. [sunLight])
//----------------------------------------------------------------------

function drawRings(planet, t, lights = []) {
  push(); // tracer at planet centre

  /* dynamic tilt ---------------------------------------------------- */
  const tiltDeg = 15 + Math.sin(t * 0.2) * 5; // same wobble as before
  pitch(tiltDeg); // rotate tracer
  const tiltRad = (tiltDeg * Math.PI) / 180;
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);

  /* brushed parameters --------------------------------------------- */
  size(6);
  fuzz(2, 0.1);
  residue(0.35);

  const hues = [(planet.color.h + 0.3) % 1, (planet.color.h + 0.9) % 1];

  // NOTE: Only draw one ring for now
  for (let ringIdx = 0; ringIdx < 1; ringIdx++) {
    const ringRadius = planet.size * (1.8 + ringIdx * 0.8);
    const ringWidth = planet.size * 0.2;
    const hue = hues[ringIdx];

    const pts = [];
    const norms = [];

    /* shared tilted normal for this ring plane --------------------- */
    // original up-normal (0,1,0) rotated around +X by tiltRad
    const nX = 0,
      nY = cosT,
      nZ = sinT;

    /* border */
    for (let j = 0; j < 180; j++) {
      const ang = (j / 180) * Math.PI * 2;
      for (const edge of [-1, +1]) {
        const r = ringRadius + edge * ringWidth;
        pts.push([Math.cos(ang) * r, 0, Math.sin(ang) * r]);
        norms.push([nX, nY, nZ]);
      }
    }

    /* dust fill */
    const dust = 200;
    for (let j = 0; j < dust; j++) {
      const ang = (j / dust) * Math.PI * 2;
      const r = ringRadius - ringWidth + Math.random() * ringWidth * 2;
      const yJ = Math.sin(t * 4 + j) * 0.01; // subtle sparkle
      pts.push([Math.cos(ang) * r, yJ, Math.sin(ang) * r]);
      norms.push([nX, nY, nZ]);
    }

    /* lit render */
    drawLitPoints(
      pts,
      norms,
      /* base = */ [0, 0, 0], // tracer already at centre
      {
        hue: hue * 2,
        saturation: 0.6,
        intensity: 1.0,
        emissive: false, // lighting ON
        ambient: 0.5,
        lights,
        specular: 0.3,
        shininess: 32,
      },
    );
  }

  pop();
}
