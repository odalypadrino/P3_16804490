import { DataTypes } from "sequelize";
import db from "../db";

const CategoryModel = db.define(
	"category",
	{
		name: { type: DataTypes.STRING(255), allowNull: false },
		description: { type: DataTypes.STRING(500), defaultValue: "" },

		status: { type: DataTypes.CHAR, defaultValue: "a" },
	},
	{
		timestamps: false,
	}
);

export default CategoryModel;
