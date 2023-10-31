'use strict';
const fs = require('fs')
const {hashPassword, comparePassword} = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataUser = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8')).map((el) => {
      el.password = hashPassword(el.password),
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
     await queryInterface.bulkInsert('Users', dataUser);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
