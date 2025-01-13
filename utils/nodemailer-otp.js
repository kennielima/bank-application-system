const nodemailer = require ("nodemailer");
const { createResponse, HttpStatusCode, ResponseStatus } = require("./apiResponses");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendOTP = async (otp, email) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Bank OTP",
            text: "Hello, your OTP is " + otp,
        });

    } catch (error) {
        console.error('Failed to send otp:', error);
    
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