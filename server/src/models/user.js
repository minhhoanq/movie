"use strict";
const crypto = require("crypto");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        createPasswordChangedToken() {
            const resetTokenPassword = crypto.randomBytes(32).toString("hex");
            this.passwordResetToken = crypto
                .createHash("sha256")
                .update(resetTokenPassword)
                .digest("hex");
            this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
            return resetTokenPassword;
        }

        static associate(models) {
            // define association here
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                targetKey: "id",
                as: "userRole",
            });
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.INTEGER,
            avatar: DataTypes.STRING,
            dob: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
            isVerify: DataTypes.BOOLEAN,
            passwordChangedAt: DataTypes.STRING,
            passwordResetToken: DataTypes.STRING,
            passwordResetExpires: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
