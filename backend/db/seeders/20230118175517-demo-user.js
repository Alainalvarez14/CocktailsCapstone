'use strict';
const bcrypt = require("bcryptjs");

// /** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';

    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Alain',
        lastName: 'Alvarez',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'AlainA',
        lastName: 'AlvarezA',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'AlainB',
        lastName: 'AlvarezB',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // const Op = Sequelize.Op;
    options.tableName = 'Users';
    // return queryInterface.bulkDelete('Users', {
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, options);
    return queryInterface.bulkDelete(options);
  }
};
