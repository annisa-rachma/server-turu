"use strict";
const {hashPassword, comparePassword} = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customerData = [
      {
        email: "cust1@mail.com",
        password : hashPassword('123456'),
        role : 'customer',
        imageUrl : 'https://source.boringavatars.com/beam/120/?square',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        email: "cust2@mail.com",
        password : hashPassword('123456'),
        role : 'customer',
        imageUrl : 'https://source.boringavatars.com/beam/120/?square',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ]
    const dataBookmark = [
      {
        LodgingId : 1,
        CustomerId : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        LodgingId : 2,
        CustomerId : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        LodgingId : 3,
        CustomerId : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ]
    await queryInterface.bulkInsert("Customers", customerData);
    await queryInterface.bulkInsert("Bookmarks", dataBookmark);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
    await queryInterface.bulkDelete('Bookmarks', null, {});

  },
};
