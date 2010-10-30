describe 'proton'

	describe 'sorters'
	
		describe '.ascending()'
		
			it 'should return -1 when a < b'
				proton.ascending(1, 2).should.be -1
			end
			
			it 'should return 0 when a = b'
				proton.ascending(1, 1).should.be 0
			end
			
			it 'should return 1 when a > b'
				proton.ascending(2, 1).should.be 1
			end
		
		end
		
		describe '.descending()'

			it 'should return -1 when a > b'
				proton.descending(2, 1).should.be -1
			end
			
			it 'should return 0 when a = b'
				proton.descending(1, 1).should.be 0
			end
			
			it 'should return 1 when a < b'
				proton.descending(1, 2).should.be 1
			end
		
		end
		
	end

end