
var Camera = class {

	constructor(Position, Forward, Up, FOV) {
		this.position = Position;
		this.forward = Forward;
		this.up = Up;
		this.fov = FOV;
	}

	getProjectionMatrix() {

	}

	moveForward(amount) {
		this.position += this.forward * amount;
	}

	turnRight(rads) {

	}

	lookUp(rads) {

	}

};