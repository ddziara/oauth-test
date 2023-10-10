"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suggestion = void 0;
const sequelize_1 = require("sequelize");
const modelEx_1 = require("./modelEx");
// export default (sequelize, DataTypes) => {
//   const Suggestion = sequelize.define("suggestion", {
//     text: DataTypes.STRING,
//   });
//   return Suggestion;
// };
class Suggestion extends modelEx_1.ModelEx {
    static initialize(sequelize) {
        Suggestion.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            text: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            freezeTableName: true,
            tableName: "suggestions",
            sequelize,
        });
    }
    static associate(models) {
    }
}
exports.Suggestion = Suggestion;
//# sourceMappingURL=suggestion.js.map