import * as THREE from "three";
import spriteUrl from "../assets/particle2.png";
import matcapUrl from "../assets/matcap_shiny.png";
import { packOct16 } from "./util.js";
import { getSolidParticleMaterial } from "./materials/solidParticleMaterial.js";
import { getLightParticleMaterial } from "./materials/lightParticleMaterial.js";

const PAGE_VERTS = 60_000;
const dpr = Math.min(window.devicePixelRatio, 2);
const PIXEL_SCALE = Math.sqrt(dpr);

export default class ParticleSystem extends THREE.Object3D {
  constructor(opts = {}) {
    super();

    this.MAX_PARTICLES = opts.maxParticles ?? 500_000;

    /* page grid -------------------------------------------------- */
    const FULL_PAGES = Math.floor(this.MAX_PARTICLES / PAGE_VERTS);
    const LAST_SIZE = this.MAX_PARTICLES - FULL_PAGES * PAGE_VERTS;
    this.PAGE_COUNT = LAST_SIZE ? FULL_PAGES + 1 : FULL_PAGES;

    const pageSize = (i) =>
      i === this.PAGE_COUNT - 1 && LAST_SIZE ? LAST_SIZE : PAGE_VERTS;

    /* textures / material --------------------------------------- */
    const loader = new THREE.TextureLoader();

    this.spriteTex = loader.load(spriteUrl);
    this.matcapTex = loader.load(matcapUrl);
    this.solidMaterial = getSolidParticleMaterial(
      this.matcapTex,
      this.spriteTex,
    );
    this.lightMaterial = getLightParticleMaterial(this.spriteTex);

    this.material =
      opts.renderMode === "light" ? this.lightMaterial : this.solidMaterial;

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
    this._deathTimes = new Float32Array(this.MAX_PARTICLES);
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
  update(t) {
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
    this.material.uniforms.uScale.value = PIXEL_SCALE;
  }

  setRenderMode(mode) {
    if (mode === "solid") {
      this.material = this.solidMaterial;
    } else {
      this.material = this.lightMaterial;
    }
  }

  /* ------------------------------------------------------------ */
  dispose() {
    this.solidMaterial.dispose();
    this.lightMaterial.dispose();
    for (const pg of this.pages) pg.geometry.dispose();
    this.spriteTex.dispose();
    this.matcapTex.dispose();
  }
}

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
