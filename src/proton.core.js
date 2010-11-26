proton = {};

proton.argumentsToArray = function(theArguments) {
	return Array.prototype.slice.call(theArguments);
};

proton.sets = function() {
	return proton.db('_meta').all();
};

proton.wipe = function() {
	proton.sets().forEach(function(item) {
		proton.db(item).clear();
	});
};

proton.dump = function() {
	var data = [];
	proton.sets().forEach(function(item) {
		data[item] = proton.db(item).all();
	});
	return data;
};