module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
        UserId: {
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
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        PhoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
    )
    User.associate = (models) => {
        User.hasMany(models.Account, {
            foreignKey: 'AccountId',
            as: 'Accounts',
            OnDelete: 'CASCADE',
            OnUpdate: 'CASCADE',
        })
    }
    return User;
}