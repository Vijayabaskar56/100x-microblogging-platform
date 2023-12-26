"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(20),
        unique: true,
        validate: {
          len: [0, 15],
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
      },
      displayName: {
        type: Sequelize.STRING(50),
        unique: true,
        validate: {
          len: [0, 50],
        },
      },
      bio: {
        type: Sequelize.TEXT,
        validate: {
          len: [0, 250],
        },
      },
      bioShort: {
        type: Sequelize.TEXT,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: "1990-01-01",
          is13YearOld(value) {
            if (new Date().getFullYear() - new Date(value).getFullYear() < 13) {
              throw new Error("Must be at least 13 year Old");
            }
          },
        },
      },
      website: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
        },
      },
      location: {
        type: Sequelize.STRING,
      },
      profilePicUrl: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
        },
      },
      headerPicUrl: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
        },
      },
      emailVerifiedAt: {
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      authToken: {
        type: Sequelize.STRING(250),
      },
      authSession: {
        type: Sequelize.STRING,
      },
      authSessionExpiry: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
