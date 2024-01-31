import bcrypt from "bcrypt";
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

export const getAllClients_Service = async () => {
	try {
		const newClient = await ClientModel.findAll();

		return newClient;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getClientsCount_service = async () => {
	try {
		return await ClientModel.count();
	} catch (error) {
		console.log(error);
		return 0;
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

export const setPasswordClient_Servicer = async (
	id: string | number,
	password: string
) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const client = await ClientModel.update(
			{ password: hash },
			{ where: { id } }
		);

		return client;
	} catch (error) {
		console.log(error);
		return null;
	}
};
