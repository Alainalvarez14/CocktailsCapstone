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
        ingredients: 'mint, rum, sprite',
        isAlcoholic: true,
        category: 'aCategory',
        image: 'image.img',
        glassType: 'highball glass',
        instructions: 'do it right',
        measurements: '1 tsp mint, 1 cup rum, 2 cups sprite',
      },
      {
        creatorId: 2,
        name: 'Rum and coke',
        ingredients: 'coke, rum, lime',
        isAlcoholic: true,
        category: 'bCategory',
        image: 'image.imggg',
        glassType: 'highball glass',
        instructions: 'do it right',
        measurements: '1 tsp lime, 1 cup rum, 2 cups coke'
      },
      {
        creatorId: 3,
        name: 'Virgin pina colada',
        ingredients: 'pina colada mix, ice',
        isAlcoholic: false,
        category: 'cCategory',
        image: 'virgin.img',
        glassType: 'highball glass',
        instructions: 'do it right',
        measurements: '1 cup ice, 2 cups pina colada mix'
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
      name: { [Op.in]: ['Mojito', 'Rum and coke', 'Virgin pina colada'] }
      // name: { [Op.in]: ['Mojito'] }
    }, {});
  }
};
