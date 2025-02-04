const express = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
    AuthRouter,
    KycRouter,
    AccountRouter
} = require('./modules')

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
server.use('/kyc', KycRouter)
server.use('/account', AccountRouter)

module.exports = server;