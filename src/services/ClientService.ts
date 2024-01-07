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