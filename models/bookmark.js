'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      Bookmark.belongsTo(models.Customer, {foreignKey: 'CustomerId'})
      Bookmark.belongsTo(models.Lodging, {foreignKey: 'LodgingId'})
    }
  }
  Bookmark.init({
    LodgingId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};