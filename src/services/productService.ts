import { ProductAttributes, QueryProduct } from "../../types";
import ProductModel from "../models/Product.model";
import ImagesModel from "../models/Images.model";
import CategoryModel from "../models/Category.model";
import { Op, Sequelize } from "sequelize";

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
				{ model: ImagesModel, order: [["featured", "DESC"]] },
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
		return await ProductModel.findByPk(id, {
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

export const getAllProductsByQuery_Service = async ({
	text,
	brand,
	size,
	categoryId,
}: QueryProduct) => {
	const andInWhere = [];

	if (text && text.trim())
		andInWhere.push({
			[Op.or]: [
				{ name: { [Op.substring]: text } },
				{ description: { [Op.substring]: text } },
			],
		});

	if (brand) andInWhere.push({ brand });
	if (size) andInWhere.push({ size });
	if (categoryId) andInWhere.push({ categoryId });

	try {
		return await ProductModel.findAll({
			where: {
				[Op.and]: andInWhere,
			},
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

export const getProductCount_service = async () => {
	try {
		return await ProductModel.count();
	} catch (error) {
		console.log(error);

		return 0;
	}
};
export const getTallasOfProducts_service = async () => {
	try {
		const tallas = (
			await ProductModel.findAll({
				attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("size")), "size"]],
			})
		).map((t) => t.size);

		return tallas;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getMarcasOfProducts_service = async () => {
	try {
		const tallas = (
			await ProductModel.findAll({
				attributes: [
					[Sequelize.fn("DISTINCT", Sequelize.col("brand")), "brand"],
				],
			})
		).map((t) => t.brand);

		return tallas;
	} catch (error) {
		console.log(error);
		return null;
	}
};
