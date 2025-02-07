const db = require("../../database/models");

class AccountService {
    static async createAccount(UserId, account_number, account_status, created_at, expiry_date, bank_name, amount) {
        return await db.Account.create({
            UserId,
            AccountNumber: account_number,
            AccountStatus: account_status,
            DateCreated: created_at,
            ExpiryDate: expiry_date,
            Bank: bank_name,
            Balance: amount
        })
    }
    static async fetchUserAccountsFromDB(userId) {
        return await db.Account.findAll({
            where: {
                UserId: userId
            },
            order: [
                ['createdAt', 'DESC'],
            ]
        })
    }
    static async fetchAccountDetails(userId, account_number) {
        return await db.Account.findOne({
            where: {
                UserId: userId,
                AccountNumber: account_number
            },
        })
    }
}

module.exports = AccountService;
