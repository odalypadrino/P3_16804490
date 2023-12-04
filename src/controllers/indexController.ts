import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import {
	getAllProductsByQuery_Service,
	getAllProducts_Service,
} from "../services/productService";
import { getQueryFilters_service } from "../services/querys";

export const mainPage = async (_req: Request, res: Response) => {
	const products = await getAllProducts_Service();

	const filters = await getQueryFilters_service();

	res.render(RouterRender.client.landing, {
		products,
		RoutesLinks,
		QueryData: { filters },
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
		QueryData: { filters },
	});
};

export const loginPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.login, { RoutesLinks });
};
