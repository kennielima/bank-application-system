module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        FirstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING(50),
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
        },
        AccountNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        Balance: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: true,
        },
        AccountType: {
            type: DataTypes.ENUM('savings', 'current'),
            defaultValue: 'savings',
            allowNull: true,
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CustomerCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Integration: {
            type: DataTypes.DECIMAL(15),
            allowNull: false,
        },
        CustomerId: {
            type: DataTypes.DECIMAL(15),
            allowNull: false,
        },
        // AccessToken: {
        //     type: DataTypes.JSON,
        //     allowNull: true,
        // },
        UserId: {
            type: DataTypes.UUID,
            allowNull: false,
            // references: {
            //     model: 'User',
            //     key: 'Id'
            // }
        },
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