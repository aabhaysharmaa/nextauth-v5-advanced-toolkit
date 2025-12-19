

import prisma from "@/lib/prismaDb";

export const getTwoFactorTokenByEmail = async (email: string) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findFirst({ where: { email } })
		return twoFactorToken;
	} catch (error) {
		console.error("getTwoFactorTokenByEmail : ", error);
		return null
	}
}
export const getTwoFactorTokenById = async (id: string) => {
	try {
		const twoFactorToken = await prisma.twoFactorToken.findFirst({ where: { id } })
		return twoFactorToken;
	} catch (error) {
		console.error("getTwoFactorTokenByEmail : ", error);
		return null
	}
}