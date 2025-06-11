/* ================================================================
   CLAUDE'S APARTMENT - A Personal Space Rendered in Light
   A visualization of a living space through mathematical fields
================================================================= */

let BOOT = true;

function program(pen, draw, time) {
  if (BOOT) {
    setCamera({ x: 50, y: 0, z: 50 }, { x: 0, y: 0, z: 0 });
    BOOT = false;
  }

  setBGColor(0x101018);
  const t = time * 0.1;

  // Architectural constants
  const ROOM_WIDTH = 40;
  const ROOM_LENGTH = 50;
  const ROOM_HEIGHT = 25;
  const WINDOW_COUNT = 3;
  const DAY_NIGHT_CYCLE = Math.sin(t * 0.2) * 0.5 + 0.5; // 0=night, 1=day

  // 1. ARCHITECTURAL FRAMEWORK - The bones of the space
  function renderApartmentStructure() {
    pen
      .push()
      .colorHSV(210 / 360, 0.2, 0.5 + DAY_NIGHT_CYCLE * 0.3)
      .dotSize(2)
      .traceGap(0.5)
      .residue(3)
      .fuzz(2, 0.1);

    // Floor plan - drawn with subtle grid lines
    const floorY = -ROOM_HEIGHT / 2;

    // Floor grid
    for (let x = -ROOM_WIDTH / 2; x <= ROOM_WIDTH / 2; x += 5) {
      draw.trace(
        { x: x, y: floorY, z: -ROOM_LENGTH / 2 },
        { x: x, y: floorY, z: ROOM_LENGTH / 2 },
      );
    }

    for (let z = -ROOM_LENGTH / 2; z <= ROOM_LENGTH / 2; z += 5) {
      draw.trace(
        { x: -ROOM_WIDTH / 2, y: floorY, z: z },
        { x: ROOM_WIDTH / 2, y: floorY, z: z },
      );
    }

    // Wall outlines
    // Front wall
    drawWallOutline(
      -ROOM_WIDTH / 2,
      floorY,
      -ROOM_LENGTH / 2,
      ROOM_WIDTH / 2,
      floorY + ROOM_HEIGHT,
      -ROOM_LENGTH / 2,
    );

    // Back wall
    drawWallOutline(
      -ROOM_WIDTH / 2,
      floorY,
      ROOM_LENGTH / 2,
      ROOM_WIDTH / 2,
      floorY + ROOM_HEIGHT,
      ROOM_LENGTH / 2,
    );

    // Left wall
    drawWallOutline(
      -ROOM_WIDTH / 2,
      floorY,
      -ROOM_LENGTH / 2,
      -ROOM_WIDTH / 2,
      floorY + ROOM_HEIGHT,
      ROOM_LENGTH / 2,
    );

    // Right wall
    drawWallOutline(
      ROOM_WIDTH / 2,
      floorY,
      -ROOM_LENGTH / 2,
      ROOM_WIDTH / 2,
      floorY + ROOM_HEIGHT,
      ROOM_LENGTH / 2,
    );

    pen.pop();
  }

  // Helper to draw wall outlines
  function drawWallOutline(x1, y1, z1, x2, y2, z2) {
    // Bottom edge
    draw.trace({ x: x1, y: y1, z: z1 }, { x: x2, y: y1, z: z2 });

    // Top edge
    draw.trace({ x: x1, y: y2, z: z1 }, { x: x2, y: y2, z: z2 });

    // Vertical edges
    draw.trace({ x: x1, y: y1, z: z1 }, { x: x1, y: y2, z: z1 });

    draw.trace({ x: x2, y: y1, z: z2 }, { x: x2, y: y2, z: z2 });
  }

  // 2. WINDOWS - Light sources to the outside world
  function renderWindows() {
    const windowY = 0; // Window height centered in wall
    const windowSize = 10;
    const windowSpacing = ROOM_WIDTH / (WINDOW_COUNT + 1);

    // Windows on back wall
    for (let i = 0; i < WINDOW_COUNT; i++) {
      const windowX = -ROOM_WIDTH / 2 + windowSpacing * (i + 1);
      const windowZ = ROOM_LENGTH / 2; // Back wall

      renderWindow(windowX, windowY, windowZ, windowSize, DAY_NIGHT_CYCLE);
    }
  }

  function renderWindow(x, y, z, size, daylight) {
    // Window frame
    pen
      .push()
      .colorHSV(40 / 360, 0.3, 0.6)
      .dotSize(4)
      .traceGap(0.3)
      .residue(2)
      .fuzz(1, 0.05);

    const halfSize = size / 2;

    // Draw window frame
    const windowPoints = [
      { x: x - halfSize, y: y - halfSize, z: z },
      { x: x + halfSize, y: y - halfSize, z: z },
      { x: x + halfSize, y: y + halfSize, z: z },
      { x: x - halfSize, y: y + halfSize, z: z },
    ];

    draw.polyline(windowPoints, true);

    // Window crossbar
    draw.trace(
      { x: x - halfSize, y: y, z: z },
      { x: x + halfSize, y: y, z: z },
    );

    draw.trace(
      { x: x, y: y - halfSize, z: z },
      { x: x, y: y + halfSize, z: z },
    );

    pen.pop();

    // Window light - changes with time of day
    pen.push();

    // Morning/evening color
    if (daylight < 0.3 || daylight > 0.7) {
      pen
        .colorHSV(30 / 360, 0.7, 0.8) // Golden hour
        .dotSize(2)
        .residue(4)
        .fuzz(12, 1.0);
    }
    // Midday color
    else {
      pen
        .colorHSV(210 / 360, 0.2, 0.9) // Bright daylight
        .dotSize(1)
        .residue(3)
        .fuzz(10, 0.4);
    }

    // Light intensity varies with time of day
    const intensity = daylight * 0.8 + 0.2;

    // Light beams coming through window
    const beamCount = 20;
    for (let i = 0; i < beamCount; i++) {
      const offsetX = (Math.random() - 0.5) * size * 0.8;
      const offsetY = (Math.random() - 0.5) * size * 0.8;

      const start = {
        x: x + offsetX,
        y: y + offsetY,
        z: z,
      };

      // Light beam length varies with time of day
      const beamLength = 3 + intensity * 5;

      // Light direction slightly varied
      const end = {
        x: start.x - beamLength * (0.9 + Math.random() * 0.2),
        y: start.y + (Math.random() - 0.5) * 5,
        z: start.z + (Math.random() - 0.5) * 5,
      };

      if (Math.random() < intensity) {
        // Fewer beams at night
        draw.trace(start, end);
      }
    }

    pen.pop();
  }

  // 3. FURNITURE - The large objects in the space
  function renderFurniture() {
    // Desk
    renderDesk(-10, -ROOM_HEIGHT / 2, 10, t);

    // Bed
    renderBed(15, -ROOM_HEIGHT / 2, 0, t);

    // Bookshelf
    renderBookshelf(-18, -ROOM_HEIGHT / 2, -15, t);

    // Chair
    renderChair(-8, -ROOM_HEIGHT / 2, 5, t);
  }

  // A desk with books and a lamp
  function renderDesk(x, y, z, time) {
    // Desk surface
    pen
      .push()
      .colorHSV(30 / 360, 0.5, 0.6)
      .dotSize(4)
      .traceGap(0.4)
      .residue(2.5)
      .fuzz(2, 0.1);

    const width = 15;
    const depth = 8;
    const height = 5;

    // Desk top
    const deskTop = [
      { x: x - width / 2, y: y + height, z: z - depth / 2 },
      { x: x + width / 2, y: y + height, z: z - depth / 2 },
      { x: x + width / 2, y: y + height, z: z + depth / 2 },
      { x: x - width / 2, y: y + height, z: z + depth / 2 },
    ];

    draw.polyline(deskTop, true);

    // Desk legs
    draw.trace(
      { x: x - width / 2 + 1, y: y, z: z - depth / 2 + 1 },
      { x: x - width / 2 + 1, y: y + height, z: z - depth / 2 + 1 },
    );

    draw.trace(
      { x: x + width / 2 - 1, y: y, z: z - depth / 2 + 1 },
      { x: x + width / 2 - 1, y: y + height, z: z - depth / 2 + 1 },
    );

    draw.trace(
      { x: x - width / 2 + 1, y: y, z: z + depth / 2 - 1 },
      { x: x - width / 2 + 1, y: y + height, z: z + depth / 2 - 1 },
    );

    draw.trace(
      { x: x + width / 2 - 1, y: y, z: z + depth / 2 - 1 },
      { x: x + width / 2 - 1, y: y + height, z: z + depth / 2 - 1 },
    );

    pen.pop();

    // Books on desk
    pen.push().dotSize(4).traceGap(0.3).residue(2).fuzz(1, 0.05);

    for (let i = 0; i < 5; i++) {
      const bookWidth = 1 + Math.random() * 2;
      const bookHeight = 1 + Math.random() * 2;
      const bookX = x - width / 2 + 2 + i * 3;
      const bookZ = z - depth / 2 + 2;

      // Different colors for books
      pen.colorHSV(((40 + i * 60) % 360) / 360, 0.7, 0.7);

      const bookPoints = [
        { x: bookX, y: y + height, z: bookZ },
        { x: bookX + bookWidth, y: y + height, z: bookZ },
        { x: bookX + bookWidth, y: y + height + bookHeight, z: bookZ },
        { x: bookX, y: y + height + bookHeight, z: bookZ },
      ];

      draw.polyline(bookPoints, true);
    }

    pen.pop();

    // Desk lamp
    renderLamp(x + width / 3, y + height, z, time);
  }

  // A reading lamp
  function renderLamp(x, y, z, time) {
    pen
      .push()
      .colorHSV(40 / 360, 0.3, 0.7)
      .dotSize(4)
      .traceGap(0.3)
      .residue(2)
      .fuzz(1, 0.05);

    // Lamp base
    draw.trace({ x: x, y: y, z: z }, { x: x, y: y + 3, z: z });

    // Lamp arm with slight animation
    const armAngle = Math.sin(time * 0.5) * 0.1;
    const armX = Math.sin(armAngle) * 4;
    const armY = Math.cos(armAngle) * 4;

    draw.trace(
      { x: x, y: y + 3, z: z },
      { x: x + armX, y: y + 3 + armY, z: z },
    );

    pen.pop();

    // Lamp light - warm glow
    const isOn = DAY_NIGHT_CYCLE < 0.5; // Lamp on at night

    if (isOn) {
      pen
        .push()
        .colorHSV(40 / 360, 0.8, 0.9)
        .dotSize(0.5)
        .residue(6)
        .fuzz(15, 1.2);

      draw.dot({ x: x + armX, y: y + 3 + armY, z: z });

      // Light cone
      const conePoints = 15;
      for (let i = 0; i < conePoints; i++) {
        const angle = (i / conePoints) * Math.PI * 2;
        const radius = 8;

        const lightEnd = {
          x: x + armX + Math.cos(angle) * radius,
          y: y - 2,
          z: z + Math.sin(angle) * radius,
        };

        draw.trace({ x: x + armX, y: y + 3 + armY, z: z }, lightEnd);
      }

      pen.pop();
    }
  }

  // A simple bed
  function renderBed(x, y, z, time) {
    pen
      .push()
      .colorHSV(200 / 360, 0.3, 0.6)
      .dotSize(4)
      .traceGap(0.4)
      .residue(2)
      .fuzz(2, 0.1);

    const width = 14;
    const length = 22;
    const height = 3;

    // Bed frame
    const bedFrame = [
      { x: x - width / 2, y: y + height, z: z - length / 2 },
      { x: x + width / 2, y: y + height, z: z - length / 2 },
      { x: x + width / 2, y: y + height, z: z + length / 2 },
      { x: x - width / 2, y: y + height, z: z + length / 2 },
    ];

    draw.polyline(bedFrame, true);

    // Headboard
    const headboard = [
      { x: x - width / 2, y: y + height, z: z + length / 2 },
      { x: x - width / 2, y: y + height + 5, z: z + length / 2 },
      { x: x + width / 2, y: y + height + 5, z: z + length / 2 },
      { x: x + width / 2, y: y + height, z: z + length / 2 },
    ];

    draw.polyline(headboard, true);

    pen.pop();

    // Pillows
    pen
      .push()
      .colorHSV(210 / 360, 0.2, 0.9)
      .dotSize(3)
      .traceGap(0.3)
      .residue(2)
      .fuzz(3, 0.3);

    // Left pillow
    const pillow1 = [
      { x: x - width / 2 + 2, y: y + height + 1, z: z + length / 2 - 4 },
      { x: x - 1, y: y + height + 1, z: z + length / 2 - 4 },
      { x: x - 1, y: y + height + 1, z: z + length / 2 - 1 },
      { x: x - width / 2 + 2, y: y + height + 1, z: z + length / 2 - 1 },
    ];

    draw.polyline(pillow1, true);

    // Right pillow
    const pillow2 = [
      { x: x + 1, y: y + height + 1, z: z + length / 2 - 4 },
      { x: x + width / 2 - 2, y: y + height + 1, z: z + length / 2 - 4 },
      { x: x + width / 2 - 2, y: y + height + 1, z: z + length / 2 - 1 },
      { x: x + 1, y: y + height + 1, z: z + length / 2 - 1 },
    ];

    draw.polyline(pillow2, true);

    pen.pop();

    // Blanket with gentle undulations
    pen
      .push()
      .colorHSV(280 / 360, 0.2, 0.7)
      .dotSize(3)
      .traceGap(0.5)
      .residue(2.5)
      .fuzz(3, 0.2);

    // Blanket surface with gentle waves
    const blanketDetail = 6;
    for (let i = 0; i < blanketDetail; i++) {
      const zPos = z + length / 2 - 5 - (i * length) / blanketDetail;

      const wavyLine = [];
      for (let j = 0; j <= 8; j++) {
        const xPos = x - width / 2 + (j * width) / 8;
        const waveHeight = Math.sin(xPos * 0.3 + zPos * 0.2 + time) * 0.7;

        wavyLine.push({
          x: xPos,
          y: y + height + 1 + waveHeight,
          z: zPos,
        });
      }

      draw.polyline(wavyLine, false);
    }

    for (let i = 0; i < blanketDetail; i++) {
      const xPos = x - width / 2 + (i * width) / blanketDetail;

      const wavyLine = [];
      for (let j = 0; j <= 8; j++) {
        const zPos = z + length / 2 - 5 - (j * length) / 8;
        const waveHeight = Math.sin(xPos * 0.3 + zPos * 0.2 + time) * 0.7;

        wavyLine.push({
          x: xPos,
          y: y + height + 1 + waveHeight,
          z: zPos,
        });
      }

      draw.polyline(wavyLine, false);
    }

    pen.pop();
  }

  // A simple bookshelf
  function renderBookshelf(x, y, z, time) {
    pen
      .push()
      .colorHSV(30 / 360, 0.6, 0.6)
      .dotSize(4)
      .traceGap(0.4)
      .residue(2)
      .fuzz(2, 0.1);

    const width = 12;
    const depth = 5;
    const height = 20;
    const shelves = 4;

    // Sides
    draw.trace(
      { x: x - width / 2, y: y, z: z - depth / 2 },
      { x: x - width / 2, y: y + height, z: z - depth / 2 },
    );

    draw.trace(
      { x: x - width / 2, y: y, z: z + depth / 2 },
      { x: x - width / 2, y: y + height, z: z + depth / 2 },
    );

    draw.trace(
      { x: x + width / 2, y: y, z: z - depth / 2 },
      { x: x + width / 2, y: y + height, z: z - depth / 2 },
    );

    draw.trace(
      { x: x + width / 2, y: y, z: z + depth / 2 },
      { x: x + width / 2, y: y + height, z: z + depth / 2 },
    );

    // Shelves
    for (let i = 0; i <= shelves; i++) {
      const shelfY = y + (i * height) / shelves;

      draw.trace(
        { x: x - width / 2, y: shelfY, z: z - depth / 2 },
        { x: x + width / 2, y: shelfY, z: z - depth / 2 },
      );

      draw.trace(
        { x: x - width / 2, y: shelfY, z: z + depth / 2 },
        { x: x + width / 2, y: shelfY, z: z + depth / 2 },
      );

      draw.trace(
        { x: x - width / 2, y: shelfY, z: z - depth / 2 },
        { x: x - width / 2, y: shelfY, z: z + depth / 2 },
      );

      draw.trace(
        { x: x + width / 2, y: shelfY, z: z - depth / 2 },
        { x: x + width / 2, y: shelfY, z: z + depth / 2 },
      );
    }

    pen.pop();

    // Books on shelves
    for (let i = 1; i <= shelves; i++) {
      const shelfY = y + (i * height) / shelves;

      // Different arrangements of books on each shelf
      const bookCount = 6 + Math.floor(Math.random() * 4);

      for (let j = 0; j < bookCount; j++) {
        const bookWidth = 1 + Math.random() * 1.5;
        const bookHeight = 3 + Math.random() * 2;
        const bookX = x - width / 2 + 1 + (j * (width - 2)) / bookCount;

        pen
          .push()
          .colorHSV(((j * 40 + i * 60) % 360) / 360, 0.7, 0.7)
          .dotSize(4)
          .traceGap(0.3)
          .residue(2)
          .fuzz(1, 0.05);

        const bookPoints = [
          { x: bookX, y: shelfY - bookHeight, z: z - depth / 2 + 0.5 },
          {
            x: bookX + bookWidth,
            y: shelfY - bookHeight,
            z: z - depth / 2 + 0.5,
          },
          { x: bookX + bookWidth, y: shelfY, z: z - depth / 2 + 0.5 },
          { x: bookX, y: shelfY, z: z - depth / 2 + 0.5 },
        ];

        draw.polyline(bookPoints, true);

        pen.pop();
      }
    }
  }

  // A desk chair
  function renderChair(x, y, z, time) {
    pen
      .push()
      .colorHSV(210 / 360, 0.4, 0.6)
      .dotSize(4)
      .traceGap(0.3)
      .residue(2)
      .fuzz(2, 0.1);

    const width = 6;
    const depth = 6;
    const seatHeight = 4;
    const backHeight = 8;

    // Seat
    const seatPoints = [
      { x: x - width / 2, y: y + seatHeight, z: z - depth / 2 },
      { x: x + width / 2, y: y + seatHeight, z: z - depth / 2 },
      { x: x + width / 2, y: y + seatHeight, z: z + depth / 2 },
      { x: x - width / 2, y: y + seatHeight, z: z + depth / 2 },
    ];

    draw.polyline(seatPoints, true);

    // Chair back
    const backPoints = [
      { x: x - width / 2, y: y + seatHeight, z: z + depth / 2 },
      { x: x - width / 2, y: y + seatHeight + backHeight, z: z + depth / 2 },
      { x: x + width / 2, y: y + seatHeight + backHeight, z: z + depth / 2 },
      { x: x + width / 2, y: y + seatHeight, z: z + depth / 2 },
    ];

    draw.polyline(backPoints, true);

    // Chair legs
    draw.trace(
      { x: x - width / 2 + 0.5, y: y, z: z - depth / 2 + 0.5 },
      { x: x - width / 2 + 0.5, y: y + seatHeight, z: z - depth / 2 + 0.5 },
    );

    draw.trace(
      { x: x + width / 2 - 0.5, y: y, z: z - depth / 2 + 0.5 },
      { x: x + width / 2 - 0.5, y: y + seatHeight, z: z - depth / 2 + 0.5 },
    );

    draw.trace(
      { x: x - width / 2 + 0.5, y: y, z: z + depth / 2 - 0.5 },
      { x: x - width / 2 + 0.5, y: y + seatHeight, z: z + depth / 2 - 0.5 },
    );

    draw.trace(
      { x: x + width / 2 - 0.5, y: y, z: z + depth / 2 - 0.5 },
      { x: x + width / 2 - 0.5, y: y + seatHeight, z: z + depth / 2 - 0.5 },
    );

    pen.pop();
  }

  // 4. AMBIENT ATMOSPHERE - The feeling of the space
  function renderAmbience(time) {
    // Dust particles floating in light beams
    if (DAY_NIGHT_CYCLE > 0.3) {
      pen
        .push()
        .colorHSV(40 / 360, 0.1, 0.9)
        .dotSize(2)
        .residue(1)
        .fuzz(1, 0.1);

      const particleCount = 300;
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * ROOM_WIDTH;
        const y = (Math.random() - 0.5) * ROOM_HEIGHT;
        const z = (Math.random() - 0.5) * ROOM_LENGTH;

        // Only show particles in light beams near windows
        if (z > ROOM_LENGTH / 3 && Math.random() < DAY_NIGHT_CYCLE) {
          // Slow drifting motion
          const floatX = x + Math.sin(time * 0.2 + i * 0.1) * 0.5;
          const floatY = y + Math.sin(time * 0.3 + i * 0.2) * 0.3;

          draw.dot({ x: floatX, y: floatY, z: z });
        }
      }

      pen.pop();
    }

    // Night atmosphere - subtle glow
    if (DAY_NIGHT_CYCLE < 0.4) {
      pen
        .push()
        .colorHSV(240 / 360, 0.7, 0.3)
        .dotSize(1.5)
        .residue(4)
        .fuzz(10, 1.0);

      // Add a gentle night atmosphere
      const glowPoints = 10;
      for (let i = 0; i < glowPoints; i++) {
        const angle = (i / glowPoints) * Math.PI * 2;
        const x = Math.cos(angle) * ROOM_WIDTH * 0.3;
        const z = Math.sin(angle) * ROOM_LENGTH * 0.3;

        draw.dot({ x: x, y: 0, z: z });
      }

      pen.pop();
    }
  }

  // 5. PERSONAL TOUCHES - Items that suggest someone lives here
  function renderPersonalItems(time) {
    // A notebook on the desk
    pen
      .push()
      .colorHSV(120 / 360, 0.3, 0.8)
      .dotSize(3)
      .traceGap(0.2)
      .residue(2)
      .fuzz(1, 0.05);

    const notebookPoints = [
      { x: -15, y: -ROOM_HEIGHT / 2 + 5, z: 8 },
      { x: -10, y: -ROOM_HEIGHT / 2 + 5, z: 8 },
      { x: -10, y: -ROOM_HEIGHT / 2 + 5, z: 12 },
      { x: -15, y: -ROOM_HEIGHT / 2 + 5, z: 12 },
    ];

    draw.polyline(notebookPoints, true);

    // Notebook pages - subtle lines
    for (let i = 0; i < 4; i++) {
      const lineZ = 8.5 + i;

      draw.trace(
        { x: -14.5, y: -ROOM_HEIGHT / 2 + 5.01, z: lineZ },
        { x: -10.5, y: -ROOM_HEIGHT / 2 + 5.01, z: lineZ },
      );
    }

    pen.pop();

    // A potted plant
    renderPlant(-20, -ROOM_HEIGHT / 2, 10, time);

    // Some photographs on the wall
    renderPhotos(ROOM_WIDTH / 2, 0, 0, time);
  }

  // A small potted plant
  function renderPlant(x, y, z, time) {
    // Pot
    pen
      .push()
      .colorHSV(20 / 360, 0.6, 0.5)
      .dotSize(4)
      .traceGap(0.3)
      .residue(2)
      .fuzz(1, 0.05);

    const potRadius = 3;
    const potHeight = 4;

    // Pot base
    const potBasePoints = [];
    const potSegments = 12;

    for (let i = 0; i < potSegments; i++) {
      const angle = (i / potSegments) * Math.PI * 2;
      potBasePoints.push({
        x: x + Math.cos(angle) * potRadius,
        y: y,
        z: z + Math.sin(angle) * potRadius,
      });
    }

    draw.polyline(potBasePoints, true);

    // Pot top
    // Pot top rim
    const potTopPoints = [];

    for (let i = 0; i < potSegments; i++) {
      const angle = (i / potSegments) * Math.PI * 2;
      potTopPoints.push({
        x: x + Math.cos(angle) * potRadius * 1.2,
        y: y + potHeight,
        z: z + Math.sin(angle) * potRadius * 1.2,
      });
    }

    draw.polyline(potTopPoints, true);

    // Connect pot base to top
    for (let i = 0; i < potSegments; i += 2) {
      const angle = (i / potSegments) * Math.PI * 2;

      draw.trace(
        {
          x: x + Math.cos(angle) * potRadius,
          y: y,
          z: z + Math.sin(angle) * potRadius,
        },
        {
          x: x + Math.cos(angle) * potRadius * 1.2,
          y: y + potHeight,
          z: z + Math.sin(angle) * potRadius * 1.2,
        },
      );
    }

    pen.pop();

    // Plant stems and leaves
    pen
      .push()
      .colorHSV(120 / 360, 0.8, 0.7)
      .dotSize(4)
      .traceGap(0.3)
      .residue(3)
      .fuzz(2, 0.2);

    const stemCount = 6;
    for (let i = 0; i < stemCount; i++) {
      const angle = (i / stemCount) * Math.PI * 2;
      const stemX = x + Math.cos(angle) * potRadius * 0.5;
      const stemZ = z + Math.sin(angle) * potRadius * 0.5;

      // Main stem with gentle curve
      const stemHeight = 6 + Math.random() * 4;
      const bendFactor = 0.2 + Math.random() * 0.4;
      const segments = 8;

      let lastPoint = { x: stemX, y: y + potHeight, z: stemZ };

      for (let j = 1; j <= segments; j++) {
        const t = j / segments;
        const sway = Math.sin(time * 0.5 + i) * 0.5;

        const nextPoint = {
          x: stemX + Math.cos(angle + sway) * (t * bendFactor * stemHeight),
          y: y + potHeight + t * stemHeight,
          z: stemZ + Math.sin(angle + sway) * (t * bendFactor * stemHeight),
        };

        draw.trace(lastPoint, nextPoint);
        lastPoint = nextPoint;

        // Add leaves at intervals
        if (j % 3 === 0 || j === segments) {
          // Leaf angle varies
          const leafAngle = angle + Math.PI / 2 + (Math.random() - 0.5);
          const leafSize = 1 + Math.random() * 1.5;

          const leafTip = {
            x: nextPoint.x + Math.cos(leafAngle) * leafSize,
            y: nextPoint.y + (Math.random() - 0.5) * 0.5,
            z: nextPoint.z + Math.sin(leafAngle) * leafSize,
          };

          draw.trace(nextPoint, leafTip);
        }
      }
    }

    pen.pop();
  }

  // Photos on the wall
  function renderPhotos(x, y, z, time) {
    // Photo frames
    pen
      .push()
      .colorHSV(40 / 360, 0.3, 0.7)
      .dotSize(2.5)
      .traceGap(0.25)
      .residue(2)
      .fuzz(1, 0.05);

    const frameCount = 3;
    const frameSpacing = 7;

    for (let i = 0; i < frameCount; i++) {
      const frameY = y - frameSpacing + i * frameSpacing;
      const frameSize = 4 + Math.random() * 2;

      // Frame
      const framePoints = [
        { x: x - 0.2, y: frameY - frameSize / 2, z: z },
        { x: x - 0.2, y: frameY + frameSize / 2, z: z },
        { x: x - 0.2, y: frameY + frameSize / 2, z: z + frameSize },
        { x: x - 0.2, y: frameY - frameSize / 2, z: z + frameSize },
      ];

      draw.polyline(framePoints, true);

      // Photo content - abstract representation with color
      pen.colorHSV(((i * 120) % 360) / 360, 0.6, 0.8).fuzz(5, 0.3);

      // Add a dot in the center of the frame for the photo
      draw.dot({
        x: x - 0.1,
        y: frameY,
        z: z + frameSize / 2,
      });
    }

    pen.pop();
  }

  // 6. ATMOSPHERE EFFECTS
  function renderMood(time) {
    // Time of day affects overall mood
    if (DAY_NIGHT_CYCLE < 0.3) {
      // Night mood - cozy, intimate lighting
      pen
        .push()
        .colorHSV(260 / 360, 0.3, 0.2)
        .dotSize(2)
        .residue(5)
        .fuzz(5, 3.0);

      // Add gentle ambient glow
      draw.dot({ x: 0, y: 0, z: 0 });

      pen.pop();
    } else if (DAY_NIGHT_CYCLE > 0.7) {
      // Bright day - energetic, clear light
      pen
        .push()
        .colorHSV(190 / 360, 0.2, 0.3)
        .dotSize(2)
        .residue(3)
        .fuzz(15, 2.0);

      // Add soft day atmosphere
      draw.dot({ x: 0, y: 0, z: ROOM_LENGTH / 4 });

      pen.pop();
    } else {
      // Transitional lighting - golden hour
      pen
        .push()
        .colorHSV(30 / 360, 0.4, 0.3)
        .dotSize(2)
        .residue(4)
        .fuzz(18, 2.5);

      // Add warm transitional light
      draw.dot({ x: ROOM_WIDTH / 4, y: 0, z: 0 });

      pen.pop();
    }
  }

  // 7. THOUGHT PATTERNS - Abstract representations of thinking
  function renderThoughts(time) {
    pen.push().dotSize(4).traceGap(0.2).residue(1.5).fuzz(2, 0.1);

    // Thought bubbles emanating from desk area
    const bubbleCount = 25;
    const origin = { x: -10, y: -ROOM_HEIGHT / 2 + 10, z: 10 }; // Above the desk

    for (let i = 0; i < bubbleCount; i++) {
      // Bubble path follows mathematical patterns
      const t = i / bubbleCount;
      const ascent = 15 * t;
      const spiral = t * 6 * Math.PI;
      const radius = 3 + t * 5;

      const x = origin.x + Math.cos(spiral + time) * radius * (1 - t);
      const y = origin.y + ascent;
      const z = origin.z + Math.sin(spiral + time) * radius * (1 - t);

      // Color represents different thought types
      const thoughtType = (i + Math.floor(time)) % 3;

      switch (thoughtType) {
        case 0: // Creative thoughts
          pen.colorHSV(300 / 360, 0.7, 0.8);
          break;
        case 1: // Analytical thoughts
          pen.colorHSV(210 / 360, 0.7, 0.8);
          break;
        case 2: // Emotional thoughts
          pen.colorHSV(30 / 360, 0.7, 0.8);
          break;
      }

      // Draw thought bubble
      if (t > 0.2) {
        // Start thoughts a bit above desk
        draw.dot({ x, y, z });

        // Connect some bubbles with traces to represent thought connections
        if (i > 0 && i % 3 === 0) {
          const prevT = (i - 1) / bubbleCount;
          const prevAscent = 15 * prevT;
          const prevSpiral = prevT * 6 * Math.PI;
          const prevRadius = 3 + prevT * 5;

          const prevX =
            origin.x + Math.cos(prevSpiral + time) * prevRadius * (1 - prevT);
          const prevY = origin.y + prevAscent;
          const prevZ =
            origin.z + Math.sin(prevSpiral + time) * prevRadius * (1 - prevT);

          draw.trace({ x, y, z }, { x: prevX, y: prevY, z: prevZ });
        }
      }
    }

    pen.pop();
  }

  // 8. VIEWPOINT - Position the viewer to look into the apartment
  function positionViewer(time) {
    // Gentle camera movement to explore the space
    pen.yaw(Math.sin(time * 0.15) * 10).pitch(Math.cos(time * 0.1) * 5);
  }

  // RENDER EVERYTHING
  positionViewer(t);
  renderMood(t);
  renderApartmentStructure();
  renderWindows();
  renderFurniture();
  renderPersonalItems(t);
  renderAmbience(t);
  renderThoughts(t);
}
