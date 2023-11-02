import { DataTypes, Model } from "sequelize";
import db from "../db";
import ProductModel from "./Product.model";
import { ImagesAttributes } from "../../types";

class ImagesModel extends Model<ImagesAttributes> implements ImagesAttributes {
	public id!: number;
	public url!: string;
	public featured!: boolean;
	public status!: string;
	public productId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ImagesModel.init(
	{
		id: { type: DataTypes.INTEGER(), autoIncrement: true, primaryKey: true },
		url: { type: DataTypes.STRING(512), allowNull: false },
		productId: { type: DataTypes.NUMBER, allowNull: false },
		featured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		status: { type: DataTypes.CHAR, defaultValue: "a" },
	},
	{
		sequelize: db,
		modelName: "images",
		timestamps: false,
	}
);

ImagesModel.belongsTo(ProductModel, { foreignKey: "productId" });
ProductModel.hasMany(ImagesModel, { foreignKey: "productId" });

export default ImagesModel;
