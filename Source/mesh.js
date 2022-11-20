
var Mesh = class {

	constructor(Vertices, Indices) {
		this.vertices = Vertices;
		this.Indices = Indices;
	}

	bind(program) {

		var vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

		var ibo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.Indices), gl.STATIC_DRAW);

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

	}

};