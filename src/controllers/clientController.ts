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

export const loginPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.login, { RoutesLinks });
};

export const client_loginPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.client_login, { RoutesLinks });
};

export const client_dashboardPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.dashboard, { RoutesLinks });
};

export const client_registerPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.client_register, { RoutesLinks });
};

export const client_credicardPage = async (req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	try {
		const { productId, quantity } = req.body;

		const product = await getProductById_Service(parseInt(productId));

		const total = product ? product.cost * quantity : 0;

		res.render(RouterRender.client.credicard, {
			RoutesLinks,
			product,
			quantity,
			total,
		});
	} catch (error) {}
};

export const client_pay_confirmPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	try {
		// const { productId, quantity } = req.body;
		const data = {};
		// const product = await getProductById_Service(parseInt(productId));

		// const total = product ? product.cost * quantity : 0;

		res.render(RouterRender.client.pay_confirm, {
			RoutesLinks,
			data,
		});
	} catch (error) {}
};
