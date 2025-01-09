const Authcontroller = require("./authController")
const authValidator = require("./authValidator")

const router = require("express").Router()

router.post('/signup', 
    authValidator.validateSignupForm(), 
    authValidator.handleValidationErrors, 
    Authcontroller.signup
)

router.post('/login', 
    authValidator.validateLoginForm(), 
    authValidator.handleValidationErrors, 
    Authcontroller.login
)

router.post('/logout', 
    Authcontroller.logout
)

module.exports = router;
