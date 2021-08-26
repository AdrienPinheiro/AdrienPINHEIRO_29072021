'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Topic.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id'
        },
        onDelete: 'CASCADE'
      });
      models.Topic.hasMany(models.Comment, {
        foreignKey: {
          name: 'post_id'
      }});
    }
  };
  Topic.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};