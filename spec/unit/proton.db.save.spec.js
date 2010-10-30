describe 'proton'

	describe '.db()'
	
		describe '.save()'
		    
			it 'should save an object when handed one'
		    	db().save({test:'data'})
		    	db().find({test:'data'}).first().test.should.be 'data'
		    end
		    
		    it 'should save multiple objects when handed multiple arguments'
		    	db().save({test:'data'},{test:'more-data'})
		    	db().find({test:'data'}).first().test.should.be 'data'
		    	db().find({test:'more-data'}).first().test.should.be 'more-data'
		    end
		    
		end
		
	end
	
end