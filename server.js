const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./modules/controllers/auth");
require('dotenv').config()


const server = express();

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(bodyParser.json());

server.use('/auth', AuthRouter)
module.exports = server;