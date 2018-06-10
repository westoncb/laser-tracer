const THREE = require('three');
const C = require('./C'); // constants

class LaserProgram {

	constructor() {
		this.instructions = [];
		this.instructionPointer = 0;
	}

	hasNextInstruction() {
		return this.instructionPointer < (this.instructions.length - 1);
	}

	nextInstruction() {
		const instructionData = LaserProgram._readInstruction(this.instructionPointer, this.instructions);
		const instruction = instructionData[0];
		this.instructionPointer = instructionData[1];

		return instruction;
	}

	static _readInstruction(instructionPointer, instructions) {
		const type = instructions[instructionPointer++];
		const instruction = {type};

		switch (type) {
			case C.MOVE:
				instruction.arg1 = instructions[instructionPointer++];
			break;
			case C.TRACE:
				instruction.arg1 = instructions[instructionPointer++];
			break;
			default:
				console.error("unrecognized instruction", type);
			break;
		}

		return [instruction, instructionPointer];
	}

	reset() {
		this.instructionPointer = 0;
	}

	move(destination) {
		this.instructions.push(C.MOVE);
		this.instructions.push(destination);
	}

	trace(destination) {
		this.instructions.push(C.TRACE);
		this.instructions.push(destination);
	}
}

module.exports = LaserProgram;