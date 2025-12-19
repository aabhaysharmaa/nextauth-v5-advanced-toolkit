
import prisma from "@/lib/prismaDb";



export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const token = await prisma.verificationToken?.findFirst({ where: { email } })
		return token
	} catch (error) {
		console.log("Error in getVerificationTokenByEmail : ", error)
		return null
	}
}

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await prisma.verificationToken?.findFirst({
			where: { token }
		})
		return verificationToken
	} catch (error) {
		console.log("Error in getVerificationTokenByEmail : ", error)
		return null
	}
}
