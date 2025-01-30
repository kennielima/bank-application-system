const nodemailer = require ("nodemailer");
const { createResponse, HttpStatusCode, ResponseStatus } = require("./apiResponses");
const logger = require('../utils/logger');
const { SMTP_USER, SMTP_PASS } = require("./config");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

const sendOTP = async (otp, email) => {
    try {
        await transporter.sendMail({
            from: SMTP_USER,
            to: email,
            subject: "Bank OTP",
            text: "Hello, your OTP is " + otp,
        });

    } catch (error) {
        logger.error('Failed to send otp:', error);
    
        const response = {
            message: "Failed to send otp"
        }
        return createResponse(
            res,
            HttpStatusCode.StatusBadRequest,
            ResponseStatus.Failure,
            response
        )
    }
}
module.exports = sendOTP;