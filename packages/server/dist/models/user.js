"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const modelEx_1 = require("./modelEx");
// export default (sequelize, DataTypes) => {
//   const User = sequelize.define("User", {
//     username: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     isAdmin: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   });
//   User.associate = (models) => {
//     // 1 to many with board
//     User.hasMany(models.Board, {
//       foreignKey: "owner",
//     });
//     // 1 to many with suggestion
//     User.hasMany(models.Suggestion, {
//       foreignKey: "creatorId",
//     });
//   };
//   return User;
// };
class User extends modelEx_1.ModelEx {
    // createdAt can be undefined during creation
    //  declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    //  declare updatedAt: CreationOptional<Date>;
    static initialize(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: sequelize_1.DataTypes.STRING
            },
            isAdmin: {
                type: sequelize_1.DataTypes.BOOLEAN
            }
        }, {
            freezeTableName: true,
            tableName: "users",
            sequelize,
        });
    }
    static associate(models) {
        // 1 to many with board
        User.hasMany(models.Board, {
            foreignKey: "ownerId",
        });
        // 1 to many with suggestion
        User.hasMany(models.Suggestion, {
            foreignKey: "creatorId",
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map