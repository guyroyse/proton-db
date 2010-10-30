describe 'proton'

	describe '.match()'
	
		before_each
			object = {foo:'foo', bar:'bar', baz: {qux: 'qux', quux: 'quux'} }	
		end

		it 'should return false when there is no object'
			proton.match().should.be false
		end
		
		it 'should return false when there is not a match'
			proton.match(object, {foo:'bar'}).should.be false
		end
		
		it 'should return false when there is an object but no query'
			proton.match(object).should.be false
		end
		
		it 'should return true when there is an empty query'
			proton.match(object, {}).should.be true
		end
	
		it 'should return true when there is a matching field'
			proton.match(object, {foo:'foo'}).should.be true
		end
	
		it 'should return true when there are multiple matching fields'
			proton.match(object, {foo:'foo',bar:'bar'}).should.be true
		end
		
		it 'should return true when there are multiple matching fields that are out of order in the query'
			proton.match(object, {bar:'bar',foo:'foo'}).should.be true
		end
		
		it 'should return true when there are mulitple queries that match'
			proton.match(object, {foo:'foo'}, {bar:'bar'}).should.be true
		end
		
		it 'should return true when there are mulitple queries and at least one matches'
			proton.match(object, {foo:'bar'}, {bar:'bar'}).should.be true
		end
		
		it 'should return false when there are mulitple queries and none match'
			proton.match(object, {foo:'bar'}, {bar:'foo'}).should.be false
		end
		
		it 'should return true when there is an array of queries that match'
			proton.match(object, [{foo:'foo'}, {bar:'bar'}]).should.be true
		end
		
		it 'should return true when there is an array of queries and at least one matches'
			proton.match(object, [{foo:'bar'}, {bar:'bar'}]).should.be true
		end
		
		it 'should return false when there is an array of queries and none match'
			proton.match(object, [{foo:'bar'}, {bar:'foo'}]).should.be false
		end
		
		it 'should return true when there is a match using a regex'
			proton.match(object, {foo:/f/}).should.be true
		end
		
		it 'should return false where there is not a match using a regex'
			proton.match(object, {foo:/b/}).should.be false
		end
	
		it 'should return true when there is a match using a passed in function that returns true'
			proton.match(object, {foo: function() {return true}}).should.be true
		end

		it 'should return false when there is a match using a passed in function that returns false'
			proton.match(object, {foo: function() {return false}}).should.be false
		end
		
		it 'should return true when there is a deep match'
			proton.match(object, {baz: {qux: 'qux'}}).should.be true		
		end
		
		it 'should return false when there is not a deep match'
			proton.match(object, {baz: {qux: 'quux'}}).should.be false		
		end
	
		it 'should return true when there is a deep match and a shallow match'
			proton.match(object, {foo: 'foo', baz: {qux: 'qux'}}).should.be true		
		end
	
		it 'should return false when there is a deep match and no shallow match'
			proton.match(object, {foo: 'bar', baz: {qux: 'qux'}}).should.be false		
		end

		it 'should return true when there are multiple deep matches'
			proton.match(object, {baz: {qux: 'qux', quux: 'quux'}}).should.be true		
		end
		
		it 'should return true on matches with multiple levels and branches'
			var theObject = {
				foo:'foo', 
				bar: {
					foo: 'foo', 
					bar: {
						foo: 'foo', 
						bar: 'bar'
					}
				}, 
				baz: 'baz', 
				qux: {
					foo: 'foo'
				} 
			}	
			var theQuery = {
				foo:'foo', 
				bar: {
					bar: {
						bar: 'bar'
					}
				}, 
				qux: {} 
			}	
			proton.match(theObject, theQuery).should.be true		
		end

	end
	
end