module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account', {
        Id: {
            type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        AccountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        Bank: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        BankCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        Balance: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
        },
        AccountType: {
            type: DataTypes.ENUM('savings', 'current'),
            defaultValue: 'savings',
            allowNull: false,
        },
        AccountStatus: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
            allowNull: false,
        },
        UserId: {
            type: DataTypes.UUID,
            allowNull: false,
            // references: {
            //     model: 'User',
            //     key: 'Id'
            // }
        },
        DateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AccountName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        PhoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        }
    },
        {
            timestamps: true,
        }
    )

    Account.associate = (models) => {
        // Account.hasOne(models.User, {
        //     foreignKey: 'AccountId', //acc ID IN USER MODEL
        //     as: 'User',
        //     sourceKey: 'Id' // accID IN ACCOUNTS
        // })
        Account.belongsTo(models.User, {
            foreignKey: 'UserId', //USER ID IN acc
            as: 'User',
            targetKey: 'Id' // USER ID IN USER
        })
        Account.hasMany(models.Transaction, {
            foreignKey: 'AccountId',
            as: 'Transactions',
            sourceKey: 'Id'
        })
        Account.hasOne(models.Card, {
            foreignKey: 'AccountId',
            as: 'Card',
            sourceKey: 'Id'
        })
        Account.hasMany(models.Beneficiary, {
            foreignKey: 'AccountId',
            as: 'Beneficiaries',
            sourceKey: 'Id'
        })
    }
    return Account;
}