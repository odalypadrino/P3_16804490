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
import { adminNavBarLinks } from "../config/NavBarLinks";
import { matchedData, validationResult } from "express-validator";

// para añadir
export const imageFormPage_controller = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const userData = req.user;

		const product = await getProductById_Service(parseInt(productId));
		const otherImages = await getImage_By_Product_Service(parseInt(productId));

		return res.render(RouterRender.admin.imageForm, {
			product,
			otherImages,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);
		return res.redirect(RoutesLinks.admin.index);
	}
};

// *********************************************************
// 													API
// *********************************************************

export const createImage_controller = async (req: Request, res: Response) => {
	const { productId } = req.params;

	const data = matchedData(req) as ImagesAttributes;
	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.redirect(RoutesLinks.admin.imageForm(parseInt(productId)));

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
