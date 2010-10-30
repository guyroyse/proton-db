describe 'proton'

	describe 'comparators'
	
		describe '.greaterThan()'
			it 'should return false when <='
				proton.greaterThan(1)(1).should.be false
			end
			it 'should return true when >'
				proton.greaterThan(1)(2).should.be true
			end
			it 'should function when gt alias is called'
				proton.gt(1)(2).should.be true
			end
		end
		
		describe '.greaterThanEqual()'
			it 'should return false when <'
				proton.greaterThanEqual(2)(1).should.be false
			end
			it 'should return true when >='
				proton.greaterThanEqual(1)(1).should.be true
			end
			it 'should function when gte alias is called'
				proton.gte(1)(1).should.be true
			end
		end
	
		describe '.lessThan()'
			it 'should return false when >='
				proton.lessThan(1)(1).should.be false
			end
			it 'should return true when <'
				proton.lessThan(2)(1).should.be true
			end
			it 'should function when lt alias is called'
				proton.lt(2)(1).should.be true
			end
		end
		
		describe '.lessThanEqual()'
			it 'should return false when >'
				proton.lessThanEqual(1)(2).should.be false
			end
			it 'should return true when <='
				proton.lessThanEqual(1)(1).should.be true
			end
			it 'should function when lte alias is called'
				proton.lte(1)(1).should.be true
			end
		end

		describe '.equal()'
			it 'should return false when !='
				proton.equal(2)(1).should.be false
			end
			it 'should return true when ='
				proton.equal(1)(1).should.be true
			end
			it 'should function when eq alias is called'
				proton.eq(1)(1).should.be true
			end
		end

		describe '.notEqual()'
			it 'should return false when ='
				proton.notEqual(1)(1).should.be false
			end
			it 'should return true when !='
				proton.notEqual(2)(1).should.be true
			end
			it 'should function when not alias is called'
				proton.not(2)(1).should.be true
			end
			it 'should function when ne alias is called'
				proton.ne(2)(1).should.be true
			end
		end
		
		describe '.oneOf()'
			it 'should return false when not in list'
				proton.oneOf(1,2)(3).should.be false
			end
			it 'should return true when in list'
				proton.oneOf(1,2)(1).should.be true
			end
		end

		describe '.notOneOf()'
			it 'should return false when in list'
				proton.notOneOf(1,2)(1).should.be false
			end
			it 'should return true when not in list'
				proton.notOneOf(1,2)(3).should.be true
			end
		end

		describe '.regex()'
			it 'should return false whennot matched'
				proton.regex(/b/)('foo').should.be false
			end
			it 'should return true when matched'
				proton.regex(/f/)('foo').should.be true
			end
		end

	end
	
end