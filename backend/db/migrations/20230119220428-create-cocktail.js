'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cocktails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creatorId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.STRING
      },
      isAlcoholic: {
        type: Sequelize.BOOLEAN
      },
      category: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      glassType: {
        type: Sequelize.STRING
      },
      instructions: {
        type: Sequelize.STRING
      },
      measurements: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cocktails', options);
  }
};
