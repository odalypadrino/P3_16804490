import { Optional } from "sequelize";

import { Product } from "../../types";
import ProductModel from "../models/Product.model";

export const createProduct = async (data: Optional<Product, "id">) => {
	try {
		const newProduct = await ProductModel.create(data);

		return newProduct;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateProduct = async (id: number, data: Product) => {
	try {
		await ProductModel.update(data, { where: { id } });
	} catch (error) {
		console.log(error);
	}
};

export const getProduct = async () => {
	try {
		return await ProductModel.findAll();
	} catch (error) {
		console.log(error);

		return null;
	}
};

export const getProduct_By_Category = async (categoryId: number) => {
	try {
		return await ProductModel.findAll({ where: { categoryId } });
	} catch (error) {
		console.log(error);
		return null;
	}
};
