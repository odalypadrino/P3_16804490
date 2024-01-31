export const EmailSubjects = {
	clientRegister: "Registro en ODALY SPORT",
	buyProduct: "Compra Realizada",
	recoverPassword: "Recuperacion de contraseña",
};

const EmailMsg = {
	clientRegister: (name: string) =>
		`Hola ${name}, Bienvenid@ a ODALY SPORT, gracias por depositar tu confianza en nosotros al crear una cuenta con la que podrás equiparte con todos los atuendos deportivos que necesites para seguir con tus excelentes actividades físicas.`,

	buyProduct: (
		clientName: string,
		productName: string,
		quantity: number,
		total: number
	) =>
		`De parte de ODALY SPORT, te damos gracias ${clientName} por la compra de ${quantity} ${productName} por un total de ${total} $ esperamos que la disfrute y le saque el máximo provecho.`,

	recoverPassword: (clientName: string, link: string) =>
		`Hola ${clientName}, Se ha solicitado una recuperación de contraseña accede al siguiente link para recuperarla  <br>
		<a href="${link}">${link}</a> <br> Si no has sido tu ignora este mensaje`,
};

export default EmailMsg;
