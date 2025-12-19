"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data";
import { getTwoFactorConformationById } from "@/data/twoFactorConformation";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorVerification";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prismaDb";
import { generateTwoFactorConformationByEmail, generateVerificationTokenByEmail } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from 'zod';


export const login = async (values: z.infer<typeof LoginSchema>) => {
	try {
		const validateFields = LoginSchema.safeParse(values);
		if (!validateFields.success) {
			return { error: "Invalid fields" }
		}
		const { email, password, code } = validateFields.data

		const user = await getUserByEmail(email);
		if (!user || !user.email) {
			return { error: "user does not exists" }
		}

		if (!user.emailVerified) {
			// const verificationToken = await generateVerificationTokenByEmail(user.email);
			// sendVerificationEmail(verificationToken?.email as string, verificationToken?.token as string)
			return { success: "Conformation email Sent!" }
		}
		if (user.isTwoFactorEnabled && user.email) {
			if (code) {
				const twoFactorToken = await getTwoFactorTokenByEmail(user.email);
				if (!twoFactorToken) return { error: "Invalid Code" }

				if (code !== twoFactorToken.token) return { error: "Invalid Code" }
				const hasExpired = new Date(twoFactorToken.expires) < new Date();

				if (hasExpired) return { error: "Token Expired" }
				await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } })
				const existingConfirmation = await getTwoFactorConformationById(user.id);
				if (existingConfirmation) {
					await prisma.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } })
				}
				await prisma.twoFactorConfirmation.create({
					data: {
						userId: user.id
					}
				})
			} else {
				const twoFactorToken = await generateTwoFactorConformationByEmail(user.email);
				console.log("twoFactorToken : ", twoFactorToken)
				if (!twoFactorToken) {
					return { error: "Invalid Token" }
				}

				sendTwoFactorEmail(user.email, twoFactorToken?.token as string)
				return (
					{ twoFactor: true }

				)
			}
		}
		await signIn("credentials", { email, password, redirect : false ,  })
		return { success: "success" }
	} catch (error) {
		console.log("Error in login Action : ", error);
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials" }

				default: return { error: "Something went Wrong!" }
			}
		}
	}
}

