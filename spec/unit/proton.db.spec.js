describe 'proton'

	it 'should have a valid instance of proton when instantiated'
		proton.should.be_an_instance_of Object
	end
	
	describe '.db()'
	
		it 'should return a database when asked'
			(typeof db()).should.be 'object'
		end
		
	end
	
end