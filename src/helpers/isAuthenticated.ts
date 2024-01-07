import { NextFunction, Request, Response } from "express";
import { RoutesLinks } from "../config/RoutesLinks";
import { ClientAttributes } from "../../types";
import { ROOT_USER } from "../config";

// Todo diferenciar entre root y cliente

export const isAdminAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuthenticated()) return res.redirect(RoutesLinks.admin.login);

	const { email } = req.user as ClientAttributes;

	if (email !== ROOT_USER) return res.redirect(RoutesLinks.client.landing);

	return next();
};

export const isClientAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) return next();

	res.redirect(RoutesLinks.client.login);
};
