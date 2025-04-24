/*  ParticleSystem.js  ──────────────────────────────────────────────
 *  CPU‑side particle simulator using packed & interleaved attributes
 *  — positionStart.xyz          (float)  ┐
 *  — sizeLifeStart.xyz          (float)  │  InterleavedBuffer 28 B
 *  — color.rgb (normalised)     (uint8)  ┘
 *  ≈ 28 bytes per particle
 *  Adapted from flimshaw “GPU Particle System” → distance‑driven spawn
 */

import * as THREE from "three";
import spriteUrl from "../assets/particle2.png";

class ParticleSystem extends THREE.Object3D {
  constructor(options = {}) {
    super();

    /* ── configurable limits ───────────────────────────────────── */
    this.PARTICLE_COUNT = options.maxParticles || 1_000_000;
    this.PARTICLE_CONTAINERS = options.containerCount || 1;
    this.PARTICLES_PER_CONTAINER = Math.ceil(
      this.PARTICLE_COUNT / this.PARTICLE_CONTAINERS,
    );

    /* ── sprite texture ────────────────────────────────────────── */
    const loader = new THREE.TextureLoader();
    this.particleSpriteTex =
      options.particleSpriteTex || loader.load(spriteUrl);
    this.particleSpriteTex.wrapS = this.particleSpriteTex.wrapT =
      THREE.RepeatWrapping;

    /* ── shared shader material ────────────────────────────────── */
    const shaders = ParticleSystem.getShaderStrings();
    this.particleShaderMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 1 },
        tSprite: { value: this.particleSpriteTex },
      },
      vertexShader: shaders.vertexShader,
      fragmentShader: shaders.fragmentShader,
    });

    /* ── containers ────────────────────────────────────────────── */
    this.PARTICLE_CURSOR = 0;
    this.particleContainers = [];
    for (let i = 0; i < this.PARTICLE_CONTAINERS; ++i) {
      const c = new ParticleContainer(this.PARTICLES_PER_CONTAINER, this);
      this.particleContainers.push(c);
      this.add(c);
    }
  }

  /* external emitter API --------------------------------------------------- */
  spawnParticle(timeSeconds, options) {
    if (++this.PARTICLE_CURSOR >= this.PARTICLE_COUNT) this.PARTICLE_CURSOR = 0;
    const idx = Math.floor(this.PARTICLE_CURSOR / this.PARTICLES_PER_CONTAINER);
    this.particleContainers[idx].spawnParticle(timeSeconds, options);
  }

  update(timeSeconds) {
    this.particleShaderMat.uniforms.uTime.value = timeSeconds;
    for (const c of this.particleContainers) c.update(timeSeconds);
  }

  dispose() {
    this.particleShaderMat.dispose();
    this.particleSpriteTex.dispose();
    for (const c of this.particleContainers) c.dispose();
  }

  /* ── shader source ─────────────────────────────────────────── */
  static getShaderStrings() {
    const vertexShader = `
      uniform float uTime;
      uniform float uScale;

      /* packed attributes */
      attribute vec3 positionStart;
      attribute vec3 sizeLifeStart;  // x=size, y=lifeTime, z=startTime
      attribute vec3 color;

      varying vec4 vColor;
      varying float lifeLeft;

      void main () {

        float size      = sizeLifeStart.x;
        float lifeTime  = sizeLifeStart.y;
        float startTime = sizeLifeStart.z;

        float timeElapsed = uTime - startTime;
        lifeLeft = 1.0 - (timeElapsed / lifeTime);

        /* quadratic size fall‑off, clamped */
        gl_PointSize = min(24.0, (uScale * size) * lifeLeft * lifeLeft);

        vec4 mvPos = modelViewMatrix * vec4(positionStart, 1.0);

        /* If not yet born or already dead, collapse to nothing */
        if (timeElapsed < 0.0 || lifeLeft <= 0.0) {
          gl_PointSize = 0.0;
          lifeLeft = 0.0;
        }

        vColor = vec4(color, 1.0);
        gl_Position = projectionMatrix * mvPos;
      }`;

    const fragmentShader = `
      varying vec4 vColor;
      varying float lifeLeft;
      uniform sampler2D tSprite;

      float scaleLinear (float v, vec2 d)       { return (v - d.x) / (d.y - d.x); }
      float scaleLinear (float v, vec2 d, vec2 r){ return mix(r.x, r.y, scaleLinear(v,d)); }

      void main () {
        float alpha = lifeLeft > 0.995
                    ? scaleLinear(lifeLeft, vec2(1.0, 0.995), vec2(0.0, 1.0))
                    : lifeLeft * 0.75;

        vec4 tex = texture2D(tSprite, gl_PointCoord);
        gl_FragColor = vec4(vColor.rgb * tex.a, alpha * tex.a);
      }`;
    return { vertexShader, fragmentShader };
  }
}

/* ========================================================================== */
/*  PARTICLE CONTAINER                                                        */
/* ========================================================================== */

