"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FbAuth = void 0;
const sequelize_1 = require("sequelize");
const modelEx_1 = require("./modelEx");
// export default (sequelize) => {
//   const FbAuth = sequelize.define("fb_auth", {
//     fb_id: DataTypes.STRING,
//     display_name: DataTypes.STRING,
//   });
//   FbAuth.associate = (models) => {
//     FbAuth.belongsTo(models.User, { foreignKey: "user_id" });
//   };
//   return FbAuth;
// };
class FbAuth extends modelEx_1.ModelEx {
    // timestamps!
    // createdAt can be undefined during creation
    // declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    // declare updatedAt: CreationOptional<Date>;
    static initialize(sequelize) {
        FbAuth.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            fb_id: {
                type: sequelize_1.DataTypes.STRING,
            },
            display_name: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            freezeTableName: true,
            tableName: "fbauths",
            sequelize,
        });
    }
    static associate(models) {
        // 1 to many with board
        FbAuth.belongsTo(models.User, {
            foreignKey: "user_id",
        });
    }
}
exports.FbAuth = FbAuth;
//# sourceMappingURL=fbAuth.js.map