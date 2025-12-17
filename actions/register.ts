"use server";

import { RegisterSchema } from "@/schemas";
import * as z from 'zod';
import { getUserByEmail } from "@/data";
import bcrypt from "bcryptjs";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validateFields = RegisterSchema.safeParse(values);
	if (!validateFields.success) {
		return { error: "Invalid fields" }
	}

	const { email, password, name } = validateFields.data;
	const user = await getUserByEmail(email);
	if (user) return { error: "User already exists!" }

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma?.user.create({
		data: { email, name, password: hashedPassword }
	})

	return { success: "Email Sent!" }

}