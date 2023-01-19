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
    return queryInterface.bulkInsert('Cocktails', [
      {
        creatorId: 1,
        name: 'Mojito',
        ingredients: 'rum, soda',
        isAlcoholic: true,
        category: 'myCategory',
        image: 'image.img',
        glassType: 'highball',
        instructions: 'do it right!',
        measurements: '1 cup!',
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Cocktails', {
      // name: { [Op.in]: ['Mojito', 'Rum and coke', 'Virgin pina colada'] }
      name: { [Op.in]: ['Mojito'] }
    }, {});
  }
};
