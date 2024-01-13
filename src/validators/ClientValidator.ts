import { body } from "express-validator";
import axios from "axios";
import { RECAPTCHA_SECRET, ROOT_USER } from "../config";
import { getClient_By_Email_Service } from "../services/ClientService";

export const createClienteValidator = [
	body("g-recaptcha-response")
		.notEmpty()
		.isString()
		.withMessage("Debe ser un Text")
		.custom(async (v) => {
			try {
				console.log(RECAPTCHA_SECRET);

				const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${v}`;

				const r = await axios.post(url);

				if (!r.data.success) throw new Error("reCAPTCHA invalido");
			} catch (error) {
				console.log(error);

				throw new Error("Error al validar el reCAPTCHA");
			}
		}),

	body("name")
		.trim()
		.notEmpty()
		.isString()
		.isLength({ min: 3 })
		.withMessage("El nombre debe ser mínimo 3 caracteres"),

	body("lastName")
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 3 })
		.withMessage("El apellido debe ser mínimo 3 caracteres"),

	body("email")
		.trim()
		.notEmpty()
		.isString()
		.isEmail()
		.withMessage("Correo no valido")
		.custom(async (value) => {
			if (value === ROOT_USER) throw new Error("Correo no valido");

			try {
				const client = await getClient_By_Email_Service(value);

				console.log(client?.name);

				if (client) throw new Error("Correo no valido");
			} catch (error) {
				throw new Error("Correo no valido");
			}

			return true;
		}),

	body("password")
		.notEmpty()
		.isString()
		.withMessage("La contraseña debe ser mínimo 3 caracteres"),

	body("repeatPassword")
		.notEmpty()
		.isString()
		.custom((value, { req }) => {
			if (value != req.body.password)
				throw new Error("Las contraseñas no son iguales");

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

	body("phoneNumber")
		.trim()
		.notEmpty()
		.isString()
		.isMobilePhone("any")

		.withMessage("Numero de teléfono no valido"),

	body("perfilImage")
		.isString()
		.trim()
		.optional({ checkFalsy: true })
		.isURL()
		.withMessage("URL de foto de perfil no es valida "),
];
