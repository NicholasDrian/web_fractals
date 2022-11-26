
var Mesh = class {

	constructor(Vertices, Indices, Transform) {
		this.vertices = Vertices;
		this.indices = Indices;
		this.transform = Transform;
	}

	bind(program) {

		var vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

		var ibo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.indices), gl.STATIC_DRAW);

	  	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
		gl.vertexAttribPointer(
			positionAttribLocation, 
			3, 
			gl.FLOAT, 
			gl.FALSE, 
			3 * Float32Array.BYTES_PER_ELEMENT, 
			0);
		gl.enableVertexAttribArray(positionAttribLocation);

		var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, this.transform);
	}

	draw() {
		gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0);
	}

};