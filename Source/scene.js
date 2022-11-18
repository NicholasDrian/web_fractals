
var Scene = class {

	constructor(Camera) {
		this.meshes = [];
		this.camera = Camera
	}

	addMesh(Mesh mesh) {
		this.meshes.push(mesh);
	}

	init() {
		
	}

	render() {

	}

};