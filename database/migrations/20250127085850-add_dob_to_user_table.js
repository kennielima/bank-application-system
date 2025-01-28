'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addColumn('Users', 'DateOfBirth', {
        type: Sequelize.UUID,
        allowNull: false
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.removeColumn('Users', 'DateOfBirth')
    ])
  }
};
