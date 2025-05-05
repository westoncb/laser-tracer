import * as THREE from "three";
import spriteUrl from "../assets/particle2.png"; // feather mask α
import matcapUrl from "../assets/matcap_shiny.png"; // 512×512 mat-cap

/* -- polyfills & tiny utils --------------------------------------------- */

// octahedral → Uint16×2 pack
function packOct16(v) {
  // v: THREE.Vector3 (normalised)
  const ax = Math.abs(v.x),
    ay = Math.abs(v.y),
    az = Math.abs(v.z);
  let p = new THREE.Vector2(v.x, v.y).divideScalar(ax + ay + az);
  if (v.z < 0)
    p.set(
      (1 - Math.abs(p.y)) * Math.sign(p.x),
      (1 - Math.abs(p.x)) * Math.sign(p.y),
    );
  return {
    u: Math.floor((p.x * 0.5 + 0.5) * 65535 + 0.5),
    v: Math.floor((p.y * 0.5 + 0.5) * 65535 + 0.5),
  };
}

// Three r151+ ships MathUtils.toHalfFloat, but older builds don’t.
if (!THREE.MathUtils.toHalfFloat) {
  THREE.MathUtils.toHalfFloat = (function () {
    const f32 = new Float32Array(1);
    const u32 = new Uint32Array(f32.buffer);
    return function toHalf(x) {
      f32[0] = x;
      const b = u32[0];
      const sign = (b >> 16) & 0x8000;
      const mant = b & 0x7fffff;
      const exp = (b >> 23) & 0xff;

      if (exp < 103) return sign; // zero
      if (exp > 142) return sign | 0x7c00 | (mant ? 1 : 0); // inf / nan
      if (exp < 113) {
        const m = mant | 0x800000;
        return sign | ((m + (1 << (114 - exp))) >> (115 - exp));
      }
      return sign | ((exp - 112) << 10) | (mant >> 13);
    };
  })();
}

