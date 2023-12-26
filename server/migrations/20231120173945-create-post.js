"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      userId: {
        type: Sequelize.BIGINT,
        foreignKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      content: {
        type: Sequelize.TEXT,
        validate: {
          len: [0, 280],
        },
      },
      postedAt: {
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      repostId: {
        type: Sequelize.BIGINT,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      likeCount: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      replayToId: {
        type: Sequelize.BIGINT,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      replayedAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
