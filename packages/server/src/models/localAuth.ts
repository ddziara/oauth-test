import { CreationOptional, DataTypes, ForeignKey, Sequelize } from "sequelize";
import { ModelEx } from "./modelEx";
import { ModelsType } from "./";
import { User } from "./user";

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

export class LocalAuth extends ModelEx<LocalAuth> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;

  declare email: string;
  declare password: string;

  declare user_id: ForeignKey<User["id"]>;

  // timestamps!
  // createdAt can be undefined during creation
  // declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  // declare updatedAt: CreationOptional<Date>;

  static initialize(sequelize: Sequelize) {
    LocalAuth.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
        tableName: "localauths",
        sequelize,
      }
    );
  }

  static associate(models: ModelsType) {
    // 1 to many with board
    LocalAuth.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
}
