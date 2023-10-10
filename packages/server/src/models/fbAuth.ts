import { CreationOptional, DataTypes, ForeignKey, Sequelize } from "sequelize";
import { ModelEx } from "./modelEx";
import { ModelsType } from "./";
import { User } from "./user";

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

export class FbAuth extends ModelEx<FbAuth> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;

  declare fb_id: string;
  declare display_name: string;

  declare user_id: ForeignKey<User["id"]>;
 
  // timestamps!
  // createdAt can be undefined during creation
  // declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  // declare updatedAt: CreationOptional<Date>;

  static initialize(sequelize: Sequelize) {
    FbAuth.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        fb_id: {
          type: DataTypes.STRING,
        },
        display_name: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
        tableName: "fbauths",
        sequelize,
      }
    );
  }

  static associate(models: ModelsType) {
    // 1 to many with board
    FbAuth.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
} 
