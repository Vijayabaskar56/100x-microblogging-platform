"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "FollowActions",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        followerId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          foreignkey: true,
          references: {
            model: "Users",
            key: "id",
          },
        },
        followedId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          foreignkey: true,
          references: {
            model: "Users",
            key: "id",
          },
        },
        followedAt: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ["followerId", "followedId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FollowActions");
  },
};
