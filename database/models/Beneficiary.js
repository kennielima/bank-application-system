module.exports = (sequelize, DataTypes) => {
    const Beneficiary = sequelize.define(
        'Beneficiary', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        BankName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        AccountName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        AccountNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        AccountId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },
    {
        timestamps: true,
    }
    )
    Beneficiary.associate = (models) => {
        Beneficiary.belongsTo(models.Account, {
            foreignKey: 'AccountId',
            as: 'Account',
            targetKey: 'Id'
        })
    }
    return Beneficiary;
}