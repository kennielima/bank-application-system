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
            Password
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

    // static async clearUserOTP(Email) {
    //     return await db.User.update({
    //         OTP: null,
    //         OTPExpiry: null
    //     }, {
    //         where: {
    //             Email
    //         }
    //     })
    // }

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

    static async findUserByPk(UserId) {
        return await db.User.findByPk(UserId)
    }
}
module.exports = AuthServices;