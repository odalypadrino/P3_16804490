import nodemailer from "nodemailer";
import { SENDER_EMAIL, SENDER_EMAIL_PASSWORD } from "../config";

export const sendEmail = async (to: string, subject: string, html: string) => {
	let transporter = nodemailer.createTransport({
		service: "hotmail",
		auth: {
			user: SENDER_EMAIL,
			pass: SENDER_EMAIL_PASSWORD,
		},
	});

	let mailOptions = {
		from: `Odaly Sport ${SENDER_EMAIL}`,
		to,
		subject,
		html,
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		console.log("Correo electrónico enviado: " + info.response);
	} catch (error) {
		console.log(error);
	}
};
