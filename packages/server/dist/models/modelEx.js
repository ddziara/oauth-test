"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelEx = void 0;
const sequelize_1 = require("sequelize");
class ModelEx extends sequelize_1.Model {
    static initialize(sequelize) {
        throw new Error("initialize() must be implemented");
    }
    static associate(models) {
        throw new Error("associate() must be implemented");
    }
}
exports.ModelEx = ModelEx;
//# sourceMappingURL=modelEx.js.map