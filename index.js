const THREE = require('three');
const Stats = require('stats-js');
const InputTransformer = require('./inputTransformer');
const Laser = require('./laser');
const LaserProgram = require('./laserProgram');
const OrbitControls = require('three-orbit-controls')(THREE);
const vec3 = (x, y, z) => new THREE.Vector3(x, y, z);

window.onload = () => {
	const basicCanvas = new BasicCanvas('canvas-container');
};

class BasicCanvas {
	constructor(containerElementId) {
		this.containerElementId = containerElementId;
		const containerElement = document.getElementById(this.containerElementId);

		this.state = {};
		this.state.canvasWidth = containerElement.offsetWidth;
		this.state.canvasHeight = containerElement.offsetHeight;
		this.state.cameraNear = 1;
		this.state.cameraFar = 1000;

		this.initThreeJS();
		this.initScene();

		this.animate();
	}

	initScene() {
		const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
		const material = new THREE.MeshStandardMaterial({color: 0xccddee, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide});
		this.testCube = new THREE.Mesh(geometry, material);
		this.scene.add(this.testCube);
		this.updateCubeDimensions();

		this.laser = new Laser();
		this.scene.add(this.laser.obj3d);
		this.tick = 0;
		this.frame = 0;
		this.frameSkip = 3;

		this.initUserProgram();
	}

	initThreeJS() {
	    this.renderer = new THREE.WebGLRenderer( { antialias: false } );
	    this.renderer.setPixelRatio( window.devicePixelRatio );
	    this.renderer.setSize( this.state.canvasWidth, this.state.canvasHeight );
	    this.renderer.setClearColor(0x333333);
	    document.getElementById(this.containerElementId).appendChild( this.renderer.domElement );

	    this.stats = new Stats();
	    this.stats.setMode( 0 );
	    this.stats.domElement.style.position = 'absolute';
	    this.stats.domElement.style.left = '0px';
	    this.stats.domElement.style.top = '0px';
	    document.body.appendChild( this.stats.domElement );

	    this.scene = new THREE.Scene();
	    this.camera = new THREE.PerspectiveCamera( 45, this.state.canvasWidth / this.state.canvasHeight, this.state.cameraNear, this.state.cameraFar );
	    this.camera.position.z = 20;
	    this.camera.lookAt(vec3(0, 0, 0));
	    this.scene.add(this.camera);
	    this.scene.fog = new THREE.Fog(0x000000, 10, 20);

	    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	    this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.25;
		this.controls.screenSpacePanning = false;
		this.controls.minDistance = 1;
		this.controls.maxDistance = 200;
		this.controls.maxPolarAngle = Math.PI / 2;

	    const lightTarget = new THREE.Object3D();
	    lightTarget.position.set(-1, -1, -10);
	    this.scene.add(lightTarget);

	    const hemiLight = new THREE.HemisphereLight( 0xA0A0A0, 0x404040, 1);
	    hemiLight.position.set(0, 0, 1);
	    this.scene.add(hemiLight);

	    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	    directionalLight.target = lightTarget;

	    directionalLight.position.z += 10;
	    this.camera.add( directionalLight );
	    this.dirLight = directionalLight;

	    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

	    this.inputTransformer = new InputTransformer(this.renderer.domElement, this.camera, this.scene);

	    this.clock = new THREE.Clock();
	}

	getNextProgram() {
		const program = new LaserProgram();

		for (let i = -5; i < 5; i++) {
			for (let j = -9; j < 9; j+=6) {
				const k = 1;
				program.move(vec3(0 + j, 0 - k, i).add(this.offset));
				program.trace(vec3(5 + j, 5 - k, i).add(this.offset));
				program.trace(vec3(5 + j, 0 - k, i).add(this.offset));
				program.trace(vec3(0 + j, 0 - k, i).add(this.offset));
			}
		}

		this.offset.x += 0.01;

		return program
	}

	initUserProgram() {
		this.offset = vec3();
		this.frameSkip = 1;
		this.rotation = 0;
	}

	executeProgram() {
		// this.triangles();
		this.sphere2();
	}

	sphere() {
		const l = this.laser;
		const samples = 30000;
		const radius = 3;

		l.move(vec3(0, 0, 0));

		let angle = 0;
		for (let i = 0; i < samples; i++) {
			angle += Math.PI * 2 / samples;

			const x = Math.cos(angle - this.rotation) * radius
			const y = Math.sin(angle) * radius;
			const z = Math.sin(this.rotation * 100) * radius;

			l.deposit(vec3(x, y, z));
		}

		this.rotation += 0.02;
	}

	sphere2() {
		const l = this.laser;
		const samples = 2000;
		const radius = 3;

		l.move(vec3(0, 0, 0));
		l.spacing(1);
		l.size(3);
		l.residue(0.5);

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
			l.move(vec3(x, y, z));
			for (let j = 0; j < hIters; j++) {
				x = Math.cos(hAngle + this.rotation) * curRadius;
				z = Math.sin(hAngle + this.rotation) * curRadius;
				hAngle += Math.PI * 2 / hIters;
				l.color(0xffffff * hAngle / Math.PI / 2)
				l.trace(vec3(x, y, z));
			}
			vAngle += Math.PI / vIters;
		}

		this.rotation += 0.008;
	}

	triangles() {
		const l = this.laser;

		for (let i = -2; i < 2; i++) {
			for (let j = -9; j < 9; j+=6) {
				const k = 1;

				if (((j+9)/6) % 2 === 0) {
					l.color(0xff55cc);
				} else {
					l.color(0x00FFFF);
				}

				if (i % 2 === 0) {
					l.size(5);
					l.spacing(3);
				} else {
					l.size(5);
					l.spacing(3);
				}

				l.move(vec3(0 + j, 0 - k, i).add(this.offset));
				l.trace(vec3(5 + j, 5 - k, i).add(this.offset));
				l.trace(vec3(5 + j, 0 - k, i).add(this.offset));
				l.trace(vec3(0 + j, 0 - k, i).add(this.offset));
			}
		}

		this.offset.x += 0.01;
	}

	animate(time) {
	    this.stats.begin();

	    const deltaTime = this.clock.getDelta();
	    const delta = deltaTime * this.laser.options.timeScale;
	    this.tick += delta;
	    if (this.frame % this.frameSkip === 0) {
	    	this.executeProgram();
	    }

	    this.laser.update(this.tick);

	    this.frame++;
	    
	    requestAnimationFrame( this.animate.bind(this) );

	    this.controls.update();

	    this.renderer.render( this.scene, this.camera );

	    this.stats.end();
	}

	onWindowResize( event ) {
	    const containerElement = document.getElementById(this.containerElementId);
	    this.state.canvasWidth = containerElement.offsetWidth;
	    this.state.canvasHeight = containerElement.offsetHeight;
	    this.renderer.setSize( this.state.canvasWidth, this.state.canvasHeight );
	    this.camera.aspect = this.state.canvasWidth / this.state.canvasHeight;
	    this.camera.updateProjectionMatrix();

	    this.updateCubeDimensions();
	}

	updateCubeDimensions() {
		const aspectRatio = this.camera.aspect;
		this.testCube.scale.x = aspectRatio;
	}
}