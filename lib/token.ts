import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuidV4 } from "uuid";
import prisma from "@/lib/prismaDb";

import { getNewPasswordTokenByEmail } from "@/data/newPasswordToken";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorVerification";

export const generateTwoFactorConformationByEmail = async (email: string) => {
	try {
		const token = crypto.randomInt(100_000, 1_000_000).toString();
		console.log("Crypto Token : ", token)
		const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

		const existingToken = await getTwoFactorTokenByEmail(email);
		if (existingToken) {
			await prisma.twoFactorToken.delete({ where: { id: existingToken.id } })
		}
		const twoFactorToken = await prisma.twoFactorToken.create({
			data: {
				token,
				email,
				expires
			}
		})
		return twoFactorToken
	} catch (error) {
		console.log("Error in  generateTwoFactorConformationByEmail", error)
		return null;
	}
}

export const generateVerificationTokenByEmail = async (email: string) => {
	try {
		const token = uuidV4()
		const expires = new Date(new Date().getTime() + 3600 * 1000);

		const existingToken = await getVerificationTokenByEmail(email);
		if (existingToken) {
			await prisma?.verificationToken.delete({ where: { id: existingToken?.id } })
		}

		const verificationToken = await prisma.verificationToken.create({
			data: {
				email,
				token,
				expires
			}
		})
		return verificationToken
	} catch (error) {
		console.log("generateTokenByEmail", error)
		return null
	}
}


export const generateResetPasswordTokenByEmail = async (email: string) => {
	try {
		const token = uuidV4();

		const existingToken = await getNewPasswordTokenByEmail(email);
		const expires = new Date(new Date().getTime() + 3600 * 1000);
		if (existingToken) {
			await prisma.passwordResetToken.deleteMany({ where: { email: existingToken.email } });
		}

		const newToken = await prisma.passwordResetToken.create({
			data: {
				token,
				expires,
				email
			}
		})
		console.log({ newToken })
		return newToken
	} catch (error) {
		console.log("generateResetPasswordTokenByEmail", error)
		return null
	}
}

