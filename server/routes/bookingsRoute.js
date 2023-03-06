const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)
const Booking = require('../models/bookingModel')
const Show = require('../models/showModel')
const authMiddleware = require('../middlewares/authMiddleware')
///////////////////////// BOOKINGS RELATED ////////////////////////
// Method : Post
// Make payment after Selecting Seats for Show
router.post('/make-payment', authMiddleware, async (req, res) => {
    try {
        const { token, amount } = req.body
        // create a customer
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        // create a charge
        const charge = await stripe.charges.create(
            {
                amount: amount,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the movie ticket`
            },
            {
                idempotencyKey: Math.random().toString(36).substring(7)
            }
        )

        const transactionId = charge.id

        return res.send({
            success: true,
            message: `Payment Successfully Completed.`,
            data: transactionId
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// Book Shows after Payment
router.post('/book-show', authMiddleware, async (req, res) => {
    try {
        // save the Booking
        const newBooking = new Booking(req.body)
        await newBooking.save()
        // find existing booked seats previously in this Show
        const show = await Show.findById(req.body.show)
        // udpate seats
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: [...show.bookedSeats, ...req.body.seats]
        })

        return res.send({
            success: true,
            message: `Show Booked Successfully.`,
            data: newBooking
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Get
// Get all bookings by user
router.get('/get-bookings', authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.body.userId })
            .populate('show')
            .populate({
                path: 'show',
                populate: {
                    path: 'movie',
                    model: 'movies'
                }
            })
            .populate('user')
            .populate({
                path: 'show',
                populate: {
                    path: 'theatre',
                    model: 'theatres'
                }
            })

        return res.send({
            success: true,
            message: `Bookings fetched Successfully.`,
            data: bookings
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})

////////////////////////
module.exports = router
//////////////////////////////////////// END ROUTE ////////////////////////
