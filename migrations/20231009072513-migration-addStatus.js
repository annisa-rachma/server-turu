'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Lodgings', 'status', Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Lodgings', 'status')
  }
};
