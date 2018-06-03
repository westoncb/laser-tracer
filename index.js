const THREE = require('three');
const Stats = require('stats-js');
const InputTransformer = require('./inputTransformer');
const ParticleSystem = require('./particleSystem');
const dat = require('dat.GUI');
const TrackballControls = require('three-trackballcontrols');

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
		this.spawnerOptions = {
			spawnRate: 1500,
			horizontalSpeed: 1.5,
			verticalSpeed: 1.33,
			timeScale: 1
		};

		this.options = {
						position: new THREE.Vector3(),
						positionRandomness: .3,
						velocity: new THREE.Vector3(),
						velocityRandomness: .5,
						color: 0xaa88ff,
						colorRandomness: .2,
						turbulence: .5,
						lifetime: 2,
						size: 5,
						sizeRandomness: 1
					};

		this.datgui.add( this.options, "velocityRandomness", 0, 3 );
		this.datgui.add( this.options, "positionRandomness", 0, 3 );
		this.datgui.add( this.options, "size", 1, 20 );
		this.datgui.add( this.options, "sizeRandomness", 0, 25 );
		this.datgui.add( this.options, "colorRandomness", 0, 1 );
		this.datgui.add( this.options, "lifetime", .1, 10 );
		this.datgui.add( this.options, "turbulence", 0, 1 );
		this.datgui.add( this.spawnerOptions, "spawnRate", 10, 30000 );
		this.datgui.add( this.spawnerOptions, "timeScale", -1, 1 );

		this.particleSystem = new ParticleSystem( {
						maxParticles: 25000
					} );
		this.scene.add( this.particleSystem );
		this.particleSystem.position.z = -30;

		this.controls = new TrackballControls( this.camera, this.renderer.domElement );
		this.controls.rotateSpeed = 5.0;
		this.controls.zoomSpeed = 2.2;
		this.controls.panSpeed = 1;
		this.controls.dynamicDampingFactor = 0.3;
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
	    this.scene.add(this.camera);

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

	    this.tick = 0;
	    this.clock = new THREE.Clock();

	    this.datgui = new dat.GUI( { width: 351 } );
	}

	animate(time) {
	    this.stats.begin();

	    this.controls.update();

	    this.updateParticleSystem();
	    
	    requestAnimationFrame( this.animate.bind(this) );

	    this.renderer.render( this.scene, this.camera );

	    this.stats.end();
	}

	updateParticleSystem() {
		const delta = this.clock.getDelta() * this.spawnerOptions.timeScale;
		this.tick += delta;
		if ( this.tick < 0 ) this.tick = 0;
		if ( delta > 0 ) {
			this.options.position.x = Math.sin( this.tick * this.spawnerOptions.horizontalSpeed ) * 20;
			this.options.position.y = Math.sin( this.tick * this.spawnerOptions.verticalSpeed ) * 10;
			this.options.position.z = Math.sin( this.tick * this.spawnerOptions.horizontalSpeed + this.spawnerOptions.verticalSpeed ) * 5;
			for ( let x = 0; x < this.spawnerOptions.spawnRate * delta; x++ ) {
				// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
				// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
				this.particleSystem.spawnParticle( this.options );
			}
		}
		this.particleSystem.update( this.tick );
	}

	onWindowResize( event ) {
	    const containerElement = document.getElementById(this.containerElementId);
	    this.state.canvasWidth = containerElement.offsetWidth;
	    this.state.canvasHeight = containerElement.offsetHeight;
	    this.renderer.setSize( this.state.canvasWidth, this.state.canvasHeight );
	    this.camera.aspect = this.state.canvasWidth / this.state.canvasHeight;
	    this.camera.updateProjectionMatrix();
	}
}