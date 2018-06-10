const ParticleSystem = require('./particleSystem');
const dat = require('dat.GUI');
const THREE = require('three');
const C = require('./C'); // constants

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

		this.spawnDistance = 0.03;

		this.datgui = new dat.GUI( { width: 350 } );
		this.datgui.add( this.options, "size", 1, 20 );
		this.datgui.add( this.options, "lifetime", .1, 10 );
		this.datgui.add( this.options, "timeScale", .01, 5 );

		this.particleSystem = new ParticleSystem( {
						maxParticles: 250000
					} );

		this.obj3d = new THREE.Object3D();
		this.obj3d.add( this.particleSystem );
	}

	move(destination) {
		this.options.position.copy(destination);
	}

	trace(destination) {
		const spawnDistance = this.spawnDistance;
		const toDestVec = destination.clone().sub(this.options.position);
		const distance = toDestVec.length();
		const direction = toDestVec.normalize();

		const spawns = distance / spawnDistance;

		for (let i = 0; i < spawns; i++) {
			this.options.position.addScaledVector(direction, spawnDistance);
			this.particleSystem.spawnParticle( this.options );
		}
	}

	deposit(location) {
		this.options.position.copy(location);
		this.particleSystem.spawnParticle( this.options );
	}

	color(color) {
		this.options.color = color;
	}

	size(size) {
		this.options.size = size;
	}

	spacing(spacing) {
		this.spawnDistance = spacing / 100;
	}

	residue(persistence) {
		this.options.lifetime = persistence;
	}

	executeProgram(program) {
		// while (program.hasNextInstruction()) {
		// 	this.executeInstruction(program.nextInstruction());
		// }
	}

	executeInstruction(instruction) {
		switch (instruction.type) {
			case C.MOVE:
				this.move(instruction.arg1);
			break;
			case C.TRACE:
				this.trace(instruction.arg1);
			break;
			default:
				console.error("unrecognized instruction", type);
			break;
		}
	}

	update(tick) {
		this.particleSystem.update( tick );
	}
}

module.exports = Laser;