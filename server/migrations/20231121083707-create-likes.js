"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Likes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        postId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: "Posts",
            key: "id",
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
          },
        },
        likedBy: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        likedAt: {
          type: Sequelize.DATE,
          validate: {
            isDate: true,
          },
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
          action_unique: {
            fields: ["postId", "likedBy"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Likes");
  },
};
