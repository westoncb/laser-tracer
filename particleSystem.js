import * as THREE from "three";

/*
 * This was adapted from the "GPU Particle System" project of "flimshaw - Charlie Hoey - http://charliehoey.com"
 * You can find a demo of the original here: https://threejs.org/examples/?q=particle#webgl_gpu_particle_system
 *
 * The idea behind this adaptation is to spawn particles based on emmiter distance travelled, rather than time.
 */

class ParticleSystem extends THREE.Object3D {
  constructor(options) {
    super();

    this.options = options || {};

    // parse options and use defaults

    this.PARTICLE_COUNT = this.options.maxParticles || 1000000;
    this.PARTICLE_CONTAINERS = this.options.containerCount || 1;

    this.PARTICLE_SPRITE_TEXTURE = this.options.particleSpriteTex || null;

    this.PARTICLES_PER_CONTAINER = Math.ceil(
      this.PARTICLE_COUNT / this.PARTICLE_CONTAINERS,
    );
    this.PARTICLE_CURSOR = 0;
    this.time = 0;
    this.particleContainers = [];

    this.randIndex = 0;
    this.rand = [];

    // preload a million random numbers

    let i;

    for (i = 1e5; i > 0; i--) {
      this.rand.push(Math.random() - 0.5);
    }

    let textureLoader = new THREE.TextureLoader();

    this.particleSpriteTex =
      this.PARTICLE_SPRITE_TEXTURE ||
      textureLoader.load("textures/particle2.png");
    this.particleSpriteTex.wrapS = this.particleSpriteTex.wrapT =
      THREE.RepeatWrapping;

    const shaderStrings = ParticleSystem.getShaderStrings();
    const uniforms = {
      uTime: {
        value: 0.0,
      },
      uScale: {
        value: 1.0,
      },
      tSprite: {
        value: this.particleSpriteTex,
      },
    };

    this.particleShaderMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      blending: THREE.AdditiveBlending,
      vertexShader: shaderStrings.vertexShader,
      fragmentShader: shaderStrings.fragmentShader,
    });

    // define defaults for all values

    this.particleShaderMat.defaultAttributeValues.particlePositionsStartTime = [
      0, 0, 0, 0,
    ];
    this.particleShaderMat.defaultAttributeValues.particleVelColSizeLife = [
      0, 0, 0, 0,
    ];

    this.init();
  }

  init() {
    for (let i = 0; i < this.PARTICLE_CONTAINERS; i++) {
      let c = new ParticleContainer(this.PARTICLES_PER_CONTAINER, this);
      this.particleContainers.push(c);
      this.add(c);
    }
  }

  random() {
    return ++this.randIndex >= this.rand.length
      ? this.rand[(this.randIndex = 1)]
      : this.rand[this.randIndex];
  }

  spawnParticle(options) {
    this.PARTICLE_CURSOR++;

    if (this.PARTICLE_CURSOR >= this.PARTICLE_COUNT) {
      this.PARTICLE_CURSOR = 1;
    }

    let currentContainer =
      this.particleContainers[
        Math.floor(this.PARTICLE_CURSOR / this.PARTICLES_PER_CONTAINER)
      ];

    currentContainer.spawnParticle(options);
  }

  update(time) {
    for (let i = 0; i < this.PARTICLE_CONTAINERS; i++) {
      this.particleContainers[i].update(time);
    }
  }

  dispose() {
    this.particleShaderMat.dispose();
    this.particleSpriteTex.dispose();

    for (let i = 0; i < this.PARTICLE_CONTAINERS; i++) {
      this.particleContainers[i].dispose();
    }
  }

  static getShaderStrings() {
    const vertexShader = `
			uniform float uTime;
			uniform float uScale;

			attribute vec3 positionStart;
			attribute float startTime;
			attribute vec3 color;
			attribute float size;
			attribute float lifeTime;

			varying vec4 vColor;
			varying float lifeLeft;

			void main() {

				// unpack things from our attributes

				vColor = vec4( color, 1.0 );

				float timeElapsed = uTime - startTime;

				lifeLeft = 1.0 - ( timeElapsed / lifeTime );

				// Cap the point size since the calcuation we use can lead to explosions
				// in size for certain values of lifeLeft
				gl_PointSize = min(8., ( uScale * size ) * lifeLeft * lifeLeft);


				if( timeElapsed > 0.0 ) {

					gl_Position = projectionMatrix * modelViewMatrix * vec4( positionStart, 1.0 );

				} else {

					gl_Position = projectionMatrix * modelViewMatrix * vec4( positionStart, 1.0 );
					lifeLeft = 0.0;
					gl_PointSize = 0.;

				}
			}`;

    const fragmentShader = `
			float scaleLinear( float value, vec2 valueDomain ) {

				return ( value - valueDomain.x ) / ( valueDomain.y - valueDomain.x );

			}

			float scaleLinear( float value, vec2 valueDomain, vec2 valueRange ) {

				return mix( valueRange.x, valueRange.y, scaleLinear( value, valueDomain ) );

			}

			varying vec4 vColor;
			varying float lifeLeft;

			uniform sampler2D tSprite;

			void main() {

				float alpha = 0.;

				if( lifeLeft > 0.995 ) {

					alpha = scaleLinear( lifeLeft, vec2( 1.0, 0.995 ), vec2( 0.0, 1.0 ) );

				} else {
					alpha = lifeLeft * 0.75;
				}

				vec4 tex = texture2D( tSprite, gl_PointCoord );
				gl_FragColor = vec4( vColor.rgb * tex.a, alpha * tex.a );

			}`;

    return { vertexShader, fragmentShader };
  }
}

