import { Request, Response } from "express";

import {
	createProduct_Service,
	getAllProducts_Service,
	getProductById_Service,
	updateProduct_Service,
} from "../services/productService";
import { getCategories_Service } from "../services/categoryService";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import { ProductAttributes } from "../../types";

export const getAllProduct_controller = async (
	_req: Request,
	res: Response
) => {
	try {
		const products = await getAllProducts_Service();

		res.render(RouterRender.dashboard.productList, { products, RoutesLinks });
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
	const data: ProductAttributes = req.body;

	try {
		const newProduct = await createProduct_Service(data);

		if (!newProduct) return res.redirect(RoutesLinks.dashboard.index);

		res.redirect(RoutesLinks.dashboard.imageForm(newProduct.id));
	} catch (error) {}
};

export const updateProduct_controller = async (req: Request, res: Response) => {
	const { id } = req.params;
	const data: ProductAttributes = req.body;

	console.log(data);

	try {
		const product = await updateProduct_Service(parseInt(id), data);

		if (!product) return res.redirect(RoutesLinks.dashboard.index);

		res.redirect(RoutesLinks.dashboard.imageForm(product.id));
	} catch (error) {
		console.log(error);
	}
};
