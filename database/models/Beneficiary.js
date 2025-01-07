module.exports = (sequelize, DataTypes) => {
    const Beneficiary = sequelize.define(
        'Beneficiary', {
        BeneficiaryId: {
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
        }
    },
    {
        timestamps: true,
    }
    )
    Beneficiary.associate = (models) => {
        Beneficiary.belongsTo(models.Account, {
            foreignKey: 'AccountId',
            as: 'Account'
        })
    }
    return Beneficiary;
}