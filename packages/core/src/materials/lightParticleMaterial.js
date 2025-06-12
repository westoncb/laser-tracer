/*  lightParticleMaterial.js
 *  ---------------------------------------------------------------
 *  Additive-blended “light” particles using your original shader logic.
 */

import * as THREE from "three";

/* ────────────────────────── Vertex ────────────────────────── */
const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uScale;                 // world-units → px

/* packed attributes */
attribute vec3 positionStart;
attribute vec3 sizeLifeStart;         // x = sizePx, y = lifeSec, z = startTime
attribute vec3 color;

varying vec4  vColor;
varying float lifeLeft;

void main () {

  float size      = sizeLifeStart.x;
  float lifeTime  = sizeLifeStart.y;
  float startTime = sizeLifeStart.z;

  float timeElapsed = uTime - startTime;
  lifeLeft = 1.0 - (timeElapsed / lifeTime);

  /* quadratic size fall-off, clamped */
  gl_PointSize = min(24.0, (uScale * size) * lifeLeft * lifeLeft);

  vec4 mvPos = modelViewMatrix * vec4(positionStart, 1.0);

  /* collapse to nothing if not yet born / already dead */
  if (timeElapsed < 0.0 || lifeLeft <= 0.0) {
    gl_PointSize = 0.0;
    lifeLeft = 0.0;
  }

  vColor = vec4(color, 1.0);
  gl_Position = projectionMatrix * mvPos;
}`;

/* ───────────────────────── Fragment ───────────────────────── */
const fragmentShader = /* glsl */ `
precision mediump float;

varying vec4  vColor;
varying float lifeLeft;
uniform sampler2D tSprite;

/* simple 1-D linear remap */
float scaleLinear (float v, vec2 d)       { return (v - d.x) / (d.y - d.x); }
float scaleLinear (float v, vec2 d, vec2 r){ return mix(r.x, r.y, scaleLinear(v,d)); }

void main () {
  float a = (lifeLeft > 0.995)
          ? scaleLinear(lifeLeft, vec2(1.0, 0.995), vec2(0.0, 1.0))
          : lifeLeft * 0.75;

  vec4 tex = texture2D(tSprite, gl_PointCoord);
  gl_FragColor = vec4(vColor.rgb * tex.a, a * tex.a);
}`;

/* ───────────────────────── Material factory ────────────────── */
let material = null;

/**
 * getLightParticleMaterial(spriteTex)
 * – returns the cached additive “light” particle material.
 */
export const getLightParticleMaterial = (spriteTex) => {
  if (material) return material;

  spriteTex.wrapS = spriteTex.wrapT = THREE.ClampToEdgeWrapping;

  // these are pretty important for particle quality/smoothness
  spriteTex.generateMipmaps = true; // restore mips
  spriteTex.minFilter = THREE.LinearMipMapLinearFilter; // trilinear

  material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: 1 },
      tSprite: { value: spriteTex },
    },

    vertexShader,
    fragmentShader,
  });

  return material;
};
