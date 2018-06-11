const BasicCanvas = require('./basicCanvas');
const THREE = require('three');
const Laser = require('./laser');
const TracerProgram = require('./TracerProgram');
const vec3 = (x, y, z) => new THREE.Vector3(x, y, z);

class TracerController {
	constructor() {
		const onWindowResize = (event) => {
			this.updateCubeDimensions();
		}

		this.initTracer();
		this.canvas = new BasicCanvas('canvas-container', this.update.bind(this), ()=>{}, onWindowResize.bind(this));
		this.initScene(this.canvas.scene);
	}

	initScene(scene) {
		const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
		const material = new THREE.MeshStandardMaterial({color: 0xccddee, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide});
		this.testCube = new THREE.Mesh(geometry, material);
		scene.add(this.testCube);
		this.updateCubeDimensions();
		
		this.tracer.obj3d.frustumCulled = false;

		scene.add(this.tracer.obj3d);
	}

	initTracer() {
		this.tracer = new Laser();
		this.totalTime = 0;
		this.frame = 0;
		this.frameSkip = 3;
		this.timeScale = 1;

		this.initUserProgram();
	}

	initUserProgram() {
		this.frameSkip = 1;
		this.offset = vec3();
		this.rotation = 0;
	}

	getNextUserProgram() {
		return this.sphere();
	}

	update(deltaMillis) {
		const scaledDelta = deltaMillis * this.timeScale;
		this.totalTime += scaledDelta;
		if (this.frame % this.frameSkip === 0) {
			const prog = this.getNextUserProgram();
			this.tracer.execute(prog);
		}

		this.tracer.update(this.totalTime);

		this.frame++;
	}

	thing() {
		const t = new TracerProgram();
		const samples = 3000;
		const radius = 3;

		t.move(vec3(0, 0, 0));

		let angle = 0;
		for (let i = 0; i < samples; i++) {
			angle += Math.PI * 2 / samples;

			const x = Math.cos(angle - this.rotation) * radius
			const y = Math.sin(angle) * radius;
			const z = Math.sin(this.rotation * 100) * radius;

			t.deposit(vec3(x, y, z));
		}

		this.rotation += 0.02;

		return t;
	}

	sphere() {
		const t = new TracerProgram();
		const samples = 300;
		const radius = 3;

		t.move(vec3(0, 0, 0));
		t.spacing(1);
		t.size(3);
		t.residue(0.5);

		let vAngle = Math.PI/2;
		let hAngle = 0;
		const vIters = Math.sqrt(samples);
		const hIters = Math.sqrt(samples);
		let curRadius = 0;
		let x = 0;
		let z = 0;
		for (let i = 0; i < vIters; i++) {
			const y = Math.sin(vAngle) * radius;
			curRadius = Math.cos(vAngle) * radius;
			t.move(vec3(x, y, z));
			for (let j = 0; j < hIters; j++) {
				x = Math.cos(hAngle + this.rotation) * curRadius;
				z = Math.sin(hAngle + this.rotation) * curRadius;
				hAngle += Math.PI * 2 / hIters;
				t.color(0xffffff * hAngle / Math.PI / 2)
				t.trace(vec3(x, y, z));
			}
			vAngle += Math.PI / vIters;
		}

		this.rotation += 0.008;

		return t;
	}

	triangles() {
		const t = new TracerProgram();

		for (let i = -2; i < 2; i++) {
			for (let j = -9; j < 9; j+=6) {
				const k = 1;

				if (((j+9)/6) % 2 === 0) {
					t.color(0xff55cc);
				} else {
					t.color(0x00FFFF);
				}

				if (i % 2 === 0) {
					t.size(5);
					t.spacing(3);
				} else {
					t.size(5);
					t.spacing(3);
				}

				t.move(vec3(0 + j, 0 - k, i).add(this.offset));
				t.trace(vec3(5 + j, 5 - k, i).add(this.offset));
				t.trace(vec3(5 + j, 0 - k, i).add(this.offset));
				t.trace(vec3(0 + j, 0 - k, i).add(this.offset));
			}
		}

		this.offset.x += 0.01;

		return t;
	}

	updateCubeDimensions() {
		const aspectRatio = this.canvas.camera.aspect;
		this.testCube.scale.x = aspectRatio;
	}
}

module.exports = TracerController;