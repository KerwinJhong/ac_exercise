  var should = chai.should()

  describe('Test searchTitle function', function() {
      it('should return movies which title match search input', function() {
          let testDataList = [
              { title: 'Ant-Man and the Wasp' },
              { title: 'Ant-Man' },
              { title: 'Thor' }
          ]
          let result = searchTitle(testDataList, 'ant')
          let results = [
              { title: 'Ant-Man and the Wasp' },
              { title: 'Ant-Man' }
          ]
          result.should.be.deep.equal(results)
      })

      it('should return empty array when no movie found', function() {
          let testDataList = [
              { title: 'Ant-Man and the Wasp' },
              { title: 'Ant-Man' },
              { title: 'Thor' }
          ]
          let result = searchTitle(testDataList, 'spider')
          let results = []
          result.should.be.deep.equal(results)
      })

      it('should return all movies when search input is empty', function() {
          let testDataList = [
              { title: 'Ant-Man and the Wasp' },
              { title: 'Ant-Man' },
              { title: 'Thor' }
          ]
          let result = searchTitle(testDataList, '')
          let results = [
              { title: 'Ant-Man and the Wasp' },
              { title: 'Ant-Man' },
              { title: 'Thor' }
          ]
          result.should.be.deep.equal(results)
      })

      it('should return empty array when movie list is empty', function() {
          let testDataList = []
          let result = searchTitle(testDataList, 'ant')
          let results = []
          result.should.be.deep.equal(results)
      })

  })