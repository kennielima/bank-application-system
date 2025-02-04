const axios = require('axios');
const { createResponse, ResponseStatus, HttpStatusCode } = require('../../utils/apiResponses');
const { PAYSTACK_URL, PAYSTACK_SECRET_KEY, PAYSTACK_PORT } = require('../../utils/config');
const logger = require('../../utils/logger');
const AccountService = require("./accountService");

class AccountController {
    static async createCustomer(req, res) {
        const { first_name, last_name, phone, email } = req.body;
        try {
            const params = {
                "first_name": first_name,
                "last_name": last_name,
                "port": PAYSTACK_PORT,
                "phone": phone,
                "email": email,
            }
            const user = req.user;
            const response = await axios.post(`${PAYSTACK_URL}/customer`, params, {
                headers: {
                    'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            })
            if (!response) {
                logger.error("Error creating Account")
                const responseInfo = { message: "Create Customer Failed" }
                return createResponse(
                    res,
                    HttpStatusCode.StatusBadRequest,
                    ResponseStatus.Failure,
                    responseInfo
                )
            }
            const responseInfo = {
                data: response.data,
                message: "Customer Successfully Created"
            }

            const { customer_code, id, integration } = response.data.data;

            const Customer = await AccountService.createCustomer(
                user.Id,
                first_name,
                last_name,
                phone,
                email,
                customer_code,
                id,
                integration
            )
            logger.info(responseInfo.data, "Customer: ", Customer);

            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                responseInfo
            )

        }
        catch (error) {
            logger.error("Account Creation ", error);
            const responseInfo = {
                message: "Account Creation error " + error
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                responseInfo
            )
        }
    }

    static async createVirtualAccount(req, res) {
        const { customer_code_or_id, bank_slug } = req.body;
        try {
            const params = {
                "customer": customer_code_or_id,
                "preferred_bank": bank_slug
            }

            const response = await axios.post(`${PAYSTACK_URL}/dedicated_account`, params, {
                headers: {
                    'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            })
            // .then((response) => {
            //     console.log(response)
            // }).catch((error) => {
            //     console.log(error)
            // })
            if (!response) {
                logger.error("Failed to get Dedicated Virtual Account Response");
                const responseInfo = { message: "Failed to get Dedicated Virtual Account Response " }
                return createResponse(
                    res,
                    HttpStatusCode.StatusBadRequest,
                    ResponseStatus.Failure,
                    responseInfo
                )
            }
            const responseInfo = {
                data: response.data,
                message: "Dedicated Virtual Account Successfully Created"
            }
            const DVA = await AccountService.updateCustomer(bank_slug, customer, responseInfo.data.account_name, responseInfo.data.account_number)

            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                responseInfo
            );
        }
        catch (error) { 
            logger.error("Dedicated Virtual Account Creation error " + error, error.response?.data)
            console.error("Dedicated Virtual Account Creation error " + error, error.response?.data)
            const response = {
                message: "Dedicated Virtual Account Creation error: " + error
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }
}

module.exports = AccountController;