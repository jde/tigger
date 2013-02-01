// Tigger verson something really small

module.exports = (function () {


	// rate interval
	var interval = 1000; // 1s
	var bouncer;

	var started = false;

	// aggregate data obj
	var bounces = [];

	// transitional data obj 
	var bs = [];

	var bounce = function () {

		// build up this bounce
		var i,
			tb = {
				end: time(),
				interval: interval,
				counts: {}
			};

		// append counts completely ditching data
		for (i in bs) {
			tb.counts[i] = bs[i].count();
		}

		// slap it on in here
		bounces.push(tb);

		// clear out the bs
		bs = [];

		// return NOTHING
		return;

	};

	var record = function (type, data) {

		if (! started) {
			return false;
		}

		if (typeof type === 'undefined') {
			return false;
		}

		if (typeof bounces[type] === 'undefined') {
			bs[type] = [];
		}

		bs[type].push({time: time, data: data});

	};

	var start = function () {
		bouncer = setInterval(bounce, interval);
	};

	var stop = function () {
		clearInterval(bouncer);
	};

	var setInterval = function (int) { 
		return interval = int;
	};

	return {
		setInterval: setInterval,
		record: record,
		start: start,
		stop: stop
	};

}());