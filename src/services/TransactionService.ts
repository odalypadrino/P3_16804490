import { TransactionAttributes } from "../../types";
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
		return await TransactionModel.findAll();
	} catch (error) {
		console.log(error);

		throw new Error("Error al obtener las transacciones");
	}
};
