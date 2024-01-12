import { body } from "express-validator";
import axios from "axios";
import { RECAPTCHA_SECRET, ROOT_USER } from "../config";
import { getClient_By_Email_Service } from "../services/ClientService";

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

	body("name").trim().notEmpty().isString().isLength({ min: 3 }),

	body("lastName").notEmpty().isString().trim().isLength({ min: 3 }),

	body("email")
		.trim()
		.notEmpty()
		.isString()
		.isEmail()
		.custom(async (value) => {
			if (value === ROOT_USER) throw new Error("es el correo del root");

			try {
				const client = await getClient_By_Email_Service(value);

				console.log(client?.name);

				if (client) throw new Error("E-mail already in use");
			} catch (error) {
				throw new Error("E-mail already in use");
			}

			return true;
		}),

	body("password").notEmpty().isString(),

	body("repeatPassword")
		.notEmpty()
		.isString()
		.custom((value, { req }) => {
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

	body("phoneNumber").trim().notEmpty().isString().isMobilePhone("any"),

	body("perfilImage").optional().isString().trim().isURL(),
];
