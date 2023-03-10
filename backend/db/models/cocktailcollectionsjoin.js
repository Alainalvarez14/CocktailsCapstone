'use strict';
// import Cocktail from "./cocktail"
// import Collections from "./collections"
// const db = require('./index.js');
const db = require('../models/index')

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
      // models.CocktailCollectionsJoin.belongsTo(models.Collections, { foreignKey: 'collectionId' });
      // models.CocktailCollectionsJoin.belongsTo(models.Cocktail, { foreignKey: 'cocktailId' });
    }
  }

  CocktailCollectionsJoin.init({
    cocktailId: {
      type: DataTypes.INTEGER,
      unique: true
      // references: {
      //   model: db.Cocktail,
      //   key: 'id'
      // }
    },
    collectionId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: db.Collections,
      //   key: 'id'
      // }
    },
    // creatorId: DataTypes.INTEGER,
    // name: DataTypes.STRING,
    // ingredients: DataTypes.STRING,
    // isAlcoholic: DataTypes.BOOLEAN,
    // category: DataTypes.STRING,
    // image: DataTypes.STRING,
    // glassType: DataTypes.STRING,
    // instructions: DataTypes.STRING,
    // measurements: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CocktailCollectionsJoin',
  });
  return CocktailCollectionsJoin;
};
