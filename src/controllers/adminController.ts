import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import { getProductCount_service } from "../services/productService";
import { getCategoryCount_service } from "../services/categoryService";

export const adminDashboardPage = async (_req: Request, res: Response) => {
	const productCount = await getProductCount_service();
	const categoryCount = await getCategoryCount_service();
	res.render(RouterRender.admin.index, {
		productCount,
		categoryCount,
		RoutesLinks,
	});
};

export const admin_loginPage = async (_req: Request, res: Response) => {
	// const products = await getAllProducts_Service();

	res.render(RouterRender.admin.login, { RoutesLinks });
};
