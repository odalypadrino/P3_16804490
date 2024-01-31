import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import RouterRender, { RoutesLinks } from "../config/RoutesLinks";

import { getProductById_Service } from "../services/productService";

import {
	createClient_Service,
	getClient_By_Email_Service,
	getClient_By_Id_Service,
	setPasswordClient_Servicer,
} from "../services/ClientService";
import { ClientAttributes, CredicardConfirmPayData } from "../../types";
import { clientNavBarLinks } from "../config/NavBarLinks";
import { createPay } from "../Libs/credicard.api";
import { CodeErrorPaymentApiResponse, Currency } from "../../enum";
import {
	createTransactionService,
	getAllTransaction_ByClient_Service,
} from "../services/TransactionService";
import { ROOT_USER } from "../config";
import {
	sendBuyProductEmail,
	sendRecoverPassword,
	sendRegisterEmail,
} from "../services/emailService";
import { validarYExtraerDatos } from "../services/tokenService";

export const mainPage = async (_req: Request, res: Response) => {
	return res.redirect(RoutesLinks.client.landing);

	// const products = await getAllProducts_Service();

	// const filters = await getQueryFilters_service();

	// res.render(RouterRender.client.landing, {
	// 	products,
	// 	RoutesLinks,
	// 	QueryData: {
	// 		query: { text: "", brand: "", size: "", categoryId: "" },
	// 		filters,
	// 	},
	// });
};

export const loginPage = async (_req: Request, res: Response) =>
	res.render(RouterRender.client.login, {
		RoutesLinks,
	});

export const client_loginPage = async (_req: Request, res: Response) =>
	res.render(RouterRender.client.client_login, {
		RoutesLinks,
	});

export const client_dashboardPage = async (req: Request, res: Response) => {
	try {
		const userData = req.user as ClientAttributes;

		const transaction = await getAllTransaction_ByClient_Service(userData.id);

		return res.render(RouterRender.client.dashboard, {
			RoutesLinks,
			transaction,
			NavbarLinks: clientNavBarLinks.dashboard,
			userData,
		});
	} catch (error) {
		return res.redirect(RoutesLinks.client.landing);
	}
};

export const client_registerPage = async (req: Request, res: Response) => {
	try {
		let errors = req.query.errors as string;

		try {
			errors = errors ? JSON.parse(errors) : [];
		} catch (error) {
			error = [];
		}

		return res.render(RouterRender.client.client_register, {
			RoutesLinks,
			errors,
		});
	} catch (error) {}
};

export const client_credicardPage = async (req: Request, res: Response) => {
	const userData = req.user as ClientAttributes;
	const { productId, quantity } = req.body;

	try {
		if (userData.email === ROOT_USER)
			return res.redirect(`${RoutesLinks.client.product}/${productId}`);

		const product = await getProductById_Service(parseInt(productId));

		const cant = quantity <= 0 ? 1 : quantity;

		const total = product ? product.cost * cant : 0;

		res.render(RouterRender.client.credicard, {
			RoutesLinks,
			NavbarLinks: userData
				? clientNavBarLinks.landing_loggedIn
				: clientNavBarLinks.landing,
			userData,
			product,
			quantity: cant,
			total,
		});
	} catch (error) {
		return res.redirect(RoutesLinks.client.landing);
	}
};

export const client_pay_confirmPage = async (req: Request, res: Response) => {
	const result = validationResult(req);

	if (result.array().length)
		console.log(
			"************ errores en datos del pago ************",
			result.array()
		);

	const userData = req.user as ClientAttributes;
	const dataForm = matchedData(req) as CredicardConfirmPayData;
	const { quantity, productId } = dataForm;

	try {
		if (!result.isEmpty()) throw new Error("Error en los datos del pago");

		if (!userData) return res.redirect(RoutesLinks.client.login);

		if (userData.email === ROOT_USER)
			return res.redirect(`${RoutesLinks.client.product}/${productId}`);

		const product = await getProductById_Service(productId);
		if (!product) throw new Error("Producto no existe");

		const cant = quantity <= 0 ? 1 : quantity;
		const total = product ? product.cost * cant : 1;

		const tdata = await createPay({
			...dataForm,
			amount: total,
			currency: Currency.USD,
			description: `Compra de "${product?.name}"`,
			reference: "",
		});

		console.log(tdata);

		const transaction = await createTransactionService({
			...tdata,
			clientId: userData.id,
			productId,
			quantity: cant,
			ipcliente: `${req.ip}`,
			success: true,
			delivered: false,
			error: CodeErrorPaymentApiResponse.approved,
		});

		if (!transaction) throw new Error("Error al crear transaccion");

		await sendBuyProductEmail(userData, transaction, product);

		return res.render(RouterRender.client.pay_confirm, {
			RoutesLinks,
			NavbarLinks: userData
				? clientNavBarLinks.landing_loggedIn
				: clientNavBarLinks.landing,
			userData,
			data: { success: true, product },
		});
	} catch (error: any) {
		return res.render(RouterRender.client.pay_confirm, {
			RoutesLinks,
			NavbarLinks: userData
				? clientNavBarLinks.landing_loggedIn
				: clientNavBarLinks.landing,
			userData,
			data: {
				success: false,
				message: error,
				link: `${RoutesLinks.client.product}/${dataForm.productId}`,
			},
		});
	}
};

