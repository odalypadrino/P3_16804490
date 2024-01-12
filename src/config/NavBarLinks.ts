import { RoutesLinks } from "./RoutesLinks";

export const clientNavBarLinks = {
	default: [],
	landing: [
		["Admin", RoutesLinks.admin.login],
		["Iniciar sesión", RoutesLinks.client.login],
		["Registrate", RoutesLinks.client.register],
	],
	landing_loggedIn: [],
	dashboard: [],
	credicard: [],
};

export const adminNavBarLinks = {
	default: [
		["Dashboard", RoutesLinks.admin.index],
		["Productos", RoutesLinks.admin.productList],
		["Categorías", RoutesLinks.admin.categoryList],
		["Clientes", RoutesLinks.admin.clientList],
		["Transacciones", RoutesLinks.admin.transactionList],
	],
	landing: [],
	dashboard: [],
};