function shaders() {
  /* ────────────────────────── Vertex ────────────────────────── */
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
    float meters2px  = uScale / -viewPos.z;

    /* -------- optimisation: clamp sprite size in pixels --------- */
    float diameterPx   = sizePx * (meters2px);
    const float MAX_PX = 24.0;          // <<< tune for your GPU
    diameterPx         = min(diameterPx, MAX_PX);

    /* final gl_PointSize ------------------------------------------- */
    float ptSize   = diameterPx + 12.;
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
    if (r2 > .89) discard;                        // outside circle (early-Z)

    // flat render small particles
    // if (vPointSize < 1.5) {
    //     vec4 feather = texture2D(tFeather, gl_PointCoord);
    //     float alpha  = vLifeLeft * feather.a;

    //     // if (alpha < 0.004) discard;
    //     gl_FragColor = vec4(vColor, alpha);   // just tint, no mat-cap, no maths
    //     return;
    // }

    /* √(1-r²)  ≈ 1 − ½·r²   (max error ≈3.4 %) */
    float z   = 1.0 - 0.5 * r2;
    vec3  nV  = vec3(pc, z);                      // already ~unit length

    vec2  uv  = nV.xy * 0.5 + 0.5;
    vec3  shade = texture2D(uMatcap, uv).rgb;

    /* ---- alpha: lifetime * feather, plus optional----------- */
    // vec4  feather = texture2D(tFeather, gl_PointCoord);
    float alpha   = vLifeLeft;

    if (alpha < 0.004) discard;

    /* ---- final colour -------------------------------------------- */
    gl_FragColor = vec4(shade * vColor, alpha);
  }`;

  return { vertexShader, fragmentShader };
}

/* -- main system class --------------------------------------------------- */

/*  SolidParticleSystem_paged.js
 *  ---------------------------------------------------------------
 *  One ring-buffer spread over N small VBO “pages”.
 *  Each page is ≤ 2.1 MiB so orphaning it every frame never stalls.
 */

/* pick a page size that stays < 4 MiB per attribute --------------- */
const PAGE_VERTS = 60_000; // 60 k × 36 B ≈ 2.1 MiB

/* ----------------------------------------------------------------- */
/*  Helper: one self-contained page                                  */
/* ----------------------------------------------------------------- */
class Page {
  constructor(pageIndex, pageVerts, sharedMaterial) {
    this.index = pageIndex;
    this.size = pageVerts;

    /* CPU arrays */
    const posArr = new Float32Array(pageVerts * 3);
    const miscArr = new Float32Array(pageVerts * 3);
    const colArr = new Float32Array(pageVerts * 3);
    const octArr = new Uint16Array(pageVerts * 2);

    /* geometry & attributes */
    const geom = new THREE.BufferGeometry();
    const makeAttr = (arr, item, norm = false) =>
      new THREE.BufferAttribute(arr, item, norm).setUsage(
        THREE.StreamDrawUsage,
      ); // orphan every update
    geom.setAttribute("positionStart", makeAttr(posArr, 3));
    geom.setAttribute("sizeLifeStart", makeAttr(miscArr, 3));
    geom.setAttribute("color", makeAttr(colArr, 3));
    geom.setAttribute("octNormal", makeAttr(octArr, 2, true));

    if (!geom.drawRange) geom.drawRange = { offset: 0, count: 0 };

    geom.drawRange.start = 0;
    geom.drawRange.count = 0; // invisible until populated

    this.geometry = geom;
    this.points = new THREE.Points(geom, sharedMaterial);
    this.points.frustumCulled = false;

    /* handy refs */
    this.attrPos = geom.getAttribute("positionStart");
    this.attrMisc = geom.getAttribute("sizeLifeStart");
    this.attrCol = geom.getAttribute("color");
    this.attrOct = geom.getAttribute("octNormal");

    /* dirty flag set by parent */
    this.dirty = false;
  }

  markDirty() {
    this.dirty = true;
  }

  upload() {
    if (!this.dirty) return;
    const touch = (attr) => {
      if (!attr.updateRange) attr.updateRange = { offset: 0, count: 0 };
      attr.updateRange.count = -1; // orphan whole page
      attr.needsUpdate = true;
    };
    touch(this.attrPos);
    touch(this.attrMisc);
    touch(this.attrCol);
    touch(this.attrOct);
    this.dirty = false;
  }
}

/* ----------------------------------------------------------------- */
/*  Solid-particle system                                            */
/* ----------------------------------------------------------------- */
export default class SolidParticleSystem extends THREE.Object3D {
  constructor(opts = {}) {
    super();

    /* limits */
    this.MAX_PARTICLES = opts.maxParticles ?? 1_000_000;
    const CAP = this.MAX_PARTICLES;

    /* page grid -------------------------------------------------- */
    const FULL_PAGES = Math.floor(CAP / PAGE_VERTS);
    const LAST_SIZE = CAP - FULL_PAGES * PAGE_VERTS;
    this.PAGE_COUNT = LAST_SIZE ? FULL_PAGES + 1 : FULL_PAGES;

    const pageSize = (i) =>
      i === this.PAGE_COUNT - 1 && LAST_SIZE ? LAST_SIZE : PAGE_VERTS;

    /* textures / material --------------------------------------- */
    const loader = new THREE.TextureLoader();
    const feather = opts.featherTex ?? loader.load(spriteUrl);
    feather.minFilter = feather.magFilter = THREE.LinearFilter;
    feather.generateMipmaps = false;
    const matcap = opts.matcapTex ?? loader.load(matcapUrl);
    feather.wrapS = feather.wrapT = THREE.ClampToEdgeWrapping;
    matcap.wrapS = matcap.wrapT = THREE.ClampToEdgeWrapping;

    const { vertexShader, fragmentShader } = shaders();
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      depthTest: true,
      // blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 1 },
        tFeather: { value: feather },
        uMatcap: { value: matcap },
      },
      vertexShader,
      fragmentShader,
    });

    /* allocate pages -------------------------------------------- */
    this.pages = [];
    for (let p = 0; p < this.PAGE_COUNT; ++p) {
      const page = new Page(p, pageSize(p), this.material);
      this.pages.push(page);
      this.add(page.points);
    }

    /* ring-buffer indices & bookkeeping ------------------------- */
    this._cursor = 0;
    this._liveStart = 0;
    this._liveCount = 0;
    this._deathTimes = new Float32Array(CAP);
    this._pageLiveCnt = new Uint32Array(this.PAGE_COUNT); // verts / page
  }

  /* ------------------------------------------------------------ */
  spawnParticle(t, o = {}) {
    const i = this._cursor;
    const pg = Math.floor(i / PAGE_VERTS);
    const off = i - pg * PAGE_VERTS;
    const page = this.pages[pg];

    /* write attributes into page-local slot -------------------- */
    const p = o.position ?? new THREE.Vector3();
    page.attrPos.setXYZ(off, p.x, p.y, p.z);

    const sizePx = o.size ?? 8;
    const life = o.lifetime ?? 4;
    page.attrMisc.setXYZ(off, sizePx, life, t);

    const col = new THREE.Color(o.color ?? 0xffffff);
    page.attrCol.setXYZ(off, col.r, col.g, col.b);

    const n = o.normal ?? new THREE.Vector3(0, 0, 1);
    const enc = packOct16(n);
    page.attrOct.setXY(off, enc.u, enc.v);

    this._deathTimes[i] = t + life;

    /* mark page dirty & update live counters ------------------- */
    page.markDirty();
    if (this._pageLiveCnt[pg]++ === 0) {
      page.points.visible = true;
      page.geometry.drawRange.count = page.size; // draw whole page
    }

    /* ring-buffer advance */
    if (this._liveCount < this.MAX_PARTICLES) {
      ++this._liveCount;
    } else {
      this._liveStart = (this._liveStart + 1) % this.MAX_PARTICLES;
      const deadPg = Math.floor(this._liveStart / PAGE_VERTS);
      if (this._pageLiveCnt[deadPg] > 0) --this._pageLiveCnt[deadPg];
      if (this._pageLiveCnt[deadPg] === 0) {
        this.pages[deadPg].points.visible = false;
      }
    }
    this._cursor = (this._cursor + 1) % this.MAX_PARTICLES;
  }

  /* ------------------------------------------------------------ */
  update(t, world2px = 1) {
    /* 1. reap expired verts ------------------------------------ */
    while (this._liveCount && this._deathTimes[this._liveStart] <= t) {
      const pg = Math.floor(this._liveStart / PAGE_VERTS);
      if (this._pageLiveCnt[pg] > 0 && --this._pageLiveCnt[pg] === 0) {
        this.pages[pg].points.visible = false;
      }
      this._liveStart = (this._liveStart + 1) % this.MAX_PARTICLES;
      --this._liveCount;
    }

    /* 2. upload dirty pages ------------------------------------ */
    for (const pg of this.pages) pg.upload();

    /* 3. uniforms ---------------------------------------------- */
    this.material.uniforms.uTime.value = t;
    this.material.uniforms.uScale.value = world2px;
  }

  /* ------------------------------------------------------------ */
  dispose() {
    this.material.dispose();
    for (const pg of this.pages) pg.geometry.dispose();
    this.material.uniforms.tFeather.value?.dispose?.();
    this.material.uniforms.uMatcap.value?.dispose?.();
  }
}
