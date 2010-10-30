describe 'proton'

	describe 'Array'
	
		it 'should be empty when constructor argument is missing'
			[].should.be_empty
		end
	
		it 'should be filled when constructor argument is passed'
			simpleArray().length.should.be 4
		end
		
		it 'should iterate with the correct amounts using forEach'
			var count = 0
			simpleArray().forEach(function(item) {
				count++
			})
			count.should.be 4
		end
		
		describe '.first()'
			
			it 'should return the first object in the array'
				simpleArray().first().should.be 'foo'
			end
			
			it 'should return null if the array is empty'
				[].first().should.be_null
			end
			
		end
	
		describe '.last()'
			
			it 'should return the last object in the array'
				simpleArray().last().should.be 'qux'
			end
			
			it 'should return null if the array is empty'
				[].last().should.be_null
			end
			
		end

		describe '.top()'
		
			it 'should return an empty array if array is empty'
				[].top(2).should.be_empty
			end
		
			it 'should return the first objects in the array if top amount is ommitted'
				simpleArray().top().should.have_length 1
				simpleArray().top()[0].should.be 'foo'
			end
		
			it 'should return the top objects in the array'
				simpleArray().top(2).should.have_length 2
				simpleArray().top(2)[0].should.be 'foo'
				simpleArray().top(2)[1].should.be 'bar'
			end
			
			it 'should return all objects if top amount is larger than array'
				simpleArray().top(5).should.have_length 4
			end
			
		end
	
		describe '.bottom()'
		
			it 'should return an empty array if array is empty'
				[].bottom(2).should.be_empty
			end
		
			it 'should return the last objects in the array if bottom amount is ommitted'
				simpleArray().bottom().should.have_length 1
				simpleArray().bottom()[0].should.be 'qux'
			end
		
			it 'should return the bottom objects in the array'
				simpleArray().bottom(2).should.have_length 2
				simpleArray().bottom(2)[0].should.be 'baz'
				simpleArray().bottom(2)[1].should.be 'qux'
			end
			
			it 'should return all objects if bottom amount is larger than array'
				simpleArray().bottom(5).should.have_length 4
			end
			
		end
		
		describe '.page()'

			it 'should return an empty array if array is empty'
				[].page(1, 2).should.be_empty
			end
		
			it 'should return the first page of the array'
				simpleArray().page(1, 2).should.have_length 2
				simpleArray().page(1, 2)[0].should.be 'foo'
				simpleArray().page(1, 2)[1].should.be 'bar'
			end
		
			it 'should return the second page of the array'
				simpleArray().page(2, 2).should.have_length 2
				simpleArray().page(2, 2)[0].should.be 'baz'
				simpleArray().page(2, 2)[1].should.be 'qux'
			end
			
			it 'should return partial pages of the array'
				simpleArray().page(2, 3).should.have_length 1
				simpleArray().page(2, 3)[0].should.be 'qux'
			end
	
			it 'should return all objects if the page size is larger than array'
				simpleArray().page(1, 5).should.have_length 4
			end
		
			it 'should return an empty array if the page and size are out of bounds'
				simpleArray().page(2, 5).should.be_empty
			end
	
		end

		describe '.sift()'
		
			before_each
				theData = new Array({foo:'foo', bar:'bar'}, {foo:'bar', bar:'bar'}, {foo:'baz'})	
			end
		
			it 'should return Array object when there is no data'
				new Array().sift().should.be_an_instance_of Array
			end
		
			it 'should return an empty array of objects when there is nothing to find'
				new Array().sift().should.be_empty
			end
			
			it 'should return Array objects'
				theData.sift().should.be_an_instance_of Array
			end
			
			it 'should return all objects when there is no query'
				theData.sift().length.should.be 3
			end
			
			it 'should return a single matching object'
				theData.sift({foo:'foo'}).length.should.be 1
			end
		
			it 'should return multiple matching objects'
				theData.sift({bar:'bar'}).length.should.be 2
			end
			
			it 'should match objects on multiple queries'
				theData.sift({foo:'foo'},{foo:'bar'}).length.should.be 2
			end
			
			it 'should match objects on multiple queries passed as an array'
				theData.sift([{foo:'foo'},{foo:'bar'}]).length.should.be 2
			end
		
			it 'should match objects on multiple queries and not return duplicates'
				theData.sift({foo:'foo'},{foo:'foo'}).length.should.be 1
			end
			
		end
		
		describe '.distinct()'
		
			it 'should remove duplicate entry'
				new Array({foo:'foo', bar:'bar'}, {foo:'foo', bar:'bar'}, {foo:'baz'}).distinct().length.should.be 2				
			end
			
			it 'should remove duplicate entry regardless of the order of the properties'
				new Array({foo:'foo', bar:'bar'}, {bar:'bar', foo:'foo'}, {foo:'baz'}).distinct().length.should.be 2				
			end
		
			it 'should not remove duplicate when there is only a partial match on the fields'
				new Array({foo:'foo', bar:'bar'}, {bar:'bar', foo:'foo'}, {foo:'foo'}).distinct().length.should.be 2
			end
			
		end
		
		describe '.order()'
		
			it 'should leave array in original order if no parameters passed'
				var arrayToBeSorted = simpleArrayToBeSorted()
				var sortedArray = arrayToBeSorted.order()
				sortedArray.should.have_length arrayToBeSorted.length
				for (var i = 0; i < sortedArray.length; i++)
					sortedArray[i].should.be arrayToBeSorted[i]
			end
			
			it 'should sort array based on passed in function'
				var sortedArray = simpleArrayToBeSorted().order({foo: proton.ascending})
				sortedArray.should.have_length 4
				sortedArray[0]['foo'].should.be 'bar'
				sortedArray[1]['foo'].should.be 'baz'
				sortedArray[2]['foo'].should.be 'foo'
				sortedArray[3]['foo'].should.be 'qux'
			end
		
			it 'should sort array based on passed in function for multiple parameters'
				var sortedArray = simpleArrayToBeSorted().order({bar: proton.descending, foo: proton.ascending})
				sortedArray.should.have_length 4
				sortedArray[0]['foo'].should.be 'baz'
				sortedArray[1]['foo'].should.be 'qux'
				sortedArray[2]['foo'].should.be 'bar'
				sortedArray[3]['foo'].should.be 'foo'
			end
		
		end

	end
end
