const db = require('../../../database/models');
const authenticate = require('../../../middlewares/authenticate');
const bcrypt = require("bcryptjs");
const parser = require("ua-parser-js");
const jwt = require("jsonwebtoken")

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
                return res.status(401).json({ message: 'User already exists, login instead' })
            }
            const hashedPassword = await bcrypt.hash(Password, 10)
            const newUser = await db.User.create({ FirstName, LastName, Email, PhoneNumber, Password: hashedPassword })
            console.log(newUser)
            authenticate(newUser.UserId, res)
            const parseDevice = parser(req.headers["user-agent"]);
            const deviceInfo = JSON.stringify(parseDevice);
            console.log("Device Info", parseDevice, deviceInfo)
            res.status(201).json({ message: 'User successfully signed up' })
        }
        catch (error) {
            console.error('Signup error:', error);
            return res.status(400).json({ message: 'Failed to authenticate' })
        }
    }
    static async login (req, res) {
        const { Email, Password } = req.body;
        console.log(req.body)
        try {
            const user = await db.User.findOne({
                where: { Email }
            })
            if (!user) {
                console.log("user doesn't exist")
                return res.status(401).json({ message: "User doesn't exist" })
            }
            const validatePassword = bcrypt.compare(Password, user.Password);
            if (!validatePassword) {
                return res.status(404).json({ message: "Invalid Password" })
            }
            authenticate(user.UserId, res)

            const parseDevice = parser(req.headers["user-agent"]);
            const deviceInfo = JSON.stringify(parseDevice);
            console.log("Device Info", parseDevice, deviceInfo);

            res.status(201).json({ message: 'User successfully logged in' })
        }
        catch (error) {
            console.error('Login error:', error);
            return res.status(400).json({ message: 'Failed to login' })
        }
    }
    static logout (req, res) {
        try {
            res.cookie("tokenkey", "", {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 0,
            })
            res.status(200).json({ message: 'User successfully signed out' })
        }
        catch (error) {
            console.error('Signout error:', error);
            return res.status(400).json({ message: 'Failed to sign out' })
        }
    }
}

module.exports = Authcontroller;