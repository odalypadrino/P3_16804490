import {
	ClientAttributes,
	ProductAttributes,
	TransactionAttributes,
} from "../../types";
import { sendEmail } from "../Libs/EmailSender";
import { URL_SERVER } from "../config";
import EmailMsg, { EmailSubjects } from "../config/EmailMessages";
import { RoutesLinks } from "../config/RoutesLinks";
import ClientModel from "../models/Client.model";
import ProductModel from "../models/Product.model";
import TransactionModel from "../models/Transaction.model";
import { crearToken } from "./tokenService";

export const sendRegisterEmail = async (user: ClientAttributes) => {
	const { email, name, lastName } = user;
	try {
		await sendEmail(
			email,
			EmailSubjects.clientRegister,
			EmailMsg.clientRegister(`${name} ${lastName}`)
		);
	} catch (error) {
		console.log(error);
	}
};

export const sendBuyProductEmail = async (
	user: ClientAttributes | ClientModel,
	transaction: TransactionModel | TransactionAttributes,
	product: ProductAttributes | ProductModel
) => {
	const { name, lastName, email } = user;
	const { amount, quantity } = transaction;
	const { name: prodName } = product;

	try {
		await sendEmail(
			email,
			EmailSubjects.buyProduct,
			EmailMsg.buyProduct(`${name} ${lastName}`, prodName, quantity, amount)
		);
	} catch (error) {
		console.log(error);
	}
};

export const sendRecoverPassword = async (
	user: ClientAttributes | ClientModel
) => {
	const { id, email, name, lastName } = user;

	try {
		const token = crearToken(id, new Date(Date.now() + 86400000));

		const link = `${URL_SERVER}${RoutesLinks.client.recover_password}/${token}`;

		await sendEmail(
			email,
			EmailSubjects.recoverPassword,
			EmailMsg.recoverPassword(`${name} ${lastName}`, link)
		);
	} catch (error) {
		console.log(error);
	}
};
