import { Request, Response } from "express";

export const getProduct_controller = async (_req: Request, res: Response) => {
	try {
		res.render("products");
	} catch (error) {}
};
