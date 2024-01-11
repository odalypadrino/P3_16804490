import { Router } from "express";
import {
	createProduct_controller,
	productListPage_controller,
	productFormPage_ById_controller,
	productFormPage_controller,
	updateProduct_controller,
} from "../controllers/productsController";
import {
	createImage_controller,
	deleteImage_controller,
	featuredImage_controller,
	imageFormPage_controller,
} from "../controllers/imagesController";
import { isAdminAuthenticated } from "../helpers/isAuthenticated";

const router = Router();

/* GET home page. */
router.get("/", isAdminAuthenticated, productListPage_controller);
router.get("/form", isAdminAuthenticated, productFormPage_controller);

router.get("/form/:id", isAdminAuthenticated, productFormPage_ById_controller);

// imagenes
router.get(
	"/form/:productId/image",
	isAdminAuthenticated,
	imageFormPage_controller
);
router.post(
	"/form/:productId/image",
	isAdminAuthenticated,
	createImage_controller
);
router.get(
	"/form/:productId/image/:id/delete",
	isAdminAuthenticated,
	deleteImage_controller
);
router.get(
	"/form/:productId/image/:id/featured",
	isAdminAuthenticated,
	featuredImage_controller
);

router.post("/create", isAdminAuthenticated, createProduct_controller);
router.post("/update/:id", isAdminAuthenticated, updateProduct_controller);

export default router;
