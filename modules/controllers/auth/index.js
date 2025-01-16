const handleSqlInjection = require("../../../middlewares/handleSqlInjection")
const Authcontroller = require("./authController")
const authValidator = require("./authValidator")

const router = require("express").Router()

router.post('/signup',
    handleSqlInjection,
    authValidator.validateSignupForm(),
    authValidator.handleValidationErrors,
    Authcontroller.signup
)

router.post('/login',
    handleSqlInjection,
    authValidator.validateLoginForm(),
    authValidator.handleValidationErrors,
    Authcontroller.login
)
router.post('/verify-login',
    handleSqlInjection,
    authValidator.validateOTP(),
    authValidator.handleValidationErrors,
    Authcontroller.OTPlogin
)
router.get('/refresh-token',
    Authcontroller.refreshToken
)

router.post('/forgot-password',
    Authcontroller.OTPforgotPassword
)

router.post('/reset-password',
    Authcontroller.resetPassword
)

router.post('/logout',
    Authcontroller.logout
)


module.exports = router;
