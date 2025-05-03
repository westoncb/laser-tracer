/* ================================================================
   DREAM FIELDS - Mathematical Dream Visualization
   A system that creates dreamlike visual structures using
   mathematical field transformations and fluid transitions
================================================================= */

// Mathematical constants with dream significance
const PHI = 1.618033988749895; // Golden ratio (beauty in dreams)
const LUNA = 1.256637061435917; // Moon ratio (lunar dream influence)
const THETA = 3.141592653589793; // Theta brain waves (dream state)
const REM = 0.577215664901532; // REM constant (dream phase)

let BOOT = true;

function program(pen, draw, time) {
  setBGColor(0x000205);
  const t = time * 1; // Original slowed dream-time: 0.1

  if (BOOT) {
    setCamera({ x: 0, y: 0, z: 24 }, { x: 0, y: 0, z: 0 });
    BOOT = false;
  }

  // Dream state transitions - fluid shifts between dream phases
  const dreamPhase = (Math.sin(t * 0.2) + 1) * 0.5; // 0-1 dream cycle
  const dreamDepth = Math.pow(Math.sin(t * 0.13) * 0.5 + 0.5, 2); // Depth of dream state
  const lucidity = Math.sin(t * 0.3) * 0.5 + 0.5; // Dream lucidity

  // 1. DREAM FIELD - Defines the underlying dream space
  function dreamField(p, time) {
    // Dreams have their own distorted physics and space
    const distortedSpace = {
      x: p.x + Math.sin(p.y * 0.2 + time) * dreamDepth * 2,
      y: p.y + Math.sin(p.z * 0.2 + time * 0.7) * dreamDepth * 2,
      z: p.z + Math.sin(p.x * 0.2 + time * 0.5) * dreamDepth * 2,
    };

    // Dream narrative threads - connecting dream elements
    const dreamThread = Math.sin(
      distortedSpace.x * PHI +
        distortedSpace.y * LUNA +
        distortedSpace.z * REM +
        time,
    );

    // Dream focus - what the dreamer is paying attention to
    const dreamFocus = Math.exp(
      -(
        Math.pow(distortedSpace.x, 2) +
        Math.pow(distortedSpace.y, 2) +
        Math.pow(distortedSpace.z, 2)
      ) /
        (20 + 10 * Math.sin(time * 0.5)),
    );

    // Combine dream elements
    return dreamThread * dreamFocus * (0.5 + dreamDepth * 0.5);
  }

  // 2. DREAM SYMBOLISM - Creates recurring symbols and patterns
  function dreamSymbol(position, phase, time) {
    // Dream symbols change meaning and form
    const symbolPhase =
      phase + Math.sin(position.x + position.y + position.z + time) * 0.3;

    // The type of symbol present in this part of the dream
    if (symbolPhase < 0.33) {
      return "archetype"; // Fundamental dream patterns
    } else if (symbolPhase < 0.66) {
      return "landscape"; // Dreamscape features
    } else {
      return "artifact"; // Dream objects with significance
    }
  }

  // 3. DREAM NAVIGATION - How we move through dream space
  function dreamVector(p, time, lucidity) {
    // In dreams, we sometimes follow intention, sometimes are carried along
    const intention = {
      x: Math.sin(p.y * LUNA + time * 0.7),
      y: Math.sin(p.z * REM + time * 0.5),
      z: Math.sin(p.x * PHI + time * 0.3),
    };

    // Dream currents - the flow of dream narrative
    const current = {
      x: Math.sin(time * 0.5),
      y: Math.cos(time * 0.7),
      z: Math.sin(time * 0.3) * Math.cos(time * 0.2),
    };

    // Combine based on dream lucidity (in lucid dreams, intention matters more)
    return {
      x: intention.x * lucidity + current.x * (1 - lucidity),
      y: intention.y * lucidity + current.y * (1 - lucidity),
      z: intention.z * lucidity + current.z * (1 - lucidity),
    };
  }

  // 4. DREAM COLORS - The emotional tone of the dream
  function dreamColor(position, dreamValue, time) {
    // Dreams shift between color palettes based on emotion
    const emotion = Math.sin(dreamValue * 3 + time * 0.5) * 0.5 + 0.5;

    // Calm dream palette
    const calmDream = {
      h: 240 + Math.sin(position.x * 0.2) * 30, // Blue-purple
      s: 0.3 + Math.sin(position.y + time) * 0.2,
      v: 0.4 + Math.abs(dreamValue) * 0.6,
    };

    // Vivid dream palette
    const vividDream = {
      h: 120 + position.z * 20 + Math.sin(time) * 60, // Green-yellow-orange
      s: 0.5 + Math.sin(position.x + time) * 0.3,
      v: 0.5 + Math.abs(dreamValue) * 0.5,
    };

    // Nightmare palette
    const nightmare = {
      h: 300 + Math.sin(position.y * 0.3) * 60, // Purple-red
      s: 0.7 - Math.sin(position.z + time) * 0.2,
      v: 0.3 + Math.abs(dreamValue) * 0.7,
    };

    // Interpolate between dream palettes based on emotion
    if (emotion < 0.33) {
      return calmDream;
    } else if (emotion < 0.66) {
      return vividDream;
    } else {
      return nightmare;
    }
  }

  // DREAM SCENES

  // 1. DREAM CONSCIOUSNESS - The observer moving through dream space
  function renderDreamConsciousness(time) {
    // The dreamer's perspective traces paths through dream space
    const pathCount = 60 + Math.floor(dreamDepth * 60);

    for (let i = 0; i < pathCount; i++) {
      // Create starting points distributed in consciousness
      const theta = ((i * PHI) % THETA) * 2;
      const phi = Math.acos(2 * ((i / pathCount + time * 0.1) % 1) - 1);
      const radius = 5 + Math.sin(i * 0.1) * 2 + dreamDepth * 5;

      // Consciousness point
      let p = {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      };

      // Sample dream field at this point
      const dreamValue = dreamField(p, time);

      // Skip points with low dream activity
      if (Math.abs(dreamValue) < 0.05) continue;

      // Get dream symbol for this region
      const symbol = dreamSymbol(p, dreamPhase, time);

      // Get dream color
      const color = dreamColor(p, dreamValue, time);

      // Configure pen based on dream properties
      pen
        .push()
        .colorHSV(color.h, color.s, color.v)
        .dotSize(1.5 + Math.abs(dreamValue) * 3)
        .traceGap(0.2 - lucidity * 0.15) // More lucid = more detailed
        .residue(1 + dreamDepth * 8)
        .fuzz(3, 0.2 + dreamDepth * 0.3);

      // Trace dream consciousness path
      const steps = 15 + Math.floor(dreamDepth * 30);
      let lastPoint = p;

      for (let j = 0; j < steps; j++) {
        // Get dream vector at current position
        const vector = dreamVector(p, time, lucidity);

        // Scale based on dream intensity
        const stepSize = 0.1 + Math.abs(dreamValue) * 0.3;

        // Move along dream path
        p = {
          x: p.x + vector.x * stepSize,
          y: p.y + vector.y * stepSize,
          z: p.z + vector.z * stepSize,
        };

        // Dreams have discontinuities - occasional jumps
        if (j % 7 === 0 && Math.random() < 0.3 * (1 - lucidity)) {
          const jump = 0.5 + Math.random() * 1.0;
          p.x += Math.sin(time + j) * jump;
          p.y += Math.cos(time * 1.1 + j) * jump;
          p.z += Math.sin(time * 0.9 + j * 0.7) * jump;

          // Don't draw the jump, just move
          lastPoint = p;
          continue;
        }

        // Draw dream path
        draw.trace(lastPoint, p);
        lastPoint = p;

        // Update color along dream path to show emotional shifts
        if (j % 3 === 0) {
          const newDreamValue = dreamField(p, time);
          const newColor = dreamColor(p, newDreamValue, time);
          pen.colorHSV(newColor.h, newColor.s, newColor.v);
        }
      }

      pen.pop();
    }
  }

  // 2. DREAM SYMBOLS - Recurring patterns in dream space
  function renderDreamSymbols(time) {
    // Create symbol manifestations at significant dream locations
    const symbolCount = 7 + Math.floor(dreamDepth * 8);

    for (let i = 0; i < symbolCount; i++) {
      // Position symbols at meaningful locations
      const angle = (i / symbolCount) * THETA * 2 + time * 0.3;
      const radius = 8 + Math.sin(i + time) * 4;

      const center = {
        x: Math.sin(angle * PHI) * radius,
        y: Math.cos(angle * LUNA) * radius,
        z: Math.sin(angle * REM) * radius * 0.7,
      };

      // Get dream value at this location
      const dreamValue = dreamField(center, time);

      // Skip insignificant dream symbols
      if (Math.abs(dreamValue) < 0.1) continue;

      // Get symbol type
      const symbolType = dreamSymbol(center, dreamPhase + i * 0.1, time);

      // Get color for this symbol
      const color = dreamColor(center, dreamValue, time);

      // Draw the appropriate type of dream symbol
      pen
        .push()
        .colorHSV(color.h, color.s, color.v)
        .dotSize(3)
        .traceGap(0.25)
        .residue(3 + dreamDepth * 4)
        .fuzz(2, 0.2);

      switch (symbolType) {
        case "archetype":
          // Archetypes as mandala-like patterns
          drawDreamArchetype(center, dreamValue, time);
          break;
        case "landscape":
          // Dream landscapes as flowing surfaces
          drawDreamLandscape(center, dreamValue, time);
          break;
        case "artifact":
          // Dream artifacts as significant objects
          drawDreamArtifact(center, dreamValue, time);
          break;
      }

      pen.pop();
    }
  }

  // 3. DREAM BOUNDARY - The edge between dreaming and waking
  function renderDreamBoundary(time) {
    // The permeable membrane between dream and consciousness
    pen
      .push()
      .colorHSV(200 + Math.sin(time) * 40, 0.2, 0.3)
      .dotSize(2)
      .traceGap(1)
      .residue(6)
      .fuzz(1, 0.5);

    const boundaryPoints = 50;
    const radius = 20 + Math.sin(time * 0.3) * 3;

    for (let i = 0; i < boundaryPoints; i++) {
      const theta = (i / boundaryPoints) * THETA * 2;
      const phi = Math.acos(Math.sin(i * PHI + time));

      // Create boundary point
      const p = {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      };

      // Dream boundary fluctuates
      const distortion =
        Math.sin(theta * 5 + time) * Math.sin(phi * 7 + time * 0.7) * 2;
      p.x += distortion;
      p.y += distortion;
      p.z += distortion;

      // Draw boundary point
      draw.dot(p);

      // Connect some boundary points (dream associations)
      if (i % 5 === 0) {
        const j = (i + 12) % boundaryPoints;
        const theta2 = (j / boundaryPoints) * THETA * 2;
        const phi2 = Math.acos(Math.sin(j * PHI + time));

        const p2 = {
          x: radius * Math.sin(phi2) * Math.cos(theta2),
          y: radius * Math.sin(phi2) * Math.sin(theta2),
          z: radius * Math.sin(phi2) * Math.cos(theta2),
        };

        draw.trace(p, p2);
      }
    }

    pen.pop();
  }

  // DREAM SYMBOL RENDERERS

  // Dream archetypes - fundamental patterns
  function drawDreamArchetype(center, dreamValue, time) {
    pen.push().moveTo(center.x, center.y, center.z);

    // Archetypes have rotational symmetry
    pen
      .yaw(time * 30)
      .pitch(Math.sin(time + dreamValue) * 40)
      .roll(Math.cos(time * 0.5) * 20);

    // Draw mandala pattern
    const points = 8 + Math.floor(Math.abs(dreamValue) * 8);
    const radius = 2 + Math.abs(dreamValue) * 3;

    // Draw archetype pattern - spiraling mandala
    for (let i = 0; i < 3; i++) {
      const ringRadius = radius * (0.4 + i * 0.3);
      const pathPoints = [];

      for (let j = 0; j < points; j++) {
        const angle = (j / points) * THETA * 2;
        const r = ringRadius * (1 + Math.sin(angle * 4 + time) * 0.2);

        pathPoints.push({
          x: r * Math.cos(angle),
          y: r * Math.sin(angle),
          z: Math.sin(angle * 3 + time) * 0.5,
        });
      }

      // Draw the archetype ring
      pen.polyline(pathPoints, true);

      // Draw spokes
      if (i === 1) {
        for (let j = 0; j < points; j += 2) {
          const angle = (j / points) * THETA * 2;

          pen
            .moveTo(0, 0, 0)
            .traceTo(
              ringRadius * 1.2 * Math.cos(angle),
              ringRadius * 1.2 * Math.sin(angle),
              0,
            );
        }
      }
    }

    pen.pop();
  }

  // Dream landscapes - environments
  function drawDreamLandscape(center, dreamValue, time) {
    pen.push().moveTo(center.x, center.y, center.z);

    // Dreamscapes respond to the dream state
    pen
      .yaw(time * 20)
      .pitch(dreamValue * 30)
      .roll(Math.sin(time) * 10);

    // Create landscape profile
    const segments = 12;
    const path = [];
    const profile = [];

    // Undulating landscape path
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * THETA * 2;
      const r = 3 + Math.sin(theta * 3 + time) * 1;

      path.push({
        x: r * Math.cos(theta),
        y: Math.sin(theta * 2 + time) * 1.5,
        z: r * Math.sin(theta),
      });
    }

    // Landscape profile
    for (let i = 0; i < 5; i++) {
      const h = i / 4;
      profile.push({
        x: Math.sin(h * THETA + time) * 0.3,
        y: h * 2 - 1,
        z: Math.cos(h * THETA + time * 1.3) * 0.3,
      });
    }

    // Draw landscape as a swept surface
    pen.sweep(path, profile, true);

    pen.pop();
  }

  // Dream artifacts - significant objects
  function drawDreamArtifact(center, dreamValue, time) {
    pen.push().moveTo(center.x, center.y, center.z);

    // Artifacts rotate in dream space
    pen
      .yaw(time * 40)
      .pitch(Math.sin(time * 0.7) * 30)
      .roll(Math.cos(time * 0.5) * 20);

    // Artifacts have symbolic geometry - here a spiral totem
    const height = 3 + Math.abs(dreamValue) * 2;
    const segments = 12;

    // Central axis
    pen.moveTo(0, -height / 2, 0).traceTo(0, height / 2, 0);

    // Spiral wrapping
    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const angle = t * THETA * 6 + time;
      const y = (t - 0.5) * height;
      const radius = 0.5 + Math.sin(t * THETA * 3 + time) * 0.3;

      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);

      // Draw point on spiral
      pen.moveTo(0, y, 0).traceTo(x, y, z);

      // Connect spiral points
      if (i > 0) {
        const prevT = (i - 1) / segments;
        const prevAngle = prevT * THETA * 6 + time;
        const prevY = (prevT - 0.5) * height;
        const prevRadius = 0.5 + Math.sin(prevT * THETA * 3 + time) * 0.3;

        const prevX = prevRadius * Math.cos(prevAngle);
        const prevZ = prevRadius * Math.sin(prevAngle);

        pen.moveTo(prevX, prevY, prevZ).traceTo(x, y, z);
      }
    }

    pen.pop();
  }

  // 4. DREAM FRAGMENTS - Brief flashes of disconnected dream elements
  function renderDreamFragments(time) {
    // The number of fragments depends on how fragmented the dream is
    const fragmentCount = 20 + Math.floor((1 - lucidity) * 30);

    for (let i = 0; i < fragmentCount; i++) {
      // Create random positions for fragments
      const radius = 3 + Math.random() * 15;
      const theta = Math.random() * THETA * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const position = {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      };

      // Get dream value at this point
      const dreamValue = dreamField(position, time);

      // Skip insignificant fragments
      if (Math.abs(dreamValue) < 0.07) continue;

      // Get fragment color
      const color = dreamColor(position, dreamValue, time);

      // Dreams have a fragmentary, disconnected quality at times
      pen
        .push()
        .colorHSV(color.h, color.s, color.v)
        .dotSize(2 + Math.random() * 2)
        .residue(0.5 + Math.random() * 1.5) // Brief flashes
        .fuzz(3, 0.3);

      // Draw the fragment - just a point or a brief trace
      if (Math.random() < 0.7) {
        // Simple point
        draw.dot(position);
      } else {
        // Brief line trace in a random direction
        const angle1 = Math.random() * THETA * 2;
        const angle2 = Math.random() * THETA;
        const length = 0.5 + Math.random() * 1.5;

        const direction = {
          x: Math.sin(angle2) * Math.cos(angle1) * length,
          y: Math.sin(angle2) * Math.sin(angle1) * length,
          z: Math.cos(angle2) * length,
        };

        const end = {
          x: position.x + direction.x,
          y: position.y + direction.y,
          z: position.z + direction.z,
        };

        draw.trace(position, end);
      }

      pen.pop();
    }
  }

  // Camera movement simulates dream perspective shifts
  pen
    .yaw(Math.sin(t * 0.23) * 15)
    .pitch(Math.cos(t * 0.17) * 12)
    .roll(Math.sin(t * 0.11) * 5 * (1 - lucidity)); // More roll when less lucid

  // Render dream components
  renderDreamBoundary(t);
  renderDreamConsciousness(t);
  renderDreamSymbols(t);
  renderDreamFragments(t);
}
