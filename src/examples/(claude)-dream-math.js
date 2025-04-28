/* ================================================================
   DREAM MATHEMATICS - Laser-Tracer Exploration
   Visualizing the ephemeral logic and emotional topology of dreams
================================================================= */

// Mathematical constants - dream foundations
const PHI = 1.618033988749895;
const TAU = 6.283185307179586;
const SLEEP_CYCLES = 5; // REM cycles

function program(pen, draw, time) {
  setBGColor(0x020213); // Deep night blue
  const t = time * 0.1; // Slowed dream-time

  // Dream state variables
  const dreamDepth = (Math.sin(t * 0.2) * 0.5 + 0.5) * 0.8 + 0.2; // 0.2-1.0
  const dreamPhase = t % SLEEP_CYCLES;
  const isREM = dreamPhase % 1.0 > 0.7; // REM phase of sleep

  // Emotional landscape - shifts dream coloration and movement
  function emotionalField(p, time) {
    // Dreams shift between emotional states
    const serenity = Math.sin(p.x * 0.05 + time * 0.3) * 0.5 + 0.5;
    const anxiety = Math.cos(p.y * 0.1 + time * 0.2) * 0.5 + 0.5;
    const wonder = Math.sin(p.z * 0.08 + time * 0.4) * 0.5 + 0.5;

    return {
      serenity: serenity,
      anxiety: anxiety * (1 - serenity * 0.7), // Serenity reduces anxiety
      wonder: wonder * (1 - anxiety * 0.5), // Anxiety dampens wonder
    };
  }

  // Memory fragments - create dream symbols/objects
  function memoryFragment(time, index) {
    // Memories rise and fall in prominence
    const theta = (index / 7) * TAU;
    const cycle = (time + index * PHI) % SLEEP_CYCLES;
    const prominence = Math.sin(cycle * TAU) * 0.5 + 0.5;

    // Memory location oscillates through dreamspace
    return {
      position: {
        x: Math.sin(theta + time * 0.3) * (10 + prominence * 15),
        y: Math.cos(theta + time * 0.2) * (10 + prominence * 15),
        z: Math.sin(time * 0.2 + index) * 15,
      },
      prominence: prominence,
      emotional: index % 3, // 0=neutral, 1=positive, 2=negative
    };
  }

  // Subconscious connections - the hidden logic of dreams
  function subconsciousConnection(p1, p2, time) {
    const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);

    // Dreams connect distant concepts in nonlinear ways
    return Math.sin(distance * 0.1 + time) * 0.5 + 0.5 > 0.7;
  }

  // DREAM ARCHITECTURE - the framework holding dream imagery
  drawDreamArchitecture(t);

  // MEMORY SYMBOLS - dream's symbolic imagery
  drawMemorySymbols(t);

  // CONSCIOUSNESS THREAD - the dreamer's path through the dream
  traceDreamConsciousness(t);

  // 1. DREAM ARCHITECTURE
  function drawDreamArchitecture(time) {
    // Dream environment has an underlying architecture
    // More structured in light sleep, more fluid in deep sleep

    pen
      .push()
      .dotSize(1)
      .traceGap(dreamDepth > 0.6 ? 1.0 : 0.4) // More gaps in deep sleep
      .residue(2 + dreamDepth * 6)
      .fuzz(3, 0.2);

    // Create dream framework
    const points = 40;

    for (let i = 0; i < points; i++) {
      // Points distributed through dreamspace
      const fi = (i * PHI) % 1; // Golden ratio distribution
      const theta = fi * TAU;
      const phi = Math.acos(2 * ((i / points + time * 0.03) % 1) - 1);
      const radius = 15 + Math.sin(i * 0.3 + time * 0.7) * 5;

      // Position in dreamspace
      let p = {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      };

      // Emotional resonance at this point
      const emotion = emotionalField(p, time);

      // Dreamlike color palette - pastel in calm dreams, vivid in emotional ones
      if (emotion.serenity > 0.6) {
        // Serene blues and purples
        pen.colorHSV(
          (220 + Math.sin(time * 0.4) * 40) / 360,
          0.4 + emotion.wonder * 0.3,
          0.5 + emotion.serenity * 0.5,
        );
      } else if (emotion.anxiety > 0.6) {
        // Anxious reds and oranges
        pen.colorHSV(
          (0 + Math.sin(time * 0.3) * 30) / 360,
          0.6 + emotion.anxiety * 0.4,
          0.5 + emotion.anxiety * 0.3,
        );
      } else {
        // Neutral dreamscape
        pen.colorHSV(
          (180 + emotion.wonder * 60) / 360,
          0.3 + emotion.wonder * 0.3,
          0.4 + dreamDepth * 0.4,
        );
      }

      // Connect to nearby points if in the same emotional space
      for (let j = 0; j < i; j++) {
        const fj = (j * PHI) % 1;
        const theta2 = fj * TAU;
        const phi2 = Math.acos(2 * ((j / points + time * 0.03) % 1) - 1);
        const radius2 = 15 + Math.sin(j * 0.3 + time * 0.7) * 5;

        const p2 = {
          x: radius2 * Math.sin(phi2) * Math.cos(theta2),
          y: radius2 * Math.sin(phi2) * Math.sin(theta2),
          z: radius2 * Math.cos(phi2),
        };

        // Dreams connect related concepts - sometimes in surprising ways
        if (subconsciousConnection(p, p2, time)) {
          // The more dream-like, the more tenuous the connections
          pen
            .dotSize(0.5 + (1 - dreamDepth) * 1.0)
            .traceGap(0.3 + dreamDepth * 1.5);

          draw.trace(p, p2);
        }
      }

      // Add point
      draw.dot(p);
    }

    pen.pop();
  }

  // 2. MEMORY SYMBOLS
  function drawMemorySymbols(time) {
    // Create symbolic memory fragments in the dream
    const memories = 7;

    for (let i = 0; i < memories; i++) {
      const memory = memoryFragment(time, i);
      const p = memory.position;

      // Only show prominent memories
      if (memory.prominence < 0.4 && !isREM) continue;

      // Get emotional resonance of this memory
      const emotion = emotionalField(p, time);

      // Memory's appearance depends on its emotional tone
      const symbolType = memory.emotional;

      pen
        .push()
        .dotSize(1.5 + memory.prominence * 3)
        .residue(3 + memory.prominence * 8)
        .fuzz(6, 0.8 + memory.prominence * 1.0);

      // Color based on emotional tone
      if (symbolType === 0) {
        // Neutral memories - cool blues
        pen.colorHSV((210 + Math.sin(time) * 30) / 360, 0.5, 0.7);
      } else if (symbolType === 1) {
        // Positive memories - warm golds
        pen.colorHSV((45 + Math.sin(time) * 15) / 360, 0.7, 0.8);
      } else {
        // Negative memories - deep purples
        pen.colorHSV((280 + Math.sin(time) * 20) / 360, 0.6, 0.6);
      }

      // Draw the memory symbol
      draw.dot(p);

      // Create a symbolic representation based on memory type
      // Geometry of the symbol reveals its emotional character
      const segments = 8 + Math.floor(memory.prominence * 8);

      if (symbolType === 0) {
        // Neutral memories are simple circles
        const radius = 2 + memory.prominence * 3;
        const points = [];

        for (let j = 0; j < segments; j++) {
          const angle = (j / segments) * TAU;
          points.push({
            x: p.x + Math.cos(angle) * radius,
            y: p.y + Math.sin(angle) * radius,
            z: p.z,
          });
        }

        pen
          .dotSize(0.5)
          .traceGap(0.3)
          .residue(2 + dreamDepth * 3);

        draw.polyline(points, true);
      } else if (symbolType === 1) {
        // Positive memories radiate outward
        const rays = 6 + Math.floor(memory.prominence * 6);

        for (let r = 0; r < rays; r++) {
          const angle = (r / rays) * TAU;
          const length = 3 + memory.prominence * 5;

          const endpoint = {
            x: p.x + Math.cos(angle) * length,
            y: p.y + Math.sin(angle) * length,
            z: p.z + Math.sin(time + r) * (dreamDepth * 2),
          };

          pen.dotSize(0.8).traceGap(0.2).residue(3);

          draw.trace(p, endpoint);
        }
      } else {
        // Negative memories form spirals inward
        const spiral = 12 + Math.floor(memory.prominence * 8);
        let lastPoint = p;

        for (let s = 1; s <= spiral; s++) {
          const angle = (s / spiral) * TAU * 3;
          const radius = (1 - s / spiral) * 4 * memory.prominence;

          const spiralPoint = {
            x: p.x + Math.cos(angle) * radius,
            y: p.y + Math.sin(angle) * radius,
            z: p.z - (s / spiral) * 2,
          };

          pen
            .dotSize(0.7 - (s / spiral) * 0.5)
            .traceGap(0.15)
            .residue(1 + dreamDepth * 3);

          draw.trace(lastPoint, spiralPoint);
          lastPoint = spiralPoint;
        }
      }

      pen.pop();
    }
  }

  // 3. CONSCIOUSNESS THREAD - the dreamer's experience path
  function traceDreamConsciousness(time) {
    // The dream narrative thread that connects experiences
    const threadPoints = 120;
    let dreamConsciousness = {
      x: 0,
      y: 0,
      z: 0, // Start at center of dreamspace
    };

    pen
      .push()
      .dotSize(1.2)
      .traceGap(0.15)
      .residue(4 + dreamDepth * 10)
      .fuzz(2, 0.3);

    let lastPoint = dreamConsciousness;

    // Dream consciousness moves through the dreamscape
    for (let i = 1; i <= threadPoints; i++) {
      // The thread of consciousness creates a path of attention
      const cycle = (time + i * 0.01) % SLEEP_CYCLES;
      const phase = cycle % 1.0;

      // Dreams have smooth transitions punctuated by jumps
      const smoothPath = Math.random() > 0.05 + dreamDepth * 0.1;

      if (smoothPath) {
        // Gradual movement through dream space
        const emotion = emotionalField(lastPoint, time);

        // Movement influenced by emotional state
        const movement = {
          x:
            Math.sin(i * 0.1 + time + emotion.serenity * 2) *
            (0.5 + dreamDepth),
          y:
            Math.cos(i * 0.08 + time * 1.3 - emotion.anxiety * 2) *
            (0.5 + dreamDepth),
          z:
            Math.sin(i * 0.12 + time * 0.7 + emotion.wonder * 2) *
            (0.3 + dreamDepth),
        };

        // Update position
        dreamConsciousness = {
          x: lastPoint.x + movement.x,
          y: lastPoint.y + movement.y,
          z: lastPoint.z + movement.z,
        };

        // Constrain to dream boundaries with wraparound
        const boundary = 25;
        if (Math.abs(dreamConsciousness.x) > boundary) {
          dreamConsciousness.x *= -0.7; // Dream logic: boundaries bend back
        }
        if (Math.abs(dreamConsciousness.y) > boundary) {
          dreamConsciousness.y *= -0.7;
        }
        if (Math.abs(dreamConsciousness.z) > boundary) {
          dreamConsciousness.z *= -0.7;
        }
      } else {
        // Dream jump/cut - sudden transition
        const jump = 12 + dreamDepth * 8;
        dreamConsciousness = {
          x: lastPoint.x + (Math.random() - 0.5) * jump,
          y: lastPoint.y + (Math.random() - 0.5) * jump,
          z: lastPoint.z + (Math.random() - 0.5) * jump,
        };
      }

      // Color reflects the dreamer's emotional state
      const emotion = emotionalField(dreamConsciousness, time);

      // Color blend based on emotional mixture
      const hue =
        emotion.serenity > emotion.anxiety
          ? 210 + emotion.wonder * 30 // Calm dream
          : 340 + emotion.anxiety * 20; // Anxious dream

      pen.colorHSV(
        hue / 360,
        0.5 + (emotion.serenity + emotion.anxiety) * 0.25,
        0.7 + dreamDepth * 0.3,
      );

      // Draw consciousness thread
      draw.trace(lastPoint, dreamConsciousness);
      lastPoint = dreamConsciousness;

      // Dream narrative sometimes loops back to important points
      if (i % 20 === 0 && dreamDepth > 0.6) {
        // Find nearest memory to loop back to
        let nearestMemory = null;
        let minDist = 100;

        for (let m = 0; m < 7; m++) {
          const memory = memoryFragment(time, m);
          if (memory.prominence > 0.5) {
            const dist = Math.hypot(
              memory.position.x - dreamConsciousness.x,
              memory.position.y - dreamConsciousness.y,
              memory.position.z - dreamConsciousness.z,
            );

            if (dist < minDist) {
              minDist = dist;
              nearestMemory = memory.position;
            }
          }
        }

        // Return to memory if close enough
        if (nearestMemory && minDist < 15) {
          pen
            .colorHSV(45 / 360, 0.3, 0.9) // Golden connection
            .dotSize(0.7)
            .traceGap(0.3)
            .residue(2);

          draw.trace(dreamConsciousness, nearestMemory);
          lastPoint = nearestMemory;
          dreamConsciousness = nearestMemory;
        }
      }
    }

    pen.pop();
  }

  // Add dream camera movement - slow and floating
  pen
    .yaw(Math.sin(t * 0.2) * 15)
    .pitch(Math.cos(t * 0.17) * 10)
    .roll(Math.sin(t * 0.07) * 5 * dreamDepth); // More roll in deep dreams
}
