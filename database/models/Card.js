module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define(
        'Card', {
        Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Cvv: {
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        CardType: {
            type: DataTypes.ENUM('verve', 'mastercard', 'virtual', 'visa'),
            allowNull: false,
        },
        CardNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        ExpiryDate: {
            type: DataTypes.DATE,
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
    Card.associate = (models) => {
        Card.belongsTo(models.Account, {
            foreignKey: 'AccountId',
            as: 'Account',
            targetKey: 'Id'
        })
    }
    return Card;
}