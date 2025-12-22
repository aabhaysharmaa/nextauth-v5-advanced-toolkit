// import { UserRole } from "@/lib/generated/prisma/enums";
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

export const settingsSchema = z.object({
  name: z.string().min(4, "Field can't be empty").optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.enum(["ADMIN","USER"]),
  email: z.string().optional(),
  password: z.string().optional(),
  newPassword: z.string().optional(),
}).refine((data) => {
  // Case 1: password exists but newPassword doesn't → invalid
  if (data.password && !data.newPassword) return false;

  // Case 2: newPassword exists but password doesn't → invalid
  if (data.newPassword && !data.password) return false;

  return true;
}, {
  message: "Both password and new password are required to update your password.",
  path: ["newPassword"],
});



export const NewPasswordSchema = z.object({
	password: z.string()
})

export const ResetSchema = z.object({
	email: z.string().min(4, "Email field can't be empty"),
})

