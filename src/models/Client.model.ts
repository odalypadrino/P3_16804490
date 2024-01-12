import { DataTypes, Model } from "sequelize";
import db from "../db";
import { ClientAttributes } from "../../types";

class ClientModel extends Model<ClientAttributes> implements ClientAttributes {
	public id!: number;
	public name!: string;
	public email!: string;
	public lastName!: string;
	public password!: string;
	public birthday!: Date;
	public phoneNumber!: string;
	public status!: string;
	public perfilImage!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ClientModel.init(
	{
		id: {
			type: DataTypes.INTEGER(),
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "",
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "",
		},
		lastName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "",
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "",
		},
		birthday: {
			type: DataTypes.DATE(),
		},
		phoneNumber: {
			type: DataTypes.STRING(255),
		},

		perfilImage: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: null,
		},

		status: {
			type: DataTypes.CHAR,
			defaultValue: "a",
		},
	},
	{
		sequelize: db,
		tableName: "clients",
		timestamps: false,
	}
);

export default ClientModel;
