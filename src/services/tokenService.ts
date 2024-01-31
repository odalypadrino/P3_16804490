import jwt from "jsonwebtoken";

import { SECRET_WORD } from "../config";
import { TokenPassword } from "../../types";

export const crearToken = (userId: number, expDate: Date) => {
	const payload = {
		userId: userId,
		exp: expDate.getTime() / 1000,
	};
	const secretKey = SECRET_WORD;
	const token = jwt.sign(payload, secretKey);
	return token;
};

export const validarYExtraerDatos = (token: string) => {
	try {
		const secretKey = SECRET_WORD;
		const decoded = jwt.verify(token, secretKey) as TokenPassword;
		return {
			userId: decoded.userId,
			expDate: new Date(decoded.exp * 1000),
		};
	} catch (error: any) {
		if (error.name === "TokenExpiredError") {
			throw new Error("El token ha expirado");
		} else if (error.name === "JsonWebTokenError") {
			throw new Error("Token inválido");
		} else {
			throw new Error("Error al decodificar el token");
		}
	}
};
