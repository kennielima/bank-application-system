const handleSqlInjection = require("../../middlewares/handleSqlInjection");
const verifyUser = require("../../middlewares/verifyUser");
const AccountController = require("./accountController");
const router = require("express").Router()

router.post('/create-customer',
    handleSqlInjection,
    verifyUser,
    AccountController.createCustomer
)
router.post('/create-dva',
    handleSqlInjection,
    verifyUser,
    AccountController.createVirtualAccount
)

module.exports = router;
