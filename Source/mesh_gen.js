

var GenerateMeshScreen = function (size, resolution, factor) {
	var vertices = [];
	var indices = [];

	for (var i = 0; i <= resolution; i++) {
		for (var j = 0; j <= resolution; j++) {
			var x = (( i / resolution) - 0.5) * size;
			var z = (( j / resolution) - 0.5) * size;
			vertices.push(x, 0, z);
		}
	}
	Warp(vertices, factor)
	for (var i = 0; i < resolution; i++) {
		for (var j = 0; j < resolution; j++) {
			var tl = (resolution + 1) * i + j;
			var tr = tl + 1;
			var bl = (resolution + 1) * (i + 1) + j;
			var br = bl + 1;
			indices.push(bl, tl, tr, tr, br, bl);
		}
	}
	var transform = new Float32Array(16);
	mat4.identity(transform);
	return new Mesh(vertices, indices, transform);
}



var Warp = function (points, factor) {
	var size = Math.sqrt(points.length / 3);
	var halfSize = size / 2;
	var halfSizeSquare = halfSize * halfSize;
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			var distI = halfSize - i;
			var distJ = halfSize - j;
			var distISquare = distI * distI;
			var distJSquare = distJ * distJ;
			var maxDistSquare = Math.max(distISquare, distJSquare);
			var localFactor = (maxDistSquare / halfSizeSquare) * (factor - 1) + 1;
			points[(i * size + j) * 3] *= localFactor;
			points[(i * size + j) * 3 + 1] *= localFactor;
			points[(i * size + j) * 3 + 2] *= localFactor;

		}
	}
}