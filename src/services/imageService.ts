import { ImagesAttributes } from "../../types";
import ImagesModel from "../models/Images.model";

export const createImage_Service = async (data: ImagesAttributes) => {
	try {
		const newImage = await ImagesModel.create(data);

		return newImage;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getImageById_Service = async (id: string) => {
	try {
		return await ImagesModel.findByPk(id);
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getImage_By_Product_Service = async (productId: number) => {
	try {
		return await ImagesModel.findAll({
			where: { productId },
			order: [["featured", "DESC"]],
		});
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const featuredImage_By_Id_service = async (id: number) => {
	try {
		const img = await ImagesModel.findByPk(id);
		
		if (!img) return;

		await ImagesModel.update(
			{ featured: false },
			{ where: { productId: img.productId } }
		);

		img.featured = !img.featured;

		await img.save();
	} catch (error) {
		console.log(error);
		return;
	}
};

export const deleteImage_By_Id_service = async (id: number) => {
	try {
		const img = await ImagesModel.findByPk(id);

		await img?.destroy();
	} catch (error) {
		console.log(error);
	}
};

export const deleteImage_By_Product_service = async (id: string) => {
	try {
		return await ImagesModel.findByPk(id);
	} catch (error) {
		console.log(error);
		return null;
	}
};
