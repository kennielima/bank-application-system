require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    LOCAL_HOST: process.env.LOCAL_HOST,
    LOCAL_PORT: process.env.LOCAL_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET,
    REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    DIALECT: process.env.DIALECT,
    SMILE_ID_API_KEY: process.env.SMILE_ID_API_KEY,
    SMILE_ID_SIGNATURE: process.env.SMILE_ID_SIGNATURE,
    SMILE_ID_PARTNER_ID: process.env.SMILE_ID_PARTNER_ID,
    SMILE_ID_URL: process.env.SMILE_ID_URL,
    TZ: process.env.TZ,
    NODE_ENV: process.env.NODE_ENV || "production",
    FLUTTERWAVE_SECRET_KEY: process.env.FLUTTERWAVE_SECRET_KEY,
    FLUTTERWAVE_URL: process.env.FLUTTERWAVE_URL,
    FLUTTERWAVE_PUBLIC_KEY: process.env.FLUTTERWAVE_PUBLIC_KEY,
    FLUTTERWAVE_ENCRYPTION_KEY: process.env.FLUTTERWAVE_ENCRYPTION_KEY,
    FLUTTERWAVE_TRANSFER_URL: process.env.FLUTTERWAVE_TRANSFER_URL
}