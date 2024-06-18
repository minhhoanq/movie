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
                type: Sequelize.STRING,
                allowNull: false,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            dob: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            roleId: {
                type: Sequelize.INTEGER,
                defaultValue: 3,
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            isVerify: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            passwordChangedAt: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            passwordResetToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            passwordResetExpires: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            deletedAt: {
                allowNull: true,
                type: "TIMESTAMP",
            },
            createdAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
