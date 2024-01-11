import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import { getProductCount_service } from "../services/productService";
import { getCategoryCount_service } from "../services/categoryService";
import { adminNavBarLinks } from "../config/NavBarLinks";

export const admin_loginPage = async (_req: Request, res: Response) => {
	try {
		return res.render(RouterRender.admin.login, {
			RoutesLinks,
		});
	} catch (error) {
		console.log(error);
	}
	// const products = await getAllProducts_Service();
};

export const adminDashboardPage = async (req: Request, res: Response) => {
	try {
		const userData = req.user;

		const productCount = await getProductCount_service();
		const categoryCount = await getCategoryCount_service();
		
		return res.render(RouterRender.admin.index, {
			productCount,
			categoryCount,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.admin.login);
	}
};
