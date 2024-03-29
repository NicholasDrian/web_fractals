var canvas = document.getElementById("screen");
var gl;


var Init = function () {
	gl = canvas.getContext('webgl2');
	console.log(gl.getParameter(gl.VERSION));
	console.log(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
	console.log(gl.getParameter(gl.VENDOR));

	if (!gl) {
		gl = cnavas.getContext('expiramental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	//gl.enable(gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LESS);

	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);

	Run();

};


var Run = function () {


	var program = gl.createProgram();
	gl.attachShader(program, CompileVS(basic_vs));
	gl.attachShader(program, CompileFS(basic_fs));
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

	var mesh = GenerateMeshScreen(10, 1000, 10);
	mesh.bind(program);

	var camera = new Camera([0, 0.5, -1], [0, -1, 1], [0, 1, 0], 120, program);

	fps = new fpsTracker();

	var tick = function() {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		fps.update();

		camera.update(program);

		mesh.draw();

		requestAnimationFrame(tick);
	}

	requestAnimationFrame(tick);
}; 



