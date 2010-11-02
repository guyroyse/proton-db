describe 'proton'

	describe '.db()'
	
		before_each
			setupDatabase()
		end
		
		describe '.all()'
			it 'should return all the objects of the set'
				db().all().length.should.be 3
			end
			it 'should return all the objects as an Array'
				db().all().should.be_an_instance_of Array
			end
			it 'should return different lists for different sets'
				db().all().length.should.be 3
				db2().all().length.should.be 2
			end
		end
		
		describe '.distinct()'
			it 'should return all the distinct objects of the set'
				db().save({foo:'foo', bar:'bar'})
				db().save({foo:'foo', bar:'bar'})
				db().distinct().length.should.be 3
			end
		end
	
		describe '.find()'
		
			it 'should return an empty array of objects when there is nothing to find'
				db().remove()
				db().find().should.be_empty
			end
			
			it 'should return all objects when there is no query'
				db().find().length.should.be 3
			end
			
			it 'should return a single matching object'
				results = db().find({foo:'foo'}) 
				results.length.should.be 1
				results[0].foo.should.be 'foo'
				results[0].bar.should.be 'bar'
			end
		
			it 'should return multiple matching objects'
				results = db().find({bar:'bar'}) 
				results.length.should.be 2
			end
			
			it 'should match objects on multiple queries'
				results = db().find({foo:'foo'},{foo:'bar'}) 
				results.length.should.be 2
			end
			
			it 'should match objects on multiple queries and not return duplicates'
				results = db().find({foo:'foo'},{foo:'foo'}) 
				results.length.should.be 1
			end
		
		end
		
	end
	
end