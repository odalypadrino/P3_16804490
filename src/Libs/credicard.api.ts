import axios from "axios";
import { PAYMENT_API_KEY, PAYMENT_URL } from "../config";
import {
	PaymentDataToSendToApi,
	// failePaymentResponse,
	successPaymentResponse,
	transactionData,
} from "../../types";
import { CodeErrorPaymentApiResponse } from "../../enum";

const config = {
	maxBodyLength: Infinity,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${PAYMENT_API_KEY}`,
	},
};

export const createPay = async (
	d:PaymentDataToSendToApi
): Promise<transactionData> => {
	try {
		const response = await axios.post(PAYMENT_URL, d, config);

		const resData: successPaymentResponse = response.data;

		console.log(resData.message);
		return resData.data;
	} catch (error: any) {
		const { code } = error.response.data;

		if (code === CodeErrorPaymentApiResponse.rejectd)
			throw new Error("Pago rechazado");

		if (code === CodeErrorPaymentApiResponse.error)
			throw new Error("Error de pago");

		if (code === CodeErrorPaymentApiResponse.insufficientFunds)
			throw new Error("Fondo insuficiente");

		throw new Error("Error desconocido");
	}
};
