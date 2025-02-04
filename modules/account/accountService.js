const db = require("../../database/models");

class AccountService {
    static async createCustomer (UserId, first_name, last_name, phone, email, customer_code, customer_id, integration, bank) {
        return await db.Account.create({
            UserId,
            FirstName: first_name,
            LastName: last_name,
            PhoneNumber: phone,
            Email: email,
            CustomerCode: customer_code,
            CustomerId: customer_id,
            Integration: integration
        })
    }
    static async updateCustomer (bank, customer_id) {
        return await db.Account.update({
            Bank: bank,
        }, {
            where: { CustomerCode: customer_id}
        })
    }
    static async findExistingCustomer (customer_id) {
        return await db.Account.findOne({
            where: { Id: customer_id }
        })
    }
}

module.exports = AccountService;