
var ShaderMap = class {

	constructor() {
		this.map = new Map(); 
	}

	add(name, text) {
		this.map.set(name, text);
	}

	get(name) {
		return this.map.get(name);
	}

}