'use strict';

// /** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Collections';
    return queryInterface.bulkInsert(options, [
      {
        creatorId: 1,
        name: 'FridayNightDrinks',
      },
      {
        creatorId: 2,
        name: 'FavoriteWhiskeyDrinks',
      },
      {
        creatorId: 3,
        name: 'Top10SweetDrinks',
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Collections';
    return queryInterface.bulkDelete(options);
  }
};
