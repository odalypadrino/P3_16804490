import { Request, Response } from "express";

import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import {
	createCategory_Service,
	getCategories_Service,
	getCategoryById_Service,
	updateCategory_Service,
} from "../services/categoryService";
import { CategoryAttributes } from "../../types";
import { adminNavBarLinks } from "../config/NavBarLinks";
import { matchedData, validationResult } from "express-validator";
import DefaultResponse from "../config/DefaultResponse";

export const categoryListPage_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const userData = req.user;

		const categories = await getCategories_Service();

		return res.render(RouterRender.admin.categoryList, {
			...DefaultResponse,
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

export const categoryFormPage_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const userData = req.user;

		return res.render(RouterRender.admin.categoryForm, {
			...DefaultResponse,
			data: null,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);
		return res.redirect(RoutesLinks.admin.index);
	}
};

export const categoryFormPage_ById_controller = async (
	req: Request,
	res: Response
) => {
	const userData = req.user;
	const { id } = req.params;

	try {
		const category = await getCategoryById_Service(id);

		res.render(RouterRender.admin.categoryForm, {
			...DefaultResponse,
			data: category,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);
		return res.redirect(RoutesLinks.admin.index);
	}
};

export const createCategory_controller = async (
	req: Request,
	res: Response
) => {
	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.redirect(RoutesLinks.admin.categoryForm());

		const data = matchedData(req) as CategoryAttributes;

		await createCategory_Service(data);

		return res.redirect(RoutesLinks.admin.categoryList);
	} catch (error) {
		res.redirect(RoutesLinks.admin.categoryForm());
	}
};

export const updateCategory_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data = matchedData(req) as CategoryAttributes;
	try {
		const result = validationResult(req);

		if (result.array().length) {
			console.log("************ errores de registro ************");
			console.log(result.array());
		}

		if (!result.isEmpty())
			return res.redirect(RoutesLinks.admin.categoryForm(parseInt(id)));

		await updateCategory_Service(parseInt(id), data);

		return res.redirect(RoutesLinks.admin.categoryList);
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.admin.categoryForm(parseInt(id)));
	}
};
