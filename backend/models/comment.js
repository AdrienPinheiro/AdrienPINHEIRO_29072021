'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: 'user_id'
        },
        onDelete: 'CASCADE'
        });
      models.Comment.belongsTo(models.Topic, {
        foreignKey: {
          allowNull: false,
          name: 'post_id'
        },
        onDelete: 'CASCADE'      
        });
    }
  };
  Comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    commentary: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};