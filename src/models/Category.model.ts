import { DataTypes, Model } from "sequelize";
import db from "../db";
import { CategoryAttributes } from "../../types";

class CategoryModel
	extends Model<CategoryAttributes>
	implements CategoryAttributes
{
	public id!: number;
	public name!: string;
	public description!: string;
	public status!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

CategoryModel.init(
	{
		id: {
			type: DataTypes.INTEGER(),
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(500),
			defaultValue: "",
		},
		status: {
			type: DataTypes.CHAR,
			defaultValue: "a",
		},
	},
	{
		sequelize: db,
		tableName: "categories",
		timestamps: false,
	}
);

export default CategoryModel;
