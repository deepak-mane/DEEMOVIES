const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.userId
        // console.log('[token]',token)
        // console.log('[process.env.JWT_SECRET]',process.env.JWT_SECRET)
        // console.log('[decoded]',decoded)
        // console.log('[req.body.userIdFromToken]',req.body.userIdFromToken)
        next()
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Invalid Token!!!"
        })
    }
}
