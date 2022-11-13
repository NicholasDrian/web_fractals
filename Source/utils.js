var loadTextResource = function (url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url + '?please-dont-cache=' + Math.random(), true);
	request.onload = function () {
		if (request.status < 200 || request.status > 299) {
			callback('Error: HTTP Status ' + request.status + ' on resource ' + url);
		} else {
			callback(null, request.responseText);
		}
	};
	request.send();
};

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
    	this.previousTime = performance.now;
		const framesBetweenUpdate = 10;
 	}

  	update(){
  		this.framesPassed++;
  		if (this.framesPassed == framesBetweenUpdate) {
  			const time = performance.now();
  			const fps = (time - previousTime) / (framesBetweenUpdate * 1000);
  			this.previousTime = time;
  			this.framesPassed = 0;
  			document.title = 'fps: ' + Math.floor(fps);
  	}

};