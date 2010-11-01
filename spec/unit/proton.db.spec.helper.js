function db() {
	return proton.db('data')
}

function setupDatabase() {
	db().clear()
	db().save({foo:'foo', bar:'bar'})
	db().save({foo:'bar', bar:'bar'})
	db().save({foo:'baz'})
}

function testMatcher(value) {
	return value.charAt(0) == 'b'
}

function simpleArray() {
	return ['foo','bar','baz','qux'] 
}

function simpleArrayToBeSorted() {
	return [
	    {foo:'foo', bar: 1},
	    {foo:'bar', bar: 1},
	    {foo:'baz', bar: 2},
	    {foo:'qux', bar: 2}]
}