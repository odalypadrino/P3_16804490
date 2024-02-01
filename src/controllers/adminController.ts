import { Request, Response } from "express";
import RouterRender, { RoutesLinks } from "../config/RoutesLinks";
import { getProductCount_service } from "../services/productService";
import { getCategoryCount_service } from "../services/categoryService";
import { adminNavBarLinks } from "../config/NavBarLinks";
import {
	getAllClients_Service,
	getClientsCount_service,
} from "../services/ClientService";
import {
	getAllTransactionService,
	getTransactionsCount_service,
} from "../services/TransactionService";
import DefalutResponse from "../config/DefalutResponse";

export const admin_loginPage = async (_req: Request, res: Response) => {
	try {
		return res.render(RouterRender.admin.login, {
			...DefalutResponse,
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
		const clientsCount = await getClientsCount_service();
		const transactionCount = await getTransactionsCount_service();

		return res.render(RouterRender.admin.index, {
			...DefalutResponse,
			productCount,
			categoryCount,
			clientsCount,
			transactionCount,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.admin.login);
	}
};

export const adminClientsListListPage = async (req: Request, res: Response) => {
	try {
		const userData = req.user;
		const clients = await getAllClients_Service();

		return res.render(RouterRender.admin.clientList, {
			...DefalutResponse,
			clients,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.admin.login);
	}
};

export const adminTransactionListListPage = async (
	req: Request,
	res: Response
) => {
	try {
		const userData = req.user;
		const transaction = await getAllTransactionService();

		return res.render(RouterRender.admin.transactionList, {
			...DefalutResponse,
			transaction,
			RoutesLinks,
			NavbarLinks: adminNavBarLinks.default,
			userData,
		});
	} catch (error) {
		console.log(error);

		return res.redirect(RoutesLinks.admin.login);
	}
};
