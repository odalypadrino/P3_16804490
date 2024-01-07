import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { ROOT_PASSWORD, ROOT_USER } from "../config";
import { RoutesLinks } from "../config/RoutesLinks";
import {
	getClient_By_Email_Service,
	getClient_By_Id_Service,
} from "./ClientService";

passport.use(
	"root",
	new Strategy(
		{ usernameField: "email", passwordField: "password" },
		async (email, password, done) => {
			if (email !== ROOT_USER || password !== ROOT_PASSWORD)
				return done(null, false, { message: "Error in email or password" });

			return done(null, email);
		}
	)
);

passport.use(
	"client",
	new Strategy(
		{ usernameField: "email", passwordField: "password" },
		async (email, password, done) => {
			const client = await getClient_By_Email_Service(email);

			if (!client)
				return done(null, false, { message: "Error in email or password" });

			const result = await bcrypt.compare(password, client.password);

			if (!result)
				return done(null, false, { message: "Error in email or password" });

			return done(null, client.id);
		}
	)
);

passport.serializeUser((userId, done) => {
	// a un dato concreto
	done(null, userId);
});

passport.deserializeUser(async (userId: string, done) => {
	// buscar en la db

	const client =
		userId === ROOT_USER
			? { email: ROOT_USER, name: "Root" }
			: await getClient_By_Id_Service(userId);

	done(null, client);
});

export const autenticateAdminMidleware = passport.authenticate("root", {
	successRedirect: RoutesLinks.admin.index,
	failureRedirect: RoutesLinks.admin.login,
});

export const autenticateClientMidleware = passport.authenticate("client", {
	successRedirect: RoutesLinks.client.dashboard,
	failureRedirect: RoutesLinks.client.login,
});
