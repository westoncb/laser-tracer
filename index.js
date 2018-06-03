const THREE = require('three');
const Stats = require('stats-js');
const InputTransformer = require('./inputTransformer');
const Laser = require('./laser');

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
		const material = new THREE.MeshStandardMaterial({color: 0x556677, metalness: 0.6, roughness: 0.4, transparent: true, opacity: 0.25});
		this.testCube = new THREE.Mesh(geometry, material);
		this.scene.add(this.testCube);
		this.updateCubeDimensions();

		this.laser = new Laser();
		this.scene.add(this.laser.obj3d);
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

	    this.clock = new THREE.Clock();
	}

	animate(time) {
	    this.stats.begin();

	    this.laser.update(this.clock.getDelta());
	    
	    requestAnimationFrame( this.animate.bind(this) );

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