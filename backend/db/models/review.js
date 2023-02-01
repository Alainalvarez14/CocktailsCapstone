'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Cocktail, { foreignKey: 'cocktailId' });
    }
  }
  Review.init({
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    cocktailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
