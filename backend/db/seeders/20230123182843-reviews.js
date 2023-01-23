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
    return queryInterface.bulkInsert('Reviews', [
      {
        review: 'efkjbdskjlvbdskvbdsvb kwjerbvekrbverov ebvoaerovervreovreo',
        stars: 1,
        userId: 1,
        cocktailId: 1
      },
      {
        review: 'berkherkviue eijrhvbeiruiuv dfveaon efouvhreiohvoeirhahvioehaiopeopiaeopvaievpeaivpearpvipjevpo',
        stars: 4,
        userId: 2,
        cocktailId: 2
      },
      {
        review: 'reghjrebkjrebuirebiouveroqvnoiernoveqriuvbor eofuvhoueqrnvioneroivneorinve  o3qihvnoirvnrniovnqprenqpvrqnvoqmnpoqo',
        stars: 5,
        userId: 3,
        cocktailId: 3
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
    return queryInterface.bulkDelete('Reviews', {}, {});
  }
};
