'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collections.belongsToMany(models.Cocktail, { through: 'CocktailCollectionsJoin' });
      // Collections.hasMany(models.Cocktail);
      // Collections.belongsToMany();
    }
  }
  Collections.init({
    name: DataTypes.STRING,
    cocktail: DataTypes.STRING,
    cocktailId: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collections',
  });
  return Collections;
};
