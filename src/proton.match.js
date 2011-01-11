proton.match = function() {

	var internal = {};

	internal.matchesQueries = function(theQueries, theObject) {
		var matchFound = false;
		theQueries.forEach(function(theQuery) {
			if (internal.matchesQuery(theQuery, theObject)) {
				matchFound = true;
				return false;
			}
		});
		return matchFound;
	};

	internal.matchesQuery = function(theQuery, theObject) {
		var matchFound = true;
		for ( var i in theQuery) {
			matchFound = internal.doesMatchAttribute(theQuery[i], theObject[i]);
			if (!matchFound)
				break;
		}
		return matchFound;
	};

	internal.doesMatchAttribute = function(theQueryValue, theAttributeValue) {
		if (typeof theQueryValue == 'function') {
			return theQueryValue(theAttributeValue);
		} else if (theQueryValue instanceof RegExp) {
			return proton.regex(theQueryValue)(theAttributeValue);
		} else if (theQueryValue instanceof Object) {
			return internal.matchesQuery(theQueryValue, theAttributeValue);
		} else {
			return proton.equal(theQueryValue)(theAttributeValue);
		}
	};

	var theObject = null;
	var theQueries = new Array();

	var theArguments = proton.argumentsToArray(arguments);
	if (theArguments.length > 0) {
		theObject = theArguments[0];
		theQueries = theArguments.slice(1);
		if (theQueries.length == 1 && theQueries[0] instanceof Array) {
			theQueries = theQueries[0];
		}
	}
	;

	return internal.matchesQueries(theQueries, theObject);
}
