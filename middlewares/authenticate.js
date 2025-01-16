const jwt = require("jsonwebtoken")

const authenticate = (UserId, response) => {
    const accessToken = jwt.sign(
        { UserId },
        process.env.ACCESS_JWT_SECRET,
        { expiresIn: "1h" }
    )
    const refreshToken = jwt.sign(
        { UserId },
        process.env.REFRESH_JWT_SECRET,
        { expiresIn: "1d" }
    )
    response.cookie("accesstoken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    })
    response.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    })
    return { accessToken, refreshToken };
}

module.exports = authenticate;