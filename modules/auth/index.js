const handleSqlInjection = require("../../middlewares/handleSqlInjection")
const Authcontroller = require("./authController")
const authValidator = require("./authValidator")
const verifyUser = require('../../middlewares/verifyUser')
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
    Authcontroller.forgotPassword
)

router.post('/verify-otp',
    handleSqlInjection,
    authValidator.validateOTP(),
    authValidator.handleValidationErrors,
    Authcontroller.enterPasswordOTP
)
router.post('/reset-password',
    handleSqlInjection,
    verifyUser,
    authValidator.validateNewPassword(),
    authValidator.handleValidationErrors,
    Authcontroller.resetPassword
)
router.post('/block-account',
    handleSqlInjection,
    verifyUser,
    authValidator.validateLoginForm(),
    authValidator.handleValidationErrors,
    Authcontroller.blockUser
)
router.post('/unblock-account',
    handleSqlInjection,
    authValidator.validateLoginForm(),
    authValidator.handleValidationErrors,
    Authcontroller.unblockUser
)

router.post('/logout',
    Authcontroller.logout
)


module.exports = router;

// TODO ADD FLAGS TO MODEL
// TODO ASSOCIATIONS REFACTOR