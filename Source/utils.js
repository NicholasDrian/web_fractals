

var loadImage = function (url, callback) {
	var image = new Image();
	image.onload = function () {
		callback(null, image);
	};
	image.src = url;
};

var loadJSONResource = function (url, callback) {
	loadTextResource(url, function (err, result) {
		if (err) {
			callback(err);
		} else {
			try {
				callback(null, JSON.parse(result));
			} catch (e) {
				callback(e);
			}
		}
	});
};

var fpsTracker = class {

	constructor() {
    	this.framesPassed = 0;
    	this.previousTime = performance.now();
		this.framesBetweenUpdate = 100;
 	}

  	update() {
  		this.framesPassed++;
  		if (this.framesPassed == this.framesBetweenUpdate) {
  			const time = performance.now();
  			const fps = (this.framesBetweenUpdate * 1000) / (time - this.previousTime);
  			this.previousTime = time;
  			this.framesPassed = 0;
  			console.log("FPS: " + Math.floor(fps));
  		}
  	}

};

var sumVec3 = function (a, b) {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
