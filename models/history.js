'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {

    }
  }
  History.init({
    lodgingName: DataTypes.STRING,
    description: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};