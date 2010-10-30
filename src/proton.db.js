proton.db = function(key) {
	return new function(key) {
		
		var fullKey = 'proton_db_' + key

		this.save = function() {
			internal.save(proton.argumentsToArray(arguments))
		}

		this.remove = function() {
			internal.remove(proton.argumentsToArray(arguments))
		}

		this.clear = function() {
			internal.remove()
		}

		this.find = function() {
			return internal.find(proton.argumentsToArray(arguments))
		}

		this.all = function() {
			return internal.all()
		}

		this.distinct = function() {
			return internal.distinct()
		}

		this.update = function() {
			internal.update(proton.argumentsToArray(arguments))
		}

		var internal = {}

		internal.save = function(theObjects) {
			var existingObjects = internal.all()
			theObjects.forEach(function (theObject) {
				existingObjects.push(theObject)
			})
			internal.persistObjects(existingObjects)
		}

		internal.remove = function(theQueries) {
			if (!theQueries || theQueries.length == 0) {
				window.localStorage.removeItem(fullKey)
			} else {
				var remainingObjects = new Array()
				internal.all().forEach(function(existingObject) {
					if (!proton.match(existingObject, theQueries))
						remainingObjects.push(existingObject)
				})
				internal.persistObjects(remainingObjects)
			}
		}

		internal.find = function(theQueries) {
			if (!theQueries || theQueries.length == 0) {
				return internal.all()
			} else {
				return internal.all().sift(theQueries)
			}
		}

		internal.all = function() {
			var existingObjects = JSON.parse(window.localStorage[fullKey])
			var allObjects = new Array()
			for (var i = 0; i < existingObjects.length; i++) {
				allObjects.push(existingObjects[i])
			}
			return allObjects
		}

		internal.distinct = function() {
			return internal.all().distinct()
		}

		internal.update = function(theArguments) {
			if (theArguments.length > 0) {
				var theUpdate = theArguments[0]
				var theQueries = theArguments.slice(1)
				internal.updateObjects(theUpdate, theQueries)
			}
		}

		internal.updateObjects = function(theUpdate, theQueries) {
			internal.find(theQueries).forEach(function(foundObject) {
				internal.updateObject(theUpdate, foundObject)
			})
		}

		internal.updateObject = function(theUpdate, theObject) {
			internal.remove( [ theObject ])
			var theNewObject = internal.updateObjectAttributes(theUpdate, theObject)
			internal.save( [ theNewObject ])
		}

		internal.updateObjectAttributes = function(theUpdate, theObject) {
			for ( var i in theUpdate)
				theObject[i] = theUpdate[i]
			return theObject
		}

		internal.persistObjects = function(theObjects) {
			window.localStorage[fullKey] = JSON.serialize(theObjects)
		}
	}
}

