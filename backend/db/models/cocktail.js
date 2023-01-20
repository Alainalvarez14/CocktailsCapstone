'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cocktail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cocktail.init({
    creatorId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    isAlcoholic: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    glassType: DataTypes.STRING,
    instructions: DataTypes.STRING,
    measurements: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cocktail',
  });
  return Cocktail;
};