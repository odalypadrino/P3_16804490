import { ProductAttributes } from "../../types";
import ProductModel from "../models/Product.model";
import ImagesModel from "../models/Images.model";
import CategoryModel from "../models/Category.model";

export const createProduct_Service = async (data: ProductAttributes) => {
	try {
		const newProduct = await ProductModel.create(data);

		return newProduct;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateProduct_Service = async (
	id: number,
	data: ProductAttributes
) => {
	try {
		await ProductModel.update(data, { where: { id } });

		return await getProductById_Service(id);
	} catch (error) {
		console.log(error);

		return null;
	}
};

export const getAllProducts_Service = async () => {
	try {
		return await ProductModel.findAll({
			include: [
				{ model: ImagesModel },
				{ model: CategoryModel, as: "category" },
			],
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


export const getProductCount_service = async () => {

	try {
		return await ProductModel.count()
	} catch (error) {
		console.log(error);
		
		return 0
	}
	
}