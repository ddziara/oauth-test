import { InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import type db from "./";

type InferAttributesOptions<Excluded, > = { omit?: Excluded };

export class ModelEx<M extends Model<any, any>, Options extends InferAttributesOptions<keyof M | never | ''> = { omit: never }> extends Model<
  InferAttributes<M, Options>,
  InferCreationAttributes<M, Options>
> {
    static initialize(sequelize: Sequelize) {
        throw new Error("initialize() must be implemented");
    }

    static associate(models: typeof db) {
        throw new Error("associate() must be implemented");
    }   
}



