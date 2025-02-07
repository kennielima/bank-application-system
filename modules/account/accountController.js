const axios = require('axios');
const { createResponse, HttpStatusCode, ResponseStatus } = require('../../utils/apiResponses');
const { FLUTTERWAVE_SECRET_KEY, FLUTTERWAVE_URL, FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_TRANSFER_URL, FLUTTERWAVE_SUBACCOUNT_URL, LOCAL_URL } = require('../../utils/config');
const logger = require('../../utils/logger');
const AccountService = require('./accountService');
const { v4: uuidv4 } = require('uuid');
const sanitizer = require("sanitizer");

class accountController {
    static async fetchBalance(req, res) {
        const { account_number, currency } = req.body;
        try {
            // const response = await getBalanceRequest(account_number, currency)
            const response = await axios.request({
                method: 'GET',
                url: `${FLUTTERWAVE_SUBACCOUNT_URL}/${account_number}/balances?currency=${currency}`,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response) {
                logger.error("Error fetching Account");
                const responseInfo = { message: "Virtual Account Fetch Failed" }
                return createResponse(
                    res,
                    HttpStatusCode.StatusBadRequest,
                    ResponseStatus.Failure,
                    responseInfo
                )
            }
            logger.info(sanitizer.sanitize(response.data))

            const { available_balance } = response.data.data;
            // console.log(req.user.Id, account_number)

            // const Account = await AccountService.fetchAccountDetails(req.user.Id, account_number)
            // console.log(Account)
            // if (available_balance === 0) {
            //     await AccountService.updateAccountBalance(available_balance, currency, account_number);
            // }
            const responseInfo = {
                data: response.data,
                message: "Fixed Virtual Account Successfully Fetched"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                responseInfo
            )
        }
        catch (error) {
            logger.error('Failed to fetch Virtual Account:', error.response?.data);
            const response = {
                message: "Failed to fetch Virtual Account:" + error
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }

    static async createAccount(req, res) {
        const { email, account_name, mobilenumber, country, currency } = req.body;
        try {
            const params = {
                "email": email,
                "account_name": account_name,
                "mobilenumber": mobilenumber,
                "country": country
            }
            const response = await axios.post(`${FLUTTERWAVE_SUBACCOUNT_URL}`, params, {
                headers: {
                    "Authorization": `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            })
            if (!response) {
                logger.error("Error creating Account");
                const responseInfo = { message: "Virtual Account Creation Failed" }
                return createResponse(
                    res,
                    HttpStatusCode.StatusBadRequest,
                    ResponseStatus.Failure,
                    responseInfo
                )
            }
            logger.info(sanitizer.sanitize(response.data))

            const { id, account_reference, bank_name, bank_code, status, created_at } = response.data.data;

            await AccountService.createAccount(req.user.Id, id, account_reference, bank_name, bank_code, status, created_at, country, account_name, email, mobilenumber, currency);

            // const fetchAccount = await this.fetchBalance({body: { account_reference, currency }})
            // console.log(fetchAccount);
            // const fetchAccount = await getBalanceRequest(account_reference, currency)
            // console.log(fetchAccount, response.data)
            // const { available_balance } = fetchAccount.data.data;
            // const UpdateBalance = await AccountService.updateBalance(available_balance, account_reference, req.user.Id);
            // console.log(UpdateBalance);
            const responseInfo = {
                data: response.data,
                message: "Fixed Virtual Account Successfully Created"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                responseInfo
            )
        }
        catch (error) {
            logger.error('Failed to create Virtual Account:', error.response?.data);
            const response = {
                message: "Failed to create Virtual Account:" + error
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }

    static async transfer(req, res) {
        const { account_bank, account_number, amount, narration, user_account } = req.body;
        try {
            const details = {
                account_bank: account_bank,
                account_number: account_number,
                amount: amount,
                currency: "NGN",
                debit_currency: "NGN",
                narration: narration,
                reference: uuidv4()
            };
            let responseInfo = {
                data: { isTransferSuccessful: null },
            }

            const response = await axios.post(`${FLUTTERWAVE_TRANSFER_URL}`, details, {
                headers: {
                    "Authorization": `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            })

            if (!response || response.statusText !== 'OK') {
                responseInfo = {
                    message: "Transfer Failed",
                    data: response
                }
                logger.error("Transfer Failed", response)
                return createResponse(
                    res,
                    HttpStatusCode.StatusBadRequest,
                    ResponseStatus.Failure,
                    responseInfo
                )
            }
            logger.info(sanitizer.sanitize(response.data))

            responseInfo = {
                data: response.data,
                message: "Transfer Successful"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                responseInfo
            )
        }
        catch (error) {
            logger.error('Failed to complete transfer request: ', error.response?.data);
            const response = {
                message: "Failed to complete transfer request: " + error
            }
            return createResponse(
                res,
                HttpStatusCode.StatusBadRequest,
                ResponseStatus.Failure,
                response
            )
        }
    }

    static async fetchUserAccounts(req, res) {
        try {
            const UserAccounts = await AccountService.fetchUserAccountsFromDB(req.user.Id);
            const responseInfo = {
                data: UserAccounts,
                message: "Fixed Virtual Account Successfully Fetched"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                responseInfo
            )
        }
        catch (error) {
            logger.error('Failed to fetch Virtual Account:', error, error.response?.data);
            const response = {
                message: "Failed to fetch Virtual Account:" + error
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

module.exports = accountController


// TODO: Add transactions to db
// fetch which id is making trfr and debit from balance
