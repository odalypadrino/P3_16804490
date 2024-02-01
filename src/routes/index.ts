import express, { Request, Response } from "express";
import {
	mainPage,
	productCreateRating,
	productPage,
	searhPage,
} from "../controllers/indexController";
import { createRatingProductValidator } from "../validators/ProductValidator";

const router = express.Router();

/* GET home page. */
router.get("/", mainPage);
router.get("/search", searhPage);
router.get("/product/:productId", productPage);
router.post(
	"/product/:productId/create_rating",
	createRatingProductValidator,
	productCreateRating
);

router.get("/sign_out", (req: Request, res: Response) => {
	req.logout(() => {});

	res.redirect("/");
});

export default router;
