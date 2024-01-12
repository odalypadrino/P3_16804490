import { body } from "express-validator";
import { getCategoryById_Service } from "../services/categoryService";

export const createProductValidator = [
	body("code").trim().notEmpty().isString().isLength({ min: 3 }),
	body("name").trim().notEmpty().isString().isLength({ min: 3 }),
	body("cost")
		.trim()
		.notEmpty()
		.isNumeric({ no_symbols: true })
		.withMessage("No puede ser negativo")
		.toFloat()
		.isLength({ min: 0.01 }),
	body("description").trim().isString(),
	body("size").trim().notEmpty().isString(),
	body("brand").trim().notEmpty().isString(),
	body("categoryId")
		.trim()
		.notEmpty()
		.isNumeric()
		.custom(async (v) => {
			try {
				const c = await getCategoryById_Service(v);

				if (!c) throw new Error("not found");

				return true;
			} catch (error) {
				console.log(error);

				throw new Error("no se encuentra la categoria");
			}
		}),
];
