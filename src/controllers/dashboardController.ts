import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import { getProductCount_service } from "../services/productService";
import { getCategoryCount_service } from "../services/categoryService";

export const mainPage = async (_req: Request, res: Response) => {
	const productCount = await getProductCount_service();
	const categoryCount = await getCategoryCount_service();
	res.render(RouterRender.dashboard.index, {
		productCount,
		categoryCount,
		RoutesLinks,
	});
};
