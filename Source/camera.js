
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
	  		switch (event.code) {
  			case 'ArrowLeft':
  				this.isTurningLeft = true;
  				break;
  			case 'ArrowRight':
  				this.isTurningRight = true;
  				break;
	  		}
  		}, false);

  		document.addEventListener('keyup', (event) => {
	  		switch (event.code) {
  			case 'ArrowLeft':
  				this.isTurningLeft = false;
  				break;
  			case 'ArrowRight':
  				this.isTurningRight = false;
  				break;
	  		}
  		}, false);

	}

	setProjView(program) {

		this.updateScreenSize();

		this.updatePosition();

		var view = new Float32Array(16);
		var proj = new Float32Array(16);
		var projView = new Float32Array(16);

		mat4.lookAt(view, this.position, sumVec3(this.position, this.forward), this.up);
		var aspect = canvas.clientWidth / canvas.clientHeight;
		mat4.perspective(proj, glMatrix.toRadian(this.fovy), aspect, 0.1, 1000.0);
		mat4.mul(projView, proj, view);

		var matProjViewUniformLocation = gl.getUniformLocation(program, 'mProjView');
		gl.uniformMatrix4fv(matProjViewUniformLocation, gl.FALSE, projView);

	}

	updateScreenSize() {
	    var width = window.innerWidth;
	    var height = window.innerHeight;
	    if (canvas.width != width || canvas.height != height) {
	  	    canvas.width = width;
	  	    canvas.height = height;
	    }
	    gl.viewport(0, 0, width, height);
	}

	updatePosition() {
		var now = performance.now();
		if (this.isTurningLeft == true) {
			this.turnRight((this.lastFrameTime - now) / 5000);
		} else if (this.isTurningRight == true) {
			this.turnRight((now - this.lastFrameTime) / 5000);
		}
		this.lastFrameTime = now;
	}

	turnRight(amount) {
		var sin = Math.sin(amount);
		var cos = Math.cos(amount);
		this.forward = [
			cos * this.forward[0] + -sin * this.forward[2],
			this.forward[1],
			sin * this.forward[0] + cos * this.forward[2]
		]
	}

};