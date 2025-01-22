module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define(
        'Bill', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        BillType: {
            type: DataTypes.ENUM('airtime', 'data', 'tv', 'electricity'),
            allowNull: false,
        },
        Status: {
            type: DataTypes.ENUM('pending', 'complete', 'failed'),
            defaultValue: 'pending',
            allowNull: false,
        },
        Provider: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Plan: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        ServiceNumber: {
            type: DataTypes.STRING(255),
        },
        TransactionId: {
            type: DataTypes.UUID,
        }
    },
    {
        timestamps: true,
    }
    )
    Bill.associate = (models) => {
        Bill.belongsTo(models.Transaction, {
            foreignKey: 'TransactionId',
            as: 'Transaction',
            targetKey: 'Id'
        })
    }
    return Bill;
}