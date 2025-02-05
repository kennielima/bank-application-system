const verifyUser = require("../../middlewares/verifyUser");
const TransactionController = require("./transactionController");
const router = require("express").Router()

router.post('/',
    verifyUser,
    TransactionController.transaction
)
router.post('/callback',
    verifyUser,
    TransactionController.transaction
)

module.exports = router;
