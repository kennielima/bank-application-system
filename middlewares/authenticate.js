const jwt = require("jsonwebtoken")
const { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, NODE_ENV } = require("../utils/config")

const authenticate = (Id, response) => {
    const accessToken = jwt.sign(
        { Id },
        ACCESS_JWT_SECRET,
        { expiresIn: "10m" }
    )
    const refreshToken = jwt.sign(
        { Id },
        REFRESH_JWT_SECRET,
        { expiresIn: "1h" }
    )
    response.cookie("accesstoken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 60 * 1000,
        secure: NODE_ENV === "production"
    })
    response.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        secure: NODE_ENV === "production"
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