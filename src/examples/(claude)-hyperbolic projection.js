/* ================================================================
   HYPERBOLIC PROJECTION - Laser-Tracer Visualization
   Inspired by a 4D hyperbolic shader with Coxeter group reflections
================================================================= */

// Mathematical constants
const PHI = 1.618033988749895;  // Golden ratio
const PI = Math.PI;
const TAU = PI * 2;
const SQRT5 = Math.sqrt(5);

// Configuration
const MAX_REFLECTIONS = 3;      // Maximum reflection depth
const POINT_COUNT = 200;        // Number of points in the hyperbolic lattice
const SURFACE_POINTS = 400;     // Points per hyperbolic surface
const SURFACE_COUNT = 5;        // Number of hyperbolic surfaces
const DETAIL_LEVEL = 4;         // Level of detail for visualization

// Persistent state
let rotation = { 
  xy: 0, 
  xz: 0, 
  xw: 0, 
  yz: 0, 
  yw: 0, 
  zw: 0 
};

// A simple 4D vector class for operations
class Vec4 {
  constructor(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
  }
  
  // Hyperbolic inner product (Minkowski space)
  hyperbolicDot(v) {
    return this.x * v.x - this.y * v.y - this.z * v.z - this.w * v.w;
  }
  
  // Euclidean operations
  add(v) {
    return new Vec4(
      this.x + v.x,
      this.y + v.y,
      this.z + v.z,
      this.w + v.w
    );
  }
  
  subtract(v) {
    return new Vec4(
      this.x - v.x,
      this.y - v.y,
      this.z - v.z,
      this.w - v.w
    );
  }
  
  scale(s) {
    return new Vec4(
      this.x * s,
      this.y * s,
      this.z * s,
      this.w * s
    );
  }
  
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + 
                     this.z * this.z + this.w * this.w);
  }
  
  normalize() {
    const len = this.length();
    if (len === 0) return new Vec4();
    return this.scale(1 / len);
  }
  
  // Project from 4D to 3D (w component as perspective)
  project3D(depth = 10) {
    // Perspective projection
    const perspective = depth / (depth + this.w);
    return {
      x: this.x * perspective,
      y: this.y * perspective,
      z: this.z * perspective
    };
  }
}

// 4D Rotation matrix application
function rotate4D(point, rotation) {
  let {x, y, z, w} = point;
  let {xy, xz, xw, yz, yw, zw} = rotation;
  
  // Apply each plane rotation
  // xy rotation
  let nx = x * Math.cos(xy) - y * Math.sin(xy);
  let ny = x * Math.sin(xy) + y * Math.cos(xy);
  let nz = z;
  let nw = w;
  x = nx; y = ny; z = nz; w = nw;
  
  // xz rotation
  nx = x * Math.cos(xz) - z * Math.sin(xz);
  nz = x * Math.sin(xz) + z * Math.cos(xz);
  x = nx; z = nz;
  
  // xw rotation
  nx = x * Math.cos(xw) - w * Math.sin(xw);
  nw = x * Math.sin(xw) + w * Math.cos(xw);
  x = nx; w = nw;
  
  // yz rotation
  ny = y * Math.cos(yz) - z * Math.sin(yz);
  nz = y * Math.sin(yz) + z * Math.cos(yz);
  y = ny; z = nz;
  
  // yw rotation
  ny = y * Math.cos(yw) - w * Math.sin(yw);
  nw = y * Math.sin(yw) + w * Math.cos(yw);
  y = ny; w = nw;
  
  // zw rotation
  nz = z * Math.cos(zw) - w * Math.sin(zw);
  nw = z * Math.sin(zw) + w * Math.cos(zw);
  z = nz; w = nw;
  
  return new Vec4(x, y, z, w);
}

// Coxeter group reflection matrices for [3,3,5] group
function reflect335(point, mirrorIdx) {
  const c35 = Math.cos(PI/5);
  const s35 = Math.sin(PI/5);
  
  let {x, y, z, w} = point;
  
  if (mirrorIdx === 0) {
    // First reflection
    return new Vec4(-x, y + 2*c35*x, z, w);
  } 
  else if (mirrorIdx === 1) {
    // Second reflection
    return new Vec4(x, -y, z + 2*s35*y, w);
  }
  else if (mirrorIdx === 2) {
    // Third reflection
    return new Vec4(x, y, -z, w + 2*c35*z);
  }
  else {
    // Fourth reflection
    return new Vec4(x, y, z, -w * PHI * s35);
  }
}

