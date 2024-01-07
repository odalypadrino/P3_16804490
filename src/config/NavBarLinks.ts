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
