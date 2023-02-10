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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        review: 'efkjbdskjlvbdskvbdsvb kwjerbvekrbverov ebvoaerovervreovreo',
        stars: 1,
        userId: 2,
        cocktailId: 1
      },
      {
        review: 'berkherkviue eijrhvbeiruiuv dfveaon efouvhreiohvoeirhahvioehaiopeopiaeopvaievpeaivpearpvipjevpo',
        stars: 4,
        userId: 3,
        cocktailId: 2
      },
      {
        review: 'reghjrebkjrebuirebiouveroqvnoiernoveqriuvbor eofuvhoueqrnvioneroivneorinve  o3qihvnoirvnrniovnqprenqpvrqnvoqmnpoqo',
        stars: 5,
        userId: 1,
        cocktailId: 3
      }
    ]);
  },

  async down(queryInterface, Sequelize) {

    // return queryInterface.bulkDelete('Reviews', {}, {});
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options);
  }
};
