const assert = require('assert');
const proxyquire = require('proxyquire');

const {getAllStub, MongoLibMock} = require('../utils/mocks/mongoLib');

const {moviesMock} = require('../utils/mocks/moviesMock');

describe('Service-movies', function(){
    const MoviesService = proxyquire("../service/serviceMovies", {
        "../lib/mongo":MongoLibMock
    });
    const moviesService = new MoviesService();

    describe('When getMovies method is called', async function(){
        it('should call the getAll mongoLib method', async function(){
            await moviesService.getMovies({})
            assert.strictEqual(getAllStub.called, true);
            
        });
        it('should return an array of movies', async function(){
            const result = await moviesService.getMovies({});
            const expect = moviesMock
            assert.deepEqual(result, expect)
        });
        
    })
    
    
});
