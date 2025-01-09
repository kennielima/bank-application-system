const jwt = require("jsonwebtoken")

const generateTokenSetCookies = (UserId, response) => {
    const token = jwt.sign(
        { UserId },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )
    response.cookie("tokenkey", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    })
}

module.exports = generateTokenSetCookies;