"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FollowAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FollowAction.belongsTo(models.User, {
        foreignKey: "followerId",
        as: "follower",
      });

      FollowAction.belongsTo(models.User, {
        foreignKey: "followedId",
        as: "following",
      });
    }
  }
  FollowAction.init(
    {
      followerId: DataTypes.BIGINT,
      followedId: DataTypes.BIGINT,
      followedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FollowAction",
    }
  );
  return FollowAction;
};
