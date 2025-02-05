const axios = require("axios");
const { createResponse, ResponseStatus, HttpStatusCode } = require('../../utils/apiResponses');
const { PAYSTACK_URL, PAYSTACK_SECRET_KEY, PAYSTACK_PORT } = require('../../utils/config');
const logger = require('../../utils/logger');

class TransactionController {
    static transaction(req, res) {
        const { email, amount, currency, channel } = req.body;
        try {
            const params = {
                "email": email,
                "amount": amount,
                "port": PAYSTACK_PORT,
                "currency": currency,
                "channel": channel,
                "invoice_limit": "3",
                // "reference": date.toISOString(),
                // "callback_url": "http://localhost:4005/transaction/callback",
                // "metadata": {
                //     "cart_id": 398,
                //     "custom_fields": [
                //         {
                //             "display_name": "Invoice ID",
                //             "variable_name": "Invoice ID",
                //             "value": 209
                //         },
                //         {
                //             "display_name": "Cart Items",
                //             "variable_name": "cart_items",
                //             "value": "3 bananas, 12 mangoes"
                //         }
                //     ]
                // },
                // "plan": "",
                // "split_code": "SPL_98WF13Eb3w",
                // "subaccount": "ACCT_8f4s1eq7ml6rlzj",
                // "transaction_charge": "0",
                // "bearer": "",
            }
            axios.post(`${PAYSTACK_URL}/transaction/initialize`, params, {
                headers: {
                    'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    let responseInfo = {
                        data: response.data,
                        message: "Transaction Success"
                    }

                    return createResponse(
                        res,
                        HttpStatusCode.StatusOk,
                        ResponseStatus.Success,
                        responseInfo
                    )
                })
                .catch((error) => {
                    const response = { message: " Failed to complete transaction:" + error }
                    return createResponse(
                        res,
                        axios.HttpStatusCode.StatusBadRequest,
                        ResponseStatus.Failure,
                        response
                    )
                })
        }
        catch (error) {
            const response = {
                message: "Transaction request error" + error
            }
            return createResponse(
                res,
                axios.HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }
}

module.exports = TransactionController;