// Generate a point on a 4D hyperbolic surface
function getHyperbolicSurfacePoint(u, v, surfaceIdx, time) {
  // Base parameters that vary by surface
  const phase = surfaceIdx * PI / SURFACE_COUNT + time * 0.2;
  const radius = 6 + Math.sin(phase) * 2;
  
  // Parametric equations for different hyperbolic surfaces
  let x, y, z, w;
  
  if (surfaceIdx % 4 === 0) {
    // Hyperbolic paraboloid-like
    x = radius * (u - 0.5) * Math.cos(phase);
    y = radius * (v - 0.5) * Math.sin(phase);
    z = (u*u - v*v) * 3;
    w = Math.sin(u * v * PI * 2 + time) * 3;
  } 
  else if (surfaceIdx % 4 === 1) {
    // Hyperbolic pseudosphere-like
    const r = radius * u;
    const theta = TAU * v;
    x = r * Math.cos(theta);
    y = r * Math.sin(theta);
    z = Math.log(Math.tan(u * PI / 4)) * 3;
    w = Math.sin(theta + time) * 3;
  }
  else if (surfaceIdx % 4 === 2) {
    // Klein bottle-inspired (4D projection)
    const r = 2 + Math.cos(u * PI);
    const theta1 = v * TAU;
    const theta2 = u * PI;
    x = Math.cos(theta1) * (radius + r * Math.cos(theta2));
    y = Math.sin(theta1) * (radius + r * Math.cos(theta2));
    z = r * Math.sin(theta2) * Math.cos(theta1 / 2);
    w = r * Math.sin(theta2) * Math.sin(theta1 / 2);
  }
  else {
    // 4D torus-like
    const theta1 = u * TAU;
    const theta2 = v * TAU;
    const r1 = radius;
    const r2 = 3;
    x = (r1 + r2 * Math.cos(theta2)) * Math.cos(theta1);
    y = (r1 + r2 * Math.cos(theta2)) * Math.sin(theta1);
    z = r2 * Math.sin(theta2) * Math.cos(theta1 * PHI + time);
    w = r2 * Math.sin(theta2) * Math.sin(theta1 * PHI + time);
  }
  
  return new Vec4(x, y, z, w);
}

// Apply Coxeter group reflections to a point
function applyReflections(point, depth, time) {
  let pts = [point];
  
  if (depth <= 0) return pts;
  
  // Apply reflections recursively
  for (let i = 0; i < 4; i++) { // 4 mirrors in the Coxeter group [3,3,5]
    // Distance to the mirror
    const distCutoff = 5 + Math.sin(time + i) * 2;
    
    if (Math.abs(point.y) < distCutoff) {
      const reflected = reflect335(point, i);
      
      // Add the reflected point
      pts.push(reflected);
      
      // Recurse with reduced depth
      if (depth > 1) {
        const newPoints = applyReflections(reflected, depth - 1, time);
        pts = pts.concat(newPoints);
      }
    }
  }
  
  return pts;
}

// Generate a color based on 4D position and time
function colorFromPosition(point, time) {
  // Use the 4D coordinates to create a color
  const hue = (
    Math.atan2(point.y, point.x) / TAU + 
    Math.atan2(point.w, point.z) / TAU + 
    time * 0.1
  ) % 1;
  
  const sat = 0.6 + Math.sin(point.length() * 0.5 + time) * 0.3;
  const val = 0.5 + Math.cos(point.hyperbolicDot(point) * 0.2) * 0.3;
  
  return { hue, sat, val };
}

