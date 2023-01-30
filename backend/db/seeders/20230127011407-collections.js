'use strict';

// /** @type {import('sequelize-cli').Migration} */
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
    return queryInterface.bulkInsert('Collections', [
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
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};