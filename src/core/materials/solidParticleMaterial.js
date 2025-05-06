import * as THREE from "three";

const vertexShader = /* glsl */ `
#define TAU 6.28318530718

uniform float uTime;
uniform float uScale;                 // world-units → px

attribute vec3 positionStart;
attribute vec3 sizeLifeStart;         // x=sizePx, y=lifeSec, z=startT
attribute vec3 color;                 // per-particle tint (0‥1 already)

varying vec3  vColor;
varying float vLifeLeft;
varying float vPointSize;

/* ---- half-float unpack (mediump is fine) ----------------------- */
float unpackHalf (vec2 uv) {
  return dot(uv, vec2(1.0, 256.0)) / 65535.0;
}

void main () {
  /* lifetime ------------------------------------------------------ */
  float sizePx   = sizeLifeStart.x;
  float lifeTime = sizeLifeStart.y;
  float startT   = sizeLifeStart.z;

  float t = uTime - startT;
  vLifeLeft = 1.0 - t / lifeTime;

  if (t < 0.0 || vLifeLeft <= 0.0) {
    gl_PointSize = 0.0;
    vLifeLeft = 0.0;
    gl_Position = vec4(2.0);          // off-screen
    return;
  }

  /* colour straight through -------------------------------------- */
  vColor = color;

  /* view-space metrics ------------------------------------------- */
  vec4 viewPos     = modelViewMatrix * vec4(positionStart, 1.0);
  // float meters2px  = uScale / -viewPos.z;

  /* -------- optimisation: clamp sprite size in pixels --------- */
  // float diameterPx   = sizePx * (meters2px);
  // const float MAX_PX = 24.0;          // <<< tune for your GPU
  // diameterPx         = min(diameterPx, MAX_PX);

  /* final gl_PointSize ------------------------------------------- */
  float ptSize   = sizePx;
  vPointSize     = clamp(ptSize * vLifeLeft * vLifeLeft, 1.0, 24.0);
  gl_PointSize   = vPointSize;

  gl_Position = projectionMatrix * viewPos;
}`;

/* ───────────────────────── Fragment ───────────────────────── */
const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D tFeather;   // soft-edge α mask
uniform sampler2D uMatcap;    // mat-cap texture

varying vec3  vColor;
varying float vLifeLeft;
varying float vPointSize;

void main () {

  /* ---- spherical impostor, optimised ----------------------- */
  vec2  pc  = gl_PointCoord * 2.0 - 1.0;        // [-1,1]²
  float r2  = dot(pc, pc);
  if (r2 > .95) discard;                        // outside circle (early-Z)

  // flat render small particles
  if (vPointSize < 1.) {
      float alpha  = vLifeLeft;

      if (alpha < 0.004) discard;
      gl_FragColor = vec4(vColor, alpha);
      return;
  }

  float z = sqrt(max(0.0, 1.0 - r2));
  vec3  nV = normalize(vec3(pc, z));

  vec2  uv  = nV.xy * 0.5 + 0.5;
  vec3  shade = texture2D(uMatcap, uv).rgb;

  /* ---- alpha: lifetime * feather, plus optional----------- */
  // vec4  feather = texture2D(tFeather, gl_PointCoord);
  float alpha   = vLifeLeft;

  if (alpha < 0.004) discard;

  gl_FragColor = vec4(shade * vColor * alpha, alpha);
}`;

let material = null;
export const getSolidParticleMaterial = (matcapTex, featherTex) => {
  if (material) return material;

  matcapTex.wrapS = matcapTex.wrapT = THREE.ClampToEdgeWrapping;
  matcapTex.generateMipmaps = true; // restore mips
  matcapTex.minFilter = THREE.LinearMipMapLinearFilter; // trilinear

  featherTex.wrapS = featherTex.wrapT = THREE.ClampToEdgeWrapping;
  featherTex.generateMipmaps = true; // restore mips
  featherTex.minFilter = THREE.LinearMipMapLinearFilter; // trilinear

  material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: true,
    depthTest: true,
    blending: THREE.NormalBlending,
    premultipliedAlpha: true,
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: 1 },
      tFeather: { value: featherTex },
      uMatcap: { value: matcapTex },
    },
    vertexShader,
    fragmentShader,
  });

  return material;
};
