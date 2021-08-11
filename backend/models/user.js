'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Topic, {
          foreignKey: {
              name: 'user_id'
        }})
      models.User.hasMany(models.Comment, {
        foreignKey: {
            name: 'user_id'
      }})
    }
  };
  User.init({
    isAdmin: DataTypes.BOOLEAN,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};