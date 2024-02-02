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
import { adminNavBarLinks } from "../config/NavBarLinks";
import { matchedData, validationResult } from "express-validator";
import DefaultResponse from "../config/DefaultResponse";

export const productListPage_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const userData = req.user;

		const products = await getAllProducts_Service();

		return res.render(RouterRender.admin.productList, {
			...DefaultResponse,
			products,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);
		return res.redirect(RoutesLinks.admin.index);
	}
};

export const productFormPage_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const userData = req.user;

		const categories = await getCategories_Service();

		res.render(RouterRender.admin.productForm, {
			...DefaultResponse,
			data: null,
			categories,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);
		return res.redirect(RoutesLinks.admin.index);
	}
};

export const productFormPage_ById_controller = async (
	req: Request,
	res: Response
) => {
	const userData = req.user;
	const { id } = req.params;

	try {
		const product = await getProductById_Service(parseInt(id));
		const categories = await getCategories_Service();

		res.render(RouterRender.admin.productForm, {
			...DefaultResponse,
			data: product,
			categories,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);
		return res.redirect(RoutesLinks.admin.index);
	}
};

export const createProduct_controller = async (req: Request, res: Response) => {
	const data = matchedData(req) as ProductAttributes;
	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty()) return res.redirect(RoutesLinks.admin.productForm());

		const newProduct = await createProduct_Service(data);

		if (!newProduct) return res.redirect(RoutesLinks.admin.index);

		res.redirect(RoutesLinks.admin.imageForm(newProduct.id));
	} catch (error) {}
};

export const updateProduct_controller = async (req: Request, res: Response) => {
	const { id } = req.params;

	const data = matchedData(req) as ProductAttributes;
	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.redirect(RoutesLinks.admin.productForm(parseInt(id)));

		const product = await updateProduct_Service(parseInt(id), data);

		if (!product) return res.redirect(RoutesLinks.admin.index);

		res.redirect(RoutesLinks.admin.imageForm(product.id));
	} catch (error) {
		console.log(error);
	}
};
