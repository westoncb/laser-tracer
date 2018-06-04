const ParticleSystem = require('./particleSystem');
const dat = require('dat.GUI');
const THREE = require('three');

class Laser {
	constructor() {
		this.options = {
						position: new THREE.Vector3(),
						velocity: new THREE.Vector3(),
						color: 0xaa88ff,
						lifetime: 1,
						size: 5,
						timeScale: 1,
					};

		this.datgui = new dat.GUI( { width: 350 } );
		this.datgui.add( this.options, "size", 1, 20 );
		this.datgui.add( this.options, "lifetime", .1, 10 );
		this.datgui.add( this.options, "timeScale", .01, 5 );

		this.particleSystem = new ParticleSystem( {
						maxParticles: 250000
					} );

		this.obj3d = new THREE.Object3D();
		this.obj3d.add( this.particleSystem );

		this.tick = 0;
		this.frame = 0;
		this.offset = new THREE.Vector3();
	}

	move(destination) {
		this.options.position.copy(destination);
	}

	trace(destination) {
		const spawnDistance = 0.03;
		const toDestVec = destination.clone().sub(this.options.position);
		const distance = toDestVec.length();
		const direction = toDestVec.normalize();

		const spawns = distance / spawnDistance;

		for (let i = 0; i < spawns; i++) {
			this.options.position.addScaledVector(direction, spawnDistance);
			this.particleSystem.spawnParticle( this.options );
		}
	}

	execute() {
		for (let i = -5; i < 5; i++) {
			for (let j = -9; j < 9; j+=6) {
				const k = 1;
				this.move(new THREE.Vector3(0 + j, 0 - k, i).add(this.offset));
				this.trace(new THREE.Vector3(5 + j, 5 - k, i).add(this.offset));
				this.trace(new THREE.Vector3(5 + j, 0 - k, i).add(this.offset));
				this.trace(new THREE.Vector3(0 + j, 0 - k, i).add(this.offset));
			}
		}

		this.offset.x += 0.01;
	}

	update(deltaTime) {
		const delta = deltaTime * this.options.timeScale;
		this.tick += delta;
		if (this.frame % 3 === 0) {
			this.execute();
		}
		this.frame++;
		this.particleSystem.update( this.tick );
	}
}

module.exports = Laser;