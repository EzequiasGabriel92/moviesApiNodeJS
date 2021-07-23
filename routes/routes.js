const express = require('express');
const MoviesService = require("../service/serviceMovies");
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require("../utils/schemas/movies");

const validationHandler = require("../utils/middleware/validationHandler");
const { valid } = require('@hapi/joi');

const cacheResponse = require('../utils/cacheResponse');
const {FIVE_MINUTES_IN_SECONDS,
        SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');


function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);
    const moviesService = new MoviesService();
    
    router.get("/", async function(req, res, next){
        const {tags} = req.query;
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        try {
            const movies = await moviesService.getMovies({tags});
            res.status(200).json({
                data:movies,
                message:"movies listed"
            })
        } catch (error) {
            next(error)
        }
    });
    router.get("/:movieId",validationHandler({movieId:movieIdSchema}, 'params'), 
    async (req, res, next) =>{
        const {movieId} = req.params.movieId;
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
        try {
            const idMovie = await moviesService.getMovie({movieId});
            res.status(200).json({
                idMovie:idMovie,
                message:'Movie listed'
            })
        } catch (error) {
            next(error)
        }
    });
    router.post("/", validationHandler(createMovieSchema) ,async (req,res,next) => {
        try {
            const {body:movie} = req;
            const movieId = await moviesService.createMovie({movie});
            res.status(201).json({
                movieId:movieId,
                message:'movie create'
            })
        } catch (error) {
            next(error)
        }
    })
    router.post("/:movieId", validationHandler(updateMovieSchema), validationHandler({movieId:movieIdSchema}, 'params'),async (req, res, next)=>{
        try {
            const {body:movie} = req;
            const {idMovie} = req.params.movieId;
            const movieId = await moviesService.updateMovie({idMovie}, {movie});
            res.status(200).json({
                movieId:movieId,
                message:'movie update'
            })
        } catch (error) {
            next(error)
        }

    });
    router.delete('/:movieId', validationHandler({movieId:movieIdSchema}, 'params') ,async (req, res, next)=>{
        try {
            const {idMovie} = req.params.movieId;
            const movieId = await moviesService.deleteMovie({idMovie});
            res.status(200).json({
                message:'Movie delete'
            })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = moviesApi;