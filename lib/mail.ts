
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SECRET_KEY)



export const sendTwoFactorEmail = (email: string, code: string) => {
	try {
		resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject: "2FA Verification",
			html: `Your 2FA code : ${code}`
		})


	} catch (error) {
		console.log("Error in sendTwoFactorEmail ", error)
	}
}



export const sendPasswordResetEmail = (email: string, token: string) => {
	try {
		const resetEmail = `http://localhost:3000/auth/newPassword?token=${token}`;

		resend.emails.send({
			to: email,
			from: "onboarding@resend.dev",
			subject: "Password Verification email",
			html: `Click <a href=${resetEmail}>Here</a> to verify `
		})
	} catch (error) {
		console.log("Error in sendPasswordResetEmail :", error)
	}
}

export const sendVerificationEmail = (email: string, token: string) => {
	try {
		const verificationEmail = `http://localhost:3000/auth/newVerification?token=${token}`;

		resend.emails.send({
			to: email,
			from: "onboarding@resend.dev",
			subject: "Verify Your Email",
			html: `<p>Click <a href=${verificationEmail}>Here</a> to verify email</p>`
		})
	} catch (error) {
		console.log("Error in sendVerificationEmail : ", error)
	}
}