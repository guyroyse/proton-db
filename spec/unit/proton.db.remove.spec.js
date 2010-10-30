describe 'proton'

	describe '.db()'
	
		before_each
			setupDatabase()
		end
		
		describe '.clear()'
			it 'should remove all objects in the set when no query is specified'
				db().clear()
				db().find().should.be_empty
			end
		end
		
		describe '.remove()'
		
			it 'should remove all objects in the set when no query is specified'
				db().remove()
				db().find().should.be_empty
			end
			
			it 'should remove a single matching object'
				db().remove({foo:'foo'})
				db().find({foo:'foo'}).should.be_empty
				db().all().length.should.be 2
			end
			
			it 'should remove multiple matching objects'
				db().remove({bar:'bar'})
				db().find({foo:'foo'}).should.be_empty
				db().all().length.should.be 1
			end
			
			it 'should remove mulitple objects matching multiple queries'
				db().remove({foo:'foo'},{foo:'bar'})
				db().find({foo:'foo'},{foo:'bar'}).should.be_empty
				db().all().length.should.be 1
			end
			
		end
		
	end
	
end