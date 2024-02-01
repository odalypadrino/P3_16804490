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
import { RatingOrder } from "../../enum";
import { getOneTransaction_BY_productANDclient } from "../services/TransactionService";
import { matchedData, validationResult } from "express-validator";
import {
	createRatingService,
	getOneRating_By_ClientAndProductservice,
} from "../services/RatingService";

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
				query: {
					text: "",
					brand: "",
					size: "",
					categoryId: "",
					ratingOrder: RatingOrder.all,
				},
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

		const { text, brand, size, categoryId, ratingOrder } = req.query;

		const query = {
			text: text ? text.toString() : null,
			brand: brand ? brand.toString() : null,
			size: size ? size?.toString() : null,
			categoryId: categoryId ? categoryId?.toString() : null,
			ratingOrder: ratingOrder
				? ratingOrder === RatingOrder.ASC
					? RatingOrder.ASC
					: ratingOrder === RatingOrder.DESC
					? RatingOrder.DESC
					: RatingOrder.all
				: RatingOrder.all,
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
			QueryData: {
				query: { text, brand, size, categoryId, ratingOrder },
				filters,
			},
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

		const oneTransaction = userData
			? await getOneTransaction_BY_productANDclient(userData.id, productId)
			: false;

		const oneRating = userData
			? await getOneRating_By_ClientAndProductservice(userData.id, productId)
			: false;

		const filters = await getQueryFilters_service();

		res.render(RouterRender.client.product, {
			product: product,
			oneTransaction: !!oneTransaction,
			oneRating: !!oneRating,
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

// ***************************** API *****************************

export const productCreateRating = async (req: Request, res: Response) => {
	const userData = req.user as ClientAttributes;
	const { productId } = req.params;

	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.redirect(`${RoutesLinks.client.product}/${productId}`);

		const { rating } = matchedData(req) as { rating: number };

		await createRatingService({
			clientId: userData.id,
			productId: parseInt(productId),
			rating,
		});

		return res.redirect(`${RoutesLinks.client.product}/${productId}`);
	} catch (error) {
		console.log(error);

		return res.redirect(`${RoutesLinks.client.product}/${productId}`);
	}
};
