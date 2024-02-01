import { Sequelize } from "sequelize";
import {
	RatingAttributes,
	RatingAttributes_With_AverageRating,
} from "../../types";
import RatingModel from "../models/Rating.model";

export const createRatingService = async (
	data: Omit<RatingAttributes, "id">
) => {
	try {
		const { clientId, productId } = data;

		const find = await RatingModel.findOne({ where: { clientId, productId } });

		if (find) return;

		const d = data as RatingAttributes;

		return await RatingModel.create(d);
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getOneRating_By_ClientAndProductservice = async (
	clientId: string | number,
	productId: string | number
) => {
	try {
		return await RatingModel.findOne({ where: { clientId, productId } });
	} catch (error) {
		console.log(error);
		return;
	}
};

export const averageRating_By_ProductService = async (
	productId: string | number
) => {
	try {
		const promedio = await RatingModel.findAll({
			attributes: [
				[Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
			],
			where: {
				productId: productId,
			},
		});

		console.log(promedio);

		const { averageRating } = promedio[0]
			.dataValues as RatingAttributes_With_AverageRating;

		return averageRating ? averageRating : 0;
	} catch (error) {
		return 0;
	}
};

export const getReviewCountProduct = async (productId: string | number) => {
	try {
		return await RatingModel.count({ where: { productId } });
	} catch (error) {
		return 0;
	}
};

export const averageRating_all_ProductsService = async () => {
	try {
		const promedioGlobal = await RatingModel.findAll({
			attributes: [
				[Sequelize.fn("AVG", Sequelize.col("rating")), "promedioRating"],
			],
			group: ["productId"],
		});

		return promedioGlobal;
	} catch (error) {
		return [];
	}
};

export const getRatingsCount_service = async () => {
	try {
		return await RatingModel.count();
	} catch (error) {
		console.log(error);
		return 0;
	}
};
