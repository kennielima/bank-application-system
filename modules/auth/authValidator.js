const { body, validationResult } = require("express-validator");
const logger = require('../../utils/logger');

class authValidator {
    static validateSignupForm() {
        return [
            body('FirstName').isString().notEmpty().withMessage('Please input first name'),
            body('LastName').isString().notEmpty().withMessage('Please input last name'),
            body('Email').isEmail().notEmpty().contains('@').withMessage('Email is required'),
            body('Password').isStrongPassword({
                minLength: 8,
                minNumbers: 1,
            }).withMessage('Password is required'),
            body('PhoneNumber').isNumeric().withMessage('PhoneNumber is required'),
            body('DateOfBirth').isDate().withMessage('Date of Birth is required'),
        ]
    }
    static validateLoginForm() {
        return [
            body('Email').isEmail().notEmpty().contains('@').withMessage('Email is required'),
            body('Password').notEmpty().withMessage('Password is required'),
        ]
    }
    static validateOTP() {
        return [
            body('OTP').isNumeric().notEmpty().withMessage('Please input OTP'),
        ]
    }
    static validateNewPassword() {
        return [
            body('newPassword').isStrongPassword({
                minLength: 8,
                minNumbers: 1,
            }).withMessage('Enter your new Password'),]
    }
    static handleValidationErrors(req, res, next) {
        logger.error('error Validator starting');

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        logger.error('failed to validate:', errors);
        return res.status(400).json({ errors: errors.array() });
    }
}

module.exports = authValidator;