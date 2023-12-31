import { Request, Response } from "express";

import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import {
	createImage_Service,
	deleteImage_By_Id_service,
	featuredImage_By_Id_service,
	getImage_By_Product_Service,
} from "../services/imageService";
import { getProductById_Service } from "../services/productService";
import { ImagesAttributes } from "../../types";

// export const getAllImage_controller = async (
// 	_req: Request,
// 	res: Response
// ) => {
// 	try {
// 		const categories = await getAllImages_Service();

// 		res.render("dashboard/imageList", { categories });
// 	} catch (error) {}
// };

// para añadir
export const imageForm_controller = async (req: Request, res: Response) => {
	const { productId } = req.params;

	try {
		const product = await getProductById_Service(parseInt(productId));
		const otherImages = await getImage_By_Product_Service(parseInt(productId));

		res.render(RouterRender.dashboard.imageForm, {
			product,
			otherImages,
			RoutesLinks,
		});
	} catch (error) {
		console.log(error);
	}
};

export const createImage_controller = async (req: Request, res: Response) => {
	const { productId } = req.params;
	const data: ImagesAttributes = req.body;

	try {
		await createImage_Service({ ...data, productId: parseInt(productId) });

		res.redirect("back");
	} catch (error) {}
};

export const featuredImage_controller = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await featuredImage_By_Id_service(parseInt(id));

		res.redirect("back");
	} catch (error) {
		console.log(error);
	}
};

export const deleteImage_controller = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await deleteImage_By_Id_service(parseInt(id));

		res.redirect("back");
	} catch (error) {
		console.log(error);
	}
};
