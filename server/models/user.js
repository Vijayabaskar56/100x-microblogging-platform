"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "post",
      });

      User.hasMany(models.Post, {
        foreignKey: "repostId",
        as: "repost",
      });

      User.hasMany(models.FollowAction, {
        foreignKey: "followerId",
        as: "follower",
      });

      User.hasMany(models.FollowAction, {
        foreignKey: "followedId",
        as: "following",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      displayName: DataTypes.STRING,
      bio: DataTypes.TEXT,
      dateOfBirth: DataTypes.DATE,
      website: DataTypes.STRING,
      location: DataTypes.STRING,
      profilePicUrl: DataTypes.STRING,
      headerPicUrl: DataTypes.STRING,
      emailVerifiedAt: DataTypes.DATE,
      authToken: DataTypes.STRING,
      authSession: DataTypes.STRING,
      authSessionExpiry: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
