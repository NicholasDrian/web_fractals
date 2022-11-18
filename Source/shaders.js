
var Shaders = class {

	constructor() {
		this.map = new Map(); 
	}

	add(name, text) {

		var shader;

		switch(name.substr(name.length - 2)) {
			case "vs":
				shader = gl.createShader(gl.VERTEX_SHADER);
				break;
			case "fs":
				shader = gl.createShader(gl.FRAGMENT_SHADER);
				break;
			default:
				alert('Improper shader name: ' + name);
		}

		gl.shaderSource(shader, text);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('ERROR compiling vertex shader', gl.getShaderInfoLog(shader));
			return;
		}

		this.map.set(name, shader);
	}

	get(name) {
		return this.map.get(name);
	}

}