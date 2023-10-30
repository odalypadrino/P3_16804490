import express from "express";
import { mainPage } from "../controllers/dashboardController";
const router = express.Router();

/* GET home page. */
router.get("/", mainPage);

export default router;
