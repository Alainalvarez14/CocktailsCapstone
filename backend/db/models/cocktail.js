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
      Cocktail.hasMany(models.Review, { onDelete: 'CASCADE', foreignKey: 'cocktailId' });
      Cocktail.belongsToMany(models.Collections, { through: models.CocktailCollectionsJoin });
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
