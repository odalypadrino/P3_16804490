import passport from "passport";
import { Strategy } from "passport-local";
import { ROOT_PASSWORD, ROOT_USER } from "../config";
import { RoutesLinks } from "../config/RoutesLinks";

passport.use(
	new Strategy((username, password, done) => {
		if (username === ROOT_USER && password === ROOT_PASSWORD) {
			return done(null, username);
		}

		done(null, false);
	})
);

passport.serializeUser((username, done) => {
	// a un dato concreto
	done(null, username);
});

passport.deserializeUser((username: string, done) => {
	// buscar en la db
	done(null, username);
});

const autenticateMidleware = passport.authenticate("local", {
	successRedirect: RoutesLinks.admin.index,
	failureRedirect: RoutesLinks.client.login,
});



export default autenticateMidleware;
