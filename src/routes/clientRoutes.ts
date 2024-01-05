import express from "express";

import {
	client_credicardPage,
	client_dashboardPage,
	client_loginPage,
	client_pay_confirmPage,
	client_registerPage,
	mainPage,
} from "../controllers/clientController";

// import autenticateMidleware from "../services/authService";

const router = express.Router();

/* GET home page. */
router.get("/", mainPage);

router.get("/login", client_loginPage);
router.get("/dashboard", client_dashboardPage);
router.post("/credicard", client_credicardPage);
router.post("/pay_confirm", client_pay_confirmPage);
router.get("/register", client_registerPage);
// router.post("/login", autenticateMidleware);

export default router;
