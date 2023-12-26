"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Likes.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "likes",
      });

      Likes.belongsTo(models.User, {
        foreignKey: "likedBy",
        as: "user",
      });
    }
    static async countLikesForPost(postId) {
      return await this.count({
        where: {
          postId: postId,
        },
      });
    }
  }
  Likes.init(
    {
      postId: DataTypes.BIGINT,
      likedBy: DataTypes.BIGINT,
      likedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
