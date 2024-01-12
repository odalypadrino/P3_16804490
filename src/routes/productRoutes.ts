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
import { createProductValidator } from "../validators/ProductValidator";
import { createImagesValidator } from "../validators/ImagesValidator";

const router = Router();

/* GET home page. */
router.get("/", isAdminAuthenticated, productListPage_controller);
router.get(
	"/form",
	isAdminAuthenticated,

	productFormPage_controller
);

router.get(
	"/form/:id",
	isAdminAuthenticated,

	productFormPage_ById_controller
);

// ***************** imagenes *****************
// pagina
router.get(
	"/form/:productId/image",
	isAdminAuthenticated,
	imageFormPage_controller
);

//añadir imagen
router.post(
	"/form/:productId/image",
	isAdminAuthenticated,
	createImagesValidator,
	createImage_controller
);

// eliminar
router.get(
	"/form/:productId/image/:id/delete",
	isAdminAuthenticated,
	deleteImage_controller
);

// colocar como destacada
router.get(
	"/form/:productId/image/:id/featured",
	isAdminAuthenticated,
	featuredImage_controller
);

// crear y actualizar productos
router.post(
	"/create",
	isAdminAuthenticated,
	createProductValidator,
	createProduct_controller
);
router.post(
	"/update/:id",
	isAdminAuthenticated,
	createProductValidator,
	updateProduct_controller
);

export default router;
