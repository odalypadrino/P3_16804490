import { body } from "express-validator";

export const createCategoryeValidator = [
	body("name").trim().notEmpty().isString().isLength({ min: 3 }),
];
