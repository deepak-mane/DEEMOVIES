const router = require('express').Router()
const Theatre = require('../models/theatreModel')
const Show = require('../models/showModel')
const authMiddleware = require('../middlewares/authMiddleware')
///////////////////////// THEATRE RELATED ////////////////////////
// Method : Post
// Add Theatre
router.post('/add-theatre', authMiddleware, async (req, res) => {
    try {
        const newTheatre = await Theatre(req.body)
        await newTheatre.save()
        return res.send({
            success: true,
            message: `Theatre Added Successfully`
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Update/Edit Theatre
router.post('/update-theatre', authMiddleware, async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body)

        return res.send({
            success: true,
            message: `Theatre Updated Successfully`
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Delete Theatre
router.post('/delete-theatre', authMiddleware, async (req, res) => {
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId)

        return res.send({
            success: true,
            message: `Theatre Deleted Successfully`
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Get
// Get All Theatres
router.get('/get-all-theatres', authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find()
        .populate('owner')
        .sort({ createdAt: -1 })
        return res.send({
            success: true,
            message: `Theatres fetched Successfully`,
            data: theatres
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Get All Theatres By Owner
router.post(
    '/get-all-theatres-by-owner',
    authMiddleware,
    async (req, res) => {
        try {
            const theatres = await Theatre.find({
                owner: req.body.owner
            }).sort({ createdAt: -1 })
            return res.send({
                success: true,
                message: `Theatres By Owner fetched Successfully.`,
                data: theatres
            })
        } catch (error) {
            res.send({ success: false, message: error.message })
        }
    }
)
//////////////////////////////////////// SHOW RELATED ////////////////////////
// Method : Post
// Add Show
router.post('/add-show', authMiddleware, async (req, res) => {
    try {
        const newShow = await Show(req.body)
        await newShow.save()
        return res.send({
            success: true,
            message: `Show Added Successfully.`
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Update/Edit Show
router.post('/update-show', authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndUpdate(req.body.showId, req.body)

        return res.send({
            success: true,
            message: `Show Updated Successfully`
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Delete Show
router.post('/delete-show', authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.body.showId)

        return res.send({
            success: true,
            message: `Show Deleted Successfully`
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Get All Shows By Theatre
router.post(
    '/get-all-shows-by-theatre',
    authMiddleware,
    async (req, res) => {
        try {
            const shows = await Show.find({
                theatre: req.body.theatreId
            })
                .populate('movie')
                .sort({ createdAt: -1 })
            return res.send({
                success: true,
                message: `Shows fetched Successfully`,
                data: shows
            })
        } catch (error) {
            res.send({ success: false, message: error.message })
        }
    }
)
// Method : Post
// Get all unique theatres which have show of a specific movie
router.post(
    '/get-all-theatres-by-movie',
    authMiddleware,
    async (req, res) => {
        try {
            const { movie, date } = req.body
            // find all shows of movie
            const shows = await Show.find({ movie, date })
                .populate('theatre')
                .sort({ createdAt: -1 })

            //get all unique theatres for that specific show
            let uniqueTheatres = []
            shows.forEach(show => {
                const theatre = uniqueTheatres.find(
                    theatre => theatre._id == show.theatre._id
                )

                // For every theater finding unique shows for a particular movie on specific Date
                if (!theatre) {
                    const showsForThisTheatre = shows.filter(
                        showObj =>
                            showObj.theatre._id == show.theatre._id
                    )
                    // Attaching that shows to every theatre object
                    uniqueTheatres.push({
                        ...show.theatre._doc,
                        shows: showsForThisTheatre
                    })
                }
            })
            return res.send({
                success: true,
                message: `Unique Theatres fetched successfully`,
                data: uniqueTheatres
            })
        } catch (error) {
            res.send({ success: false, message: error.message })
        }
    }
)
// Method : Post
// Get Show By ID
router.post('/get-show-by-id', authMiddleware, async (req, res) => {
    try {
        const show = await Show.findById(req.body.showId)
            .populate('movie')
            .populate('theatre')
        return res.send({
            success: true,
            message: `Show fetched Successfully.`,
            data: show
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})

////////////////////////
module.exports = router
//////////////////////////////////////// END ROUTE ////////////////////////
