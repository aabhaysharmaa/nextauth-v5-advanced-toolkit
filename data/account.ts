import prisma from "@/lib/prismaDb";

export const getAccountByUserId = async (userId: string) => {
	try {
		const account = await prisma.account.findFirst({ where: { userId: userId } });
		console.log({ account })
		return account
	} catch (error) {
		console.log("Error in getAccountByUserId :", error);
		return error;
	}

}