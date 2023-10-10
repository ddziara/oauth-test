import { Sequelize } from "sequelize";
import { User } from "./user";
import { Board } from "./board";
import { Suggestion } from "./suggestion";
import { FbAuth } from "./fbAuth";
import { LocalAuth } from "./localAuth";
import { ModelEx } from "./modelEx";

const parseIntEx = (input: string | undefined): number | undefined => {
  if (input !== undefined && input !== "") {
    return parseInt(input);
  } else {
    return undefined;
  }
};

const sequelize = new Sequelize(
  process.env["DB_DATABASE"]!,
  process.env["DB_USERNAME"]!,
  process.env["DB_PASSWORD"],
  {
    host: process.env["DB_HOST"],
    port: parseIntEx(process.env["DB_PORT"]),
    dialect: "postgres",
  }
);

const db /*: Record<string, any>*/ = {
  User,
  Board,
  Suggestion,
  FbAuth,
  LocalAuth,
  sequelize,
};

export type ModelsType = typeof db;

Object.keys(db).forEach((prop) => {
  const modelsProp = prop as keyof typeof db;

  if (typeof db[modelsProp] === "function") {
    if ((db[modelsProp] as Function).prototype instanceof ModelEx) {
      (db[modelsProp] as typeof ModelEx).initialize(sequelize);
    }
  }
});

Object.keys(db).forEach((prop) => {
  const modelsProp = prop as keyof typeof db;

  if (typeof db[modelsProp] === "function") {
    if ((db[modelsProp] as Function).prototype instanceof ModelEx) {
      (db[modelsProp] as typeof ModelEx).associate(db);
    }
  }
});

export default db;
