
var Camera = class {

	constructor(Position, Forward, Up, FOVY) {
		this.position = Position;
		this.forward = Forward;
		this.up = Up;
		this.fovy = FOVY;
	}

	getProjView() {

		var view = new Float32Array(16);
		mat4.lookAt(view, this.position, this.position + this.forward, this.up);

		var aspect = canvas.clientWidth / canvas.clientHeight;
		var proj = new Float32Array(16);
		mat4.perspective(proj, glMatrix.toRadian(45), aspect, 0.1, 1000.0);

		return proj * view;
	}

};