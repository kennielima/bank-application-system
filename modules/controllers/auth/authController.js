const db = require('../../../database/models');
const authenticate = require('../../../middlewares/authenticate');
const bcrypt = require("bcryptjs");
const parser = require("ua-parser-js");
const { createResponse, HttpStatusCode, ResponseStatus } = require('../../../utils/apiResponses');
const sendOTP = require('../../../utils/nodemailer-otp');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');


class Authcontroller {
    static async signup(req, res) {
        const { FirstName, LastName, Email, PhoneNumber, Password } = req.body;
        console.log(req.body)
        try {
            const existingUser = await db.User.findOne({
                where: { Email }
            })
            if (existingUser) {
                console.log('user already exists')
                const response = {
                    message: "User already exists, login instead"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusUnauthorized,
                    ResponseStatus.Failure,
                    response
                )
            }

            const hashedPassword = await bcrypt.hash(Password, 10)
            const newUser = await db.User.create({ FirstName, LastName, Email, PhoneNumber, Password: hashedPassword })
            console.log(newUser)

            authenticate(newUser.UserId, res)

            const parseDevice = parser(req.headers["user-agent"]);
            const deviceInfo = JSON.stringify(parseDevice);
            console.log("Device Info", parseDevice, deviceInfo);

            const response = {
                data: newUser,
                message: "User successfully signed up"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusCreated,
                ResponseStatus.Success,
                response
            )
        }

        catch (error) {
            console.error('Signup error:', error);
            const response = {
                message: "Failed to authenticate"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }

    static async login(req, res) {
        const { Email, Password } = req.body;
        console.log(req.body);
        const generateOTP = () => {
            return Math.floor(1000 + Math.random() * 9000);
        }
        try {
            const otp = generateOTP();
            const user = await db.User.findOne({
                where: { Email }
            })
            if (!user) {
                console.log("User doesn't exist")
                const response = {
                    message: "User doesn't exist"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusUnauthorized,
                    ResponseStatus.Failure,
                    response
                )
            }
            const validatePassword = bcrypt.compare(Password, user.Password);
            if (!validatePassword) {
                const response = {
                    message: "Invalid Password"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusNotFound,
                    ResponseStatus.Failure,
                    response
                )
            }
            await db.User.update({
                OTP: otp,
                OTPExpiry: new Date(Date.now() + 10 * 60 * 1000)
            }, {
                where: {
                    Email: Email
                }
            })
            await sendOTP(otp, Email);

            const response = {
                data: user,
                message: "OTP has been sent to email"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusCreated,
                ResponseStatus.Success,
                response
            )
        }
        catch (error) {
            console.error('Login error:', error);
            const response = {
                message: "Failed to initiate login"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }


    static async OTPlogin(req, res) {
        const { Email, otp } = req.body;
        console.log(req.body);
        try {
            const user = await db.User.findOne({
                where: {
                    Email,
                    OTP: otp,
                    OTPExpiry: {
                        [Op.gt]: new Date()
                    }
                }
            })
            console.log(user)
            if (!user) {
                console.log("Invalid OTP")
                const response = {
                    message: "Invalid OTP"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusUnauthorized,
                    ResponseStatus.Failure,
                    response
                )
            }
            await db.User.update({
                OTP: null,
                OTPExpiry: null
            }, {
                where: {
                    Email: Email
                }
            })
            authenticate(user.UserId, res);
            const parseDevice = parser(req.headers["user-agent"]);
            const deviceInfo = JSON.stringify(parseDevice);
            console.log("Device Info", parseDevice, deviceInfo);

            const response = {
                data: user,
                message: "User successfully logged in"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusCreated,
                ResponseStatus.Success,
                response
            )
        }
        catch (error) {
            console.error('OTP error:', error);
            const response = {
                message: "Failed to verify OTP"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }

    static async refreshToken(req, res) {
        try {
            console.log("req cookies:", req.headers.cookie, req.cookies);

            const refreshToken = req.cookies.refreshtoken;
            console.log("refreshtoken", refreshToken);

            if (!refreshToken) {
                const response = {
                    message: "No refresh token provided"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusUnauthorized,
                    ResponseStatus.Failure,
                    response
                )
            }
            const decodedRefreshtoken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
            console.log(decodedRefreshtoken)
            const user = await db.User.findByPk(decodedRefreshtoken.UserId)
            if (!user) {
                const response = {
                    message: "User doesn't exist"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusNotFound,
                    ResponseStatus.Failure,
                    response
                )
            }
            const newAccessToken = jwt.sign(
                { UserId: user.UserId },
                process.env.ACCESS_JWT_SECRET,
                { expiresIn: "1h" }
            )
            console.log(newAccessToken)
            const response = {
                // data: { accessToken: newAccessToken },
                message: "Token refreshed successfully"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                response
            )
        }
        catch (error) {
            console.error('Refresh token error:', error);
            const response = {
                message: "Failed to refresh token"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }
    static logout(req, res) {
        try {
            res.cookie("accesstoken", "", {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0,
            })
            const response = {
                data: null,
                message: "User successfully signed out"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                response
            )
        }
        catch (error) {
            console.error('Signout error:', error);
            const response = {
                message: "Failed to log out"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }
}

module.exports = Authcontroller;