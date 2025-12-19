import prisma from "@/lib/prismaDb";



export const getTwoFactorConformationById = async (id: string) => {
	try {
		const token = await prisma.twoFactorConfirmation.findUnique({ where: { id } });
		return token
	} catch (error) {
		console.log("Error in getTwoFactorConformationById :", error);
		return null
	}
}