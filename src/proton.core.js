proton = {}
proton.argumentsToArray = function(theArguments) {
	return Array.prototype.slice.call(theArguments)
}
proton.sets = function() {
	return proton.db('_meta').all();
}
proton.wipe = function() {
	proton.sets().forEach(function(item) {
		proton.db(item).clear();
	})	
}