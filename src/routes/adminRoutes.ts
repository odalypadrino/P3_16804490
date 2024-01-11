import express from "express";
import {
	adminDashboardPage,
	admin_loginPage,
} from "../controllers/adminController";
import { autenticateAdminMidleware } from "../services/authService";
import { isAdminAuthenticated } from "../helpers/isAuthenticated";
const router = express.Router();

/* GET home page. */
router.get("/login", admin_loginPage);
router.post("/login", autenticateAdminMidleware);

router.get("/dashboard", isAdminAuthenticated, adminDashboardPage);

export default router;
