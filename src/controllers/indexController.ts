import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import {
	getAllProductsByQuery_Service,
	getAllProducts_Service,
	getProductById_Service,
} from "../services/productService";
import { getQueryFilters_service } from "../services/querys";
import { adminNavBarLinks, clientNavBarLinks } from "../config/NavBarLinks";
import { ClientAttributes } from "../../types";
import { ROOT_USER } from "../config";

export const mainPage = async (req: Request, res: Response) => {
	try {
		const userData = req.user as ClientAttributes;

		const products = await getAllProducts_Service();

		const filters = await getQueryFilters_service();

		return res.render(RouterRender.client.landing, {
			products,
			RoutesLinks,
			NavbarLinks: userData
				? userData.email === ROOT_USER
					? adminNavBarLinks.default
					: clientNavBarLinks.landing_loggedIn
				: clientNavBarLinks.landing,
			userData,
			QueryData: {
				query: { text: "", brand: "", size: "", categoryId: "" },
				filters,
			},
		});
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.client.landing);
	}
};

export const searhPage = async (req: Request, res: Response) => {
	try {
		const userData = req.user as ClientAttributes;

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
			NavbarLinks: userData
				? userData.email === ROOT_USER
					? adminNavBarLinks.default
					: clientNavBarLinks.landing_loggedIn
				: clientNavBarLinks.landing,
			userData,
			QueryData: { query: { text, brand, size, categoryId }, filters },
		});
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.client.landing);
	}
};

export const productPage = async (req: Request, res: Response) => {
	try {
		const userData = req.user as ClientAttributes;

		const { productId } = req.params;

		const product = await getProductById_Service(parseInt(productId));

		const filters = await getQueryFilters_service();

		res.render(RouterRender.client.product, {
			product: product,
			RoutesLinks,
			NavbarLinks: userData
				? userData.email === ROOT_USER
					? adminNavBarLinks.default
					: clientNavBarLinks.landing_loggedIn
				: clientNavBarLinks.landing,
			userData,
			QueryData: { query: {}, filters },
		});
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.client.landing);
	}
};

export const client_loginPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.client_login, { RoutesLinks });
};

export const client_registerPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.client.client_register, { RoutesLinks });
};
