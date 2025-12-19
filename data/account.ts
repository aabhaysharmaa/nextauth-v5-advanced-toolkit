import prisma from "@/lib/prismaDb";

export const getAccountByUserId = async (userId: string) => {
	try {
		const account = await prisma.account.findUnique({ where: { id: userId } }) ;
		return account 
	} catch (error) {
		console.log("Error in getAccountByUserId :", error);
		return error;
	}

}