import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import { getAllProducts_Service } from "../services/productService";

export const mainPage = async (_req: Request, res: Response) => {
	const products = await getAllProducts_Service();
	res.render(RouterRender.dashboard.index, { products, RoutesLinks });
};
