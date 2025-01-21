const jwt = require("jsonwebtoken")
const AuthServices = require("../modules/auth/authService");
const { createResponse, HttpStatusCode, ResponseStatus } = require('../utils/apiResponses');

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken || req.cookies.refreshtoken;
        const JWTSECRET = token === req.cookies.accesstoken
            ? process.env.ACCESS_JWT_SECRET
            : process.env.REFRESH_JWT_SECRET;

            if (!token) {
                const response = {
                    message: "User unauthorized to make request"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusUnauthorized,
                    ResponseStatus.Failure,
                    response
                )
            }
        const decodedtoken = jwt.verify(token, JWTSECRET);
        if (!decodedtoken) {
            const response = {
                message: "User unauthorized to make request"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusUnauthorized,
                ResponseStatus.Failure,
                response
            )
        }
        const user = await AuthServices.findUserByPk(decodedtoken.UserId);
        if (!user || (user && user.AccessToken !== token)) {
            const response = {
                message: "Failed to authenticate user"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusNotFound,
                ResponseStatus.Failure,
                response
            )
        }
        if (user.isBlocked) {
            const response = {
                message: "User is blocked"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusUnauthorized,
                ResponseStatus.Failure,
                response
            )
        }
        req.user = user;
        const response = {
            message: "User authorized to refresh token"
        }
        createResponse(
            res,
            HttpStatusCode.StatusOk,
            ResponseStatus.Success,
            response
        )
        next();
    }
    catch (error) {
        const response = {
            message: "Failed to verify user:" + error
        }
        return createResponse(
            res,
            HttpStatusCode.StatusBadRequest,
            ResponseStatus.Failure,
            response
        )
    }
    return verifyUser;
}