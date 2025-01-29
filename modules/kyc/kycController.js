const { createResponse, HttpStatusCode, ResponseStatus } = require('../../utils/apiResponses');
const logger = require('../../utils/logger');
const smileIdentityCore = require("smile-identity-core");
const Signature = smileIdentityCore.Signature;
require('dotenv').config();
const axios = require('axios');
const AuthServices = require('../auth/authService');

class KYCController {
    static async kyc(req, res) {
        const { country, id_type, id_number, first_name, last_name, dateOfBirth, gender, phone_number } = req.body;
        const user = req.user;
        const connection = new Signature(process.env.SMILE_ID_PARTNER_ID, process.env.SMILE_ID_API_KEY);
        const date = new Date();
        const generated_signature = connection.generate_signature(date.toISOString());

        const dataBody = {
            "source_sdk": "rest_api",
            "source_sdk_version": "2.0.0",
            "partner_id": process.env.SMILE_ID_PARTNER_ID,
            "timestamp": date.toISOString(),
            "signature": generated_signature.signature,
            "country": country,
            "id_type": id_type,
            "id_number": id_number,
            "callback_url": 'https://kyc/callback',
            "first_name": first_name,
            "last_name": last_name,
            "dob": dateOfBirth,
            "gender": gender,
            "phone_number": phone_number,
            "partner_params": {
                "job_id": date.toISOString(),
                "user_id": user.Id
            }
        };

        axios.post(`${process.env.SMILE_ID_URL}`, dataBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if(!response.data.success){
                    const response = { message: "KYC Failed" }
                    return createResponse(
                        res,
                        HttpStatusCode.StatusOk,
                        ResponseStatus.Success,
                        response
                    ) 
                }
                let response = { 
                    data: response.data,
                    message: "KYC Success"
                }

                return createResponse(
                    res,
                    HttpStatusCode.StatusOk,
                    ResponseStatus.Success,
                    response
                )
            })
            .catch((error) => {
                logger.error('KYC error:', error);
                const response = {
                    message: "Failed to complete kyc verification:" + error
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusBadRequest,
                    ResponseStatus.Failure,
                    response
                )
            });
    };

    static async callback(req, res) {
        const { data } = req.body

        try {
            const user = await AuthServices.findUserByPk(data.PartnerParams.user_id);
            if (!user) {
                logger.warn('User does not exist');
                const response = {
                    message: "User doesn't exist"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusUnauthorized,
                    ResponseStatus.Failure,
                    response
                )
            }

            if (data.ResultCode !== ("1020" || "1021")) {
                const response = {
                    message: "KYC Verification failed"
                }
                return createResponse(
                    res,
                    HttpStatusCode.StatusNotFound,
                    ResponseStatus.Failure,
                    response
                )
            }
            user.isVerified = true;
            await user.save();

            const response = {
                data: data,
                message: "KYC Verification successful"
            }
            return createResponse(
                res,
                HttpStatusCode.StatusOk,
                ResponseStatus.Success,
                response
            )
        }
        catch (error) {
            logger.error('KYC verification callback error:', error);
            const response = {
                message: "Failed to complete kyc callback:" + error
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
module.exports = KYCController;
