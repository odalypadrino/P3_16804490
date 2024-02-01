import { ImagesAttributes, ProductAttributes, QueryProduct } from "../../types";
import ProductModel, {
	ProductWithAverageRating,
	ProductWithImg,
} from "../models/Product.model";
import ImagesModel from "../models/Images.model";
import CategoryModel from "../models/Category.model";
import { Op, Sequelize } from "sequelize";
import {
	averageRating_By_ProductService,
	getReviewCountProduct,
} from "./RatingService";
import { RatingOrder } from "../../enum";

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

const getProductWithAverageRating = async (
	products: ProductWithImg[] | ProductAttributes[]
) =>
	await Promise.all(
		await products.map(async (product) => {
			const p = product as ProductWithAverageRating;

			p.averageRating = await averageRating_By_ProductService(product.id);

			p.reviewCount = await getReviewCountProduct(product.id);

			return p;
		})
	);
// interface a extends ProductModel {
// 	images: ImagesAttributes[];
// }

export const getAllProducts_Service = async () => {
	try {
		const product = (
			await ProductModel.findAll({
				include: [
					{ model: ImagesModel, order: [["featured", "DESC"]] },
					{ model: CategoryModel, as: "category" },
				],
			})
		).map((product: any) => {
			const imgs = product.images;

			product.images = imgs.sort((a: ImagesAttributes) =>
				a.featured === true ? 1 : -1
			);
			return product;
		});

		return await getProductWithAverageRating(product);
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
		const product = await ProductModel.findByPk(id, {
			include: [
				{ model: ImagesModel, order: [["featured", "DESC"]] },
				{ model: CategoryModel, as: "category" },
			],
		});

		if (!product) return null;

		const averageRating = await averageRating_By_ProductService(product.id);

		const p = product as ProductWithAverageRating;

		p.averageRating = averageRating;

		p.reviewCount = await getReviewCountProduct(product.id);

		return p;
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
	ratingOrder,
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
		const productWithImg = (
			await ProductModel.findAll({
				where: {
					[Op.and]: andInWhere,
				},
				include: [
					{ model: ImagesModel, order: [["featured", "DESC"]] },
					{ model: CategoryModel, as: "category" },
				],
			})
		).map((product: any) => {
			const imgs = product.images;

			product.images = imgs.sort((a: ImagesAttributes) =>
				a.featured === true ? 1 : -1
			);
			return product as ProductWithImg;
		});

		const productWithAverageRating = await getProductWithAverageRating(
			productWithImg
		);

		const productBySorting =
			ratingOrder !== RatingOrder.all
				? productWithAverageRating.sort((productA, productB) => {
						if (ratingOrder === RatingOrder.ASC)
							return productA.averageRating > productB.averageRating ? 1 : -1;

						return productA.averageRating < productB.averageRating ? 1 : -1;
				  })
				: productWithAverageRating;

		return productBySorting;
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
