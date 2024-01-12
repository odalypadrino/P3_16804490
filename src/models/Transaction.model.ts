import { DataTypes, Model } from "sequelize";
import db from "../db";
import { TransactionAttributes } from "../../types";
import ClientModel from "./Client.model";
import ProductModel from "./Product.model";
import { CodeErrorPaymentApiResponse } from "../../enum";

class TransactionModel
	extends Model<TransactionAttributes>
	implements TransactionAttributes
{
	public id!: number;
	public transaction_id!: string;
	public clientId!: number;
	public productId!: number;
	public quantity!: number;
	public amount!: number;
	public date!: Date;
	public ipcliente!: string;
	public success!: boolean;
	public delivered!: boolean;

	public error!: CodeErrorPaymentApiResponse;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

TransactionModel.init(
	{
		id: {
			type: DataTypes.INTEGER(),
			autoIncrement: true,
			primaryKey: true,
		},
		transaction_id: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},

		clientId: { type: DataTypes.INTEGER, allowNull: false },
		productId: { type: DataTypes.INTEGER, allowNull: false },
		quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		amount: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: new Date(),
		},
		ipcliente: { type: DataTypes.STRING(255), allowNull: false },
		success: { type: DataTypes.BOOLEAN, defaultValue: false },
		delivered: { type: DataTypes.BOOLEAN, defaultValue: false },
		error: {
			type: DataTypes.ENUM,
			values: [
				CodeErrorPaymentApiResponse.approved,
				CodeErrorPaymentApiResponse.error,
				CodeErrorPaymentApiResponse.insufficientFunds,
				CodeErrorPaymentApiResponse.rejectd,
			],
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: "Transactions",
		timestamps: false,
	}
);

TransactionModel.belongsTo(ClientModel, {
	foreignKey: "clientId",
	as: "client",
});
ClientModel.hasMany(TransactionModel, { foreignKey: "clientId", as: "client" });

TransactionModel.belongsTo(ProductModel, {
	foreignKey: "productId",
	as: "product",
});
ProductModel.hasMany(TransactionModel, {
	foreignKey: "productId",
	as: "product",
});

export default TransactionModel;
