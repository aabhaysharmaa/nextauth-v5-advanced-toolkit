
import prisma from "@/lib/prismaDb"

export const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		console.log("Error in getUserByEmail :", error)
		return null;
	}
}
