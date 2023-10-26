import { PORT, NODE_ENV } from "./config";
import app from "./app";
import db from "./db";

const conectToDataBase = async () => {
	try {
		await db.authenticate();
		console.log("conexion exitosa a la base de datos");

		if (NODE_ENV !== "production") {
			await db.sync();
			// await db.sync({ alter: true });
			// await db.sync({ alter: true, force: true });
			
			// await Seed();
		}

		app.listen(PORT);

		console.log(`servidor iniciado exitosamente en el puerto: ${PORT}`);
	} catch (error) {
		throw new Error(`conexion fallida a la base de datos \n ${error}`);
	}
};

conectToDataBase();
