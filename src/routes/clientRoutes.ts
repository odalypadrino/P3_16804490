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

// import autenticateMidleware from "../services/authService";

const router = express.Router();

/* GET home page. */
router.get("/", mainPage);

router.get("/login", client_loginPage);
router.post("/login", autenticateClientMidleware);

router.get("/dashboard", client_dashboardPage);
router.post("/credicard", client_credicardPage);
router.post("/pay_confirm", client_pay_confirmPage);

router.get("/register", client_registerPage);
router.post("/register", createClienteValidator, registerClientController);
// router.post("/login", autenticateMidleware);

export default router;
