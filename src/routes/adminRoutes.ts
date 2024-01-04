import express from "express";
import { mainPage } from "../controllers/dashboardController";
import isAuthenticated from "../helpers/isAuthenticated";
const router = express.Router();

/* GET home page. */
router.get("/", isAuthenticated, mainPage);

export default router;
