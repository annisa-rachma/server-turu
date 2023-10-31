'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    static associate(models) {
      Lodging.belongsTo(models.Type, {foreignKey: "typeId"})
      Lodging.belongsTo(models.User, {foreignKey: "authorId"})
    }
  }
  Lodging.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Name is required"
        },
        notEmpty: {
          msg : "Name is required"
        },  
      }
    },
    facility: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Facility is required"
        },
        notEmpty: {
          msg : "Facility is required"
        },  
      }
    },
    roomCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Room Capacity is required"
        },
        notEmpty: {
          msg : "Room Capacity is required"
        },  
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Image is required"
        },
        notEmpty: {
          msg : "Image is required"
        },
        isUrl: {
          args: true,
          msg: "Invalid url format"
        }
      }
    },
    authorId: DataTypes.INTEGER,
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Location is required"
        },
        notEmpty: {
          msg : "Location is required"
        },  
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Price is required"
        },
        notEmpty: {
          msg : "Price is required"
        },  
        min: {
          args : 10,
          msg: "Minimum price is 10"
        }
      }
    },
    typeId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};