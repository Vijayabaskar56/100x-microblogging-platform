"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Post.belongsTo(models.Post, {
        foreignKey: "repostId",
        as: "repost",
      });

      Post.hasMany(models.Post, {
        foreignKey: "repostId",
        as: "reposts",
      });

      Post.hasMany(models.Post, {
        foreignKey: "replayToId",
        as: "comments",
      });

      Post.hasMany(models.Post, {
        foreignKey: "replayToId",
        as: "comment",
      });

      Post.hasMany(models.Likes, {
        foreignKey: "postId",
        as: "likes",
      });
    }
  }
  Post.init(
    {
      content: DataTypes.TEXT,
      postedAt: DataTypes.DATE,
      userId: DataTypes.BIGINT,
      repostId: DataTypes.BIGINT,
      likeCount: DataTypes.BIGINT,
      replayToId: DataTypes.BIGINT,
      replayedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
