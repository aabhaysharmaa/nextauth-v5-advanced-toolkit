
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_SECRET_KEY)

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorEmail = async (email: string, code: string) => {
	try {
		await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject: "2FA Verification",
			html: `Your 2FA code : ${code}`
		})


	} catch (error) {
		console.log("Error in sendTwoFactorEmail ", error)
	}
}



export const sendPasswordResetEmail = async (email: string, token: string) => {
	try {
		const resetEmail = `${domain}/auth/newPassword?token=${token}`;

		await resend.emails.send({
			to: email,
			from: "onboarding@resend.dev",
			subject: "Password Verification email",
			html: `Click <a href="${resetEmail}">Here</a> to verify `
		})
	} catch (error) {
		console.log("Error in sendPasswordResetEmail :", error)
	}
}

export const sendVerificationEmail = async (email: string, token: string) => {
	try {
		const verificationEmail = `${domain}/auth/newVerification?token=${token}`;

		await resend.emails.send({
			to: email,
			from: "onboarding@resend.dev",
			subject: "Verify Your Email",
			html: `<p>Click <a href="${verificationEmail}">Here</a> to verify email</p>`
		})
	} catch (error) {
		console.log("Error in sendVerificationEmail : ", error)
	}
}