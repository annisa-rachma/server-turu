'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataLodging = JSON.parse(fs.readFileSync('./data/lodging.json', 'utf-8')).map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.status = 'Active'
      return el
    })
     await queryInterface.bulkInsert('Lodgings', dataLodging);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lodgings', null, {});
  }
};
