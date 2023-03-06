const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
///////////////////// USER RELATED /////////////////////
// Method : Post
// register a new user
router.post('/register', async (req, res) => {
    try {
        // 1 . check if user already exists
        const userExists = await User.findOne({
            email: req.body.email
        })
        if (userExists) {
            return res.send({
                success: false,
                message: `User already Registered, Login with your password`
            })
        }

        //2. hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(
            req.body.password,
            salt
        )
        req.body.password = hashedPassword

        //3. Save user in mongodb
        const newUser = new User(req.body)
        await newUser.save()
        return res.send({
            success: true,
            message: `User Registeration Successfully, Please Login`
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : Post
// login a  user
router.post('/login', async (req, res) => {
    try {
        // 1 . check if user already exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send({
                success: false,
                message: `User does not exist.`
            })
        }

        //2. compare user password with hashed password from database
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword) {
            return res.send({
                success: false,
                message: `Invalid Password.`
            })
        }

        //3. generate token and assign it to user
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.send({
            success: true,
            message: `User logged in successfully`,
            data: token
        })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
// Method : GET
// get user details
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select(
            '-password'
        )

        res.send({
            success: true,
            message: `User details fetched successfully.`,
            data: user
        })
        
    } catch (error) {
        res.send({
            success: false, 
            message: error.message,
        })
    }
})

////////////////////////
module.exports = router
//////////////////////////////////////// END ROUTE ////////////////////////