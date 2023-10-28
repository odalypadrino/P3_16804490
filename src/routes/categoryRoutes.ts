import { Router } from "express";
import {
	categoryFormById_controller,
	categoryForm_controller,
	createCategory_controller,
	getAllCategory_controller,
	updateCategory_controller,
} from "../controllers/categoriesController";

const router = Router();

/* GET home page. */
router.get("/", getAllCategory_controller);
router.get("/form", categoryForm_controller);
router.get("/form/:id", categoryFormById_controller);
router.post("/create", createCategory_controller);
router.post("/update/:id", updateCategory_controller);

export default router;
