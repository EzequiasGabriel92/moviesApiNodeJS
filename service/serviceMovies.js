
const MongoLib = require("../lib/mongo");


class MoviesService{
    constructor(){
        this.collection ='movies';
        this.mongoDB = new MongoLib();
    }
    
    async getMovies({tags}) {
        const query = tags && {tags:{$in:tags}}
        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }
    async getMovie({idMovie}){
        console.log({idMovie})
        const movie = await this.mongoDB.get(this.collection,idMovie);
        return movie || {}
    }
    async createMovie({movie}){
        const movieId = await this.mongoDB.create(this.collection, {movie});
        return movieId;
    }
    async updateMovie({idMovie, movie}={}){
        const movieId = await this.mongoDB.update(this.collection, {movie}, {idMovie});
        return movieId;
    }
    async deleteMovie({idMovie}){
        const movieId = await this.mongoDB.delete(this.collection,{idMovie});
        return movieId;
    }

}

module.exports = MoviesService;