// const { handleSqlInjection } = require("../../../middlewares")
const Authcontroller = require("./authController")
const authValidator = require("./authValidator")

const router = require("express").Router()

router.post('/signup', 
    // handleSqlInjection,
    authValidator.validateSignupForm(), 
    authValidator.handleValidationErrors, 
    Authcontroller.signup
)

router.post('/login', 
    // handleSqlInjection,
    authValidator.validateLoginForm(), 
    authValidator.handleValidationErrors, 
    Authcontroller.login
)

router.post('/logout', 
    Authcontroller.logout
)

module.exports = router;
