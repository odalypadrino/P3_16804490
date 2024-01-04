import express, { Request, Response } from "express";
import {
	loginPage,
	mainPage,
	productPage,
	searhPage,
} from "../controllers/indexController";
import autenticateMidleware from "../services/authService";
const router = express.Router();

/* GET home page. */
router.get("/", mainPage);
router.get("/search", searhPage);
router.get("/product/:productId", productPage);

router.get("/login", loginPage);
router.post("/login", autenticateMidleware);

router.get("/sign_out", (req: Request, res: Response) => {
	req.logout(() => {});

	res.redirect("/");
});

export default router;
