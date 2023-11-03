import { NextFunction, Request, Response } from "express";
import { RoutesLinks } from "../config/RoutesLinks";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next();

	res.redirect(RoutesLinks.client.login);
};

export default isAuthenticated;
