'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KYCs', {
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
      PhoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Country: {
        type: DataTypes.STRING(2),
        defaultValue: "NG",
        allowNull: false,
      },
      Gender: {
        type: DataTypes.ENUM("F", "M"),
        allowNull: false,
      },
      IdType: {
        type: DataTypes.ENUM("BVN", "NIN_V2", "PASSPORT", "NATIONAL_ID", "VOTER_ID"),
        defaultValue: "BVN",
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
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KYCs');
  }
};