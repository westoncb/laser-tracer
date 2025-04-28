/* ================================================================
   VOLUMETRIC FIELD RENDERER - Laser-Tracer Implementation
   A system for visualizing scalar and vector fields in 3D space
================================================================= */

// Configuration
const VOLUME_SIZE = 30;        // Size of our volume to sample
const RESOLUTION = 12;         // Samples per dimension
const FIELD_STRENGTH = 1;    // Overall field intensity
const PARTICLE_LIFETIME = 1;   // How long particles persist

// Core field sampling system
function program(pen, draw, time) {
  setBGColor(0x000205);
  const t = time * 0.15; // Slowed down time

  // Field definition - we'll start with a simple sine wave field
  function scalarField(x, y, z) {
    // Simple field: combination of sine waves
    return Math.sin(x * 0.2 + t) * 
           Math.sin(y * 0.2 + t * 0.7) * 
           Math.sin(z * 0.2 + t * 1.3);
  }
  
  // Vector field derived from scalar field gradient
  function vectorField(x, y, z) {
    const epsilon = 0.01;
    // Approximate gradient
    const dx = (scalarField(x + epsilon, y, z) - scalarField(x - epsilon, y, z)) / (2 * epsilon);
    const dy = (scalarField(x, y + epsilon, z) - scalarField(x, y - epsilon, z)) / (2 * epsilon);
    const dz = (scalarField(x, y, z + epsilon) - scalarField(x, y, z - epsilon)) / (2 * epsilon);
    
    // Normalize and scale
    const mag = Math.sqrt(dx*dx + dy*dy + dz*dz) + 0.0001;
    return {
      x: dx / mag * FIELD_STRENGTH,
      y: dy / mag * FIELD_STRENGTH,
      z: dz / mag * FIELD_STRENGTH
    };
  }
  
  // Color transfer function - maps field value to color
  function transferFunction(fieldValue) {
    // Start with a cool blue for negative values
    if (fieldValue < 0) {
      const v = Math.abs(fieldValue);
      return {
        h: 240, // Blue
        s: 0.7,
        v: 0.2 + v * 0.8
      };
    } 
    // Warm orange/yellow for positive values
    else {
      return {
        h: 30, // Orange
        s: 0.8,
        v: 0.2 + fieldValue * 0.8
      };
    }
  }
  
  // Volume sampling approach
  function renderVolumeField() {
    // Setup pen for volume rendering
    pen.push()
      .dotSize(2)
      .traceGap(0.5)
      .residue(PARTICLE_LIFETIME);
    
    // Sample the volume
    const halfSize = VOLUME_SIZE / 2;
    const step = VOLUME_SIZE / RESOLUTION;
    
    // For each layer of the volume
    for (let z = -halfSize; z < halfSize; z += step) {
      for (let y = -halfSize; y < halfSize; y += step) {
        for (let x = -halfSize; x < halfSize; x += step) {
          // Sample the scalar field
          const fieldVal = scalarField(x, y, z);
          
          // Skip low-intensity regions for efficiency
          if (Math.abs(fieldVal) < 0.1) continue;
          
          // Get color from transfer function
          const color = transferFunction(fieldVal);
          pen.colorHSV(color.h, color.s, color.v);
          
          // Adjust opacity based on field intensity
          const pointSize = 1 + Math.abs(fieldVal) * 5;
          const fuzzAmount = Math.abs(fieldVal) * 1;
          pen.dotSize(pointSize)
             .fuzz(3, fuzzAmount);
          
          // Draw the sample point
          draw.dot({x, y, z});

            // Add streamlines for higher intensity regions
          if (Math.abs(fieldVal) > 0.5) {
            drawStreamline(x, y, z, fieldVal);
          }
        }
      }
    }
    
    pen.pop();
  }

  // Draw a streamline from the given position
  function drawStreamline(x, y, z, fieldIntensity) {
    const intensity = Math.abs(fieldIntensity);
    const length = 1 + intensity * 10; // Longer lines for stronger field
    const steps = 3 + Math.floor(intensity * 1);
    
    pen.push()
      .dotSize(1 + intensity * .4)
      .traceGap(0.1 + (1 - intensity) * 1)
      .residue(2 + intensity * 8)
      .fuzz(1, 0.1);
    
    let pos = {x, y, z};
    
    // Get initial vector
    let vec = vectorField(pos.x, pos.y, pos.z);
    
    // Scale by field intensity to add visual emphasis
    const colorVal = transferFunction(fieldIntensity);
    // Higher saturation for streamlines
    pen.colorHSV(colorVal.h, Math.min(1, colorVal.s * 1.2), Math.min(1, colorVal.v * 1.2));
    
    // Start point
    draw.dot(pos);
    
    for (let i = 0; i < steps; i++) {
      // Calculate next position
      const stepSize = length / steps;
      const nextPos = {
        x: pos.x + vec.x * stepSize,
        y: pos.y + vec.y * stepSize,
        z: pos.z + vec.z * stepSize
      };
      
      // Draw line segment
      draw.trace(pos, nextPos);
      
      // Update position
      pos = nextPos;
      
      // Update vector at new position
      vec = vectorField(pos.x, pos.y, pos.z);
    }
    
    pen.pop();
  }

  // Render the volume
  renderVolumeField();
}