import {
  CreationOptional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  DataTypes,
  Sequelize,
  NonAttribute,
  ForeignKey,
} from "sequelize";
import { ModelEx } from "./modelEx";
import { ModelsType } from "./";
import { Suggestion } from "./suggestion";
import { User } from "./user";

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
export class Board extends ModelEx<Board, { omit: "suggestions" }> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare name: string;

  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
  // display an error if ownerId is missing.
  declare ownerId: ForeignKey<User["id"]>;

  // timestamps!
  // createdAt can be undefined during creation
  // declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  // declare updatedAt: CreationOptional<Date>;

  declare getSuggestion: HasManyGetAssociationsMixin<Suggestion>; // Note the null assertions!
  declare addSuggestion: HasManyAddAssociationMixin<Suggestion, number>;
  declare addSuggestions: HasManyAddAssociationsMixin<Suggestion, number>;
  declare setSuggestions: HasManySetAssociationsMixin<Suggestion, number>;
  declare removeSuggestion: HasManyRemoveAssociationMixin<Suggestion, number>;
  declare removeSuggestions: HasManyRemoveAssociationsMixin<Suggestion, number>;
  declare hasSuggestion: HasManyHasAssociationMixin<Suggestion, number>;
  declare hasSuggestions: HasManyHasAssociationsMixin<Suggestion, number>;
  declare countSuggestions: HasManyCountAssociationsMixin;
  declare createSuggestion: HasManyCreateAssociationMixin<
    Suggestion,
    "boardId"
  >;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare suggestions?: NonAttribute<Suggestion[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    suggestions: Association<Board, Suggestion>;
  };

  static initialize(sequelize: Sequelize) {
    Board.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
        tableName: "boards",
        sequelize,
      }
    );
  }

  static associate(models: ModelsType) {
    // 1 to many with board
    Board.hasMany(models.Suggestion, {
      foreignKey: "boardId",
    });
  }
}