class ParticleContainer extends THREE.Object3D {
  constructor(maxParticles, particleSystem) {
    super();

    this.FREE_CURSOR = 0; // next guaranteed‑free slot

    /* basic bookkeeping */
    this.PARTICLE_COUNT = maxParticles;
    this.PARTICLE_CURSOR = 0;
    this.count = 0;
    this.offset = 0;
    this.DPR = window.devicePixelRatio;
    this.particleSystem = particleSystem;
    this._color = new THREE.Color();

    /* ── geometry with packed attributes ───────────────────────── */
    this.particleShaderGeo = new THREE.BufferGeometry();

    /* STRIDE = 7 floats (28 bytes) */
    const STRIDE = 7;
    const f32 = new Float32Array(this.PARTICLE_COUNT * STRIDE);
    const iBuffer = new THREE.InterleavedBuffer(f32, STRIDE).setUsage(
      THREE.DynamicDrawUsage,
    );

    /* positionStart & position (for bounds) share offset 0 */
    const positionStartAttr = new THREE.InterleavedBufferAttribute(
      iBuffer,
      3,
      0,
    );
    this.particleShaderGeo.setAttribute("positionStart", positionStartAttr);
    this.particleShaderGeo.setAttribute("position", positionStartAttr); // required by Three.js internals

    /* size, lifeTime, startTime share offset 3 */
    const sizeLifeStartAttr = new THREE.InterleavedBufferAttribute(
      iBuffer,
      3,
      3,
    );
    this.particleShaderGeo.setAttribute("sizeLifeStart", sizeLifeStartAttr);

    /* colour buffer: Uint8Array, normalised */
    const colors = new Float32Array(this.PARTICLE_COUNT * 3); // 3 bytes/particle
    const colorAttr = new THREE.BufferAttribute(colors, 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    this.particleShaderGeo.setAttribute("color", colorAttr);

    /* create Points object */
    this.pointsObj3d = new THREE.Points(
      this.particleShaderGeo,
      this.particleSystem.particleShaderMat,
    );
    this.pointsObj3d.frustumCulled = false;
    this.pointsObj3d.geometry.drawRange.count = 0; // start empty
    this.add(this.pointsObj3d);

    /* cached references for speed */
    this.attrPositionStart = positionStartAttr;
    this.attrMisc = sizeLifeStartAttr;
    this.attrColor = colorAttr;
  }

  /* ---------------------------------------------------------------------- */
  /*  Spawn                                                                 */
  /* ---------------------------------------------------------------------- */
  spawnParticle(timeSeconds, opts = {}) {
    /* bail out if ring is still totally full --------------------- */
    const i = this.FREE_CURSOR;
    const STRIDE = 7;
    const base = i * STRIDE;
    const arrF32 = this.attrPositionStart.data.array;

    if (this.count === undefined) {
      this.count = 0;
    }
    this.count++;

    /* ---------- write packed attributes (exactly as before) ----- */
    const pos = opts.position ?? new THREE.Vector3();
    let size = opts.size ?? 10;
    const life = opts.lifetime ?? 5;

    // if (this.DPR) size *= this.DPR;
    const startT = timeSeconds;

    arrF32[base + 0] = pos.x; // positionStart
    arrF32[base + 1] = pos.y;
    arrF32[base + 2] = pos.z;
    arrF32[base + 3] = size; // size
    arrF32[base + 4] = life; // lifeTime
    arrF32[base + 5] = startT; // startTime

    const arrCol = this.attrColor.array;
    const col = this._color.set(opts.color ?? 0xffffff);
    arrCol[i * 3 + 0] = col.r;
    arrCol[i * 3 + 1] = col.g;
    arrCol[i * 3 + 2] = col.b;

    /* mark dirty once per spawn‑loop (same as before) ------------ */
    this.attrPositionStart.data.needsUpdate = true;
    this.attrColor.needsUpdate = true;

    /* expand draw range only when we grow past the previous max --- */
    if (this.pointsObj3d.geometry.drawRange.count < this.PARTICLE_COUNT)
      ++this.pointsObj3d.geometry.drawRange.count;

    /* advance FREE_CURSOR to next slot (actual cleaning in update) */
    this.FREE_CURSOR = (i + 1) % this.PARTICLE_COUNT;
  }

  /* ------------------------------------------------------------------ */
  /*  Frame update                                                      */
  /* ------------------------------------------------------------------ */
  update(timeSeconds) {
    const STRIDE = 7;
    const arrF32 = this.attrPositionStart.data.array;
    let i = this.FREE_CURSOR;

    // walk forward until we find a dead (or never‑used) particle
    while (true) {
      const base = i * STRIDE;
      const life = arrF32[base + 4]; // lifeTime
      const endT = arrF32[base + 5] + life; // startTime + lifeTime

      if (life === 0 || timeSeconds >= endT) break; // free!
      i = (i + 1) % this.PARTICLE_COUNT;
      if (i === this.FREE_CURSOR) break; // entire ring still alive
    }

    this.FREE_CURSOR = i;
  }

  dispose() {
    this.particleShaderGeo.dispose();
  }
}

export default ParticleSystem;
