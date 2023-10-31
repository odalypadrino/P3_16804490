import express from "express";
import { loginPage, mainPage } from "../controllers/indexController";
const router = express.Router();

/* GET home page. */
router.get("/", mainPage);
router.get("/login", loginPage);

export default router;
