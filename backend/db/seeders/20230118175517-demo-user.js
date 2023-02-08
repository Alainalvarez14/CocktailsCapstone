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
        profileImage: 'https://www.nicepng.com/png/detail/53-530608_al-pacino-portrait-scarface-tony-montana-domestic-poster.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'AlainA',
        lastName: 'AlvarezA',
        profileImage: 'https://i.pinimg.com/originals/ac/2e/49/ac2e4968e9974ef54359c34533f6c06c.jpg',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'AlainB',
        lastName: 'AlvarezB',
        profileImage: 'https://media.vanityfair.com/photos/615dcfaf3aae1b3c1f41b920/9:16/w_746,h_1327,c_limit/the-godfather-site-story.jpg',
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
