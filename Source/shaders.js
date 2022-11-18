
var ShaderMap = class {

	constructor() {

		this.map = new Map(); 

		loadTextResource('../Shaders/basic.vs', function (vsErr, vsText) {
			if (vsErr) {
				alert('Fatal error getting vertex shader (see console)');
				console.error(vsErr);
			} else {
				this.map.set("basic.vs", vsText);
			}
		});

		loadTextResource('../Shaders/basic.fs', function (vsErr, fsText) {
			if (vsErr) {
				alert('Fatal error getting vertex shader (see console)');
				console.error(vsErr);
			} else {
				this.map.set("basic.fs", fsText);
			}
		});

	}

	get(shader) {
		return this.map.get(shader);
	}

}