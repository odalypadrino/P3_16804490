import { Request, Response } from "express";

import { Product } from "../../types";
import {
	createProduct_Service,
	getAllProducts_Service,
	getProductById_Service,
	updateProduct_Service,
} from "../services/productService";
import { getCategories_Service } from "../services/categoryService";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";

export const getAllProduct_controller = async (
	_req: Request,
	res: Response
) => {
	try {
		const categories = await getAllProducts_Service();

		res.render(RouterRender.dashboard.productList, { categories, RoutesLinks });
	} catch (error) {}
};

export const productForm_controller = async (_req: Request, res: Response) => {
	try {
		const categories = await getCategories_Service();

		res.render(RouterRender.dashboard.productForm, {
			data: null,
			categories,
			RoutesLinks,
		});
	} catch (error) {}
};

export const productFormById_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const product = await getProductById_Service(parseInt(id));
		const categories = await getCategories_Service();

		res.render(RouterRender.dashboard.productForm, {
			data: product,
			categories,
			RoutesLinks,
		});
	} catch (error) {}
};

export const createProduct_controller = async (req: Request, res: Response) => {
	const data: Product = req.body;

	try {
		await createProduct_Service(data);

		res.redirect(RoutesLinks.dashboard.productList);
	} catch (error) {}
};

export const updateProduct_controller = async (req: Request, res: Response) => {
	const { id } = req.params;
	const data: Product = req.body;

	console.log(data);

	try {
		await updateProduct_Service(parseInt(id), data);

		res.redirect(RoutesLinks.dashboard.productList);
	} catch (error) {
		console.log(error);
	}
};
