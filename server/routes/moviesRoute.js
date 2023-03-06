const router = require('express').Router()
const Movie = require('../models/movieModel')
const authMiddleware = require('../middlewares/authMiddleware')
///////////////////////// MOVIE RELATED /////////////////////
// Method : Post
// Add Movie
router.post('/add-movie', authMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body)
        await newMovie.save()
        res.send({
            success: true,
            message: 'Movie added successfully'
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Edit/Update Movie
router.post('/update-movie', authMiddleware, async (req, res) => {
    try {
         
        await Movie.findByIdAndUpdate(req.body.movieId, req.body)

        res.send({
            success: true,
            message: 'Movie updated successfully'
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Delete Movie
router.post('/delete-movie', authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId)
        res.send({
            success: true,
            message: 'Movie Deleted successfully'
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Get
// Get All Movies
router.get('/get-all-movies', authMiddleware, async (req, res) => {
    try {
        const movies = await Movie.find().sort({createdAt: -1})
        if (!movies) {
            return res.send({
                success: false,
                message: 'Movies not found'
            })
        }

        res.send({
            success: true,
            message: 'Movie fetched successfully',
            data: movies
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Get
// Get Movie By Id
router.get('/get-movie-by-id/:id', authMiddleware, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (!movie) {
            return res.send({
                success: false,
                message: 'Movie not found'
            })
        }

        res.send({
            success: true,
            message: 'Movie details fetched successfully',
            data: movie
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})

////////////////////////
module.exports = router
//////////////////////////////////////// END ROUTE ////////////////////////