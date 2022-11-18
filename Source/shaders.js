
var ShaderMap = class {

	constructor() {

		this.map = new Map(); 
		this.files = [
			'../Shaders/basic.vs',
			'../Shaders/basic.vs',
		];
		this.loaded = 0;

	}

	init() {

		for (const file in this.files) {
			loadTextResource('../Shaders/basic.vs', function (vsErr, vsText) {
				if (vsErr) {
					alert('Fatal error getting vertex shader (see console)');
					console.error(vsErr);
				} else {
					shaders.add("basic.vs", vsText);
					if (++shaders.loaded == shaders.files.length) {
						Run();
					}
				}
			});
		}
	}

	add(name, text) {
		this.map.set(name, text);
	}

	get(name) {
		return this.map.get(name);
	}

}