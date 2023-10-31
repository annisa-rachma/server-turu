'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataType = JSON.parse(fs.readFileSync('./data/type.json', 'utf-8')).map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
     await queryInterface.bulkInsert('Types', dataType);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  }
};
