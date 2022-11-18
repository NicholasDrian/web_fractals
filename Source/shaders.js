
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
			loadTextResource(file, function (Err, Text) {
				if (Err) {
					alert('Fatal error getting vertex shader (see console)');
					console.error(Err);
				} else {
					shaders.add("basic.vs", Text);
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