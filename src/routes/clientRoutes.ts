import express from "express";

import {
	client_credicardPage,
	client_dashboardPage,
	client_loginPage,
	client_pay_confirmPage,
	client_registerPage,
	mainPage,
	registerClientController,
} from "../controllers/clientController";

import { createClienteValidator } from "../validators/ClientValidator";

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

export default router;
