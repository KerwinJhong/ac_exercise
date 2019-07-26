  var should = chai.should()

  describe('Test searchTitle function', function() {
      it('should return Fizz', function() {
          let num = 9
          let result = fizzbuzz(num)
          let results = 'Fizz'
          result.should.be.equal('Fizz')
      })

      it('should return Buzz', function() {
          let num = 10
          let result = fizzbuzz(num)
          let results = 'Buzz'
          result.should.be.equal('Buzz')
      })

      it('should return FizzBuzz', function() {
          let num = 15
          let result = fizzbuzz(num)
          let results = 'FizzBuzz'
          result.should.be.equal('FizzBuzz')
      })

      it('should return 7', function() {
          let num = 7
          let result = fizzbuzz(num)
          let results = num
          result.should.be.equal(num)
      })

  })