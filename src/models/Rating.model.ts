import { DataTypes, Model } from "sequelize";
import db from "../db";
import ClientModel from "./Client.model";
import ProductModel from "./Product.model";
import { RatingAttributes } from "../../types";

class RatingModel extends Model<RatingAttributes> implements RatingAttributes {
	public id!: number;
	public clientId!: number;
	public productId!: number;
	public rating!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

RatingModel.init(
	{
		id: {
			type: DataTypes.INTEGER(),
			autoIncrement: true,
			primaryKey: true,
		},
		clientId: { type: DataTypes.INTEGER, allowNull: false },
		productId: { type: DataTypes.INTEGER, allowNull: false },
		rating: { type: DataTypes.INTEGER, allowNull: false },
	},
	{
		sequelize: db,
		tableName: "Rating",
		timestamps: false,
	}
);

RatingModel.belongsTo(ClientModel, {
	foreignKey: "clientId",
	as: "clientRef",
});

ClientModel.hasMany(RatingModel, { foreignKey: "clientId", as: "clientRef" });

RatingModel.belongsTo(ProductModel, {
	foreignKey: "productId",
	as: "productRef",
});

ProductModel.hasMany(RatingModel, {
	foreignKey: "productId",
	as: "productRef",
});

export default RatingModel;

