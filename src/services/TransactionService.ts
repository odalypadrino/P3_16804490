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
