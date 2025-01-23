module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
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
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        OTP: {
            type: DataTypes.STRING(50),
        },
        OTPExpiry: {
            type: DataTypes.DATE,
        },
        AccessToken: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        Device: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hasAccessToken: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
        {
            timestamps: true,
            indexes: [
                {
                    name: "name-search",
                    fields: [ 'FirstName', 'LastName' ]
                }
            ]
        }
    )

    User.associate = (models) => {
        User.hasMany(models.Account, {
            foreignKey: 'UserId', //user ID IN acc MODEL
            as: 'Accounts',
            sourceKey: 'Id',// userid IN user
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }
    return User;
}