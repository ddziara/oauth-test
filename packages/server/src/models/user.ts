import { CreationOptional, DataTypes, ForeignKey, NonAttribute, Sequelize } from "sequelize";
import { ModelEx } from "./modelEx";
import { Board } from "./board";
import { Suggestion } from "./suggestion";
import { ModelsType } from "./";

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

export class User extends ModelEx<User> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare isAdmin: boolean;

  // `owner` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare owner?: NonAttribute<Board>;

   // createdAt can be undefined during creation
  //  declare createdAt: CreationOptional<Date>;
   // updatedAt can be undefined during creation
  //  declare updatedAt: CreationOptional<Date>;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING
        },
        isAdmin: {
          type: DataTypes.BOOLEAN
        }
      },
      {
        freezeTableName: true,
        tableName: "users",
        sequelize,
      }
    );    
  }

  static associate(models: ModelsType) {
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
