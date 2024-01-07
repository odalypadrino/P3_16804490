import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import {
	getAllProductsByQuery_Service,
	getAllProducts_Service,
	getProductById_Service,
} from "../services/productService";
import { getQueryFilters_service } from "../services/querys";

export const mainPage = async (_req: Request, res: Response) => {
	const products = await getAllProducts_Service();

	const filters = await getQueryFilters_service();

	res.render(RouterRender.client.landing, {
		products,
		RoutesLinks,
		QueryData: {
			query: { text: "", brand: "", size: "", categoryId: "" },
			filters,
		},
	});
};

export const searhPage = async (req: Request, res: Response) => {
	const { text, brand, size, categoryId } = req.query;

	const query = {
		text: text ? text.toString() : null,
		brand: brand ? brand.toString() : null,
		size: size ? size?.toString() : null,
		categoryId: categoryId ? categoryId?.toString() : null,
	};

	const products = await getAllProductsByQuery_Service(query);

	const filters = await getQueryFilters_service();

	res.render(RouterRender.client.search, {
		products,
		RoutesLinks,
		QueryData: { query: { text, brand, size, categoryId }, filters },
	});
};

export const productPage = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;

		// const query = {
		// 	text: text ? text.toString() : null,
		// 	brand: brand ? brand.toString() : null,
		// 	size: size ? size?.toString() : null,
		// 	categoryId: categoryId ? categoryId?.toString() : null,
		// };

		const product = await getProductById_Service(parseInt(productId));

		const filters = await getQueryFilters_service();

		res.render(RouterRender.client.product, {
			product: product,
			RoutesLinks,
			QueryData: { query: {}, filters },
		});
	} catch (error) {}
};

export const client_loginPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.client_login, { RoutesLinks });
};

export const client_registerPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.client_register, { RoutesLinks });
};
