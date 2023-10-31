'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LodgingId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Lodgings',
          },
          key: 'id'
        },
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Customers',
          },
          key: 'id'
        },
        
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
    await queryInterface.dropTable('Bookmarks');
  }
};