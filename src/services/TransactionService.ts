import { TransactionAttributes } from "../../types";
import ClientModel from "../models/Client.model";
import ImagesModel from "../models/Images.model";
import ProductModel from "../models/Product.model";
import TransactionModel from "../models/Transaction.model";

export const createTransactionService = async (
	data: Omit<TransactionAttributes, "id">
) => {
	try {
		const d = data as TransactionAttributes;

		await TransactionModel.create(d);
	} catch (error) {
		console.log(error);
	}
	console.log(data);
};

export const getAllTransactionService = async () => {
	try {
		const transacciones = await TransactionModel.findAll({
			include: [
				{ model: ClientModel, as: "client" },
				{ model: ProductModel, as: "product", include: [ImagesModel] },
			],
		});

		return transacciones;
	} catch (error) {
		console.log(error);

		throw new Error("Error al obtener las transacciones");
	}
};

export const getAllTransaction_ByClient_Service = async (clientId: number) => {
	try {
		const transacciones = await TransactionModel.findAll({
			where: { clientId },
			include: [
				{ model: ClientModel, as: "client" },
				{ model: ProductModel, as: "product", include: [ImagesModel] },
			],
		});

		return transacciones;
	} catch (error) {
		console.log(error);

		throw new Error("Error al obtener las transacciones");
	}
};

export const getTransactionsCount_service = async () => {
	try {
		return await TransactionModel.count();
	} catch (error) {
		console.log(error);
		return 0;
	}
};
