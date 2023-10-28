import { Request, Response } from "express";

import { Category } from "../../types";
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

		res.render("dashboard/categoryList", { categories });
	} catch (error) {}
};

export const categoryForm_controller = async (_req: Request, res: Response) => {
	try {
		res.render("dashboard/categoryForm", { data: null });
	} catch (error) {}
};

export const categoryFormById_controller = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const category = await getCategoryById_Service(id);
		res.render("dashboard/categoryForm", { data: category });
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

		res.redirect("/category");
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

		res.redirect("/category");
	} catch (error) {
		console.log(error);
	}
};
