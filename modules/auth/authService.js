const db = require('../../database/models');
const { Op } = require('sequelize');

class AuthServices {
    static async findExistingUser(email) {
        return await db.User.findOne({
            where: { Email: email }
        })
    }

    static async createUser(FirstName, LastName, Email, PhoneNumber, Password) {
        return await db.User.create({
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Password,
        })
    }
    static async saveTokenWithDeviceInfo(AccessToken, deviceInfo, Email) {        
        return await db.User.update({
            AccessToken,
            deviceInfo,
            hasAccessToken: true
        }, {
            where: {
                Email
            }
        })
    }
    static async saveToken(AccessToken, Id) {        
        return await db.User.update({
            AccessToken,
            hasAccessToken: true
        }, {
            where: {
                Id
            }
        })
    }

    static async updateUserDetailswithOTP(OTP, OTPExpiry, Email) {
        return await db.User.update({
            OTP,
            OTPExpiry
        }, {
            where: {
                Email
            }
        })
    }

    static async findUserWithOTP(OTP, Email) {
        return await db.User.findOne({
            where: {
                Email,
                OTP,
                OTPExpiry: {
                    [Op.gt]: new Date()
                }
            }
        })
    }

    static async updateUserPassword(Email, hashedPassword) {
        return await db.User.update({
            OTP: null,
            OTPExpiry: null,
            Password: hashedPassword
        }, {
            where: {
                Email: Email
            }
        })
    }

    static async findUserByPk(Id) {
        return await db.User.findByPk(Id)
    }

    static async blockUser(Email) {
        return await db.User.update({
            isBlocked: true
        }, {
            where: {
                Email: Email
            }
        })
    }

    static async unblockUser(Email) {
        return await db.User.update({
            isBlocked: false
        }, {
            where: {
                Email: Email
            }
        })
    }


}
module.exports = AuthServices;