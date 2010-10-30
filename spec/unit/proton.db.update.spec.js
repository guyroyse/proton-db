describe 'proton'

	describe '.db()'
	
		describe '.update()'
		
			before_each
				setupDatabase()
			end

			it 'should add attribute to single matched objects'
				queryValue = {foo:'foo'}
				updateValue = {baz:'baz'}
				db().update(updateValue, queryValue)
				results = db().find({foo:'foo',baz:'baz'})
				results.length.should.be 1
				results[0].foo.should.be 'foo'
				results[0].bar.should.be 'bar'
				results[0].baz.should.be 'baz'
			end
		
			it 'should add attribute to multiple matched objects'
				queryValue = {bar:'bar'}
				updateValue = {baz:'baz'}
				db().update(updateValue, queryValue)
				results = db().find({bar:'bar',baz:'baz'})
				results.length.should.be 2
			end
			
			it 'should update existing attributes to existing matched objects'
				queryValue = {foo:'foo'}
				updateValue = {bar:'baz'}
				db().update(updateValue, queryValue)
				results = db().find({foo:'foo',bar:'baz'})
				results.length.should.be 1
			end
			
			it 'should remove existing attributes from existing matched objects'
				queryValue = {foo:'foo'}
				updateValue = {bar:undefined}
				db().update(updateValue, queryValue)
				results = db().find({foo:'foo'})
				results.length.should.be 1
				results[0].foo.should.be 'foo'
				results[0].bar.should.be undefined
				JSON.serialize(results[0]).should.be '{"foo":"foo"}'
			end
			
			it 'should add attribute to all objects'
				queryValue = null
				updateValue = {qux:'qux'}
				db().update(updateValue, queryValue)
				results = db().find({qux:'qux'})
				results.length.should.be 3
			end
			
			it 'should add attribute to objects matching multiple queries'
				queryValue = {foo:'foo'}
				otherQueryValue = {foo:'bar'}
				updateValue = {qux:'qux'}
				db().update(updateValue, queryValue, otherQueryValue)
				results = db().find({qux:'qux'})
				results.length.should.be 2
			end
			
		end
		
	end
	
end