import { Router } from "express";
import {
	createProduct_controller,
	getAllProduct_controller,
	productFormById_controller,
	productForm_controller,
	updateProduct_controller,
} from "../controllers/productsController";

const router = Router();

/* GET home page. */
router.get("/", getAllProduct_controller);
router.get("/form", productForm_controller);
router.get("/form/:id", productFormById_controller);
router.post("/create", createProduct_controller);
router.post("/update/:id", updateProduct_controller);

export default router;
