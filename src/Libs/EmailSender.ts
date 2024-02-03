import sgMail from "@sendgrid/mail";

import { SENDER_EMAIL, SENDGRID_API_KEY } from "../config";

export const sendEmail = async (to: string, subject: string, html: string) => {
	sgMail.setApiKey(SENDGRID_API_KEY);

	const mailOptions = {
		from: `${SENDER_EMAIL}`,
		to,
		subject,
		html,
	};

	try {
		await sgMail.send(mailOptions);
		console.log("correo enviado");
	} catch (error: any) {
		console.error(error);
		console.log(error.response.body);
	}
};
