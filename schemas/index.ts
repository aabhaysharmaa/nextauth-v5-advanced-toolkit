import * as z from "zod";

export const LoginSchema = z.object({

	email: z.string().min(5, "email should not be empty"),
	password: z.string().min(1, "field cannot be empty"),
	code: z.string().optional()

});
export const RegisterSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string()
})

export const NewPasswordSchema = z.object({
	password: z.string()
})

export const ResetSchema = z.object({
	email: z.string().min(4, "Email field can't be empty"),
})

