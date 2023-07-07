var basic_fs = `
precision mediump float;

const int MAX_ITER = 200;
const float MAX_SIZE_SQUARED = 10.0;

varying vec3 fragPos;
varying vec3 fragNorm;

uniform vec2 Center;
uniform float Scale;

varying vec3 fragColor;

int iterate() {
	float cr = fragPos.x / Scale - Center.x;
	float ci = fragPos.z / Scale - Center.y;
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
	p *= p;
	vec3 res = vec3(p, 1.0 - p, 1.0);
	res.x += fragNorm.x;

	if (mod(float(i), 2.0) < 0.1) res *= -1.0;
	return res;
}

void main()
{
	gl_FragColor = vec4(toColor(iterate()), 1.0);
	
}
`

var basic_vs = `
precision mediump float;
precision highp int;

attribute vec3 vertPosition;

varying vec3 fragColor;
varying vec3 fragPos;
varying vec3 fragNorm;

uniform vec2 Center;
uniform float Scale;

uniform mat4 ProjView;

const int MAX_ITER = 200;
const float MAX_SIZE_SQUARED = 10.0;

int iterate(vec3 pos) {
	float cr = pos.x / Scale - Center.x;
	float ci = pos.z / Scale - Center.y;
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

vec3 move(float i) {
	vec3 pos = vertPosition;
	pos.y -= pow(2.0, i / 200.0);
	return pos;
}

void main()
{
	int i1 = iterate(vertPosition);
	int i2 = iterate(vertPosition + vec3(0.01, 0.0, 0.0));
	int i3 = iterate(vertPosition + vec3(0.0, 0.01, 0.0));
	

	vec3 pos = move(float(i1));
	fragPos = pos;


	vec3 origin = vec3(0.0,0.0,float(i1));
	fragNorm = cross(origin - vec3(0.01,0.0,i2), origin - vec3(0.0,0.01,i3));

	gl_Position = ProjView * vec4(pos, 1.0);
	
	
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
