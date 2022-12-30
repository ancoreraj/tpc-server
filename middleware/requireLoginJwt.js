const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "Please Log in" })
    }
    const token = authorization.replace("Token ", "")
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Invalid Token" })
        }

        const { _id } = payload
        const user = await User.findById( _id);

        if(!user.isVerified) {
            return res.status(401).json({ message: 'You are not verified'})
        }

        req.user = user;
        next()
    })
}