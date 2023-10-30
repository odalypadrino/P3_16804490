import { Optional } from "sequelize";

import { Image } from "../../types";
import ImagesModel from "../models/Images.model";

export const createImage_Service = async (data: Optional<Image, "id">) => {
	try {
		const newImage = await ImagesModel.create(data);

		return newImage;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// export const updateImage_Service = async (id: number, data: Image) => {
// 	try {
// 		await ImagesModel.update(data, { where: { id } });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const getAllImages_Service = async () => {
// 	try {
// 		return await ImagesModel.findAll();
// 	} catch (error) {
// 		console.log(error);

// 		return null;
// 	}
// };

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
		return await ImagesModel.findAll({ where: { productId } });
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteImage_By_Id_service = async (id: number) => {
	try {
		return await ImagesModel.findByPk(id);
	} catch (error) {
		console.log(error);
		return null;
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
