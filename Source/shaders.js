
var ShaderMap = class {

	constructor() {

		this.map = new Map(); 

	}

	init() {
		loadTextResource('../Shaders/basic.vs', function (vsErr, vsText) {
			if (vsErr) {
				alert('Fatal error getting vertex shader (see console)');
				console.error(vsErr);
			} else {
				shaders.add("basic.vs", vsText);
			}
		});

		loadTextResource('../Shaders/basic.fs', function (vsErr, fsText) {
			if (vsErr) {
				alert('Fatal error getting vertex shader (see console)');
				console.error(vsErr);
			} else {
				shaders.add("basic.fs", fsText);
			}
		});

	}

	add(name, text) {
		this.map.set(name, text);
	}

	get(name) {
		return this.map.get(name);
	}

}