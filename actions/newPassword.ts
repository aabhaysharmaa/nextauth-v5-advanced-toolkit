"use server";

import { getNewPasswordTokenByToken } from "@/data/newPasswordToken";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";
import prisma from "@/lib/prismaDb";
import { getUserByEmail } from "@/data";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string) => {
	try {
		if (!token) {
			return { error: "Missing Token" }
		}
		const validateFields = NewPasswordSchema.safeParse(values);
		if (!validateFields.success) {
			return { error: "Invalid Fields" }
		}

		const { password } = validateFields.data;

		const existingToken = await getNewPasswordTokenByToken(token);
		if (!existingToken) {
			return { error: "Invalid Token" }
		}

		const existingUser = await getUserByEmail(existingToken.email);
		if (!existingUser) {
			return { error: "Email does not exists" }
		}

		const hasExpired = new Date(existingToken.expires) < new Date();
		if (hasExpired) return { error: "Token Already exists" }
		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.update({
			where: { id: existingUser.id },
			data: {
				password: hashedPassword
			}
		})
		await prisma.passwordResetToken.delete({
			where: { id: existingToken.id }
		})
		return { success: "Password Changed" }

	} catch (error) {
		console.log("Error in newPassword :", error)
		return { error: "Something went Wrong" }
	}
}