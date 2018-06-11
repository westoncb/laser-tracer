const THREE = require('three');
const C = require('./C'); // constants

class TracerProgram {

	constructor() {
		this.instructions = [];
		this.instructionPointer = 0;
	}

	hasNextInstruction() {
		return this.instructionPointer < (this.instructions.length);
	}

	nextInstruction() {
		return this.instructions[this.instructionPointer++];
	}

	reset() {
		this.instructionPointer = 0;
	}

	move(destination) {
		this.instructions.push({name: C.MOVE, arg1: destination});
	}

	trace(destination) {
		this.instructions.push({name: C.TRACE, arg1: destination});
	}

	deposit(location) {
		this.instructions.push({name: C.DEPOSIT, arg1: location});
	}

	color(color) {
		this.instructions.push({name: C.COLOR, arg1: color});
	}

	size(size) {
		this.instructions.push({name: C.SIZE, arg1: size});
	}

	spacing(spacing) {
		this.instructions.push({name: C.SPACING, arg1: (spacing / 100)});
	}

	residue(persistence) {
		this.instructions.push({name: C.RESIDUE, arg1: persistence});
	}
}

module.exports = TracerProgram;