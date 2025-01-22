module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'Transaction', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Reference: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        TransactionType: {
            type: DataTypes.ENUM('billPayment', 'deposit', 'withdrawal'),
            allowNull: false,
        },
        Status: {
            type: DataTypes.ENUM('pending', 'complete', 'failed'),
            defaultValue: 'pending',
            allowNull: false,
        },
        Amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        AccountId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
    )
    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Account, {
            foreignKey: 'AccountId',
            as: 'Sender',
            targetKey: 'Id'
        })
        Transaction.hasOne(models.Bill, {
            foreignKey: 'TransactionId',
            as: 'Bill',
            sourceKey: 'Id'
        })
    }
    return Transaction;
}