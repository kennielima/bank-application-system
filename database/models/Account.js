const Transaction = require("./Transaction");

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account', {
        AccountId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        AccountNumber: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        Balance: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
        },
        AccountType: {
            type: DataTypes.ENUM('savings', 'current'),
            defaultValue: 'savings',
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
    )
    Account.associate = (models) => {
        Account.belongsTo(models.User, {
            foreignKey: 'UserId',
            as: 'User'
        })
        Account.hasMany(models.Transaction, {
            foreignKey: 'AccountId',
            as: 'Transactions'
        })
        Account.hasOne(models.Card, {
            foreignKey: 'AccountId',
            as: 'Card'
        })
        Account.hasMany(models.Beneficiary, {
            foreignKey: 'AccountId',
            as: 'Beneficiaries'
        })
    }
    return Account;
}