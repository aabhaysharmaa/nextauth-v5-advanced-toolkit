

import prisma from "@/lib/prismaDb";

export const getNewPasswordTokenByEmail = async (email: string) => {
	try {
		const token = await prisma.verificationToken.findFirst({ where: { email } });
		console.log("getNewPasswordTokenByEmail", token)
		return token;
	} catch (error) {
		console.log("Error in getNewPasswordThenByEmail : ", error)
	}
}
export const getNewPasswordTokenByToken = async (token: string) => {
	try {
		const existingToken = await prisma.passwordResetToken.findUnique({ where: { token } });
		return existingToken;
	} catch (error) {
		console.log("Error in getNewPasswordThenByEmail : ", error)
	}
}