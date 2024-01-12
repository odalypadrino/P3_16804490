import { Router } from "express";
import {
	categoryFormPage_ById_controller,
	categoryFormPage_controller,
	createCategory_controller,
	categoryListPage_controller,
	updateCategory_controller,
} from "../controllers/categoriesController";
import { isAdminAuthenticated } from "../helpers/isAuthenticated";
import { createCategoryeValidator } from "../validators/CategoryValidator";

const router = Router();

/* GET home page. */
router.get("/", isAdminAuthenticated, categoryListPage_controller);
router.get("/form", isAdminAuthenticated, categoryFormPage_controller);
router.get("/form/:id", isAdminAuthenticated, categoryFormPage_ById_controller);

router.post(
	"/create",
	isAdminAuthenticated,
	createCategoryeValidator,
	createCategory_controller
);

router.post(
	"/update/:id",
	isAdminAuthenticated,
	createCategoryeValidator,
	updateCategory_controller
);

export default router;
