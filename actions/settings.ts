"use server";

import * as z from "zod";
import prisma from "@/lib/prismaDb";
import { getUserByEmail, getUserById } from "@/data";
import currentUser from "@/hooks/currentUser";
import { settingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { generateVerificationTokenByEmail } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";


export const Settings = async (values: z.infer<typeof settingsSchema>) => {
	try {
		const user = await currentUser();
		if (!user) {
			return { error: "Unauthorized" }
		}
		const dBUser = await getUserById(user?.id as string);
		if (!dBUser) {
			return { error: "User not Exists!" }
		}

		if (user.isOAuth) {
			values.password = undefined;
			values.email = undefined
			values.newPassword = undefined
			values.isTwoFactorEnabled = undefined
		}

		if (user.email && values.email !== user.email) {
			const existingEmail = await getUserByEmail(values.email as string);
			if (existingEmail) return { error: "Email already exists!" }
			const verificationToken = await generateVerificationTokenByEmail(values.email as string);
			if (!verificationToken) {
				return { error: "something went wrong" }
			}
			sendVerificationEmail(verificationToken.email, verificationToken.token)
		}

		if (values.password && values.newPassword ) {

			const passwordMatch = await bcrypt.compare(values.password, dBUser?.password as string);
			if (!passwordMatch) {
				return { error: "Invalid password" }
			}
			const hashedPassword = await bcrypt.hash(values.newPassword, 10);
			values.password = hashedPassword
			values.newPassword = undefined
		}
				await prisma.user.update({
				where: { id: dBUser.id },
				data: {
					...values
				}
			})
		return { success: "setting updated!" }

	} catch (error) {
		console.log("Error in Settings Action : ", error)
	}
}
