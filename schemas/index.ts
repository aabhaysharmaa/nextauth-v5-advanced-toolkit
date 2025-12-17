import * as z from "zod";

export const LoginSchema = z.object({

	email: z.string().min(5, "email should not be empty"),
	password: z.string().min(1, "field cannot be empty")
});

export const RegisterSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string()
})

