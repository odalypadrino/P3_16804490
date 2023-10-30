import { Request, Response } from "express";

import { Category } from "../../types";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import {
	createCategory_Service,
	getCategories_Service,
	getCategoryById_Service,
	updateCategory_Service,
} from "../services/categoryService";

export const getAllCategory_controller = async (
	_req: Request,
	res: Response
) => {
	try {
		const categories = await getCategories_Service();

		res.render(RouterRender.dashboard.categoryList, { categories ,RoutesLinks});
	} catch (error) {}
};

export const categoryForm_controller = async (_req: Request, res: Response) => {
	try {
		res.render(RouterRender.dashboard.categoryForm, { data: null,RoutesLinks });
	} catch (error) {}
};

export const categoryFormById_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const category = await getCategoryById_Service(id);
		res.render(RouterRender.dashboard.categoryForm, { data: category,RoutesLinks });
	} catch (error) {}
};

export const createCategory_controller = async (
	req: Request,
	res: Response
) => {
	const data: Category = req.body;

	try {
		const { name, description } = data;

		await createCategory_Service({ name, description });

		res.redirect(RoutesLinks.dashboard.categoryList);
	} catch (error) {}
};

export const updateCategory_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;
	const data: Category = req.body;

	try {
		await updateCategory_Service(parseInt(id), data);

		res.redirect(RoutesLinks.dashboard.categoryList);
	} catch (error) {
		console.log(error);
	}
};
