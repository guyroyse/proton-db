describe 'proton'

	before_each
		setupDatabase()
	end

	it 'should have a valid instance of proton when instantiated'
		proton.should.be_an_instance_of Object
	end
	
	describe '.sets()'
		it 'should return an array with all the set names'
			var sets = proton.sets()
			sets.length.should.be 2
			sets[0].should.be 'data'
			sets[1].should.be 'data2'
		end
		it 'should add a set'
			proton.db('data3').save({foo:'bar'})
			var sets = proton.sets()
			sets.length.should.be 3
			sets[0].should.be 'data'
			sets[1].should.be 'data2'
			sets[2].should.be 'data3'
		end
		it 'should remove a set'
			proton.db('data').clear()
			var sets = proton.sets()
			sets.length.should.be 1
			sets[0].should.be 'data2'
		end
	end
	
	describe '.wipe()'
		it 'should wipe out all meta data and sets'
			proton.wipe()
			db().all().should.be_empty
			db2().all().should.be_empty
			proton.sets().should.be_empty
		end
	end

	describe '.db()'
		it 'should return a database when asked'
			(typeof db()).should.be 'object'
		end
		it 'should store sets in localStorage prefixed with proton_db_'
			window.localStorage['data'].should.be_undefined
			window.localStorage['proton_db_data'].should.not.be_empty
		end
		it 'should store meta data in localStorage under the key of proton_db__meta'
			window.localStorage['proton_db__meta'].should.not.be_empty
		end
	end
	
end