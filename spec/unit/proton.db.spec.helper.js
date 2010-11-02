function db() {
	return proton.db('data')
}

function db2() {
	return proton.db('data2')
}

function setupDatabase() {
	proton.wipe()
	db().save({foo:'foo', bar:'bar'})
	db().save({foo:'bar', bar:'bar'})
	db().save({foo:'baz'})
	db2().save({baz:'baz', qux:'qux'})
	db2().save({baz:'qux'})
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