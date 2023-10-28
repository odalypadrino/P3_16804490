import { DataTypes } from "sequelize";
import db from "../db";
import CategoryModel from "./Category.model";

const ProductModel = db.define(
	"product",
	{
		code: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING(255), allowNull: false },
		cost: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
		description: { type: DataTypes.STRING(500), defaultValue: "" },

		size: { type: DataTypes.STRING, allowNull: true },
		brand: { type: DataTypes.STRING, allowNull: true },

		status: { type: DataTypes.CHAR, defaultValue: "a" },
	},
	{
		timestamps: false,
	}
);

ProductModel.belongsTo(CategoryModel);
CategoryModel.hasMany(ProductModel);

export default ProductModel;
