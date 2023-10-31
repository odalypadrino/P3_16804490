import { Optional } from "sequelize";

import { Product } from "../../types";
import ProductModel from "../models/Product.model";
import ImagesModel from "../models/Images.model";
import CategoryModel from "../models/Category.model";

export const createProduct_Service = async (data: Optional<Product, "id">) => {
	try {
		const newProduct = await ProductModel.create(data);

		return newProduct;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateProduct_Service = async (id: number, data: Product) => {
	try {
		await ProductModel.update(data, { where: { id } });
	} catch (error) {
		console.log(error);
	}
};

export const getAllProducts_Service = async () => {
	try {
		return await ProductModel.findAll({
			include: [{ model: ImagesModel }, { model: CategoryModel }],
		});
	} catch (error) {
		console.log(error);

		return null;
	}
};

export const getProduct_By_Category_Service = async (categoryId: number) => {
	try {
		return await ProductModel.findAll({ where: { categoryId } });
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getProductById_Service = async (id: number) => {
	try {
		return await ProductModel.findByPk(id);
	} catch (error) {
		console.log(error);
		return null;
	}
};
