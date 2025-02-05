const { default: axios } = require('axios');
const db = require('../../database/models');
const { createResponse, HttpStatusCode, ResponseStatus } = require('../../utils/apiResponses');
const { FLUTTERWAVE_SECRET_KEY, FLUTTERWAVE_URL } = require('../../utils/config');
const logger = require('../../utils/logger');
const AccountService = require('./accountService');

class accountController {
    static async createAccount(req, res) {
        const { email, bvn } = req.body;
        try {
            const params = {
                "email": email,
                "amount": 1000,
                "bvn": bvn,
                "is_permanent": false
            }
            const response = await axios.post(`${FLUTTERWAVE_URL}`, params, {
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
            const user = req.user;
            const { account_number, account_status, created_at, expiry_date, bank_name } = response.data
            // await AccountService.createAccount(user.Id, account_number, account_status, created_at, expiry_date, bank_name)
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
            logger.error('Failed to create Virtual Account:', error, error.response?.data);
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

    static async fetchAccountDetails(req, res) {
        const { account_number } = req.body;
        try {
            const response = await axios.get(`${FLUTTERWAVE_URL}/${account_number}`, {
                headers: {
                    "Authorization": `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                    "Content-Type": "application/json"
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
            const UserAccount = await AccountService.fetchAccountDetails(req.user.Id, account_number);
            console.log("req.params", req.params, "responsedata", response.data, UserAccount);
            console.log();
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