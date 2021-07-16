const express = require('express');
const { moviesMock } = require('../utils/mocks/moviesMock');

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);
    
    router.get("/", async function(req, res, next){
        try {
            const movies = await Promise.resolve(moviesMock);
            res.status(200).json({
                data:movies,
                message:"movies listed"
            })
        } catch (error) {
            next(error)
        }
    });
    router.get("/:movieId", async (req, res, next) =>{
        try {
            const idMovie = await Promise.resolve(moviesMock[0]);
            res.status(200).json({
                idMovie:idMovie,
                message:'Movie listed'
            })
        } catch (error) {
            next(error)
        }
    });
    router.post("/", async (req,res,next) => {
        try {
            const movieId = await Promise.resolve(moviesMock[0].id)
            res.status(201).json({
                movieId:movieId,
                message:'movie create'
            })
        } catch (error) {
            next(error)
        }
    })
    router.post("/:movieId", async (req, res, next)=>{
        try {
            const movieId = await Promise.resolve(moviesMock[0]);
            res.status(200).json({
                movieId:movieId,
                message:'movie update'
            })
        } catch (error) {
            next(error)
        }

    });
    router.delete('/:movieId', async (req, res, next)=>{
        try {
            const movieId = await Promise.resolve(moviesMock[0].id)
            res.status(200).json({
                message:'Movie delete'
            })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = moviesApi;