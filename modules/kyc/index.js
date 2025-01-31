const verifyUser = require("../../middlewares/verifyUser");
const KYCController = require("./kycController");
const router = require("express").Router()

router.post('/',
    verifyUser,
    KYCController.kyc
)
router.get('/kyc/callback',
    verifyUser,
    KYCController.callback
)


module.exports = router;