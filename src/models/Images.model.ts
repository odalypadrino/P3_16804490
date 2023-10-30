import { DataTypes, Model } from "sequelize";
import db from "../db";
import ProductModel from "./Product.model";

interface ImagesAttributes {
	url: string;
	featured: boolean;
	status: string;
}

class ImagesModel extends Model<ImagesAttributes> implements ImagesAttributes {
	public url!: string;
	public featured!: boolean;
	public status!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ImagesModel.init(
	{
		url: { type: DataTypes.STRING(512), allowNull: false },
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

ImagesModel.belongsTo(ProductModel);
ProductModel.hasMany(ImagesModel);

export default ImagesModel;
