"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAuth = void 0;
const sequelize_1 = require("sequelize");
const modelEx_1 = require("./modelEx");
// export default (sequelize, DataTypes) => {
//   const LocalAuth = sequelize.define("local_auth", {
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     password: DataTypes.STRING,
//   });
//   LocalAuth.associate = (models) => {
//     LocalAuth.belongsTo(models.User, { foreignKey: "user_id" }); // this is "snake case"
//   };
//   return LocalAuth;
// };
class LocalAuth extends modelEx_1.ModelEx {
    // timestamps!
    // createdAt can be undefined during creation
    // declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    // declare updatedAt: CreationOptional<Date>;
    static initialize(sequelize) {
        LocalAuth.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            freezeTableName: true,
            tableName: "localauths",
            sequelize,
        });
    }
    static associate(models) {
        // 1 to many with board
        LocalAuth.belongsTo(models.User, {
            foreignKey: "user_id",
        });
    }
}
exports.LocalAuth = LocalAuth;
//# sourceMappingURL=localAuth.js.map