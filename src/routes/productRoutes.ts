import { Router } from "express";
import {
	createProduct_controller,
	getAllProduct_controller,
	productFormById_controller,
	productForm_controller,
	updateProduct_controller,
} from "../controllers/productsController";
import {
	createImage_controller,
	deleteImage_controller,
	featuredImage_controller,
	imageForm_controller,
} from "../controllers/imagesController";

const router = Router();

/* GET home page. */
router.get("/", getAllProduct_controller);
router.get("/form", productForm_controller);

router.get("/form/:id", productFormById_controller);

// imagenes
router.get("/form/:productId/image", imageForm_controller);
router.post("/form/:productId/image", createImage_controller);
router.get("/form/:productId/image/:id/delete", deleteImage_controller);
router.get("/form/:productId/image/:id/featured", featuredImage_controller);

router.post("/create", createProduct_controller);
router.post("/update/:id", updateProduct_controller);

export default router;
