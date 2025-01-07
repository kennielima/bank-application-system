module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'Transaction', {
        TransactionId: {
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
        }
    },
    {
        timestamps: true,
    }
    )
    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Account, {
            foreignKey: 'AccountId',
            as: 'Sender'
        })
        Transaction.hasMany(models.Bill, {
            foreignKey: 'TransactionId',
            as: 'Bills'
        })
    }
    return Transaction;
}