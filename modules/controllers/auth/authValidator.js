const { body, validationResult } = require("express-validator");

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
            body('otp').isNumeric().notEmpty().withMessage('Please input OTP'),
        ]
    }
    static handleValidationErrors(req, res, next) {
        console.log('error Validator starting');

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next(); 
        }
        console.log('failed to validate:', errors);
        return res.status(400).json({ errors: errors.array() });
    }
}

module.exports = authValidator;