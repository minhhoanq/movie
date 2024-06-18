"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Sessions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            clientAgent: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            clientIp: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            refreshToken: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isBlock: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            expiredAt: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable("Sessions");
    },
};
