const db = require("../../database/models");

class KYCService {
    static async createKYCUser(userId, first_name, last_name, phone_number, dateOfBirth, country, gender, id_type, id_number) {
        return await db.KYC.create({
            UserId: userId,
            FirstName: first_name,
            LastName: last_name,
            PhoneNumber: phone_number,
            DateOfBirth: dateOfBirth,
            Country: country,
            Gender: gender,
            IdType: id_type,
            IdNumber: id_number,
        })
    }
    static async findUserByUserId(userId) {
        return await db.KYC.findOne({
            where: {
                UserId: userId
            }
        })
    }
    static async deleteKYCUser(id) {
        return await db.KYC.drop({
            where: { id }
        })
    }
    static async verifyUser(id) {
        return await db.KYC.update({
            isVerified: true
        }, {
            where: { id }
        })
    }
}

module.exports = KYCService