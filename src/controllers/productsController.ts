import { Request, Response } from "express";

import { Product } from "../../types";
import {
	createProduct_Service,
	getAllProducts_Service,
	getProductById_Service,
	updateProduct_Service,
} from "../services/productService";
import { getCategories_Service } from "../services/categoryService";

export const getAllProduct_controller = async (
	_req: Request,
	res: Response
) => {
	try {
		const categories = await getAllProducts_Service();

		res.render("dashboard/productList", { categories });
	} catch (error) {}
};

export const productForm_controller = async (_req: Request, res: Response) => {
	try {
		const categories = await getCategories_Service()

		res.render("dashboard/productForm", { data: null ,categories});
	} catch (error) {}
};

export const productFormById_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const product = await getProductById_Service(id);
		const categories = await getCategories_Service()
		res.render("dashboard/productForm", { data: product,categories });
	} catch (error) {}
};

export const createProduct_controller = async (req: Request, res: Response) => {
	const data: Product = req.body;

	try {
		await createProduct_Service(data);

		res.redirect("/product");
	} catch (error) {}
};

export const updateProduct_controller = async (req: Request, res: Response) => {
	const { id } = req.params;
	const data: Product = req.body;

	console.log(data);
	
	try {
		await updateProduct_Service(parseInt(id), data);

		res.redirect("/product");
	} catch (error) {
		console.log(error);
	}
};
