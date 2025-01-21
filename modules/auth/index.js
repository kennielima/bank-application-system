const handleSqlInjection = require("../../middlewares/handleSqlInjection")
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
    authValidator.validateNewPassword(),
    authValidator.handleValidationErrors,
    Authcontroller.resetPassword
)
router.post('/block-account',
    handleSqlInjection,
    authValidator.validateLoginForm(),
    authValidator.handleValidationErrors,
    Authcontroller.resetPassword
)
router.post('/unblock-account',
    handleSqlInjection,
    authValidator.validateLoginForm(),
    authValidator.handleValidationErrors,
    Authcontroller.resetPassword
)

router.post('/logout',
    Authcontroller.logout
)


module.exports = router;

// TODO:users can renew their password themselves 1 
// SERVICES 2
// TODO: LOGGER 3
// add accesstoken column to model 4
// TODO:SINGLE DEVICE LOGIN 5
// BLOCK AND UNBLOCK USER 6