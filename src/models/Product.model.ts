import { DataTypes, Model } from "sequelize";
import db from "../db";
import CategoryModel from "./Category.model";
import { ProductAttributes } from "../../types";

class ProductModel
	extends Model<ProductAttributes>
	implements ProductAttributes
{
	public id!: number;
	public code!: string;
	public name!: string;
	public cost!: number;
	public description!: string;
	public size!: string | null;
	public brand!: string | null;
	public status!: string;
	public categoryId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ProductModel.init(
	{
		id: {
			type: DataTypes.INTEGER(),
			autoIncrement: true,
			primaryKey: true,
		},
		code: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING(255), allowNull: false },
		cost: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
		description: { type: DataTypes.STRING(500), defaultValue: "" },
		size: { type: DataTypes.STRING, allowNull: true },
		brand: { type: DataTypes.STRING, allowNull: true },
		status: { type: DataTypes.CHAR, defaultValue: "a" },
		categoryId: { type: DataTypes.NUMBER, allowNull: false },
	},
	{
		sequelize: db,
		tableName: "products",
		timestamps: false,
	}
);

ProductModel.belongsTo(CategoryModel, { foreignKey: "categoryId",as:"category" });
CategoryModel.hasMany(ProductModel, { foreignKey: "categoryId", as:"category" });

export default ProductModel;
