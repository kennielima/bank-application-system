const jwt = require("jsonwebtoken")

const authenticate = (UserId, response) => {
    const accessToken = jwt.sign(
        { UserId },
        process.env.ACCESS_JWT_SECRET,
        { expiresIn: "10m" }
    )
    const refreshToken = jwt.sign(
        { UserId },
        process.env.REFRESH_JWT_SECRET,
        { expiresIn: "1h" }
    )
    response.cookie("accesstoken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    })
    response.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    })
    return { accessToken, refreshToken };
}

const deauthenticate = (response) => {
    response.cookie("accesstoken", "", {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0,
    })
    response.cookie("refreshtoken", "", {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0,
    })
    // response.clearCookie("accesstoken")
}

module.exports = {
    authenticate,
    deauthenticate
};