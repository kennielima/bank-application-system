const express = require("express")
const cors = require("cors")
require('dotenv').config()


const server = express();

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

module.exports = server