import { Request, Response } from "express";

import { Image } from "../../types";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import {
	createImage_Service,
	deleteImage_By_Id_service,
	getImage_By_Product_Service,
} from "../services/imageService";
import { getProductById_Service } from "../services/productService";

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

		res.render(RouterRender.dashboard.imageForm, { product, otherImages });
	} catch (error) {
		console.log(error);
	}
};

export const createImage_controller = async (req: Request, res: Response) => {
	const { productId } = req.params;
	const data: Image = req.body;

	try {
		await createImage_Service({ ...data, productId });

		res.redirect(RoutesLinks.dashboard.productList);
	} catch (error) {}
};

export const deleteImage_controller = async (req: Request, res: Response) => {
	const { id } = req.params;
	const data: Image = req.body;

	console.log(data);

	try {
		await deleteImage_By_Id_service(parseInt(id));

		res.redirect("/product");
	} catch (error) {
		console.log(error);
	}
};
