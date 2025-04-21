function program(timeMs) {
  // Time variables
  const t = timeMs * 0.001;

  // Configure global properties
  residue(5);

  // Draw cube wireframe with grid lines
  drawCubeFrame(t);

  // Draw solar system inside the cube
  drawSolarSystem(t);
}

//----------------------------------------------------------------------
// drawCubeFrame – CAD‑style cube grid with major / minor subdivisions
//----------------------------------------------------------------------
// • draws outer cube edges every frame with a gentle brightness pulse
// • constructs a dense face grid (major + minor)
//----------------------------------------------------------------------

function drawCubeFrame(t) {
  // ---------------- parameters --------------------------------------
  const cubeSize = 40; // half‑extent of cube
  const majorDiv = 10; // major grid squares per side
  const minorDiv = 5; // minor subdivisions inside each major square
  const spacingMaj = 1.0; // particle spacing for major lines
  const spacingMin = 1.5; // particle spacing for minor lines
  const pulse = Math.sin(t * 0.5) * 0.5 + 0.5; // 0‥1 edge‑glow

  residue(30); // face grid hangs around ≈½ min

  // ----- minor grid (thinner, dimmer) -----
  size(2);
  spacing(spacingMin);
  fuzz(3, 1);
  colorHSV(0.33, 0.3, 0.25); // muted green
  buildFaceGrid(majorDiv * minorDiv, false);

  // ----- major grid (heavier, brighter) ---
  size(4);
  fuzz(3, 2);
  spacing(spacingMaj);
  colorHSV(0.33, 0.35, 0.45); // brighter green
  buildFaceGrid(majorDiv, true);

  // ---------- 2. outer cube edges (pulse every frame) ---------------
  residue(6);
  size(2.2);
  spacing(0.5);
  fuzz(0);
  colorHSV(0.35, 0.6, 0.8 + pulse * 0.2);

  const edges = [
    // bottom square
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
    [1, -1, 1],
    [-1, -1, 1],
    [-1, -1, 1],
    [-1, -1, -1],
    // top square
    [-1, 1, -1],
    [1, 1, -1],
    [1, 1, -1],
    [1, 1, 1],
    [1, 1, 1],
    [-1, 1, 1],
    [-1, 1, 1],
    [-1, 1, -1],
    // uprights
    [-1, -1, -1],
    [-1, 1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, -1, 1],
    [-1, 1, 1],
  ];

  for (let i = 0; i < edges.length; i += 2) {
    move(
      edges[i][0] * cubeSize,
      edges[i][1] * cubeSize,
      edges[i][2] * cubeSize,
    );
    trace(
      edges[i + 1][0] * cubeSize,
      edges[i + 1][1] * cubeSize,
      edges[i + 1][2] * cubeSize,
    );
  }

  // -------- helper to build grid lines on six faces -----------------
  function buildFaceGrid(divisions, drawEveryLine) {
    const step = 2 / divisions; // maps i→[-1,1]
    for (let fixed = 0; fixed < 3; fixed++) {
      // axis held constant on face
      for (const sign of [-1, 1]) {
        // -1 & +1 faces
        const u = (fixed + 1) % 3; // first varying axis
        const v = (fixed + 2) % 3; // second varying axis

        // lines parallel to u (vary v)
        for (let i = 0; i <= divisions; i++) {
          if (!drawEveryLine && i % minorDiv !== 0) continue;
          const frac = -1 + i * step;

          let a = [0, 0, 0],
            b = [0, 0, 0];
          a[fixed] = b[fixed] = sign;
          a[v] = b[v] = frac;
          a[u] = -1;
          b[u] = 1;

          move(a[0] * cubeSize, a[1] * cubeSize, a[2] * cubeSize);
          trace(b[0] * cubeSize, b[1] * cubeSize, b[2] * cubeSize);
        }

        // lines parallel to v (vary u)
        for (let i = 0; i <= divisions; i++) {
          if (!drawEveryLine && i % minorDiv !== 0) continue;
          const frac = -1 + i * step;

          let a = [0, 0, 0],
            b = [0, 0, 0];
          a[fixed] = b[fixed] = sign;
          a[u] = b[u] = frac;
          a[v] = -1;
          b[v] = 1;

          move(a[0] * cubeSize, a[1] * cubeSize, a[2] * cubeSize);
          trace(b[0] * cubeSize, b[1] * cubeSize, b[2] * cubeSize);
        }
      }
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
  const z = 1 - (2 * (i + 0.5)) / n; // z ∈ [‑1, 1]
  const r = Math.sqrt(1 - z * z); // radius in xy‑plane
  const theta = g * i;
  return [r * Math.cos(theta), z, r * Math.sin(theta)];
}

//------------------------------------------------------------------
// spiralSample(i, n)  – already in your file
//------------------------------------------------------------------

//------------------------------------------------------------------
// drawEllipsoid‑Lit
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
function drawEllipsoidLit(cx, cy, cz, rx, ry, rz, hue, samples, opts = {}) {
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

    colorHSV(hue, 0.5, value);
    deposit(px, py, pz);
  }
}

function drawSolarSystem(t) {
  // 80s neon color palette
  const neonPalette = [
    { h: 0.95, name: "Pink" }, // Neon pink
    { h: 0.58, name: "Cyan" }, // Neon cyan
    { h: 0.18, name: "Yellow" }, // Neon yellow
    { h: 0.83, name: "Purple" }, // Neon purple
  ];

  // Draw Sun
  size(6);
  fuzz(6, 0.8);
  residue(4);

  // Draw sun as an ellipsoid with undulating surface
  const sunRadius = 12;
  const pulse = Math.sin(t * 2) * 0.05 + 1;

  // Draw sun surface
  drawEllipsoidLit(
    0,
    0,
    0,
    sunRadius * pulse,
    sunRadius * pulse,
    sunRadius * pulse,
    0 + Math.sin(t * 0.3) * 0.5,
    500,
    { emmissive: true },
  );

  // Draw sun corona
  size(5);
  fuzz(16, 3);
  const coronaPoints = 100;
  for (let i = 0; i < coronaPoints; i++) {
    const angle = (i / coronaPoints) * Math.PI * 2;
    const r = sunRadius * 1.5 + Math.sin(angle * 8 + t * 5) * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = Math.sin(angle * 4 + t * 3) * 2;

    colorHSV(0.5 + Math.sin(t * 0.3) * 0.5, 0.8, 0.9);
    deposit(x, y, z);
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
    const angle = t * planet.speed;
    const orbitRadius = planet.distance;

    // Calculate position
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const y = Math.cos(angle * 0.5) * 2; // Slight up/down motion

    // Draw planet with surface detail
    size(8);
    fuzz(3, 0.5);

    // Draw planet as an ellipsoid
    drawEllipsoidLit(
      x,
      y,
      z,
      planet.size * planet.stretch.x,
      planet.size * planet.stretch.y,
      planet.size * planet.stretch.z,
      planet.color.h,
      100,
      { emmissive: false, ambient: 0.5, light: [0, 0, 0] },
    );

    // Draw moon if planet has one
    if (planet.moons > 0) {
      const moonAngle = angle * 3; // Moon orbits faster
      const moonDist = planet.size * 1.8;
      const moonX = x + Math.cos(moonAngle) * moonDist;
      const moonY = y + Math.sin(moonAngle * 2) * moonDist * 0.5;
      const moonZ = z + Math.sin(moonAngle) * moonDist;

      residue(10);
      // Draw moon as smaller ellipsoid
      drawEllipsoidLit(
        moonX,
        moonY,
        moonZ,
        planet.size * 0.2,
        planet.size * 0.2,
        planet.size * 0.2,
        planet.moonColor.h,
        100,
        { emmissive: false, ambient: 0.5, light: [0, 0, 0] },
      );
    }

    // Draw rings if planet has them
    if (planet.rings) {
      size(4);
      fuzz(2, 0.4);

      // Draw two elliptical rings
      const ringColors = [planet.color.h + 0.3, planet.color.h - 0.3];

      // Draw each ring set
      for (let r = 0; r < 2; r++) {
        const ringRadius = planet.size * (1.8 + r * 0.8);
        const ringWidth = planet.size * 0.2;
        colorHSV(ringColors[r], 0.9, 0.8);

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
            deposit(x + rx, y + ry, z + rz);
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
          deposit(x + rx, y + ry, z + rz);
        }
      }
    }
  }
}
