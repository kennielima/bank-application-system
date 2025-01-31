'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KYC extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KYC.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'User',
        targetKey: 'Id'
    })
  }
  }
  KYC.init({
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.ENUM("F", "M"),
      allowNull: false,
    },
    Country: {
      type: DataTypes.STRING(2),
      defaultValue: "NG",
      allowNull: false,
    },
    IdType: {
      type: DataTypes.ENUM("BVN", "NIN_V2", "PASSPORT", "NATIONAL_ID", "VOTER_ID"),
      allowNull: false,
    },
    IdNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    IssueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ExpiryDate:  {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DocumentUrl:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'KYC'
  });
  return KYC;
};



