import { DataTypes } from "sequelize";
import db from "../db";
import ProductModel from "./Product.model";

const ImagesModel = db.define("images", {
	url: { type: DataTypes.STRING(255), allowNull: false },
	featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
	status: { type: DataTypes.CHAR, defaultValue: "a" },
}, {
  timestamps: false
});

ImagesModel.belongsTo(ProductModel);
ProductModel.hasMany(ImagesModel);

export default ImagesModel;
