import CategoryModel from "../models/Category.model";
import { CategoryAttributes } from "../../types";

export const createCategory_Service = async (data: CategoryAttributes) => {
	try {
		const newProduct = await CategoryModel.create(data);

		return newProduct;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateCategory_Service = async (
	id: number,
	data: CategoryAttributes
) => {
	try {
		await CategoryModel.update(data, { where: { id } });
	} catch (error) {
		console.log(error);
	}
};

export const getCategories_Service = async () => {
	try {
		return await CategoryModel.findAll();
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getCategoryById_Service = async (id: string) => {
	try {
		return await CategoryModel.findByPk(id);
	} catch (error) {
		console.log(error);
		return null;
	}
};
