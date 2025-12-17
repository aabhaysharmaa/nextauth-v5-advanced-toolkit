"use server";

import { signIn } from "@/auth";


import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from 'zod';


export const login = async (values: z.infer<typeof LoginSchema>) => {
	try {
		const validateFields = LoginSchema.safeParse(values);
		if (!validateFields.success) {
			return { error: "Invalid fields" }
		}

		const { email, password } = validateFields.data

		await signIn("credentials", { email , password , redirect : false })
		// TODO : send a verification email

		return { success: "Email Sent!" }
	} catch (error) {
		console.log("Error in login Action : ", error);
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials" }
				default: return { error: "Something went Wrong!" }
			}
		}
	}
}

