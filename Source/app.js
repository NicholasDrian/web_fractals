var canvas = document.getElementById("screen");
var gl;
var shaders;

var glInit = function () {

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

	var vertices = 
	[ // X,    Y,    Z       R,   G,   B  
		  -1.0, -1.0,  0.0,    1.0, 1.0, 0.0,
	 	  -1.0,  1.0,  0.0,    0.0, 1.0, 1.0,
		   1.0,  1.0,  0.0,    1.0, 0.0, 1.0,
		   1.0, -1.0,  0.0,    0.0, 1.0, 0.0

	]

	var indices = 
	[  
		0, 1, 2,
		2, 3, 0
	]

	var worldMatrix = new Float32Array(16);
	mat4.identity(worldMatrix);
	var mesh = new Mesh(vertices, indices, worldMatrix);
	mesh.bind(program);


	var camera = new Camera([0, 0, -8], [0, 0, 1], [0, 1, 0], 45);
	camera.setProjView(program);


	fps = new fpsTracker();

	var tick = function() {
		fps.update();
		updateSize();
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		camera.setProjView(program);

		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
		requestAnimationFrame(tick);
	}

	requestAnimationFrame(tick);
}; 



