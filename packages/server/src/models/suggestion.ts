import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Sequelize,
  DataTypes,
} from "sequelize";
import { ModelEx } from "./modelEx";
import { ModelsType } from "./";

// export default (sequelize, DataTypes) => {
//   const Suggestion = sequelize.define("suggestion", {
//     text: DataTypes.STRING,
//   });

//   return Suggestion;
// };

export class Suggestion extends ModelEx<Suggestion> {
  declare id: CreationOptional<number>;
  declare text: string;

  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
  // display an error if ownerId is missing.
  declare boardId: ForeignKey<InstanceType<ModelsType["Board"]>["id"]>;
  declare creatorId: ForeignKey<InstanceType<ModelsType["User"]>['id']>;

  static initialize(sequelize: Sequelize) {
    Suggestion.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        text: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
        tableName: "suggestions",
        sequelize,
      }
    );
  }

  static associate(models: ModelsType) {

  }
}
