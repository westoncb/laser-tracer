const BasicCanvas = require('./basicCanvas');
const THREE = require('three');
const LaserTracer = require('./laserTracer');
const MeshTracer = require('./meshTracer');
const TracerProgram = require('./TracerProgram');
const vec3 = (x, y, z) => new THREE.Vector3(x, y, z);

class TracerController {
	constructor() {
		const onWindowResize = (event) => {
			this.updateCubeDimensions();
		}

		this.initTracers();
		this.canvas = new BasicCanvas('canvas-container', this.update.bind(this), ()=>{}, onWindowResize.bind(this));
		this.initScene(this.canvas.scene);
	}

	initScene(scene) {
		const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
		const material = new THREE.MeshStandardMaterial({color: 0xccddee, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide});
		this.testCube = new THREE.Mesh(geometry, material);
		this.testCube.visible = false;
		scene.add(this.testCube);
		this.updateCubeDimensions();

		this.iterTracers((tracer) => scene.add(tracer.getSceneGraphNode()));
	}

	initTracers() {
		this.tracers = [];
		this.tracers['meshTracer'] = new MeshTracer({animate: false});
		this.tracers['laserTracer'] = new LaserTracer({animate: true});

		this.enableTable = [];
		this.enableTable['meshTracer'] = false;
		this.enableTable['laserTracer'] = true;

		this.totalTime = 0;
		this.frame = 0;
		this.frameSkip = 300;
		this.timeScale = 1;

		this.initUserProgram();
	}

	iterTracers(func) {
		Object.keys(this.tracers).forEach(key => {
			if (this.enableTable[key]) {
				func(this.tracers[key]);
			}
		});
	}

	initUserProgram() {
		this.frameSkip = 1;
		this.offset = vec3();
		this.rotation = 0;

		this.waveDir = vec3(Math.random(), 0, Math.random());
		this.waveDir.multiplyScalar(2);
		this.waveDir.sub(vec3(-1, 0, -1));
	}

	getNextUserProgram() {
		const t = new TracerProgram();
		this.wave(t);
		return t;
	}

	update(deltaMillis) {
		const scaledDelta = deltaMillis * this.timeScale;
		this.totalTime += scaledDelta;
		if (this.frame % this.frameSkip === 0) {
			const prog = this.getNextUserProgram();
			this.iterTracers((tracer) => tracer.execute(prog));
		}

		this.iterTracers((tracer) => tracer.update(this.totalTime));

		this.frame++;
	}

	thing(t) {
		const samples = 300;
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
	}

	sphere(t) {
		const samples = 1000;
		const radius = 60;

		t.move(vec3(0, 0, 0));
		t.spacing(30);
		t.size(4);
		t.residue(1);

		let vAngle = Math.PI/2;
		let hAngle = 0;
		const vIters = Math.sqrt(samples);
		const hIters = Math.sqrt(samples);
		let curRadius = 0;
		let x = 0;
		let z = 0;
		const radiusScalerFunc = () => {
			// const min = 0.8;
			// const max = 1.6;
			// return Math.random()*(max - min) + min;
			return 1;
		};
		for (let i = 0; i < vIters; i++) {
			const y = Math.sin(vAngle) * radius;
			curRadius = Math.cos(vAngle) * radius * radiusScalerFunc();
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
	}

	wave(t) {
		const samples = 5000;
		const samplesPerAxis = Math.sqrt(samples);
		const size = 200;
		const waveSize = size / (Math.PI*2);
		const waveCount = 15;

		t.move(vec3(0, 0, 0));
		t.spacing(25);
		t.size(8);
		t.residue(5);
		t.color(0xaa88ff);

		const count = samplesPerAxis;
		const increment = size / samplesPerAxis;
		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
				let x = i * increment - size/2;
				const z = j * increment - size/2;

				const phase = vec3(x, 0, z).dot(this.waveDir) * 0.05;

				const y = Math.sin(phase + this.totalTime + waveSize*x*waveCount) * 5;
				x += Math.cos(phase + this.totalTime + waveSize*x*waveCount) * 3;

				// t.color(0x111111 * x);

				t.deposit(vec3(x, y, z));
			}		
		}
	}

	triangles(t) {
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

		this.offset.x += 0.005;
	}

	updateCubeDimensions() {
		const aspectRatio = this.canvas.camera.aspect;
		this.testCube.scale.x = aspectRatio;
	}
}

module.exports = TracerController;