// Subclass for particle containers, allows for very large arrays to be spread out

class ParticleContainer extends THREE.Object3D {
  constructor(maxParticles, particleSystem) {
    super();

    this.PARTICLE_COUNT = maxParticles || 100000;
    this.PARTICLE_CURSOR = 0;
    this.time = 0;
    this.offset = 0;
    this.count = 0;
    this.DPR = window.devicePixelRatio;
    this.particleSystem = particleSystem;
    this.particleUpdate = false;

    // geometry

    this.particleShaderGeo = new THREE.BufferGeometry();

    this.particleShaderGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(this.PARTICLE_COUNT * 3),
        3,
      ).setUsage(THREE.DynamicDrawUsage),
    );
    this.particleShaderGeo.setAttribute(
      "positionStart",
      new THREE.BufferAttribute(
        new Float32Array(this.PARTICLE_COUNT * 3),
        3,
      ).setUsage(THREE.DynamicDrawUsage),
    );
    this.particleShaderGeo.setAttribute(
      "startTime",
      new THREE.BufferAttribute(
        new Float32Array(this.PARTICLE_COUNT),
        1,
      ).setUsage(THREE.DynamicDrawUsage),
    );
    this.particleShaderGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(
        new Float32Array(this.PARTICLE_COUNT * 3),
        3,
      ).setUsage(THREE.DynamicDrawUsage),
    );
    this.particleShaderGeo.setAttribute(
      "size",
      new THREE.BufferAttribute(
        new Float32Array(this.PARTICLE_COUNT),
        1,
      ).setUsage(THREE.DynamicDrawUsage),
    );
    this.particleShaderGeo.setAttribute(
      "lifeTime",
      new THREE.BufferAttribute(
        new Float32Array(this.PARTICLE_COUNT),
        1,
      ).setUsage(THREE.DynamicDrawUsage),
    );

    // material

    this.particleShaderMat = this.particleSystem.particleShaderMat;

    this._position = new THREE.Vector3();
    this._color = new THREE.Color(0xffffff);

    this.init();
  }

  spawnParticle(options) {
    let positionStartAttribute =
      this.particleShaderGeo.getAttribute("positionStart");
    let startTimeAttribute = this.particleShaderGeo.getAttribute("startTime");
    let colorAttribute = this.particleShaderGeo.getAttribute("color");
    let sizeAttribute = this.particleShaderGeo.getAttribute("size");
    let lifeTimeAttribute = this.particleShaderGeo.getAttribute("lifeTime");

    options = options || {};

    // setup reasonable default values for all arguments

    const position =
      options.position !== undefined
        ? this._position.copy(options.position)
        : this._position;
    const color =
      options.color !== undefined
        ? this._color.set(options.color)
        : this._color;

    let lifetime = options.lifetime !== undefined ? options.lifetime : 5;
    let size = options.size !== undefined ? options.size : 10;

    if (this.DPR !== undefined) size *= this.DPR;

    let i = this.PARTICLE_CURSOR;

    // position

    positionStartAttribute.array[i * 3 + 0] = position.x;
    positionStartAttribute.array[i * 3 + 1] = position.y;
    positionStartAttribute.array[i * 3 + 2] = position.z;

    colorAttribute.array[i * 3 + 0] = color.r;
    colorAttribute.array[i * 3 + 1] = color.g;
    colorAttribute.array[i * 3 + 2] = color.b;

    // size, lifetime and starttime

    sizeAttribute.array[i] = size;
    lifeTimeAttribute.array[i] = lifetime;
    startTimeAttribute.array[i] =
      this.time + this.particleSystem.random() * 5e-2;

    // offset

    if (this.offset === 0) {
      this.offset = this.PARTICLE_CURSOR;
    }

    // counter and cursor

    this.count++;
    this.PARTICLE_CURSOR++;

    if (this.PARTICLE_CURSOR >= this.PARTICLE_COUNT) {
      this.PARTICLE_CURSOR = 0;
    }

    this.particleUpdate = true;
  }

  init() {
    this.pointsObj3d = new THREE.Points(
      this.particleShaderGeo,
      this.particleShaderMat,
    );
    this.pointsObj3d.scale.set(1.01, 1.01, 1.01);
    // this.pointsObj3d.material.depthTest = false;
    this.pointsObj3d.frustumCulled = false;
    this.add(this.pointsObj3d);
  }

  update(time) {
    this.time = time;
    this.particleShaderMat.uniforms.uTime.value = time;

    this.geometryUpdate();
  }

  geometryUpdate() {
    if (this.particleUpdate === true) {
      this.particleUpdate = false;

      let positionStartAttribute =
        this.particleShaderGeo.getAttribute("positionStart");
      let startTimeAttribute = this.particleShaderGeo.getAttribute("startTime");
      let colorAttribute = this.particleShaderGeo.getAttribute("color");
      let sizeAttribute = this.particleShaderGeo.getAttribute("size");
      let lifeTimeAttribute = this.particleShaderGeo.getAttribute("lifeTime");

      // Initialize updateRange if it doesn't exist
      if (!positionStartAttribute.updateRange)
        positionStartAttribute.updateRange = { offset: 0, count: -1 };
      if (!startTimeAttribute.updateRange)
        startTimeAttribute.updateRange = { offset: 0, count: -1 };
      if (!colorAttribute.updateRange)
        colorAttribute.updateRange = { offset: 0, count: -1 };
      if (!sizeAttribute.updateRange)
        sizeAttribute.updateRange = { offset: 0, count: -1 };
      if (!lifeTimeAttribute.updateRange)
        lifeTimeAttribute.updateRange = { offset: 0, count: -1 };

      if (this.offset + this.count < this.PARTICLE_COUNT) {
        positionStartAttribute.updateRange.offset =
          this.offset * positionStartAttribute.itemSize;
        startTimeAttribute.updateRange.offset =
          this.offset * startTimeAttribute.itemSize;
        colorAttribute.updateRange.offset =
          this.offset * colorAttribute.itemSize;
        sizeAttribute.updateRange.offset = this.offset * sizeAttribute.itemSize;
        lifeTimeAttribute.updateRange.offset =
          this.offset * lifeTimeAttribute.itemSize;

        positionStartAttribute.updateRange.count =
          this.count * positionStartAttribute.itemSize;
        startTimeAttribute.updateRange.count =
          this.count * startTimeAttribute.itemSize;
        colorAttribute.updateRange.count = this.count * colorAttribute.itemSize;
        sizeAttribute.updateRange.count = this.count * sizeAttribute.itemSize;
        lifeTimeAttribute.updateRange.count =
          this.count * lifeTimeAttribute.itemSize;
      } else {
        positionStartAttribute.updateRange.offset = 0;
        startTimeAttribute.updateRange.offset = 0;
        colorAttribute.updateRange.offset = 0;
        sizeAttribute.updateRange.offset = 0;
        lifeTimeAttribute.updateRange.offset = 0;

        // Use -1 to update the entire buffer, see #11476
        positionStartAttribute.updateRange.count = -1;
        startTimeAttribute.updateRange.count = -1;
        colorAttribute.updateRange.count = -1;
        sizeAttribute.updateRange.count = -1;
        lifeTimeAttribute.updateRange.count = -1;
      }

      positionStartAttribute.needsUpdate = true;
      startTimeAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
      sizeAttribute.needsUpdate = true;
      lifeTimeAttribute.needsUpdate = true;

      this.offset = 0;
      this.count = 0;
    }
  }

  dispose() {
    this.particleShaderGeo.dispose();
  }
}

export default ParticleSystem;
