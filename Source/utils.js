function updateSize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  if (canvas.width != width ||
      canvas.height != height) {
    canvas.width = width;
    canvas.height = height;
  }
  gl.viewport(0, 0, width, height);
}

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
  			//console.log("Aspect: " + canvas.clientWidth / canvas.clientHeight);
  		}
  	}

};
