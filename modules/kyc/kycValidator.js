const { body, validationResult } = require("express-validator");
const logger = require('../../utils/logger');

class KycValidator {
    static validateUserKycForm() {
        return [
            body('first_name').isString().notEmpty().withMessage('Please input first name'),
            body('last_name').isString().notEmpty().withMessage('Please input last name'),
            body('phone_number').isNumeric().withMessage('PhoneNumber is required'),
            body('dateOfBirth').isDate().withMessage('Date of Birth is required'),
            body('gender').isString().withMessage('Gender is required'),
            body('country').isString().withMessage('Country is required'),
            body('id_type').isString().withMessage('IdType is required'),
            body('id_number').isNumeric().withMessage('IdNumber is required'),
        ]
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

module.exports = KycValidator;