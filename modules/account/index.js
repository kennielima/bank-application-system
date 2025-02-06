const handleSqlInjection = require("../../middlewares/handleSqlInjection");
const verifyUser = require("../../middlewares/verifyUser");
const accountController = require("./AccountController");
const router = require("express").Router();

router.post('/create-account',
    verifyUser,
    handleSqlInjection,
    accountController.createAccount
)
router.post('/get-account',
    verifyUser,
    handleSqlInjection,
    accountController.fetchAccountDetails
)
router.post('/make-transfer',
    verifyUser,
    handleSqlInjection,
    accountController.transfer
)
router.get('/get-accounts',
    verifyUser,
    accountController.fetchUserAccounts
)

module.exports = router;