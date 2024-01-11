import { body } from "express-validator";
import { getProductById_Service } from "../services/productService";

const creditCardNumberRegex =
	/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

const cvvRegex = /^[0-9]{3,4}$/;

const formatearNumero = (numero: string) => {
	if (numero.length === 2 && parseInt(numero) >= 1 && parseInt(numero) <= 12)
		return numero;

	if (numero.length === 1 && parseInt(numero) > 0) return `0${numero}`;

	return 1;
};

export const CredicardValidator = [
	body("full-name").notEmpty().isString().trim(),

	body("card-number")
		.trim()
		.notEmpty()
		.isString()
		.isCreditCard()
		.custom((value) => creditCardNumberRegex.test(value)),

	body("expiration-month")
		.trim()
		.notEmpty()
		.isString()
		.isNumeric({ no_symbols: true })
		.customSanitizer(formatearNumero),

	body("expiration-year")
		.trim()
		.notEmpty()
		.isString()
		.isNumeric({ no_symbols: true }),

	body("cvv")
		.trim()
		.notEmpty()
		.isString()
		.isNumeric()
		.custom((v) => cvvRegex.test(v)),

	body("productId")
		.trim()
		.notEmpty()
		.isString()
		.isNumeric()
		.custom(async (v) => await getProductById_Service(v)),

	body("quantity")
		.trim()
		.notEmpty()
		.isString()
		.isNumeric()
		.toInt()
		.isInt({ min: 1 }),
];
