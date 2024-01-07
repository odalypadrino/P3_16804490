import express, { Request, Response } from "express";
import {
	mainPage,
	productPage,
	searhPage,
} from "../controllers/indexController";

const router = express.Router();

/* GET home page. */
router.get("/", mainPage);
router.get("/search", searhPage);
router.get("/product/:productId", productPage);

router.get("/sign_out", (req: Request, res: Response) => {
	req.logout(() => {});

	res.redirect("/");
});

export default router;
