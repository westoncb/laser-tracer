const THREE = require('three');
const C = require('./C'); // constants
const alphaShape = require('alpha-shape');
const TracerProgram = require('./tracerProgram');

class MeshTracer {
	constructor(options = {}) {
		this.animate = options.animate;
		this.executedOnce = false;

		this.obj3d = new THREE.Object3D();

		this.bg = new THREE.BufferGeometry();
		const bg = this.bg;
		const verts = new Float32Array(2084 * 3);
		bg.addAttribute( 'position', new THREE.BufferAttribute( verts, 3 ) );
		const attr = bg.getAttribute('position');
		attr.dynamic = true;

		this.mesh = new THREE.Mesh(this.bg, new THREE.MeshStandardMaterial({color: 0x1188aa, metalness: 0.1, roughness: 0.9, side: THREE.DoubleSide}));
		// this.mesh.setDrawMode(THREE.TrianglesDrawMode);
		this.obj3d.add(this.mesh);

		this.done = false;
	}

	update(deltaMillis) {

	}

	execute(program) {
		if (this.executedOnce) {
			if (!this.animate) {
				return;
			}
		} else {
			this.executedOnce = true;
		}

		console.log('program', program);
		const paths = program.getTracedPaths();
		console.log("paths: ", paths);
		const arrayPoints = paths.map(point => [point.x, point.y, point.z]);
		const indices = alphaShape(0.01, arrayPoints);
		indices.reverse();

		console.log('indices', indices);

		const array = new Float32Array(indices.length * 3 * 3);
		let i = 0;
		indices.forEach(index => {
			array[i++] = arrayPoints[index[0]][0];
			array[i++] = arrayPoints[index[0]][1];
			array[i++] = arrayPoints[index[0]][2];

			array[i++] = arrayPoints[index[1]][0];
			array[i++] = arrayPoints[index[1]][1];
			array[i++] = arrayPoints[index[1]][2];

			array[i++] = arrayPoints[index[2]][0];
			array[i++] = arrayPoints[index[2]][1];
			array[i++] = arrayPoints[index[2]][2];
		});

		const attr = this.bg.getAttribute('position');
		attr.setArray(array);

		this.bg.computeVertexNormals();
	}

	getSceneGraphNode() {
		return this.obj3d;
	}
}

module.exports = MeshTracer;