'use strict';
const {hashPassword, comparePassword} = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Lodging, {foreignKey: "authorId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
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
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
          user.role = "admin"
        }
      },
      sequelize,
      modelName: 'User',
  });
  return User;
};