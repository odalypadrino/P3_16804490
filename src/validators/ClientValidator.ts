import { body } from "express-validator";
import ClientModel from "../models/Client.model";
import axios from "axios";
import { RECAPTCHA_SECRET } from "../config";

export const createClienteValidator = [
	body("g-recaptcha-response")
		.notEmpty()
		.isString()
		.custom(async (v) => {
			try {
				console.log(RECAPTCHA_SECRET);

				const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${v}`;

				const r = await axios.post(url);

				if (!r.data.success) throw new Error("reCAPTCHA invalido");
			} catch (error) {
				console.log(error);

				throw new Error("error al validar el reCAPTCHA");
			}
		}),

	body("name").notEmpty().isString().trim().isLength({ min: 3 }),

	body("lastName").notEmpty().isString().trim().isLength({ min: 3 }),

	body("email")
		.notEmpty()
		.isString()
		.trim()
		.isEmail()
		.custom(async (value) => {
			try {
				const client = await ClientModel.findOne({ where: { email: value } });
				if (client) {
					throw new Error("E-mail already in use");
				}
			} catch (error) {
				throw new Error("Error verificar correo disponible");
			}
		}),

	body("password").notEmpty().isString(),

	body("repeatPassword")
		.notEmpty()
		.isString()
		.custom((value, { req }) => {
			console.log(value, req.body.password);

			if (value != req.body.password) throw new Error("password not equal");

			return true;
		}),

	body("birthday")
		.notEmpty()
		.isString()
		.customSanitizer((value) => {
			try {
				return new Date(value);
			} catch (error) {
				return null;
			}
		}),
	body("phoneNumber").notEmpty().isString().trim().isMobilePhone("any"),
];
