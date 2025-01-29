const express = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./modules/auth");
const kycRouter = require("./modules/kyc");
require('dotenv').config()


const server = express();

server.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser());

server.use('/auth', AuthRouter)
server.use('/kyc', kycRouter)

module.exports = server;