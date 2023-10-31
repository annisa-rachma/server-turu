'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.hasMany(models.Lodging, {foreignKey: "typeId"})
    }
  }
  Type.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "type required"
        },
        notEmpty: {
          msg : "type required"
        },  
      }
    }
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};