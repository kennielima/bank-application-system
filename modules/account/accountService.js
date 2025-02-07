const Bank = require("flutterwave-node-v3/lib/rave.banks");
const db = require("../../database/models");

class AccountService {
    static async createAccount(UserId, id, account_reference, bank_name, bank_code, account_status, created_at, country, account_name, email, mobilenumber) {
        return await db.Account.create({
            UserId,
            Id: id,
            AccountNumber: account_reference,
            Bank: bank_name,
            BankCode: bank_code,
            AccountStatus: account_status,
            DateCreated: created_at,
            Country: country,
            AccountName: account_name,
            Email: email,
            PhoneNumber: mobilenumber,
            // Currency: currency
        })
    }

    static async updateAccountBalance(balance, currency, account_number) {
        return await db.Account.update({
            Balance: balance,
            Currency: currency
        }, {
            where: {
                AccountNumber: account_number,
            }
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
