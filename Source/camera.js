
var Camera = class {

	constructor(Position, Forward, Up, FOVY) {
		this.position = Position;
		this.forward = Forward;
		this.up = Up;
		this.fovy = FOVY;

		this.isTurningRight = false;
		this.isTurningLeft = false;

		this.addEvents();

		this.lastFrameTime = performance.now();

	}


	addEvents() {

		
		
		document.addEventListener('keydown', (event) => {
	  		if (event.code == 'ArrowLeft') {
	  			console.log("left");
	  		}
  		}, false);

  		document.addEventListener('keyup', (event) => {
	  		var name = event.key;
	  		var code = event.code;
	  		alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  		}, false);

	}

	setProjView(program) {

		updateScreenSize();

		var view = new Float32Array(16);
		var proj = new Float32Array(16);
		var projView = new Float32Array(16);

		mat4.lookAt(view, this.position, sumVec3(this.position, this.forward), this.up);
		var aspect = canvas.clientWidth / canvas.clientHeight;
		mat4.perspective(proj, glMatrix.toRadian(this.fovy), aspect, 0.1, 1000.0);
		mat4.mul(projView, proj, view);

		var matProjViewUniformLocation = gl.getUniformLocation(program, 'mProjView');
		gl.uniformMatrix4fv(matProjViewUniformLocation, gl.FALSE, projView);

		this.lastFrameTime = performance.now();
	}

	turnRight(amount) {

	}

};