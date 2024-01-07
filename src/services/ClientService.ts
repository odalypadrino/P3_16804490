import { ClientAttributes } from "../../types";
import ClientModel from "../models/Client.model";

export const createClient_Service = async (data: ClientAttributes) => {
	try {
		const newClient = await ClientModel.create(data);
		return newClient;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getClient_By_Id_Service = async (id: string | number) => {
	try {
		const newClient = await ClientModel.findByPk(id);

		return newClient;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getClient_By_Email_Service = async (email: string) => {
	try {
		const client = await ClientModel.findOne({ where: { email } });

		return client;
	} catch (error) {
		console.log(error);
		return null;
	}
};
