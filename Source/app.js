var canvas;
var gl;
var shaders;

var glInit = function () {

	canvas = document.getElementById("screen");

	gl = canvas.getContext('webgl');
	if (!gl) {
		gl = cnavas.getContext('expiramental-webgl');
	}
	if (!gl) {
		alert('Your browser does not support WebGL');
	}
	gl.clearColor(0.5, 0.5, 0.5, 1.0);

}

var Init = function () {

	glInit();

	shaders = new Shaders();

	loadTextResource('../Shaders/basic.vs', function (Err, basic_vs) {
		if (Err) {
			alert('Fatal error getting vertex shader (see console)');
			console.error(Err);
		} else {
			shaders.add("basic.vs", basic_vs);

			loadTextResource('../Shaders/basic.fs', function (Err, basic_fs) {
				if (Err) {
					alert('Fatal error getting vertex shader (see console)');
					console.error(Err);
				} else {
					shaders.add("basic.fs", basic_fs);

					Run();

				}
			});

		}
	});

};


var Run = function () {

	var program = gl.createProgram();
	gl.attachShader(program, shaders.get("basic.vs"));
	gl.attachShader(program, shaders.get("basic.fs"));
	gl.linkProgram(program);
	gl.useProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program', gl.getProgramInfoLog(program));
		return;
	}

	//remove for release build
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program', gl.getProgramInfoLog(program));
		return;
	}

	var triangleVertices = 
	[ //X,    Y,   Z       R,   G,   B  
		  0.0,  0.5, 0.0,    1.0, 1.0, 0.0,
	 	 -0.5, -0.5, 0.0,    0.0, 1.0, 1.0,
		  0.5, -0.5, 0.0,    1.0, 0.0, 1.0
	]

	var triangleIndices = 
	[  
		0, 1, 2
	]

	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

	var triangleIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndices), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		positionAttribLocation, 
		3, 
		gl.FLOAT, 
		gl.FALSE, 
		6 * Float32Array.BYTES_PER_ELEMENT, 
		0);
	gl.enableVertexAttribArray(positionAttribLocation);

	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		colorAttribLocation, 
		3, 
		gl.FLOAT, 
		gl.FALSE, 
		6 * Float32Array.BYTES_PER_ELEMENT, 
		3 * Float32Array.BYTES_PER_ELEMENT);
	gl.enableVertexAttribArray(colorAttribLocation);

	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	fps = new fpsTracker();

	var tick = function() {
		fps.update();
		updateSize();
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_SHORT, 0);
		requestAnimationFrame(tick);
	}

	requestAnimationFrame(tick);
};



