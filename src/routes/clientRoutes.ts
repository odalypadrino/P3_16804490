import express from "express";

import {
	client_credicardPage,
	client_loginPage,
	client_registerPage,
	mainPage,
} from "../controllers/clientController";

// import autenticateMidleware from "../services/authService";

const router = express.Router();

/* GET home page. */
router.get("/", mainPage);

router.get("/login", client_loginPage);
router.post("/credicard", client_credicardPage);
router.get("/register", client_registerPage);
// router.post("/login", autenticateMidleware);

export default router;
