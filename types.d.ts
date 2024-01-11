import { CodeErrorPaymentApiResponse, Currency } from "./enum";

export interface ProductAttributes {
	id: number;
	code: string;
	name: string;
	cost: number;
	description: string;
	size: string | null;
	brand: string | null;
	status: string;
	categoryId: number;
}

export interface ImagesAttributes {
	id: number;
	url: string;
	featured: boolean;
	status: string;
	productId: number;
}

export interface CategoryAttributes {
	id: number;
	name: string;
	description: string;
	status: string;
}

export interface ClientAttributes {
	id: number;
	name: string;
	lastName: string;
	email: string;
	password: string;
	birthday: Date;
	phoneNumber: string;
	status: string;
}

export interface TransactionAttributes {
	id: number;
	transaction_id:string
	clientId: number;
	productId: number;
	quantity: number;
	amount: number;
	date: Date;
	ipcliente: string;
	success: boolean;
	error: CodeErrorPaymentApiResponse;
}

export interface QueryProduct {
	text: string | null;
	brand: string | null;
	size: string | null;
	categoryId: string | null;
}

export interface CredicardConfirmPayData {
	"card-number": string;
	cvv: number;
	"expiration-month": number;
	"expiration-year": number;
	"full-name": string;
	productId: number;
	quantity: number;
}
export interface PaymentDataToSendToApi {
	amount: number; // * important
	"card-number": string;
	cvv: number;
	"expiration-month": number;
	"expiration-year": number;
	"full-name": string;
	currency: string; // * important
	description: string;
	reference: string;
}

export interface transactionData {
	transaction_id: string;
	amount: number;
	currency: Currency;
	description: string;
	reference: string;
	date: Date;
}

export interface successPaymentResponse {
	success: boolean;
	message: string;
	data: transactionData;
}
export interface failePaymentResponse {
	success: boolean;
	message: string;
	code: CodeErrorPaymentApiResponse;
}
