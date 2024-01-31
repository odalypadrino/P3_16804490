import express from "express";

import {
	client_credicardPage,
	client_dashboardPage,
	client_loginPage,
	client_pay_confirmPage,
	client_recoverPasswordPage,
	client_recoverPasswordSendEmail,
	client_recoverPasswordSetPassword,
	client_recoverPasswordSetPasswordPage,
	client_registerPage,
	mainPage,
	registerClientController,
} from "../controllers/clientController";

import {
	RecoverPasswordClientValidator,
	RecoverPassword_SetPassword_ClientValidator,
	createClienteValidator,
} from "../validators/ClientValidator";

import { autenticateClientMidleware } from "../services/authService";
import { isClientAuthenticated } from "../helpers/isAuthenticated";
import { CredicardValidator } from "../validators/CredicardValidator";

// import autenticateMidleware from "../services/authService";

const router = express.Router();

/* GET home page. */
router.get("/", mainPage);

router.get("/login", client_loginPage);
router.post("/login", autenticateClientMidleware);

router.get("/dashboard", isClientAuthenticated, client_dashboardPage);

// todo: validar datos de la tarjeta de credito
router.post("/credicard", isClientAuthenticated, client_credicardPage);

router.post(
	"/pay_confirm",
	isClientAuthenticated,
	CredicardValidator,
	client_pay_confirmPage
);

router.get("/register", client_registerPage);
router.post("/register", createClienteValidator, registerClientController);
// router.post("/login", autenticateMidleware);

// *************************** recuperar contrasena ***************************
// colocar correo
router.get("/recover_password", client_recoverPasswordPage);

router.post(
	"/recover_password",
	RecoverPasswordClientValidator,
	client_recoverPasswordSendEmail
);

// colocar contrasena
router.get("/recover_password/:token", client_recoverPasswordSetPasswordPage);

router.post(
	"/recover_password/:token",
	RecoverPassword_SetPassword_ClientValidator,
	client_recoverPasswordSetPassword
);

export default router;
