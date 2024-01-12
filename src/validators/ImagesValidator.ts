import { body } from "express-validator";

export const createImagesValidator = [
	body("url").notEmpty().isString().trim().isURL(),
];
