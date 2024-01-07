import express from "express";
import {
	adminDashboardPage,
	admin_loginPage,
} from "../controllers/adminController";
import isAuthenticated from "../helpers/isAuthenticated";
import { autenticateAdminMidleware } from "../services/authService";
const router = express.Router();

/* GET home page. */
router.get("/dashboard", isAuthenticated, adminDashboardPage);

router.get("/login", admin_loginPage);
router.post("/login", autenticateAdminMidleware);

export default router;
