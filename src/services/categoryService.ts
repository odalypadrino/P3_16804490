import { Optional } from "sequelize";

import { Category } from "../../types";
import CategoryModel from "../models/Category.model";

export const createCategory = async (data: Optional<Category, "id">) => {
	try {
		const newProduct = await CategoryModel.create(data);

		return newProduct;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateCategory = async (id: number, data: Category) => {
	try {
		await CategoryModel.update(data, { where: { id } });
	} catch (error) {
		console.log(error);
	}
};

export const getCatergories = async () => {
	try {
		return await CategoryModel.findAll();
	} catch (error) {
		console.log(error);
		return null;
	}
};
