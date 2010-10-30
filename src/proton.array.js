Array.prototype.sift = function() {

	var theQueries = null

	if (arguments[0] instanceof Array) {
		theQueries = arguments[0]
	} else {
		theQueries = proton.argumentsToArray(arguments)
	}

	if (!theQueries || theQueries.length == 0) {
		return this
	} else {
		var foundObjects = new Array()
		this.forEach(function(theObject) {
			if (proton.match(theObject, theQueries))
				foundObjects.push(theObject)
		})
		return foundObjects
	}
}

Array.prototype.first = function() {
	return this.top()[0]
}

Array.prototype.last = function() {
	return this.bottom()[0]
}

Array.prototype.top = function(amount) {
	return this.slice(0, amount == null ? 1 : amount)
}

Array.prototype.bottom = function(amount) {
	return this.slice(amount == null ? -1 : -amount)
}

Array.prototype.page = function(page, pageCount) {
	start = (page - 1) * pageCount
	end = start + pageCount
	return this.slice(start, end)
}

Array.prototype.distinct = function() {

	var areObjectsIdentical = function(theObject, theOtherObject) {
		return proton.match(theObject, theOtherObject)
				&& proton.match(theOtherObject, theObject)
	}

	var searchForMatch = function(theObject) {
		var matchFound = false
		uniques.forEach(function(theUnique) {
			if (areObjectsIdentical(theObject, theUnique)) {
				matchFound = true
				return

				

			}
		})
		return matchFound
	}

	var uniques = new Array()
	this.forEach(function(theObject) {
		if (!searchForMatch(theObject))
			uniques.push(theObject)
	})
	return uniques

}

Array.prototype.order = function(sort) {

	var extractKeysFromObject = function(object) {
		var keys = []
		for ( var i in sort)
			keys.push(i)
		return keys
	}
	
	var sortedArray = this
	var keys = extractKeysFromObject(sort)
	keys.reverse().forEach(function(key) {
		print('Key: ' + key)
		print('Before: ' + JSON.serialize(sortedArray))
		sortedArray = sortedArray.sort(function(a, b) {
			return sort[key](a[key], b[key])
		})
		print('After: ' + JSON.serialize(sortedArray))
	})
	return sortedArray
}