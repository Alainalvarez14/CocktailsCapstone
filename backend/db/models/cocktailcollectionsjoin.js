'use strict';
// import Cocktail from "./cocktail"
// import Collections from "./collections"

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CocktailCollectionsJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Cocktail.belongsToMany(models.Collections, { through: CocktailCollectionsJoin });
      models.Collections.belongsToMany(models.Cocktail, { through: CocktailCollectionsJoin });
    }
  }
  CocktailCollectionsJoin.init({
    cocktailId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CocktailCollectionsJoin',
  });
  return CocktailCollectionsJoin;
};
