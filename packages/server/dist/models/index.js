"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const board_1 = require("./board");
const suggestion_1 = require("./suggestion");
const fbAuth_1 = require("./fbAuth");
const localAuth_1 = require("./localAuth");
const modelEx_1 = require("./modelEx");
const parseIntEx = (input) => {
    if (input !== undefined && input !== "") {
        return parseInt(input);
    }
    else {
        return undefined;
    }
};
const sequelize = new sequelize_1.Sequelize(process.env["DB_DATABASE"], process.env["DB_USERNAME"], process.env["DB_PASSWORD"], {
    host: process.env["DB_HOST"],
    port: parseIntEx(process.env["DB_PORT"]),
    dialect: "postgres",
});
const db /*: Record<string, any>*/ = {
    User: user_1.User,
    Board: board_1.Board,
    Suggestion: suggestion_1.Suggestion,
    FbAuth: fbAuth_1.FbAuth,
    LocalAuth: localAuth_1.LocalAuth,
    sequelize,
};
Object.keys(db).forEach((prop) => {
    const modelsProp = prop;
    if (typeof db[modelsProp] === "function") {
        if (db[modelsProp].prototype instanceof modelEx_1.ModelEx) {
            db[modelsProp].initialize(sequelize);
        }
    }
});
Object.keys(db).forEach((prop) => {
    const modelsProp = prop;
    if (typeof db[modelsProp] === "function") {
        if (db[modelsProp].prototype instanceof modelEx_1.ModelEx) {
            db[modelsProp].associate(db);
        }
    }
});
exports.default = db;
//# sourceMappingURL=index.js.map