
var Camera = class {

	constructor(Position, Forward, Up, FOVY, Program) {
		normalize(Forward);
		normalize(Up);
		this.position = Position;
		this.forward = Forward;
		this.up = Up;
		this.fovy = FOVY;
		this.program = Program;

		this.isTurningRight = false;
		this.isTurningLeft = false;
		this.isMovingForward = false;
		this.isMovingBackward = false;
		this.isLookingUp = false;
		this.isLookingDown = false;

		this.scale = 1;
		this.center = [0, 0];

		this.projViewLocation = gl.getUniformLocation(this.program, 'ProjView');
		this.scaleLocation = gl.getUniformLocation(this.program, 'Scale');
		this.centerLocation = gl.getUniformLocation(this.program, 'Center');

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
  			case 'ArrowUp':
  				this.isLookingUp = true;
  				break;
  			case 'ArrowDown':
  				this.isLookingDown = true;
  				break;
  			case 'KeyW':
  				this.isMovingForward = true;
  				break;
  			case 'KeyS':
  				this.isMovingBackward = true;
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
	  		case 'ArrowUp':
  				this.isLookingUp = false;
  				break;
  			case 'ArrowDown':
  				this.isLookingDown = false;
  				break;
  			case 'KeyW':
  				this.isMovingForward = false;
  				break;
  			case 'KeyS':
  				this.isMovingBackward = false;
  				break;
	  		}
  		}, false);

	}

	update(program) {
		this.updateScreen();
		this.updatePosition();
		this.updateFractalUniforms();
	}

	updateScreen() {
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
		if (this.isTurningLeft) {
			this.turnRight((this.lastFrameTime - now) / 500);
		} else if (this.isTurningRight == true) {
			this.turnRight((now - this.lastFrameTime) / 500);
		}

		if (this.isLookingUp) {
			this.lookUp((now - this.lastFrameTime) / 500);
		} else if (this.isLookingDown) {
			this.lookUp((this.lastFrameTime - now) / 500);
		}

		if (this.isMovingForward) {
			this.goForward((now - this.lastFrameTime) / 500);
		} else if (this.isMovingBackward) {
			this.goForward((this.lastFrameTime - now) / 500);
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

	lookUp(amount) {
		if (amount > 0 && this.forward[1] > 0.9) return;
		if (amount < 0 && this.forward[1] < -0.9) return;
		this.forward[1] += amount;
		normalize(this.forward);
	}

	goForward(amount) {
		var zoomAmount = this.forward[1] * amount;
		this.center[0] -= this.forward[0] * amount / this.scale;
		this.center[1] -= this.forward[2] * amount / this.scale;
		this.scale *= 1 - zoomAmount;
	}

	updateFractalUniforms() {
		var view = new Float32Array(16);
		var proj = new Float32Array(16);
		var projView = new Float32Array(16);

		mat4.lookAt(view, this.position, sumVec3(this.position, this.forward), this.up);
		var aspect = canvas.clientWidth / canvas.clientHeight;
		mat4.perspective(proj, glMatrix.toRadian(this.fovy), aspect, 0.1, 1000.0);
		mat4.mul(projView, proj, view);
		
		gl.uniformMatrix4fv(this.projViewLocation, gl.FALSE, projView);
		gl.uniform2fv(this.centerLocation, new Float32Array(this.center));
		gl.uniform1f(this.scaleLocation, this.scale);

	}


};