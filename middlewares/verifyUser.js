const jwt = require("jsonwebtoken")
const db = require('../../../database/models');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken;
        if (!token) {
            return res.status(401).json({ message: 'User unauthorized to make request' })
        }
        const decodedtoken = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
        if (!decodedtoken) {
            return res.status(403).json({ message: 'User unauthorized to make request' })
        }
        const user = await db.User.findOne({
            where: { Email }
        })
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist" })
        }
        req.user = user;
        res.status(200).json({ message: 'User authorized' })
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Failed to verify user' })
    }
    return verifyUser;
}