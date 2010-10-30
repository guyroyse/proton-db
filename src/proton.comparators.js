proton.greaterThan = function(limit) {
	return function(value) {
		return value > limit
	}
}

proton.greaterThanEqual = function(limit) {
	return function(value) {
		return value >= limit
	}
}

proton.lessThan = function(limit) {
	return function(value) {
		return value < limit
	}
}

proton.lessThanEqual = function(limit) {
	return function(value) {
		return value <= limit
	}
}

proton.equal = function(limit) {
	return function(value) {
		return value == limit
	}
}

proton.notEqual = function(limit) {
	return function(value) {
		return value != limit
	}
}

proton.oneOf = function() {
	var limits = arguments
	return function(value) {
		for ( var i = 0; i < limits.length; i++) {
			if (value == limits[i])
				return true
		}
		return false
	}
}

proton.notOneOf = function() {
	var limits = arguments
	return function(value) {
		for ( var i = 0; i < limits.length; i++) {
			if (value == limits[i])
				return false
		}
		return true
	}
}

proton.regex = function(limit) {
	return function(value) {
		return limit.test(value)
	}
}

proton.gt = proton.greaterThan
proton.gte = proton.greaterThanEqual
proton.lt = proton.lessThan
proton.lte = proton.lessThanEqual
proton.eq = proton.equal
proton.not = proton.notEqual
proton.ne = proton.notEqual

