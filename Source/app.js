var canvas = document.getElementById("screen");
var gl = canvas.getContext('webgl');
var fps;
var shaders;


/*var InitApp = function () {
	loadTextResource('../Shaders/basic.vs', function (vsErr, vsText) {
		if (vsErr) {
			alert('Fatal error getting vertex shader (see console)');
			console.error(vsErr);
		} else {
			loadTextResource('../Shaders/basic.fs', function (fsErr, fsText) {
				if (fsErr) {
					alert('Fatal error getting fragment shader (see console)');
					console.error(fsErr);
				} else {
					Run(vsText, fsText);
				}
			});
		}
	});
};*/

var Run = function () {

	shaders = new ShaderMap();
	shaders.init();

	if (!gl) {
		gl = cnavas.getContext('expiramental-webgl');
	}
	if (!gl) {
		alert('Your browser does not support WebGL');
	}
	gl.clearColor(0.5, 0.5, 0.5, 1.0);

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, shaders.get("basic.vs"));
	console.log(shaders.get("basic.vs"));
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader', gl.getShaderInfoLog(vertexShader));
		return;
	}

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, shaders.get("basic.fs"));
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
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
	[  // X, Y, Z          R,  G,  B  
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



