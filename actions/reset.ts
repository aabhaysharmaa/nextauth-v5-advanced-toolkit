"use server";

import { getUserByEmail } from "@/data";
import { generateResetPasswordTokenByEmail } from "@/lib/token";

import { ResetSchema } from "@/schemas";
import * as z from "zod";

import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	try {
		const validateFields = ResetSchema.safeParse(values);
		if (!validateFields.success) return { error: "Invalid field" }

		const { email } = validateFields.data;
		const user = await getUserByEmail(email);
		if (!user) {
			return { error: "User does not exists" }
		}
		const newPasswordToken = await generateResetPasswordTokenByEmail(email);
		console.log(
			{ newPasswordToken }
		)
		if (!newPasswordToken) {
			return { error: "Something went Wrong" }
		}
		await sendPasswordResetEmail(newPasswordToken.email, newPasswordToken?.token as string)

		return { success: "reset email sent!" }
	} catch (error) {
		console.log(error);
		return { error: "Something went Wrong!" }
	}




}