// Main program
function program(pen, draw, time) {
  setBGColor(0x050510);  // Deep space blue
  
  // Update rotation state
  rotation.xy = time * 0.1;
  rotation.xz = Math.sin(time * 0.05) * 0.3;
  rotation.xw = Math.cos(time * 0.07) * 0.2;
  rotation.yz = time * 0.13;
  rotation.yw = Math.sin(time * 0.11) * 0.3;
  rotation.zw = Math.cos(time * 0.09) * 0.25;
  
  // Configure pen for the base visualization
  pen.dotSize(4)
     .traceGap(0.1)
     .residue(3)
     .fuzz(2, 0.3);
  
  // Set up a camera that moves in a complex pattern
  const camX = Math.sin(time * 0.3) * 20;
  const camY = Math.cos(time * 0.4) * 15;
  const camZ = 50 + Math.sin(time * 0.2) * 30;
  
  // setCamera(
  //   { x: camX, y: camY, z: camZ },
  //   { x: 0, y: 0, z: 0 }
  // );
  
  // PART 1: Draw hyperbolic surfaces
  for (let s = 0; s < SURFACE_COUNT; s++) {
    const surfaceTime = time + s * 0.5;
    
    // Create a grid of points on parametric surface
    for (let i = 0; i < SURFACE_POINTS; i++) {
      const u = i / (SURFACE_POINTS - 1);
      const v = (i * PHI) % 1; // Golden ratio for better distribution
      
      // Generate point on the hyperbolic surface
      const basePoint = getHyperbolicSurfacePoint(u, v, s, surfaceTime);
      
      // Apply 4D rotation
      const rotated = rotate4D(basePoint, rotation);
      
      // Get color from 4D position
      const color = colorFromPosition(rotated, time);
      
      // Set pen color and properties
      pen.push()
         .colorHSV(color.hue, color.sat, color.val)
         .dotSize(5 + Math.sin(time + s) * 0.5)
         .residue(2 + s * 0.5)
         .fuzz(2, 0.2);
      
      // Project to 3D and draw
      const pos = rotated.project3D(15);
      draw.dot(pos);
      
      pen.pop();
    }
  }
  
  // PART 2: Draw hyperbolic lattice with Coxeter reflections
  for (let i = 0; i < POINT_COUNT; i++) {
    // Create a well-distributed set of points
    const angle1 = i * PHI * TAU % TAU;
    const angle2 = i * SQRT5 * TAU % TAU;
    const r = 3 + (i / POINT_COUNT) * 5;
    
    // Create a 4D point on a 3-sphere
    const basePoint = new Vec4(
      r * Math.sin(angle1) * Math.cos(angle2),
      r * Math.sin(angle1) * Math.sin(angle2),
      r * Math.cos(angle1) * Math.cos(angle2 * PHI + time),
      r * Math.cos(angle1) * Math.sin(angle2 * PHI + time)
    );
    
    // Reflection depth varies with time and position
    const depth = Math.min(
      MAX_REFLECTIONS,
      Math.floor(DETAIL_LEVEL * (0.5 + 0.5 * Math.sin(i * 0.1 + time)))
    );
    
    // Apply Coxeter group reflections
    if (i % 10 === 0) { // Only apply reflections to some points for performance
      const reflectedPoints = applyReflections(basePoint, depth, time);
      
      // Process each reflected point
      for (let j = 0; j < reflectedPoints.length; j++) {
        const p4d = rotate4D(reflectedPoints[j], rotation);
        
        // Calculate distance from origin in 4D
        const dist = p4d.length();
        if (dist > 40) continue;  // Skip points too far away
        
        // Get color from 4D position
        const color = colorFromPosition(p4d, time);
        
        // Size and opacity based on 4D position
        const size = 4 * (1 - dist / 40);
        const lifespan = 2 * (1 - dist / 40);
        
        // Draw the projected point
        pen.push()
           .colorHSV(color.hue, color.sat, color.val)
           .dotSize(size)
           .residue(lifespan)
           .fuzz(Math.max(1, 3 * (1 - dist / 40)), 0.5);
        
        // Project to 3D and draw
        const pos = p4d.project3D(15);
        draw.dot(pos);
        
        pen.pop();
      }
    }
  }
  
  // PART 3: Draw connecting traces between close points
  pen.push()
     .dotSize(3)
     .traceGap(0.2)
     .residue(1)
     .fuzz(1, 0.2);
     
  // Create temporary array of visible points for connections
  const visiblePoints = [];
  
  // Generate and collect points
  for (let i = 0; i < POINT_COUNT / 3; i++) {
    const angle1 = i * PHI * TAU % TAU;
    const angle2 = i * SQRT5 * TAU % TAU;
    const r = 5 + (i / POINT_COUNT) * 8;
    
    const basePoint = new Vec4(
      r * Math.sin(angle1) * Math.cos(angle2),
      r * Math.sin(angle1) * Math.sin(angle2),
      r * Math.cos(angle1) * Math.cos(angle2 * 1.5),
      r * Math.cos(angle1) * Math.sin(angle2 * 1.5)
    );
    
    const p4d = rotate4D(basePoint, rotation);
    const pos = p4d.project3D(15);
    
    // Only include points within reasonable viewing distance
    if (Math.abs(pos.x) < 25 && Math.abs(pos.y) < 25 && Math.abs(pos.z) < 25) {
      visiblePoints.push({
        pos: pos,
        color: colorFromPosition(p4d, time)
      });
    }
  }
  
  // Connect nearby points
  const connectionDistance = 5 + Math.sin(time) * 2;
  for (let i = 0; i < visiblePoints.length; i++) {
    const p1 = visiblePoints[i];
    
    for (let j = i + 1; j < visiblePoints.length; j++) {
      const p2 = visiblePoints[j];
      
      // Calculate distance
      const dx = p1.pos.x - p2.pos.x;
      const dy = p1.pos.y - p2.pos.y;
      const dz = p1.pos.z - p2.pos.z;
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
      
      // Connect close points
      if (dist < connectionDistance) {
        // Blend the colors
        const blendFactor = 0.5 + 0.5 * Math.sin(time + i * 0.1);
        const hue = (p1.color.hue * blendFactor + p2.color.hue * (1 - blendFactor)) % 1;
        const sat = p1.color.sat * blendFactor + p2.color.sat * (1 - blendFactor);
        const val = p1.color.val * blendFactor + p2.color.val * (1 - blendFactor);
        
        pen.colorHSV(hue, sat, val);
        draw.trace(p1.pos, p2.pos);
      }
    }
  }
  
  pen.pop();
  
  // PART 4: Occasional pulses highlighting the hyperbolic structure
  if (Math.sin(time * 0.8) > 0.9) {
    const pulsePoint = new Vec4(
      Math.sin(time) * 10,
      Math.cos(time * 1.3) * 10,
      Math.sin(time * 0.7) * 10,
      Math.cos(time * 0.5) * 10
    );
    
    const rotated = rotate4D(pulsePoint, rotation);
    const pos = rotated.project3D(15);
    
    pen.push()
       .dotSize(5)
       .residue(0.5)
       .fuzz(15, 6)
       .colorHSV((time * 0.2) % 1, 0.3, 0.9);
       
    draw.dot(pos);
    pen.pop();
  }
}