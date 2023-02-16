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
     *
     */
    static associate(models) {
      Cocktail.hasMany(models.Review, { onDelete: 'CASCADE', foreignKey: 'cocktailId' });
      Cocktail.belongsToMany(models.Collections, { through: models.CocktailCollectionsJoin, foreignKey: 'cocktailId' });
    }
  }
  Cocktail.init({
    creatorId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    isAlcoholic: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    image: DataTypes.TEXT,
    glassType: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    measurements: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Cocktail',
  });
  return Cocktail;
};
