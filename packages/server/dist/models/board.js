"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const sequelize_1 = require("sequelize");
const modelEx_1 = require("./modelEx");
// export default (sequelize, DataTypes) => {
//   const Board = sequelize.define("board", {
//     name: DataTypes.STRING,
//   });
//   Board.associate = (models) => {
//     // 1 to many with board
//     Board.hasMany(models.Suggestion, {
//       foreignKey: "boardId",
//     });
//   };
//   return Board;
// };
// 'suggestions' is excluded as it's not an attribute, it's an association.
class Board extends modelEx_1.ModelEx {
    static initialize(sequelize) {
        Board.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            freezeTableName: true,
            tableName: "boards",
            sequelize,
        });
    }
    static associate(models) {
        // 1 to many with board
        Board.hasMany(models.Suggestion, {
            foreignKey: "boardId",
        });
    }
}
exports.Board = Board;
//# sourceMappingURL=board.js.map