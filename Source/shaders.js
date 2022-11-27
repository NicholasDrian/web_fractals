var basic_fs = `
precision mediump float;

varying vec3 fragColor;

void main()
{
	gl_FragColor = vec4(fragColor, 1.0);
}
`

var basic_vs = `
precision mediump float;
precision highp int;

const int MAX_ITER = 20;
const float MAX_SIZE_SQUARED = 10.0;

attribute vec3 vertPosition;

varying vec3 fragColor;

uniform mat4 mWorld;
uniform mat4 mProjView;

int iterate() {
	float cr = vertPosition.x;
	float ci = vertPosition.z;
	float zr = 0.0;
	float zi = 0.0;

	for (int iter = 0; iter < MAX_ITER; iter++) {

		//Z^2
		float temp = zr;
		zr = zr * zr - zi * zi;
		zi = 2.0 * zi * temp;

		//+C
		zr += cr;
		zi += ci;

		if (zr * zr + zi * zi > MAX_SIZE_SQUARED) return iter;
	}
	return MAX_ITER;
}

vec3 toColor(int i) {
	float p = float(i) / float(MAX_ITER);

	return vec3(p, 1.0 - p, 1.0);
}

void main()
{
	/*if (iterate() == MAX_ITER) 
		fragColor = vec3(0.0, 0.0, 1.0);
	else  
		fragColor = vec3(1.0, 0.0, 0.0);*/

	fragColor = toColor(iterate());
	gl_Position = mProjView * mWorld * vec4(vertPosition, 1.0);

}



`

var CompileFS = function (source) {
	var shader;
	shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader', gl.getShaderInfoLog(shader));
		return;
	}
	return shader;
}

var CompileVS = function (source) {
	var shader;
	shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader', gl.getShaderInfoLog(shader));
		return;
	}
	return shader;
}
