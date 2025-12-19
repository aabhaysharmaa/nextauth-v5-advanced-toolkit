"use server"

import { getUserByEmail } from "@/data";
import { getVerificationTokenByToken } from "@/data/verificationToken"
import prisma from "@/lib/prismaDb";


export const newVerification = async (token: string) => {
	try {
		const verificationToken = await getVerificationTokenByToken(token);
		if (!verificationToken) {
			return { error: "Token Does not exist's" }
		}

		const hasExpired = new Date(verificationToken.expires) < new Date();
		if (hasExpired) {
			return { error: "Token has expired" }
		};


		const existingUser = await getUserByEmail(verificationToken?.email);
		if (!existingUser || !existingUser?.id) {
			return { error: "User does not exist" }
		}

		if (existingUser.emailVerified) {
			return { success: "Email already verified!" };
		}

		await prisma?.user.update({
			where: { id: existingUser?.id },
			data: {
				emailVerified: new Date(),
				email: existingUser?.email
			}
		})
		if (existingUser.emailVerified) {
			await prisma.verificationToken.delete({
				where: { id: existingUser?.id }
			})

		}
		return { success: "Token is Verified!" }
	} catch (error) {
		console.log("Error on newVerification : ", error)
		return null
	}
}