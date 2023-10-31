'use strict';
const {hashPassword, comparePassword} = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Bookmark, {foreignKey: 'CustomerId'})
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args : true,
        msg : "Email already registered"
      },
      validate: {
        notNull: {
          msg : "Email is required"
        },
        notEmpty: {
          msg : "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "Password is required"
        },
        notEmpty: {
          msg : "Password is required"
        },
        min:{
          args: 5,
          msg: "minimum password length is 5 character"
        }
      }
    },
    role: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
        user.role = "customer";
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};