// *************************** recuperar contrasena ***************************

export const client_recoverPasswordPage = async (
	_req: Request,
	res: Response
) =>
	res.render(RouterRender.client.recover_password, {
		RoutesLinks,
	});

// recibir correo y enviar link de recuperacion
export const client_recoverPasswordSendEmail = async (
	req: Request,
	res: Response
) => {
	const { email } = req.body;
	const result = validationResult(req);

	if (result.array().length) {
		console.log("************ errores de registro ************");
		console.log(result.array());
	}
	// revisa tu correo electronico
	if (!result.isEmpty())
		return res.render(RouterRender.client.recover_password_Link_Sended, {
			email,
		});

	try {
		const user = await getClient_By_Email_Service(email);

		if (user) await sendRecoverPassword(user);

		return res.render(RouterRender.client.recover_password_Link_Sended, {
			email,
		});
	} catch (error) {
		res.redirect(RoutesLinks.client.register);
	}
};

// pagina para colocar la contrasena
export const client_recoverPasswordSetPasswordPage = async (
	req: Request,
	res: Response
) => {
	const { token } = req.params;

	try {
		const { userId } = validarYExtraerDatos(token);

		const user = await getClient_By_Id_Service(userId);

		if (!user) return res.redirect(RoutesLinks.client.register);

		const { email } = user;

		return res.render(RouterRender.client.recover_password, {
			RoutesLinks,
			email,
			token,
		});
	} catch (error) {
		return res.redirect(RoutesLinks.client.register);
	}
};

// recibir nueva contrasena
export const client_recoverPasswordSetPassword = async (
	req: Request,
	res: Response
) => {
	const { token } = req.params;
	const { password } = matchedData(req) as {
		password: string;
		repeatPassword: string;
	};

	const result = validationResult(req);

	if (result.array().length) {
		console.log("************ errores de registro ************");
		console.log(result.array());
	}

	if (!result.isEmpty())
		return res.redirect(`${RoutesLinks.client.recover_password}/${token}`);

	try {
		const { userId } = validarYExtraerDatos(token);

		const user = await getClient_By_Id_Service(userId);

		if (!user) return res.redirect(RoutesLinks.client.register);

		const { id } = user;
		// todo: change password

		const result = await setPasswordClient_Servicer(id, password);
		console.log(result);

		return res.redirect(RoutesLinks.client.login);
	} catch (error) {
		if (!result.isEmpty())
			return res.redirect(`${RoutesLinks.client.recover_password}/${token}`);
	}
};
// *********************************************************
// 													API
// *********************************************************

export const registerClientController = async (req: Request, res: Response) => {
	const result = validationResult(req);

	if (result.array().length) {
		console.log("************ errores de registro ************");
		console.log(result.array());
	}

	if (!result.isEmpty())
		return res.redirect(
			`${RoutesLinks.client.register}/?errors=${JSON.stringify(
				result.array().map((v) => v.msg)
			)}`
		);

	try {
		const data = matchedData(req) as ClientAttributes;

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(data.password, salt);

		await createClient_Service({
			...data,
			password: hash,
		});

		await sendRegisterEmail(data);

		return res.redirect(RoutesLinks.client.login);
	} catch (error) {
		res.redirect(RoutesLinks.client.register);
	}
};

export const loginClientController = async (req: Request, res: Response) => {
	const result = validationResult(req);

	console.log(result.array());

	if (!result.isEmpty())
		return res.redirect(RoutesLinks.client.client_register);

	try {
		const data = matchedData(req) as ClientAttributes;

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(data.password, salt);

		const client = await createClient_Service({
			...data,
			password: hash,
		});

		console.log(client);

		res.redirect(RoutesLinks.client.login);
	} catch (error) {
		res.redirect(RoutesLinks.client.client_register);
	}
};
