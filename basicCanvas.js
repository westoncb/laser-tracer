const THREE = require('three');
const Stats = require('stats-js');
const InputTransformer = require('./inputTransformer');
const OrbitControls = require('three-orbit-controls')(THREE);

class BasicCanvas {
	constructor(containerElementId, onBeforeRender, onAfterRender, onWindowResize) {
		this.containerElementId = containerElementId;
		const containerElement = document.getElementById(this.containerElementId);

		this.onBeforeRender = onBeforeRender;
		this.onAfterRender = onAfterRender;
		this.onWindowResize = onWindowResize;

		this.state = {};
		this.state.canvasWidth = containerElement.offsetWidth;
		this.state.canvasHeight = containerElement.offsetHeight;
		this.state.cameraNear = 1;
		this.state.cameraFar = 1000;

		this.initThreeJS();

		this.animate();
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
	    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
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

	animate(time) {
		const deltaMillis = this.clock.getDelta();

		this.stats.begin();

		this.onBeforeRender(deltaMillis);

	    this.renderer.render( this.scene, this.camera );
	    requestAnimationFrame( this.animate.bind(this) );

	    this.controls.update();
	    this.stats.end();

	    this.onAfterRender(deltaMillis);
	}

	onWindowResize( event ) {
	    const containerElement = document.getElementById(this.containerElementId);
	    this.state.canvasWidth = containerElement.offsetWidth;
	    this.state.canvasHeight = containerElement.offsetHeight;
	    this.renderer.setSize( this.state.canvasWidth, this.state.canvasHeight );
	    this.camera.aspect = this.state.canvasWidth / this.state.canvasHeight;
	    this.camera.updateProjectionMatrix();

	    this.onWindowResize(event);
	}
}

module.exports = BasicCanvas;